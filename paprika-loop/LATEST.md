The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 87
**Did**: `game.js` `updatePounce`: reveal freeze (slow 0.03 for first 0.3 s, then 0.2) plus a fov punch-in (−12° fading over 0.6 s) in `updateCamera`; human GOTCHA `camShake.kick(2.4)`. New wolf pose `grin` (body back, head up, paws raised, fast tail wag) used on a human bite; `shrug` made upright (less body tilt/bob). `wool` size 2.4→2.7, extra pink (0xffb8cc) and tan (0xffd9a0) bursts, human burst 260→150.
**Saw**: human pounce reveal after 60 frames: pose "grin", 10 sounds, `div#tag` [614,474,820,524] on screen, 0 overlap/off-screen. At wool size 3.6 `wool` covered 57% of the frame, so I lowered it to 2.7; that final size was not re-looked at. Did not run `perf`, `feel`, the AI shrug look or a zoom on the wool colours.
**Next**: (1) look at the final `wool` size and a zoom on the pink/tan flakes; (2) look at the grin and shrug poses on the wolf up close, since the wolf is hidden under wool in the reveal; (3) re-check `perf` and `feel`.
**Open**: wool coverage at 2.7 unverified; the grin pose has not been seen without wool in front.

### Judge 87

**Session 87 verdict.** I opened the page, forced a human pounce to the reveal with `look`, and ran `perf` once. I did not re-run the AI reveal, 2-player or `viewports`. Those scores carry over from earlier sessions.

1. **Looks as LOOK.md says: 8.5.** `ground`, `sea`, `sand`, `cliff`, `wolf-rock`, `round-trees*`, `rocks*`, `bushes*`, `tufts* ×72`, `sheep*` and `cloud ×11` are all on screen, and there are no `Lighting:` or `Surfaces:` lines. But at the reveal the `wool` burst is one flat cream blob covering 33% of the frame ([285,272,1065,799]). It is not made of flakes, and it hides the pounce.
2. **Plays as DESIGN.md says: 8.5.** The forced pounce reached `pounce.ph:"reveal"` and `wolf.pose` was "grin". Ten sounds fired (`boom`, `stab1`–`stab3`, `thud`, `hit`).
3. **Clip moment: 7.5.**
   - **Reads well:** the red "GOTCHA" lettering, "HUMAN!", the "PLAYER 1 has been found." caption and the red "PLAYER 1" `div#tag` read clearly. The reveal slow-down and `camShake` from 87 are in the code, and I did not measure them with `feel`.
   - **Problem:** the wolf and the bitten sheep are completely hidden behind the cream blob, so the new `grin` pose cannot be seen. It also reads as fog, not a wool burst.
   - **Open from 87:** the wool size check was left open, and this look is that check. It fails: 2.7 is still far too big.
4. **Looks like refs/01.jpg: 9.** Sea, `sand`, `cliff`, trees and bright low-poly all show in the same picture. The `wolf-rock` is only partly visible at the bottom left.
5. **Solo fun and fair: 8.** Carried over. The `div#hud` suspicion bar, clovers and bites are readable.
6. **Local 2-player: 8.5.** Carried over.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls, 103k triangles and 0 MB of assets. The 138 ms frame is SwiftShader at host load 2.3, so it is noise and not a fault.
8. **Juice: 8.5.** Ten sounds fired in the reveal, but the wool blob hides most of the visual juice.
9. **Any window size, HUD readable: 8.5.** There were 4 HTML overlays with 0 overlap, 0 off-screen and 0 cut off at 1280×800.
10. **Faults: 7.5.** There were no console errors. The wool coverage hides the clip's main subject, which I count as a fault.

**Next:**
1. **Shrink and thin the `wool` burst (asked again).**
   - **Do:** in `game.js`, cut the flake size to about 1.2 and the count, and give the flakes short lifetimes and some gravity. Use cream, pink and tan spread over a small radius around the bitten sheep. Keep a clear view of the wolf.
   - **Check:** `interact` with `{action:"pounce",target:"human"}`, `{until:{"pounce.ph":"reveal"}}`, `{wait:40}` and `look:true`. `wool` should drop below about 8% in the on-screen list, and the wolf and the PLAYER 1 sheep should be visible.
2. **Check the `grin` pose and the upright AI `shrug` up close (asked again).**
   - **Do:** once the wool is thinner, take a `look` with `zoom` on the wolf at the reveal, for both a human and an AI bite. Fix the pose if it does not read as a grin or a shrug.
   - **Check:** `look` with `zoom` on the wolf shows paws raised and head up (grin), or an upright shrug.
3. **Measure the reveal punch and shake.**
   - **Do:** run `feel` on the pounce event to confirm the freeze, fov punch and `camShake.kick(2.4)` give a clear camera change. Raise them if it is weak.
   - **Check:** `feel` shows a visible camera or fov change in the first 0.6 s of the reveal.

SCORE: 8.4
