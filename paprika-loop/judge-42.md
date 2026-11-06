**Session 42 verdict.** I ran a 3-cell sheet (start, win card, human pounce), `observe` and `perf` once. I didn't test a clover walk or KeyE this session, so item 4 is still not fully proven.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, `ridge*`, grain, inked `oaks*` and pines, and cream `sheep*` with dark faces read as a storybook.
   - The hills, trees and `ground` still have soft gradients, and the sheep are still soft lumps.
   - `wolf-body` is only 1.4% of the start frame, so the darkest shape is small.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The biggest remaining style gap is the gradient shading on `ridge*`, `oaks*` and `ground`. BOARD uses flat masses.
   - The wolf is a small silhouette beside a large crowd of `sheep*`.

3. **Clip moment: 9.5.** The human pounce shows the woodcut duotone, a big ink splash, a red "PLAYER 1" ribbon and the caption "It had a name, and the name was Player One." The subject reads 30% of the frame.

4. **Core loop and controls: 7.5.**
   - The win card is fixed. The "YOU BLENDED IN" title is now clear of the `#mode` panel, with "Three clovers. Three minutes. Zero bites. R to play again · M to switch mode".
   - The HUD reads well.
   - `cloverProgress` has still never been seen to rise.

5. **Local 2-player: 8.** This is carried over from session 41 and wasn't re-run. The Enter pounce and bite count worked then.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps. The win card is stamped and readable.

7. **Convention and performance: 7.**
   - `perf` reports 190,778 triangles, 81 draw calls and 0.63 MB of assets.
   - The 288 ms frame is SwiftShader, so it is no signal.
   - 254 ms of the frame is the main scene pass. The triangle target of under 160k is still missed.

8. **Juice: 8.** This is carried over; I didn't check sound or sheep animation this session.

**Faults: 8.** No console errors, `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`. The gaps are the triangle count and the clover path.

**Next:**
1. **Prove the clover (asked again, sixth time).**
   - Use `observe` or `eval` to read the clover world positions.
   - Run `interact` with `state: {player:{x,z}}` set on a clover, then KeyE held for 120 frames, with `trace` on `cloverProgress.0`. It should rise from 0 and `clovers` should become 1.
   - Then `look` with `zoom` on the clover to see three inked leaves.
2. **Flatten `ridge*`, `oaks*`, pines and `ground` (asked again).**
   - Use flat per-mass colour with no vertex gradient.
   - Proof: `look` with `sample` at two points on one hill face returns near-equal colour.
   - Cut triangles under 160k by lowering `ico()` detail or the tree segments. Proof: `perf` triangles under 160k.
3. **Make the wolf bigger and darker at the start (asked again).**
   - Raise the `wolf-body` scale or move the camera so it holds 3–4% of the frame as the darkest shape, with a light rim on the nearby sheep.
   - Proof: `look` on the start frame; the `subject wolf` line reads 3% or more.

SCORE: 7.8
