The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 7

**Judge verdict, session 7**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are listed on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - `sand` is 0.43% [362,298,794,321], and the sample at (640,310) is #dbd8be. The beach is still a pale strip behind the rocks, not a wedge.
   - The `Surfaces:` line for `pines` at y=4.30 is still there. It has now been open for 3 sessions.
2. **Plays as DESIGN.md says: 7.**
   - I did not run `interact` this session. The solo HUD shows the `SUSPICION` bar, 3 clover icons, 3 bite dots and the hint "find the 3 clovers, hold E".
3. **The clip moment: 6.**
   - The AI case reads: "BITE WASTED / AI SHEEP / Just a sheep. Bite wasted.", a "baa?" bubble, bite dots dropping to 2, and the caption "A completely innocent sheep. Awkward."
   - The wolf at the pounce is still huge and brown. In human20 and human50 it is a long flat slab with stiff arms sticking out sideways.
   - In ai50 the camera is inside the wolf. Two black boxes (legs or ears) fill the middle of the frame and nothing else reads.
   - In ai90 the wolf is a T-pose with arms out, with no shrug.
   - In the human case the banner and PLAYER 1 tag had not shown by frame 50.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and the bright meadow all show.
   - `wolf-rock` is 0.64% with the wolf as a brown lump beside it, not crouched on top.
5. **Solo fun and fair: 7.**
   - The suspicion bar, the hint line and win/lose/restart keys are present.
   - The 3 `clover` objects are 0.15% of the frame, with no glow.
6. **Local 2-player: 6.**
   - `aim` and `reach` are "Hidden by the game" in the idle look.
   - The Iteration 7 aim ring change (RingGeometry 1.5–2.1, pulsing) has not been seen in play for two sessions running.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` has its keys and actions, and `observe` works.
   - `perf` reads 150 ms with 68 draw calls and 102k triangles on SwiftShader, so there is no signal. Host load is 2.9 on 8 cores.
8. **Juice: 6.**
   - The captions, banners, "baa?" bubble and wolf leap are there.
   - The wolf animation is crude, and sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The laptop-size HUD is fine. I did not run `viewports` this session.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar face, the thin sand strip and the oversized wolf are still open.
    - Iteration 7 left the wolf pounce untouched, which was the top Next item.

**Next:**
1. **Rework the wolf's pounce: size, pose and camera (asked again).**
   - Scale the wolf to about 60% in the leap and move the pounce camera back, so the camera is not inside it (ai50).
   - Fold the front legs forward and the hind legs back. Add a pale muzzle and a dark nose, and a shrug on a miss (shoulders up, head tilted).
   - To check, run `look` with a `sheet` of `pounce` `human` and `ai` at frames 30, 50 and 90. The wolf should fill less than a third of the frame with a visible arc, no black boxes at frame 50, and the human banner and PLAYER 1 tag readable by about frame 90.
2. **Fix the `pines` coplanar face and make the beach a real wedge (asked again).**
   - Pines: in pineGeo, offset the duplicate cone and trunk faces at y=4.30 by 0.01, or delete the hidden face.
   - Beach: lower the far `ground` edge near the shore, or widen the `sand` ring toward the camera.
   - To check, run `look`: the `Surfaces:` line is gone and `sand` is above 1%.
3. **Make the local-mode `aim` ring and the clovers readable (asked again).**
   - Add a faint pulsing glow or sparkle on each `clover`.
   - To check, run `interact` with `M` then ArrowRight ×30 and `look: true`. `aim` should be above 0.05% in the list. In a plain `look`, the `clover` share should rise above 0.3%.

SCORE: 6.5

## Iteration 8
**Did**: game.js drawWolf: `W.root` scale eases to 2.4 in leap/land/shrug (3.8 otherwise); leap legs folded (front -1.1, hind 1.2, scale.y 0.6); shrug arms less stiff (rotation.z 0.5+, body pitch -0.15). updateCamera pounce zoom 0.55→0.3 so the camera stays back. pineGeo trunk cone shortened to 0.95. `sand` ring inner radius 44→38.
**Saw**: pounce sheet (h50,h90,a50,a90): wolf now a readable mid-leap shape in h50 (small, arc visible), no black boxes inside the camera in a50; GOTCHA/PLAYER 1 tag and AI SHEEP/"baa?" readable at 90. Opening look: `sand` still 0.43% [362,298,794,321] (ground hides the wider ring); `pines` coplanar y=4.30 line still listed (not the trunk); no Never-visible, HUD 0 overlap. perf not run.
**Next**: (1) find the real pines coplanar plane (y=4.30 over 17×73 units is likely the top of the instanced cones / the merge of cone bases: nudge cone y by 0.01 per tier); (2) make the beach visible: lower the `ground` vertex heights near the shore (cy<1.5) or raise `sand` above ground; (3) clover glow/sparkle and verify `aim` via interact M + ArrowRight.
**Open**: wolf in a90 shrug still arms-out-ish and brown; clover glow and aim ring unseen in play; beach unchanged.
