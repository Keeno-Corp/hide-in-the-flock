The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 26

Session 26 judge: I looked at one 5-cell sheet (start, 2.5 s, 6 s, human bite, AI bite) and ran `perf`. I did not run `interact` or `feel`, and I did not check sound or other viewports. The pink frame at 2.5 s that the builder reported did not show up: the 2.5 s and 6 s cells are normal frames. There were no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 8.**
   - The `sky` with its sun disc, the `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` read as a storybook.
   - The wolf is the darkest shape, but it is only 2% near black.
   - The tree faces are still faceted.
   - The `ground` still has a hard yellow-to-green edge.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The wolf now reads as a profile: `wolf-body` with a snout, two ears, four legs with gaps and a tail, standing on `wolf-rock`.
   - It is still the biggest style gap. It is oversized (about 6% of the frame, taller than the oaks), with a lumpy back and `wolf-rim` loops floating beside it. It is not the lean WOLF turnaround.
   - The sheep flock is a dense cream clump with no visible sheep silhouettes.
3. **Clip moment: 8.5.**
   - The human bite shows a tilted "GOTCHA / HUMAN" card, a red "PLAYER 1" stamp, ink splash and woodcut duotone, with a storybook caption.
   - The AI bite shows "BAA? / SHEEP", a "baa!" bubble and "Bite lost."
   - Both read in 5 seconds.
4. **Core loop and controls: 7.5.**
   - I carry this over, since I didn't play this session.
   - The HUD shows the timer, bites and clover counters.
   - The `clover` patches are still not storybook-drawn and are hard to find.
5. **Local 2-player: 7.**
   - I carry this over; I didn't check local mode.
   - The wolf is now readable, so targeting through `wolfRing` is clearer.
6. **UI typography: 8.5.**
   - The IM Fell panels and Alfa Slab stamps on cream have ink borders.
   - The HUD key-hint text is very small.
7. **Convention and performance: 7.**
   - 195,618 triangles (unchanged), 74 draw calls, 0.63 MB of assets.
   - The 271 ms frame is on SwiftShader, so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.**
   - The pounce and bite visuals and the stamps work.
   - I didn't hear the sound.

**Faults: 7.5.** There were no console errors. The wolf is oversized, the clover patches are unfinished and the triangle count is unchanged (so the cut asked for last time is still not done).

**Next:**
1. **Shrink and tidy the wolf (asked again).**
   - Cut the root scale from about 8.4 to about 4–5 so it is smaller than the oaks.
   - Smooth the lumpy back into one lean line, and replace the per-part `wolf-rim` loops with a single thick ink outline around the whole silhouette.
   - The one call that shows it done is `look` with `zoom` [200, 150, 700, 450]. It should show a lean profile with a pointed snout, ears and four legs, with the rim hugging the shape. Its share of the frame (`subject wolf`) should be about 3% or less.
2. **Make the clover patches findable and storybook-drawn (asked again).**
   - Draw each `clover` as an inked patch with a three-leaf motif larger than a sheep's foot, with a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position. It should show inked leaf shapes.
3. **Cut about 40% of the triangles (asked again).**
   - `sheep` and `sheep-heads` use `ico(...,1)` per part, so lower the detail or drop `sheep-heads-ink` and `round-trees-ink`.
   - Run `perf` with `variants` that hide those groups to see what each saves. The count should be about 120k or less, with the sheep silhouette unchanged.

SCORE: 7.7

## Iteration 27
**Did**: game.js: wolf watch scale 8.4 -> 3.8 (line ~856 `drawWolf`); small sheep parts (`ico(0.3/0.26/0.2,1)` in the sheep body geo) dropped to detail 0.
**Saw**: `look` sheet at frames 10/60 with scale 5: wolf 6.1-6.4% of the frame, profile intact, no console errors; `perf costs`: 159,258 triangles (was 195,618), 74 draws; scale 3.8 not re-looked. sheep 31k, round-trees 10k + ink 10k, sheep-shadow/ink 10k each.
**Next**: (1) re-look wolf at 3.8, replace per-part `wolf-rim` with one outline; (2) clover three-leaf inked motif + glow; (3) cut to ~120k: drop `round-trees-ink`/`sheep-heads-ink`, lower `bushes`/`walls`/`rocks` detail.
**Open**: wolf rim loops and lumpy back not touched; clover not done; `node --check` only, no replay after the 3.8 change.
