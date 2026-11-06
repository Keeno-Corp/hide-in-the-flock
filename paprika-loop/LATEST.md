The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 62
**Did**: `wool` (game.js:255): replaced the soft sprite with a solid-core 64px radial sprite (opaque to 70% radius), size 0.55→0.8, so puffs read as white against green. Burst timing unchanged (spawns at leap end, `u>=1`).
**Saw**: Not opened in the browser; `node --check game.js` only. Judge's 40-frame cell is mid-leap, before the burst spawns, so look at ~60–75 frames.
**Next**: (1) `look` `ai` cell at 65 frames to confirm the white cloud. (2) Natural clover win + `KeyR`. (3) 2-player bite and tablet 820×1180 reveal.
**Open**: `wool` change unseen; natural win, 2-player and tablet still unverified.

### Judge 62

**Session 62 verdict.** I opened the page, ran a four-cell `sheet` (start, `ai` at 65 frames, `ai` at 80 frames, `human` at 75 frames) and ran `perf` once. I did not play the natural clover win, 2-player mode or the phone and tablet sizes. The page was not opened in the browser last session.

1. **Looks as LOOK.md says: 8.** The start cell shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134 and `round-trees*` ×15. The three `clover` rings glow on the meadow. Brightness is 64% with 0% blown out, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `ai` and on `human` both play out. The `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION, and WOLF BITES went from 3 to 2 in the `ai80` cell. The natural win and `KeyR` restart are still unplayed.
3. **Clip moment: 7.**
   - **AI reveal:** the "baa?" `div#bubble` over the grey `wolf` and the caption "Mistaken identity. Nature is humbling." read. The AI SHEEP title is washed out. The whole frame is covered by a pale overlay at about 80% brightness, so the title is faint and the forest looks foggy.
   - **Wool burst:** it is still not visible. In `ai65` the `wolf` is mid-leap and I see no white cloud. In `ai80` and `human75` I see only a few small pale patches near the `wolf`. Iteration 62's solid-core sprite did not change that. The cause is probably spawn timing, spawn position, size or scale, not the sprite texture.
   - **Human reveal:** the `human75` cell shows no GOTCHA title or PLAYER 1 `div#tag` yet, only the caption "Observe: a sheep that jogs. Highly irregular." The reveal appears to come later than 75 frames.
4. **Looks like refs/01.jpg: 9.** The start view shows sea, sand, cliffs, pines, puffy `cloud` shapes and the `wolf` crouched on `wolf-rock`.
5. **Solo fun and fair: 8.** The suspicion bar, the clover rings and the captions are in place. A natural win has not been verified.
6. **Local 2-player: 7.** Carried over; not re-run, and a 2-player bite is still unverified.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 141 ms frame is SwiftShader, so it is no signal.
8. **Juice: 8.** The captions, the "baa?" `div#bubble` and the `wolf` leap pose are in place. The wool burst is not visible, and the AI reveal's white overlay reduces readability.
9. **Works at any window size, HUD readable: 8.** The desktop HUD is readable. The phone and tablet sizes were not re-checked.
10. **Faults: 8.** I saw no console errors and no "Never visible" object. The AI reveal's pale overlay washes out the scene and the title.

**Next:**
1. **Make the wool burst visible (asked again, third time).**
   - **Do:** in game.js, log or `eval` the `wool` particle count, positions and sizes at the moment of impact. Look for particles spawned off screen, with a tiny scale, or already faded. Spawn about 60 large sprites (scale 2–3 world units) at the `wolf`'s mouth or the target sheep's position when the leap lands. Use `depthTest` off, `sizeAttenuation` on, and a life of at least 1 s.
   - **Check:** `look` `sheet` with an `ai` cell at about 55 frames and `sample` at the `wolf`'s pixels should show white clumps against the green.
2. **Fix the AI-reveal overlay and the human-reveal timing.**
   - **Do:** make `div#reveal` background translucent only behind the title, not a full-frame pale wash at about 0.5 or more. Make the AI SHEEP title dark or saturated. Check when the GOTCHA title and PLAYER 1 `div#tag` appear after `pounce` on `human`.
   - **Check:** a `human` cell at about 100 frames shows the title and tag, and `ai80` keeps brightness under about 65% with the title legible.
3. **Play the natural clover win, the `KeyR` restart and local 2-player (asked again).**
   - **Do:** run `interact` to walk onto each of the 3 `clover` rings and hold `KeyE` with `until:{result:"win"}`, then press `KeyR`. Then press `KeyM` and play a wolf `Enter` bite. Run `viewports` at tablet size on the reveal.
   - **Check:** `result` becomes "win". After `KeyR`, `observe` shows `bites` 3 and `result` null. In local play the bites go 3→2, and `div#reveal` does not cover `div#hud`.

SCORE: 8.0
