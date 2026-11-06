The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 39
**Did**: game.js wolf: `legMat` 0x2a201a → 0x5a4636 and `rimMat` → 0x8a6c52, `wolf-leg` taper thicker (0.16/0.08, len 0.7), `wolf-tail` plume blob 0.3×0.3×1.0, ears `ConeGeometry(0.13, 0.4)` taller.
**Saw**: sheet cell (300 frames, solo): ear, long snout and plume tail now read against `wolf-rock`; legs are mostly hidden by the sheep in front, so `wolf-leg` area was not measured. No console errors. Did not run `perf` or the zoom proof.
**Next**: zoom `look` on the wolf to check legs; flatten `pines*`/`oaks*`/`ridge*` colours; clover zoom, KeyE solo pass and local Enter bite pass (skipped three sessions); thin the `aim` ring.
**Open**: triangle count still about 261k and not trimmed. The sheep `ico()` at game.js:224-235 are still detail 2.

### Judge 39

**Session 39 verdict.** I ran a 3-cell sheet (start, human pounce, AI pounce), one zoom on the wolf and `perf` once. I did not play solo, check a clover or run a local Enter bite, so items 4 and 5 are not re-scored from evidence.

1. **Looks as LOOK.md says: 7.**
   - The `sky`, sun disc, layered `ridge*`, `pines*`, `oaks*` and grain read as a storybook at a glance.
   - The `sheep*` are peach-orange rather than cream, and they show faceted shading and gradients. They look like soft low-poly, not flat gouache.
   - Hills and trees are still gradient-shaded.
   - `wolf-body` is the darkest shape, but it is only 1.3% of the start frame.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - Biggest remaining style gap: the 3D-lit gradients and facets on `sheep*` and the hills, against BOARD's flat painted masses.
   - The wolf now shows an ear, a long snout and a tail. At the start it is still a small dark slab behind `wolf-rock`.

3. **Clip moment: 9.**
   - The human pounce gives GOTCHA, a red HUMAN, a PLAYER 1 stamp, a woodcut duotone and splatter.
   - The AI pounce gives BAA? SHEEP, "Just a sheep. Bite lost." and a "baa?" bubble.
   - I did not time the card.

4. **Core loop and controls: 7.** The HUD and caption are readable. I did not test the clover or the win and lose screens, and they have now gone unchecked for three sessions.

5. **Local 2-player: 7.5.** Unchanged and untested through to a bite.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps. The caption lines read as storybook.

7. **Convention and performance: 7.**
   - `perf` reports 261k triangles, 81 draw calls and 0.63 MB of assets, and `window.__game` is present.
   - The 540 ms frame is SwiftShader, so it is not a signal. The triangle count is still high for little visible gain.

8. **Juice: 7.5.** I did not re-check sound or animation this session.

**Faults: 7.5.**
- No console errors, `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`.
- The `wolf-leg` area is still unmeasured at the start, because sheep cover it.
- Triangles are unchanged at 261k.
- The solo and clover passes are still skipped.

**Next:**
1. **Flatten the `sheep*` and trim triangles (asked again).**
   - Drop the `ico()` detail from 2 to 1 at game.js:224-235.
   - Use flat cream with no per-face shading. The colour is currently peach: set the fleece to about 0xf0e6cc.
   - Keep only the single ink outline.
   - Proof: `perf` triangles under 160k, and a `look` zoom [450,560,920,720] showing flat cream masses with no facets.
2. **Flatten `pines*`, `oaks*` and `ridge*` (asked again).**
   - Use flat per-mass colour with no vertex gradient.
   - Proof: a `look` zoom on the left pines and oaks, with `sample` at two points on one hill face returning near-equal colour.
3. **Run the clover and solo passes (asked again, third time).**
   - Use `observe` for a clover position, then `look` with `zoom` on it. It should show three inked leaves.
   - Run an `interact` of KeyE on it for 120 frames and `trace` the progress state.
   - Run a local Enter pounce and confirm bites go from 3 to 2.
   - Thin the `aim` ring.

SCORE: 7.4
