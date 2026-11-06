**Judge 15**

I took a 3-cell `look` sheet (start, AI pounce, human pounce), one `interact` with `look` after `KeyM`, and `perf`. There were no console errors and no `Lighting:` or `Surfaces:` lines. I did not exercise the clover patches or the sound, and I did not play the stamp cards this session.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, `ridge*`, `pines*`, `oaks*`, `*-ink` outlines, grain and dusk palette read as storybook.
   - `ground-ink` is now visible as thin contour lines on the grass bands, but it is only 0.43% of the frame and faint.
   - The `sheep` wool is still faceted light and dark blobs, which reads as 3D rather than flat gouache.
   - The `pines*` and `round-trees*` are still faceted cones and spheres with only a thin outline.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The start wolf is 4.2%, still above the 3.5% target.
   - The wolf is dark (24% brightness against 61% around it), but 0% of the frame is near black.
   - The biggest remaining style gap is the wool shading, then the faint ink edges.
3. **Clip moment: 8.5.**
   - The pounce leap over the flock reads in the AI cell.
   - The wolf is 3.1% in the AI cell and 2.2% in the human cell, so the camera is still too far back.
   - I did not re-check the card cell, because the sheet frames ended before the stamp.
4. **Core loop and controls: 7.5.**
   - The HUD, toast and mode panel are readable.
   - The clover patches were not exercised.
5. **Local 2-player: 7.5.**
   - `KeyM` switches to "LOCAL 2-PLAYER". The `aimArrow` (red triangle) and the `reach` ring now show.
   - `aimLine` and `wolfRing` are "Never visible", hidden behind `sheep` and `sheep-heads`.
   - The wolf is 0.6% of the frame in local mode and mostly hidden by the flock. The wolf player cannot see their own wolf.
6. **UI typography: 8.5.**
   - `div#hud`, `div#mode` and `div#toast` are cream paper panels with ink borders and IM Fell type. Nothing is cut off or overlapping.
   - The `div#mode` text is small.
7. **Convention and performance: 7.**
   - `perf` gives 189k triangles, 56 draw calls and 0.63 MB of assets. The 446 ms frame is a software renderer, so it is no signal.
   - `window.__game` is present and the sheep are instanced.
8. **Juice: 7.5.** I carried this over from judge 14 and did not re-measure it.

**Faults: 8.** There were no console errors or fault lines. `aimLine` and `wolfRing` are hidden behind the flock in local mode, and the `ground-ink` lines are faint.

**Next:**
1. **Flatten the wool shading (asked again, 3rd time).**
   - Give the `sheep` and `sheep-heads` a 2-step cream and ochre toon ramp, with no specular and no per-facet shading.
   - Make the `sheep-ink*` outline a little thicker.
   - The one call that shows it done is `look` with `zoom` [330, 470, 800, 799] at frame 150. It should show flat cream blobs with an ochre shadow side and no faceted gradients.
2. **Make the wolf readable in local mode and pull the pounce camera back (asked again).**
   - In local mode, draw `wolfRing` and `aimLine` with depthTest off, or raise them above the flock.
   - Add a "P2 wolf" marker over `wolf-body`.
   - In the pounce, frame the wolf at 4% or more.
   - The one call that shows it done is `look` after `KeyM` and 30 frames. `wolfRing` and `aimLine` should leave the "Never visible" list and `wolf-body` should be 1.5% or more. A `look` `sheet` at the pounce cell should show `wolf-body` at 3.5% or more.
3. **Make the `ground-ink` bolder and flatten the tones (asked again).**
   - Widen the ribbons from 0.14 to about 0.25 and darken them.
   - Quantise the `ground` vertex colours to 3 flat tones, so the band edges read as painted shapes.
   - The one call that shows it done is `look` with `zoom` [0, 400, 640, 800] at frame 150. It should show inked band edges between flat tones, and `ground-ink` at 1% or more of the frame.

SCORE: 7.7
