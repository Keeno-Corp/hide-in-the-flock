**Judge verdict, session 2**

1. **Looks as LOOK.md says: 6.**
   - Sky: `sample` at (640,20) is #bfdce2, still a hazy pale blue. The sea band (10%) is clean.
   - Grass: `ground` is 46% and the bottom of the frame samples #a6ca4a, bright and low-poly.
   - Sheep and wolf: `sheep*` ×101 are spread over the meadow. `wolf` is 0.66% [369,389,510,498], crouched by `wolf-rock`, so it is readable but small.
   - HUD: the `#hud` panel is clear. There are no `Lighting:` or `Surfaces:` fault lines.
2. **Plays as DESIGN.md's Core loop and Controls say: 6.**
   - KeyD moved `player.x` to 1.9, and E set `player.grazing` true.
   - Grazing is recorded in `flock.graze` and `susp` stays low, which is the intended blending.
   - Clover collection, the win screen and the lose screen are still not verified.
3. **The clip moment: 8.**
   - The sheet shows a slow-mo leap with the wolf big in frame.
   - The HUMAN reveal shows "HUMAN! GOTCHA", the "PLAYER 1" tag and the caption "Even in nature, nobody blends forever."
   - The AI reveal shows "AI SHEEP", "BITE WASTED", the "baa?" bubble and the caption "Bite wasted. The documentary crew looks away."
   - The leap pose still has boxy legs. The `human` and `ai` frames cover the HUD less than before.
4. **Looks like refs/01.jpg: 5.**
   - `sea` is 10% and reads as a flat blue band behind the pines.
   - No sand beach strip or grey cliffs show in the opening look, and no `clouds` are listed.
   - The pines are thinner on the left and right, but the picture is still mostly meadow.
5. **Solo is fun and fair: 5.**
   - The `SUSPICION` bar and captions are present, and `topSusp` is read back.
   - The 3 `clover` objects are 0.14% of the frame and hard to find.
   - The win and lose screens and restart are unchecked.
6. **Local 2-player: 5.**
   - M switches to "LOCAL 2-PLAYER". The HUD drops CLOVERS and shows the P1 and P2 key hints.
   - The wolf's `aim` and `reach` indicators were not seen, and the Enter pounce was not played.
7. **`window.__game`, no build step, ~100 sheep at 60fps: 6.**
   - `__game` works and `sheep*` is ×101.
   - `perf` reads 130.8 ms a frame, 119 ms of work, 29 draw calls and 99k triangles. The host load is 5.1 on 8 cores and the renderer is software, so the figure is partly noise.
   - The `hide` variants matched no names, so they were not run. The sheep and pines are named with an asterisk, so the real names are needed.
8. **Juice: 7.**
   - The captions are consistently funny.
   - The reveal cards and the wool burst show.
   - Sound events were not rechecked, and the grazing bob was not visible.
9. **Works at any window size, HUD readable: 6.**
   - `#hud` and `#mode` have 0 cut off.
   - `viewports` was not run.
10. **Faults: 6.**
    - There are no console errors, and no `Never visible` object.
    - The leap legs are boxy.
    - The sand beach, cliffs and clouds from refs/01.jpg are still missing.
    - The frame cost has not been explained.

**Next:**
1. Make the scenery match refs/01.jpg. This is the lowest score and it is asked for again from Judge 1 (asked again). Raise the camera's look-at slightly so the horizon and sea sit higher in the frame. Add a visible sand strip (#c5d6a2) where the meadow meets the `sea`, and a grey cliff face on the left or right. Pull the `clouds` inside the opening frustum, around y 25–35 and z -60 or nearer. A plain `look` then lists `clouds` with a share above 1%. `sample` at the shore row shows sand rather than green.
2. Explain the 130 ms frame (asked again). Use the real object names that `look` lists, such as `sheep`, `pines` and `tufts`, or hide by name with `perf` `code` variants. Expect the cost to be CPU per-sheep updates. Move the per-sheep matrix and skinning work to every 2nd frame or into one loop. One `perf` call with the variants should show the median dropping well under 60 ms with the sheep hidden.
3. Play the parts nobody has verified. Use `interact` with `state` set so the player stands on a `clover`, hold E to completion and check the `CLOVERS` count. Then set the round near 0:00 for the win screen, and run Local mode with Enter to pounce. At the same time make the wolf bigger at the opening (above 1.5% of the frame) and round the leap and shrug legs so the pose reads as a wolf.

SCORE: 6.0
