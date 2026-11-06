The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 25
**Did**: game.js wolf build: `wolf-rim` pushed out 0.08 (was 0.05) and lightened to 0x8a7058; added `legMat` (0x2a201a) for the `wolf-leg` shafts so legs read lighter than the 0x030203 body; `rimMat` (ears, paws) lightened to 0x4a3a30.
**Saw**: `look` zoom [250,300,650,650]: the rim now clearly outlines the head, ears and body masses on `wolf-rock`, and legs show as separate brown shapes. No console errors. Wolf is still a heap on the rock, not a lean wolf in profile. `perf` not run.
**Next**: (1) pose the wolf off the rock or rotate the crouch so the snout and ears show in profile; (2) clover leaf motif and glow; (3) triangle cut: sheep use `ico(...,1)` per part, so lower the instance detail or drop `sheep-heads-ink`.
**Open**: triangle count (about 195k) and clover motif not done.

### Judge 25

Session 25 judge: I looked at one 3-cell sheet (start, human bite, AI bite), one zoom on the wolf, and ran `perf`. I didn't run `interact` or `feel`, and I didn't check sound or other viewports. There were no console errors and no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 8.**
   - The `sky` with its sun disc, the `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` read as a storybook.
   - The tree faces in the zoom are still faceted low-poly inside the ink outline.
   - The `ground` still has a hard yellow-to-green edge.
   - Only 1% of the start frame is near black, and that is the wolf.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The biggest style gap is still the wolf.
   - In the zoom, `wolf-body` is a black mass with `wolf-rim` loops (brown arcs) in front of `wolf-rock`.
   - The `wolf-leg` shards are crossing diagonals, with no head, snout, ears or four legs in profile.
   - It looks nothing like the lean WOLF turnaround.
   - The rim helps, but the wolf is a tangle.
3. **Clip moment: 8.5.**
   - The human bite shows a tilted "GOTCHA / HUMAN" card, a red "PLAYER 1" stamp, ink splash and woodcut duotone, with a storybook caption.
   - The AI bite shows "BÀA? / SHEEP" with a "baa!" bubble and "Bite lost."
   - Both read in 5 seconds.
4. **Core loop and controls: 7.5.**
   - I carry this over from the last judge, since I didn't play this session.
   - The HUD shows the timer, bites and clover counters.
   - The `clover` patches are still faint rings and hard to find, and have no leaf motif.
5. **Local 2-player: 7.**
   - I carry this over; I didn't check local mode this session.
   - The wolf is the same black heap, so pounce targeting depends on `wolfRing`.
6. **UI typography: 8.5.**
   - The IM Fell panels and Alfa Slab stamps on cream have ink borders, and nothing overlaps at 1280×800.
7. **Convention and performance: 7.**
   - 195,618 triangles (unchanged), 74 draw calls, 0.63 MB of assets.
   - The 295 ms frame is on SwiftShader, so it is not a signal.
   - `window.__game` is present.
   - The triangle count is high for flat painting.
8. **Juice: 7.5.**
   - The pounce and bite visuals and the stamps work.
   - I didn't hear the sound.

**Faults: 7.5.** There were no console errors. The wolf is unreadable, triangles are unchanged and the clover patches are unfinished. Nothing was added this iteration (Iteration 25 only changed the rim colours).

**Next:**
1. **Rebuild the wolf as a profile silhouette (asked again).**
   - The wolf is made in code from overlapping spheres, so first run `asset_search` for "wolf" or "dog standing low-poly" and see whether a GLB can be flattened to near-black.
   - If none fits, rebuild the code wolf with a flat lean body, a pointed snout, two upright triangle ears and a tail, with four separated legs.
   - Move it off `wolf-rock`, for example onto the ridge top beside the rock.
   - Draw one thick ink rim around the whole silhouette instead of per-part `wolf-rim` loops.
   - The one call that shows it done is `look` with `zoom` [250, 300, 650, 650]. It should show a snout, two ears and four legs in profile, with a visible gap between the legs.
2. **Make the clover patches findable and storybook-drawn (asked again).**
   - Draw each `clover` as an inked patch with a three-leaf motif larger than a sheep's foot, with a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position. It should show inked leaf shapes.
3. **Cut about 40% of the triangles.**
   - `sheep` and `sheep-heads` use `ico(...,1)` per part, so lower the detail or drop `sheep-heads-ink` and `round-trees-ink`.
   - Run `perf` with `variants` that hide those groups to see what each saves. The count should be about 120k or less, with the sheep silhouette unchanged.

SCORE: 7.7
