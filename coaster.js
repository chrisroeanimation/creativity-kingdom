// Clay Park — coaster track maths, shared by the island generator and the website.
// A track is a closed Catmull-Rom curve through the CoasterPoint objects (hierarchy order).
// Its "up" direction is carried along the curve without twisting (rotation-minimising frames),
// so loops and vertical lifts just work. Banking and heartline rolls come from each point's
// Z rotation (its roll), blended between points.

export function rollOf(q){ return 2 * Math.atan2(q.z, q.w); }

export function coasterFrames(THREE, points, rolls, samplesPerSeg = 8){
  const n = points.length;
  const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
  const N = n * samplesPerSeg;
  const P = [], T = [], U = [], TT = [];
  // evenly spaced along the track (arc length), so trains move smoothly however the points are spaced
  curve.arcLengthDivisions = Math.max(200, N * 10);
  for (let i = 0; i < N; i++){ const t = curve.getUtoTmapping(i / N); TT.push(t); P.push(curve.getPoint(t)); T.push(curve.getTangent(t).normalize()); }
  // rotation-minimising "up"
  let u = new THREE.Vector3(0, 1, 0);
  if (Math.abs(T[0].y) > 0.9) u.set(1, 0, 0);
  u.sub(T[0].clone().multiplyScalar(u.dot(T[0]))).normalize();
  U.push(u);
  for (let i = 1; i < N; i++){ const v = U[i - 1].clone(); v.sub(T[i].clone().multiplyScalar(v.dot(T[i]))).normalize(); U.push(v); }
  // spread the closing twist evenly so the loop joins up
  const uEnd = U[N - 1].clone(); uEnd.sub(T[0].clone().multiplyScalar(uEnd.dot(T[0]))).normalize();
  const twist = Math.atan2(new THREE.Vector3().crossVectors(uEnd, U[0]).dot(T[0]), uEnd.dot(U[0]));
  for (let i = 0; i < N; i++) U[i].applyAxisAngle(T[i], twist * i / N);
  // authored roll, unwrapped so 0 → 360 spins the right way
  const rr = [rolls[0] || 0];
  const unwrap = (a, ref) => { while (a - ref > Math.PI) a -= Math.PI * 2; while (a - ref < -Math.PI) a += Math.PI * 2; return a; };
  for (let i = 1; i < n; i++) rr.push(unwrap(rolls[i] || 0, rr[i - 1]));
  const rClose = unwrap(rr[0], rr[n - 1]);
  for (let i = 0; i < N; i++){
    const f = TT[i] * n, k = Math.min(n - 1, Math.floor(f)), w = f - k;
    const a0 = rr[k], a1 = k + 1 < n ? rr[k + 1] : rClose;
    const roll = a0 + (a1 - a0) * w;
    if (roll) U[i].applyAxisAngle(T[i], roll);
  }
  let length = 0; for (let i = 0; i < N; i++) length += P[i].distanceTo(P[(i + 1) % N]);
  return { P, T, U, N, length };
}

// Position + orientation on the track at arc fraction s (0..1). Car forward = +Z, up = +Y.
export function coasterPose(THREE, fr, s, out){
  const f = ((s % 1) + 1) % 1 * fr.N, i = Math.floor(f), w = f - i, j = (i + 1) % fr.N;
  out.pos.copy(fr.P[i]).lerp(fr.P[j], w);
  out.fwd.copy(fr.T[i]).lerp(fr.T[j], w).normalize();
  out.up.copy(fr.U[i]).lerp(fr.U[j], w);
  out.up.sub(out.fwd.clone().multiplyScalar(out.up.dot(out.fwd))).normalize();
  return out;
}

// Track meshes: two rails, a box-section spine, sleepers and (optionally) supports.
// paint(geometry, hex) must return a coloured geometry. Returns { rails, spine, ties, supports, supportXZ }.
export function coasterGeometry(THREE, fr, style, paint){
  const { P, T, U, N } = fr;
  const side = i => new THREE.Vector3().crossVectors(T[i], U[i]).normalize();
  const L = [], R = [], S = [];
  for (let i = 0; i < N; i++){ const sd = side(i); L.push(P[i].clone().addScaledVector(sd, 0.62)); R.push(P[i].clone().addScaledVector(sd, -0.62)); S.push(P[i].clone().addScaledVector(U[i], -0.55)); }
  const tube = (pts, r, radial) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5), N, r, radial, true);
  const rails = [paint(tube(L, 0.15, 5), style.rail), paint(tube(R, 0.15, 5), style.rail)];
  const spine = [paint(tube(S, 0.3, 6), style.spine)];
  const ties = [], m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < N; i += 4){
    const sd = side(i);
    const g = new THREE.BoxGeometry(1.5, 0.16, 0.28);
    const pos = P[i].clone().addScaledVector(U[i], -0.22);
    m.makeBasis(sd.clone().negate(), U[i], T[i]); q.setFromRotationMatrix(m);  // right-handed: x = up × forward
    g.applyMatrix4(new THREE.Matrix4().compose(pos, q, sc));
    ties.push(paint(g, style.tie));
    const g2 = new THREE.BoxGeometry(0.14, 0.5, 0.2);
    g2.applyMatrix4(new THREE.Matrix4().compose(P[i].clone().addScaledVector(U[i], -0.42), q, sc));
    ties.push(paint(g2, style.tie));
  }
  const supports = [], supportXZ = [];
  if (style.supports){
    const every = Math.max(4, Math.round(N / 60));
    for (let i = 0; i < N; i += every){
      if (U[i].y < 0.55) continue;
      const base = P[i].clone().addScaledVector(U[i], -0.8);
      if (base.y < 1.2) continue;
      const g = new THREE.CylinderGeometry(0.26, 0.34, base.y, 10, 1, false);
      g.translate(base.x, base.y / 2, base.z);
      supports.push(paint(g, style.support));
      const foot = new THREE.SphereGeometry(0.55, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      foot.translate(base.x, 0, base.z);
      supports.push(paint(foot, style.support));
      supportXZ.push([base.x, base.z]);
    }
  }
  return { rails, spine, ties, supports, supportXZ };
}

// Rail colours by path name, e.g. CoasterPath_Blue_NoSupports
export function coasterStyle(name){
  const pal = {
    Red:    { rail:'#dd4a2e', spine:'#f4c430', tie:'#efe3c8', support:'#f4c430' },
    Blue:   { rail:'#3d6fe0', spine:'#9fb8ff', tie:'#efe3c8', support:'#7b52c7' },
    Purple: { rail:'#7b52c7', spine:'#ef7fa6', tie:'#efe3c8', support:'#f4c430' },
    Green:  { rail:'#3f9a3a', spine:'#f4c430', tie:'#efe3c8', support:'#dd4a2e' },
  };
  const key = Object.keys(pal).find(k => name.includes(k)) || 'Red';
  return { ...pal[key], supports: !/NoSupports/i.test(name) };
}

// Find the per-point rolls that make the track's "up" match a wanted direction at each point.
// wantUp(i, point, tangent) returns a Vector3 (or null to leave that point unrolled).
export function solveRolls(THREE, points, wantUp, samplesPerSeg = 6){
  const fr = coasterFrames(THREE, points, points.map(() => 0), samplesPerSeg);
  return points.map((p, i) => {
    let j = 0, best = Infinity; for (let k = 0; k < fr.N; k++){ const d = fr.P[k].distanceToSquared(p); if (d < best){ best = d; j = k; } }
    const T = fr.T[j], U0 = fr.U[j], w = wantUp(i, p, T); if (!w) return 0;
    const Ud = w.clone().sub(T.clone().multiplyScalar(w.dot(T))); if (Ud.lengthSq() < 1e-6) return 0; Ud.normalize();
    return Math.atan2(new THREE.Vector3().crossVectors(U0, Ud).dot(T), U0.dot(Ud));
  });
}
