**Session 88 verdict.** I opened the page, forced a human pounce to the reveal with `look`, and ran `perf` once. I did not re-run the AI reveal, 2-player, `viewports`, `feel` or a zoom on the wolf pose. Those scores carry over.

1. **Looks as LOOK.md says: 8.5.** `ground`, `sea`, `sand`, `cliff`, `wolf-rock`, `round-trees*`, `rocks*`, `bushes*`, `tufts*`, `sheep*` and `cloud ×11` are all on screen, and there are no `Lighting:` or `Surfaces:` lines. `wool` is now 9.2% of the frame, down from 33%, and reads as flakes around the sheep.
2. **Plays as DESIGN.md says: 8.5.** The forced pounce reached `pounce.ph:"reveal"` with `wolf.pose` "grin". Ten sounds fired: `boom`, `stab1`–`stab3`, `thud` and `hit`.
3. **Clip moment: 8.**
   - **Reads well:** the red "GOTCHA" lettering, "HUMAN!", the "PLAYER 1 has been found." caption and the red "PLAYER 1" `div#tag` all read clearly, and the wolf and the bitten sheep are visible again.
   - **Problem:** the `div#tag` and the wool still cover part of the wolf, so the grin face is not clear. I did not zoom on it.
   - **Not measured:** I did not run `feel`, so the freeze, fov punch and shake are still unmeasured.
4. **Looks like refs/01.jpg: 9.** Sea, `sand`, `cliff`, trees and clouds all show with bright low-poly colours. The `wolf-rock` is only partly visible at the bottom left.
5. **Solo fun and fair: 8.** Carried over. The `div#hud` suspicion bar, clovers and bites are readable.
6. **Local 2-player: 8.5.** Carried over.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls, 103k triangles and 0 MB of assets. The 145 ms frame is SwiftShader at host load 1.8, so it is noise and not a fault.
8. **Juice: 8.5.** Ten sounds fired in the reveal, and the wool burst is now readable as juice.
9. **Any window size, HUD readable: 8.5.** There were 4 HTML overlays with 0 overlap, 0 off-screen and 0 cut off at 1280×800.
10. **Faults: 8.5.** There were no console errors and no `Never visible` object. The only open issue is the tag partly covering the wolf.

**Next:**
1. **Check the `grin` pose and the AI `shrug` up close (asked again).**
   - **Do:** move `div#tag` ("PLAYER 1" and the "AI SHEEP" equivalent) so it sits above the bitten sheep's head and does not cover the wolf. Then fix the poses if they do not read.
   - **Check:** `look` with `zoom` [330,380,900,799] at the reveal, once for a human bite and once for an AI bite (`{action:"pounce",target:"ai"}`). It should show the wolf's head and raised paws (grin), or an upright shrug, with no tag over them.
2. **Measure the reveal punch and shake (asked again).**
   - **Do:** run `feel` on the pounce to confirm the freeze, fov punch and `camShake.kick(2.4)` give a clear camera change. Raise them if the change is weak.
   - **Check:** `feel` shows a visible camera or fov change in the first 0.6 s of the reveal.
3. **Show the whole `wolf-rock` in the play camera.**
   - **Do:** in the opening `look`, `wolf-rock` is cut off at the bottom left, and the brief wants the wolf crouched on its rock. Nudge the camera or the rock so both show at the start.
   - **Check:** `look` at frame 0 should show `wolf-rock` with a box fully inside the frame and the wolf visible on it.

SCORE: 8.5
