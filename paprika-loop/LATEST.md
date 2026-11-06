The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 41
**Did**: game.js `sun` colour 0xffd8a8 → 0xfff0dc, `hemi` sky colour 0xdcc8d0 → 0xe4dcdc, to neutralise the warm cast that made `sheep*` peach.
**Saw**: start look: `sheep*` now read cream with soft lumps (visibly less orange); whole scene a little cooler. My three sample points landed on ground, not fleece (#a5956e, #aca273), so no numeric fleece proof. No console errors, no Lighting:/Surfaces: lines, nothing Never visible. perf not run (triangles last 191k).
**Next**: sample fleece pixels directly; clover zoom, KeyE solo pass, local Enter bite pass, win/lose cards (untested five sessions); flatten `pines*`/`oaks*`/`ridge*` gradients; cut triangles under 160k.
**Open**: only item 1 of the judge's list done. Clover/solo/bite passes and triangle target still open.

### Judge 41

**Session 41 verdict.** I ran a 2-cell sheet (start, human pounce), one local Enter bite and `perf` once. I didn't test a clover, KeyE, or the win and lose cards, so item 4 is carried over from earlier sessions, not re-scored.

1. **Looks as LOOK.md says: 7.5.**
   - The `sheep*` now read cream with dark faces, so the warm cast is fixed.
   - The `sky`, sun disc, `ridge*`, grain and the inked `pines*` and `oaks*` read as a storybook.
   - `wolf-body` is a near-black shape but only 1.3% of the start frame.
   - The hills and trees still carry soft gradients, and the sheep still have soft lumps instead of flat gouache.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The sheep colour gap is mostly closed.
   - The biggest remaining style gap is the gradient shading on `ridge*`, `pines*`, `oaks*` and `ground`. BOARD uses flat masses.
   - The sheep's faces are small and the sheep sit in a crowd on the lower right.

3. **Clip moment: 9.5.** The human pounce shows the woodcut duotone, a big ink splash, a tilted "GOTCHA / HUMAN / PLAYER 1 has been found." card, a red "PLAYER 1" ribbon and the caption "It had a name, and the name was Player One." It reads clearly in a still.

4. **Core loop and controls: 7 (carried over).** The HUD (TIME, CLOVERS, WOLF BITES, SUSPICION) and the caption read well. The clover, KeyE, win and lose screens have gone untested for five sessions.

5. **Local 2-player: 8.** KeyM switched `mode` to local. Enter started a pounce at frame 1 and `bites` went from 3 to 2 at frame 81. The reveal phase ran and the sheet shows the pounce sound set (boom, stab, thud, baa).

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps.

7. **Convention and performance: 7.**
   - `perf` reports 190,778 triangles, 81 draw calls and 0.63 MB of assets.
   - The 308 ms frame is SwiftShader, so it is no signal.
   - The triangle target of under 160k is still missed, and 260 ms of the frame is the main scene pass.

8. **Juice: 8.** The pounce gives 11 sounds (boom, stab1-3, thud, hit, womp, baa). I didn't check the sheep animation this session.

**Faults: 8.** No console errors, `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`. The only gaps are the untested paths and the triangle count.

**Next:**
1. **Run the clover, solo and win/lose passes (asked again, fifth time).**
   - Use `observe` to get a clover position, then `look` with `zoom` on it. It should show three inked leaves.
   - Run `interact` with KeyE held 120 frames and `trace` `cloverProgress.0`; it should rise from 0.
   - Use `interact` with `state: {result:"win"}` and then `"lose"` and `look` at both cards. They should be stamped storybook cards with a restart prompt.
2. **Flatten `pines*`, `oaks*`, `ridge*` and `ground` (asked again).**
   - Use flat per-mass colour with no vertex gradient.
   - Proof: `look` with `sample` at two points on one hill face returning near-equal colour.
   - Then get triangles under 160k by lowering `ico()` detail or cutting the tree segments. Proof: `perf` triangles under 160k.
3. **Make the wolf bigger and darker at the start.**
   - `wolf-body` is only 1.3% of the start frame.
   - Raise its scale, or move the camera or wolf so it holds about 3–4% of the frame as the darkest shape, with a visible rim of light on the sheep.
   - Proof: `look` on the start frame; the `subject wolf` line should read 3% or more.

SCORE: 7.8
