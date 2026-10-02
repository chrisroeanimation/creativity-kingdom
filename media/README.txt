PROJECT PICTURES, VIDEOS AND TEXT
=================================

Each project has its own folder. The website finds everything by file name, so to change
something just replace the file (keep the name), then commit and push.

  Folder      Project
  clayjam     Clay Jam
  chaos       Chaos Castle
  makes       Marvellous Makes & Lab
  creature    Creature Box
  strike      Strike
  sky         Sky Kids Christmas
  weasels     Wattle Weasels
  reel        Showreel & Portfolio
  about       About me & CV (pictures here replace the portrait in the panel)

PICTURES AND VIDEOS, IN ORDER
  01.jpg, 02.jpg, 03.mp4, 04.jpg ...
      Number them with two digits. Each number can be a picture (.jpg .png .webp) or a
      video (.mp4). They're shown in number order; gaps are fine. The first picture is
      shown big and is also the project's thumbnail in "All work".
  video.mp4, video2.mp4, video3.mp4 ...
      Extra videos, shown at the top of the panel before the numbered items.
  Upper- or lower-case endings both work (.JPG, .MP4).

VIDEO STILLS (optional)
  poster.jpg          the still shown on the first video before it plays
  03-poster.jpg       the still for 03.mp4; video2-poster.jpg for video2.mp4, and so on

TITLES AND CAPTIONS (optional): captions.txt, one per line
  video: Chaos Castle pilot
  video2: The making of the castle
  03: Behind the scenes on set
  05: Clay Jam | Art Director | The hand-made hills before scanning
  Videos show their title above the player; pictures show it underneath.

PROJECT TEXT (optional): description.txt
  The words in the project's panel. Write plain text and leave a blank line between
  paragraphs. If this file is missing, the site uses the text built into index.html.

SIZES THAT KEEP THE SITE QUICK
  Pictures: about 1600 px wide, JPEG quality ~80 (usually 200-500 KB each).
  Videos:   1080p or 720p, H.264 MP4, "Web optimized" ticked, ideally under 50 MB.
            GitHub refuses any single file over 100 MB. HandBrake's "Fast 1080p30"
            preset with "Web Optimized" ticked does this. (.mov files won't play in
            every browser: convert them to .mp4.)
