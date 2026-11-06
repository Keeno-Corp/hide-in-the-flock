The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 43

**Session 43 verdict.** I ran a 2-cell sheet (start, human pounce) and `perf` once. I did not re-run the clover walk or the 3-clover win. I scored items 5 and 8 from earlier sessions.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, `ridge*`, grain, inked `oaks*` and pines, and cream `sheep*` with dark faces read as a storybook.
   - The `ridge*`, `oaks*` and `ground` still have soft gradients, and the sheep are still soft lumps.
   - `wolf-body` is the darkest shape but is only 1.4% of the start frame.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The biggest remaining style gap is the gradient shading on `ridge*`, `oaks*` and `ground`. BOARD uses flat masses.
   - The wolf is a speck beside the `sheep*` crowd.
   - The start frame shows the wolf at 1.4%, the same as before, so the scale change from 2 to 2.6 did not help.

3. **Clip moment: 9.5.** The pounce frame has `wolf-body` at 9.7% of the frame, a slow leap, and the caption "That sheep walks as if it had somewhere to be." It reads clearly.

4. **Core loop and controls: 8.**
   - `cloverProgress.0` rose 0 → 0.83 on the last session's KeyE hold, so the clover path is now proven.
   - The HUD reads well.
   - The full 3-clover win was not re-run.

5. **Local 2-player: 8.** Carried over from session 41, not re-run.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps. The HUD, the caption ribbon and the `#mode` panel are all readable.

7. **Convention and performance: 7.**
   - `perf` reports 190,778 triangles, 81 draw calls and 0.63 MB of assets.
   - The 309 ms frame is SwiftShader, so it is no signal.
   - 257 ms of the frame is the main scene pass. The triangle target of under 160k is still missed.

8. **Juice: 8.** Carried over, not re-checked this session.

**Faults: 8.** No console errors, no `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`. The gaps are the triangle count and the small wolf at the start.

**Next:**
1. **Flatten `ridge*`, `oaks*`, pines and `ground` (asked again).**
   - Use flat per-mass colour with no vertex gradient.
   - Proof: `look` with `sample` at two points on one hill face returns near-equal colour.
2. **Cut triangles under 160k (asked again).**
   - Lower the `ico()` detail on the sheep and the tree segments.
   - Proof: `perf` triangles under 160k.
3. **Make the wolf bigger at the start (asked again).**
   - The 2.6 scale gave no gain, so a bigger scale alone doesn't work.
   - Move the start camera closer to `wolf-rock`, or place the wolf nearer the camera, and add a light rim on the nearby sheep.
   - Proof: `look` on the start frame; the `subject wolf` line reads 3% or more (it read 1.4% this session).
   - Also run a full 3-clover win with `eaten=3` at T≥180, and check that the win card appears.

SCORE: 7.9

## Iteration 44
**Did**: Cut triangles: `pineGeo`/oak cones 18→10 segments, `roundTreeGeo`, `rockGeo`, `bushGeo`, `wolf-rock` icos and the sheep body ico detail 2→1 (game.js ~224, 319-360). Solo camera zoom 0.82 when wolf within 32 (game.js:916, lerped by cam.zoom).
**Saw**: `perf` 151,104 triangles (was 190,778), 81 draw calls. Start frame: no console errors, no Lighting/Surfaces lines. `subject wolf` 0.57% at frame 0 (the zoom lerps in, so frame 0 does not show it; wolf sits behind `wolf-rock` among `sheep*`).
**Next**: measure the wolf % after ~60 frames; raise wolf visibility (move `wolf-rock`/wolf start off the sheep crowd, rim light); flatten `ridge*`/`oaks*`/`ground` vertex gradients; run the full 3-clover win.
**Open**: gradient flattening not done; wolf size goal (3%) not met; 3-clover win not run.
