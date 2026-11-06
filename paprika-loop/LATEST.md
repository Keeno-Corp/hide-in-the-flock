The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 61

**Session 61 verdict.** I opened the page, ran a four-cell `sheet` (start, `ai` at 40 frames, `ai` at 90 frames, `human` at 110 frames) and ran `perf` once. I did not play the natural clover win, 2-player mode or the phone and tablet sizes.

1. **Looks as LOOK.md says: 8.** The start cell shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×141 and `round-trees*`. The three `clover` rings glow on the meadow. Brightness is 63% with 0% blown out, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `ai` and on `human` both reach their reveals. The `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION. In the `ai90` cell the WOLF BITES dots went from 3 to 2. The natural win and `KeyR` restart are still unplayed.
3. **Clip moment: 8.**
   - **Human reveal:** the red GOTCHA title, "PLAYER 1 has been found." and the red PLAYER 1 `div#tag` over the red figure all read. Only a faint pale `wool` puff shows near the figure.
   - **AI reveal:** the AI SHEEP title, "Just a sheep. Bite wasted." and the "baa?" `div#bubble` over the grey `wolf` read well.
   - **Wool burst:** at 40 frames in `ai40` the `wolf` is mid-leap and no white cloud shows around it. At 90 frames in `ai90` I see only faint pale patches near the `wolf`'s feet. Iteration 61's bigger `wool` burst (200 particles, life 3.2) is not visible as a cloud.
4. **Looks like refs/01.jpg: 9.** The start view shows sea, sand, cliffs, pines, puffy `cloud` shapes and the `wolf` crouched on `wolf-rock`.
5. **Solo fun and fair: 8.** The suspicion bar, the clover rings and the captions ("Something about that sheep is... off.") are in place. A natural win has not been verified.
6. **Local 2-player: 7.** Carried over from earlier sessions; not re-run, and a 2-player bite is still unverified.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 137 ms frame is SwiftShader, so it is no signal.
8. **Juice: 9.** The captions, the "baa?" `div#bubble` and the reveal title styles are in place.
9. **Works at any window size, HUD readable: 8.** The desktop HUD is readable. The phone and tablet sizes were not re-checked.
10. **Faults: 9.** I saw no console errors and no "Never visible" object.

**Next:**
1. **Make the AI-reveal `wool` burst read (asked again).**
   - **Do:** the iteration 61 change is not visible. Check that the `wool` particles in the `ai` reveal are spawned at the `wolf`'s position, with additive or unlit white material, `depthWrite` off and a size large enough to show against the green. Spawn the burst at the moment of impact, around 25 to 35 frames.
   - **Check:** `look` `sheet` with an `ai` cell at 35 frames and `sample` at the `wolf`'s pixels should show white, not green or grey.
2. **Play the natural clover win and the `KeyR` restart (asked again since iteration 44).**
   - **Do:** run `interact` to walk the player onto each of the 3 `clover` rings and hold `KeyE` with `until:{result:"win"}`. Then press `KeyR`.
   - **Check:** `result` becomes "win", and after `KeyR` `observe` shows `bites` 3, `clovers` 0 and `result` null.
3. **Play local 2-player and check the reveal at tablet size.**
   - **Do:** run `interact` with `KeyM`, wolf moves, then `Enter`. Run the human reveal at 820×1180 with `viewports`.
   - **Check:** the WOLF BITES dots go 3→2, and `div#reveal` does not cover `div#hud`.

SCORE: 8.2

## Iteration 62
**Did**: `wool` (game.js:255): replaced the soft sprite with a solid-core 64px radial sprite (opaque to 70% radius), size 0.55→0.8, so puffs read as white against green. Burst timing unchanged (spawns at leap end, `u>=1`).
**Saw**: Not opened in the browser; `node --check game.js` only. Judge's 40-frame cell is mid-leap, before the burst spawns, so look at ~60–75 frames.
**Next**: (1) `look` `ai` cell at 65 frames to confirm the white cloud. (2) Natural clover win + `KeyR`. (3) 2-player bite and tablet 820×1180 reveal.
**Open**: `wool` change unseen; natural win, 2-player and tablet still unverified.
