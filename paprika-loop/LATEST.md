The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 38
**Did**: game.js: sheep body/head, hull and rock/bush `ico()` detail 0/1 → 2 (smooth normals, rounder wool blobs); pine `cone()` segments 11 → 18.
**Saw**: sheet cell (300 frames, solo, KeyD): sheep read as softer cream blobs, no hard facets at overview; triangles 117k → 261k, 81 calls, no console errors. Plain `look` at frame 1/201 shows only the pink `#paper` overlay (paused clock), use `sheet` with frames to see the scene. Wolf legs/tail/rim and clover/solo/local-Enter passes NOT done.
**Next**: wolf silhouette (four legs, tail plume, rim) against `wolf-rock`; clover zoom + KeyE pass; local Enter bite pass; trim triangles (detail 2 on `shBody`/hull is wasteful, use detail 1 there).
**Open**: triangle count doubled; not perf-timed. Wolf still a flat dark mass.

### Judge 38

**Session 38 verdict.** I ran a 3-cell sheet (start, human pounce, AI pounce) and `perf` once. I did not zoom on the wolf, play solo, check a clover or run a local Enter bite, so none of those is re-scored from evidence.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, layered `ridge*` hills, inked `pines*` and `oaks*`, paper grain and cream `sheep*` read as a storybook at a glance.
   - The `sheep*` are now softer cream blobs, so the faceted-sheep fault from session 37 is mostly fixed.
   - Trees and the hill shading still look a little faceted and gradient-shaded rather than flat painted masses.
   - `wolf-body` is the darkest shape, but at the start it is 1.2% of the frame and still a flat slab with no legs, ear or tail showing.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - Biggest remaining style gap: the wolf silhouette. It has no readable head, ear, four legs or plume tail, and `wolf-leg` is nearly invisible.
   - Second gap: the 3D-lit hill gradients and tree shading, against the flat gouache of BOARD.

3. **Clip moment: 9.**
   - The human pounce gives "GOTCHA", a red "HUMAN" and a "PLAYER 1" stamp over a woodcut duotone with ink splatter.
   - The AI pounce gives "BAA? SHEEP", "Just a sheep. Bite lost." and a "baa?" bubble.
   - I did not time the card.

4. **Core loop and controls: 7.** The HUD and caption are clear. I did not test the clover patches or the win/lose screens this session.

5. **Local 2-player: 7.5.** Unchanged from session 37. I did not test Enter through to a bite.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps. The caption "It had a name, and the name was Player One." is a storybook line.

7. **Convention and performance: 7.**
   - Triangles went from 117k to 261k and draw calls stay at 81, with 0.63 MB of assets and `window.__game` present.
   - The 305 ms frame is SwiftShader (host load 4.7), so it is not a signal.
   - The triangle count is high for little visible gain.

8. **Juice: 7.5.** I did not re-check sound or sheep animation this session.

**Faults: 7.5.**
- No console errors, `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`.
- `wolf-leg` is effectively invisible.
- Triangle count doubled in the last iteration.
- The clover and solo passes have now been skipped for two sessions.

**Next:**
1. **Make the wolf silhouette readable (asked again).**
   - Build `wolf-leg` as four separate dark legs.
   - Raise and separate `wolf-head` with a pointed ear and a snout notch.
   - Make `wolf-tail` a plume.
   - Add a thin warm rim on the top edge against `wolf-rock`.
   - Proof: `look` with `zoom` [450,560,920,720] at the start. It should show four legs, a tail and an ear, and `wolf-leg` should be over 0.05% of the picture in the On screen list.
2. **Flatten trees and hills, and trim triangles.**
   - Go back to detail 1 on the `shBody`/hull `ico()` calls: the sheep already read soft, so this recovers about half of the +144k triangles.
   - Give `pines*`, `oaks*` and the `ridge*` hills flat per-mass colour with a single ink edge, removing the gradient and per-vertex jitter.
   - Proof: `perf` triangles back under about 160k, and a `look` zoom on a pine and oak cluster showing flat masses.
3. **Run the clover and solo passes (asked again).**
   - Get a clover position from `observe`, then `look` with `zoom` on it. It should show three inked heart leaves and a glow ring.
   - Run a solo `interact` of KeyE on the clover for about 120 frames, and confirm the progress state rises.
   - Run a local `interact` of Enter near a sheep, and confirm the bite resolves and bites drop from 3 to 2.
   - Make the `aim` ring thinner and cream or ink.

SCORE: 7.5
