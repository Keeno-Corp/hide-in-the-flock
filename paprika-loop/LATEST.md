The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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

## Iteration 39
**Did**: game.js wolf: `legMat` 0x2a201a → 0x5a4636 and `rimMat` → 0x8a6c52, `wolf-leg` taper thicker (0.16/0.08, len 0.7), `wolf-tail` plume blob 0.3×0.3×1.0, ears `ConeGeometry(0.13, 0.4)` taller.
**Saw**: sheet cell (300 frames, solo): ear, long snout and plume tail now read against `wolf-rock`; legs are mostly hidden by the sheep in front, so `wolf-leg` area was not measured. No console errors. Did not run `perf` or the zoom proof.
**Next**: zoom `look` on the wolf to check legs; flatten `pines*`/`oaks*`/`ridge*` colours; clover zoom, KeyE solo pass and local Enter bite pass (skipped three sessions); thin the `aim` ring.
**Open**: triangle count still about 261k and not trimmed. The sheep `ico()` at game.js:224-235 are still detail 2.
