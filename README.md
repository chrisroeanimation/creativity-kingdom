# Chris Roe's Creativity Kingdom

The website, ready for GitHub Pages: plain files, no build step.

| File / folder | What it is |
|---|---|
| `index.html` | The whole site: page, panels, project text, and the park's code |
| `park.glb` | The 3D park (exported from Unity, slimmed down for the web) |
| `media/` | Each project's pictures and videos, found by name (see `media/README.txt`) |
| `img/` | Your portrait (top-left badge) and the park map picture |
| `audio/park-music.mp3` | Background music |
| `fonts/` | The Wobble font |
| `coaster.js`, `three.module.min.js`, `lib/` | The 3D engine and coaster maths |
| `.nojekyll` | Tells GitHub to serve the files exactly as they are |

## One-time setup

### 1. Put the site on GitHub
1. Make a free account at github.com.
2. Install **GitHub Desktop** (desktop.github.com) and sign in. It uploads files of any size up to
   GitHub's 100 MB limit, whereas the github.com website only accepts files up to 25 MB.
3. In GitHub Desktop: **File ▸ New repository**. Name it `creativity-kingdom`, choose where on your
   computer it lives, click **Create repository**.
4. Copy everything from this folder (including the hidden `.nojekyll` file) into that new folder.
5. Back in GitHub Desktop: type a summary like "First version", click **Commit to main**,
   then **Publish repository**. Untick **Keep this code private**: free accounts can only
   publish websites from public repositories.

### 2. Turn on GitHub Pages
1. On github.com, open the repository ▸ **Settings** ▸ **Pages**.
2. Under **Build and deployment**: Source **Deploy from a branch**, Branch **main**, folder **/ (root)** ▸ **Save**.
3. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/creativity-kingdom/`.
   Check it works there before touching your domain.

### 3. Point your Squarespace domain at it
Do these in this order.
1. **GitHub**: Settings ▸ Pages ▸ **Custom domain**: enter `www.yourdomain.com` ▸ **Save**.
   (GitHub adds a file called `CNAME` to the repository. In GitHub Desktop click **Fetch origin**,
   then **Pull**, so your copy has it too.)
2. **Squarespace**: account.squarespace.com/domains ▸ your domain.
   - Remove the forwarding rule that currently sends visitors to Wix.
   - Open **DNS** ▸ **DNS settings**. Delete the **Squarespace Defaults** records (red bin icon).
   - Under **Custom records** add:

     | Type | Host / Name | Data |
     |---|---|---|
     | A | @ | 185.199.108.153 |
     | A | @ | 185.199.109.153 |
     | A | @ | 185.199.110.153 |
     | A | @ | 185.199.111.153 |
     | CNAME | www | YOUR-USERNAME.github.io |

     (No repository name in the CNAME, just `YOUR-USERNAME.github.io`.)
3. Wait. DNS changes usually take under an hour but can take up to 48 hours.
4. **GitHub**: Settings ▸ Pages ▸ tick **Enforce HTTPS** once it becomes available (up to 24 hours).
   Both `yourdomain.com` and `www.yourdomain.com` will then open the site securely.
5. Optional but recommended: github.com ▸ your profile picture ▸ **Settings** ▸ **Pages** ▸
   **Add a domain** to verify you own it, so nobody else can ever claim it on GitHub.

Keep the Wix site until the new one is working on your domain.

## Updating the site
1. Change files in your folder: swap a picture in `media/`, drop in a `video.mp4`, or replace `park.glb`.
2. GitHub Desktop lists what changed. Write a short summary ▸ **Commit to main** ▸ **Push origin**.
3. The live site updates within a minute or two. If you still see the old version, hard-refresh
   (Ctrl+Shift+R, or Cmd+Shift+R on a Mac); browsers hold on to pictures for a while.

Text on the project panels (titles, descriptions, tags, links) lives in `index.html`, in the
`PROJECTS` list near the top of the script. Your public email goes in `CONTACT_EMAIL` just above it.

## Limits worth knowing (free GitHub Pages)
- Whole site: up to 1 GB. Single file: under 100 MB (aim for under 50 MB).
- Traffic: a soft limit of 100 GB a month. A 40 MB video watched 1,000 times is 40 GB,
  so for a long showreel, a YouTube or Vimeo link is kinder.
- The repository is public, so anyone can see these files. Only put things here you're happy to show.
