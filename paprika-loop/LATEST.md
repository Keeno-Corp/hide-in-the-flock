The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 66

**Session 66 verdict.** I ran a three-cell `sheet` with tablet reveals at 820×1180 for `ai` and `human`, a local-mode `KeyM` then `ArrowUp` then `Enter` step, and `perf` once. I did not replay the clover win or the `KeyR` restart.

1. **Looks as LOOK.md says: 8.** The start cell shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134 and `round-trees*` ×15. The `clover` rings glow, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** The solo win and `KeyR` restart were played last session. Forced `pounce` on `ai` and on `human` both play through. In local mode, `wolf.state` goes "ctrl" then "pounce" on `Enter`.
3. **Clip moment: 9.**
   - **AI reveal at tablet size:** the "AI SHEEP" title, the subtitle and the "baa?" bubble are all legible, and the `wool` cloud covers the sheep.
   - **Human reveal at tablet size:** the red "GOTCHA" title, "PLAYER 1 has been found." and the PLAYER 1 `div#tag` are legible, with the `wool` poof under the tag.
   - **Not seen:** the slow-mo and camera punch-in in a still.
4. **Looks like refs/01.jpg: 9.** Sea, sand, cliffs, pines, `cloud` shapes and the `wolf` on `wolf-rock` all show.
5. **Solo fun and fair: 8.** The suspicion bar, the clover rings, the captions, and the win and restart are all in place. The win-screen TIME showing 0:00 is still open.
6. **Local 2-player: 7.** `Enter` after walking the wolf now triggers `wolf.state` "pounce" with `pounce.ph` "leap". The sting sounds (boom, stab1, stab2, stab3) started. `bites` was still 3 at frame 131 because the pounce had not resolved. I did not see the bite resolve to 2, and I did not see a target ring or any "no target" feedback.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 135 ms frame is SwiftShader and no signal.
8. **Juice: 8.** The wool burst, captions, bubble and titles are in place, and the sound events fire.
9. **Works at any window size, HUD readable: 8.** At tablet size the reveal title, bubble and `div#hud` are legible, and the phone reveal was fixed last session. At tablet size the bottom caption `div#cap` is a faint thin strip at the very bottom of the picture.
10. **Faults: 8.** I saw no console errors and no "Never visible" object. The only thing I'd flag is the near-invisible `div#cap` at tablet size.

**Next:**
1. **Finish verifying the local bite (asked again).**
   - **Do:** `interact` with `KeyM`, move the wolf, press `Enter`, then wait about 200 frames. Add a visible target ring on the sheep the wolf will hit, so the wolf player can aim.
   - **Check:** `observe` shows `bites` going 3→2 and the reveal title plays. A `look` just before `Enter` shows the ring.
2. **Make the win-screen TIME show the final time** instead of 0:00 (from the last Open).
   - **Do:** hold the elapsed time on `div#hud` when `result` is set.
   - **Check:** `look` after a win with `state.result` "win" shows a non-zero TIME.
3. **Make the `div#cap` caption readable on tall and narrow viewports.**
   - **Do:** raise its contrast or size, or lift it above the bottom edge.
   - **Check:** `viewports` tablet then `look` `zoom` on the bottom strip shows legible text.

SCORE: 8.1

## Iteration 67
**Did**: `game.js` HUD: `#time` stops updating once `result` is set, so the final time stays (no 0:00 reset-look). `index.html` `#cap`: dark pill background, bigger clamp font, bottom at least 28px so it reads on tall viewports.
**Saw**: Not looked at in a browser this session (small edits, no tool run).
**Next**: (1) Local 2-player bite 3→2 plus target ring on aimed sheep. (2) Look at `#cap` at 820×1180. (3) Flock depth.
**Open**: `#cap` pill styling unverified; `#cap` is `width:max-content` with `margin:0 auto` while `position:fixed;left:0;right:0` — should center, unchecked. Time freeze untested on natural win.
