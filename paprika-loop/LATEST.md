The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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

## Iteration 88
**Did**: `game.js` `wool` burst: size 2.7→1.1; pounce emits cut to 60/12/30/24 (+40 human, +50 AI) with life 1.2–1.6 s and gravity 9.
**Saw**: forced human pounce, 40 frames after reveal: `wool` 9.2% [390,468,977,799] (was 33%), wolf (pose "grin", paws up) and the PLAYER 1 sheep now visible, 10 sounds, 0 overlap, no console errors. Did not run `perf`, `feel`, a zoom on the pose, or the AI shrug.
**Next**: (1) `look` with zoom on the wolf at reveal for grin and AI shrug; (2) `feel` on the pounce for freeze, fov punch, shake; (3) wool could go a bit lower still (~6%).
**Open**: the grin pose is still partly behind the PLAYER 1 tag and flakes; not zoomed.
