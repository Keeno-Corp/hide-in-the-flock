# Hide in the Flock
## What it is
Browser three.js game (plain page, no build step; index.html, game.js, fx.js, geo.js): a sheep hidden among ~100 AI sheep on an island meadow; a wolf has 3 bites. Solo (AI wolf hunts the player) and local 2-player on one keyboard (second player is the wolf). The page is improved in place, not rebuilt.
## Must have
1. Looks as LOOK.md says: its Checks hold.
2. Plays as DESIGN.md's Core loop and Controls say.
3. The clip moment is the whole point: the wolf's pounce (slow-mo leap, camera punch-in, sting, wool burst) and the REVEAL of whether it ate a real player ("HUMAN! GOTCHA", PLAYER 1 tag) or an AI sheep ("AI SHEEP", "baa?", wolf shrug, bite lost). It happens within the first minute of solo play and reads clearly in a 5-second clip: big, funny, readable.
4. Looks like refs/01.jpg: an island meadow with the sea, sand beach, pine forest, grey cliffs and puffy low-poly clouds all visible from the play camera; bright, low-poly, readable; the wolf crouched on its rock.
5. Solo is genuinely fun and fair: the wolf's suspicion is readable (the player learns what makes it suspicious), blending in (grazing, drifting with the flock) works, clover patches are findable, win and lose screens with restart.
6. Local 2-player on one keyboard is playable and fun for the wolf player: pounce targeting is clear, 3 bites.
7. Keeps the window.__game convention, starts playing on load, plain page with no build step, ~100 instanced sheep at 60fps on desktop.
8. Juice: sounds (baas, munch, wind, sting), sheep animation (grazing head bob, hops), wolf animation, a funny nature-documentary caption voice.
9. Works in a laptop browser window of any size; the HUD stays readable.
## References
refs/01.jpg · style+mood · inspiration
## Inspirations and notes
Nature-documentary narrator humour; clip-friendly moments.
## Sheets
LOOK.md · CHARACTERS.md · DESIGN.md · refs/sheets/LOOK.png
Web study: no · Picture sheets: no · Asset style: low-poly (all unasked)
## Left to the builder
Camera, wolf AI tuning, HUD layout.
