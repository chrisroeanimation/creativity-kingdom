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
  poster2.jpg         the still for video2.mp4 (poster3.jpg for video3.mp4, and so on)
  03-poster.jpg       the still for 03.mp4

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

EXTRA SECTIONS (Clay Jam)
  The Clay Jam panel has two extra parts after the press quotes, each with its own folder:
    clayjam/playdoh     Play-Doh Jam for Hasbro
    clayjam/other-ip    Famous characters, made in clay (SpongeBob, Angry Birds)
  Name the pictures/videos in each folder the same way as above (01.jpg, 02.jpg, video.mp4 ...).
  A description.txt or captions.txt in that folder works the same way too. One picture on its own
  is shown wide; two or more sit side by side as tiles. Click any picture to see it large.
