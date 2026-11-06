**Session 44 verdict.** I opened the page, played 90 frames, took a 3-cell sheet (start, human pounce, AI pounce) and ran `perf` once. I did not re-run the 3-clover win or 2-player. Items 5 and 8 are carried over from earlier sessions.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, `ridge*`, grain, inked `pines*` and `oaks*`, and cream `sheep*` with dark faces read as a storybook.
   - The `ridge*`, `oaks*` and `ground` still have soft gradients, and `round-trees*` still look faceted.
   - The sheep are still soft lumps, and `wolf-body` is the darkest shape.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The biggest style gap is still the gradient shading on `ridge*`, `oaks*` and `ground`, where BOARD uses flat masses.
   - At the start the wolf is 1.9% of the frame with `wolf-rock` and `sheep*` crowding it. That is up from 1.4% but below the 3% goal.

3. **Clip moment: 9.5.**
   - The human pounce frame has `wolf-body` at 9.5%, a slow leap, and the caption "That sheep walks as if it had somewhere to be."
   - The AI pounce frame fills 64% with `wolf-body`, a "baa!" bubble and the caption "And the wolf was wrong, as wolves so often are."
   - I did not look at the stamped card this session.

4. **Core loop and controls: 8.**
   - The HUD reads well, with a clovers row, wolf-bites row and suspicion bar.
   - The 3-clover win was not re-run for the third session in a row.

5. **Local 2-player: 8.** Carried over from session 41.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps, and the `#hud` and `#mode` panels are readable.

7. **Convention and performance: 8.**
   - `perf` reports 151,106 triangles (under the 160k target), 81 draw calls and 0.63 MB of assets.
   - The 277 ms frame is SwiftShader, so it is no signal.

8. **Juice: 8.** Carried over, not re-checked this session.

**Faults: 8.** No console errors, no `Lighting:` or `Surfaces:` lines, and nothing `Never visible`. The wolf is small at the start.

**Next:**
1. **Flatten `ridge*`, `oaks*`, `round-trees*` and `ground` (asked again, third time).**
   - Use flat per-mass colour with no vertex gradient, keeping the ink outline.
   - Proof: `look` with `sample` at two points on one hill face returns near-equal colour.
2. **Make the wolf bigger at the start (asked again).**
   - The zoom added in session 44 was not enough. Move the wolf's start position and `wolf-rock` to the edge of the flock, in clear ground, and bring the start camera closer.
   - Add a pale rim or glow behind the wolf so the silhouette separates from `sheep*`.
   - Proof: `look` on frame 0; the `Subject: wolf takes` line reads 3% or more (1.9% this session).
3. **Run a full 3-clover win (asked again).**
   - Use `interact` with `{state:{eaten:3}}` or hold KeyE on each clover, then check that the stamped win card appears with a restart.
   - Also soften the sheep silhouettes so they read less like cotton lumps. Use flatter, inked, wobbly outlines and a cream flat fill, and hold the triangle count under 160k.

SCORE: 8.0
