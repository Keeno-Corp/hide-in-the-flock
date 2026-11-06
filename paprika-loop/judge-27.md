Session 27 verdict. I looked at one 4-cell sheet (start, 6 s, human bite, AI bite) and ran `perf`. I did not run `interact` or `feel`, and I did not check sound or other viewports. There were no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 8.**
   - The `sky` and sun disc, the `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` read as a storybook.
   - The wolf is the darkest shape on screen, but it is only 2% near black.
   - The `ground` still has hard yellow-to-green edges.
   - The tree faces are still faceted.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The wolf at scale 3.8 is still 6.1–6.4% of the frame. The start frame is dominated by a fat, boxy `wolf-body` with stiff block `wolf-leg`s, standing next to `wolf-rock`.
   - It is taller than the oaks, with a lumpy back and ragged `wolf-rim` edges. It is not the lean WOLF turnaround.
   - It is also the biggest style gap, and it does not look hidden or menacing.
   - The sheep flock is still a dense cream clump, though a few faces are readable now.
3. **Clip moment: 8.5.**
   - The human bite shows ink splash, red leaf splatters, a "PLAYER 1" stamp, a woodcut duotone and a storybook caption.
   - The AI bite shows a "baa?" bubble and the caption "He bit, he chewed on his pride, he sulked."
   - In the AI bite cell the "SHEEP" stamp isn't visible at frame 90. The cell is nearly all black.
   - The human cell has no visible "HUMAN" or "GOTCHA" text in the cell at frame 90.
   - I only sampled one frame of each, so the card may land later.
4. **Core loop and controls: 7.5.**
   - I carried this over without playing.
   - The HUD shows the timer, bite pips, clover counters and suspicion bar.
   - The `clover` patches are still not storybook-drawn.
   - The HUD key hints are very small.
5. **Local 2-player: 7.**
   - I carried this over without playing. The wolf's silhouette is clear.
6. **UI typography: 8.5.**
   - The IM Fell panels and Alfa Slab stamps on cream have ink borders, and the caption is a storybook line.
   - The HUD text is tiny.
7. **Convention and performance: 7.5.**
   - 159,258 triangles (down from 195,618), 74 draw calls, 0.63 MB of assets.
   - `window.__game` is present.
   - The 259 ms frame is SwiftShader (host load 5.0), so it is not a signal.
8. **Juice: 7.5.**
   - The pounce and bite visuals and the stamps work.
   - I did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The wolf rim loops and lumpy back are untouched.
- The clover patches are unfinished.
- The triangle count is still above the ~120k asked for.

**Next:**
1. **Replace the wolf with a lean, hand-shaped silhouette (asked again).**
   - Set the root scale to about 2.5 so it is clearly smaller than the oaks.
   - Rebuild `wolf-body` as one extruded profile polygon (long snout, sharp ears, slim legs, a thin tail) in place of the blocky parts. Drop the per-part `wolf-rim`, and draw a single inverted-hull outline around the whole shape.
   - The one call that shows it done is `look` with `zoom` [100, 130, 450, 330]. It should show a slim pointed profile with its outline hugging the shape, and `subject wolf` should be about 3% or less.
2. **Make the clover patches findable and storybook-drawn (asked again).**
   - Draw each `clover` as an inked patch with a three-leaf motif larger than a sheep's foot, with a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position, such as the two green rings near the lower-left flock. It should show inked leaf shapes.
3. **Cut the triangles to about 120k (asked again).**
   - Drop `round-trees-ink` and `sheep-heads-ink` (10k each), and lower the `bushes`, `walls` and `rocks` detail.
   - The one call that shows it done is `perf` with `costs`. It should read about 120k or less, with the flock silhouette unchanged in a `look`.

SCORE: 7.6
