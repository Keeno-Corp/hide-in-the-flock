Both reveals now read. The wool is still a weak, grey-beige blob.

**Session 63 verdict.** I ran a five-cell `sheet` (start, `ai` at 55 and 95 frames, `human` at 100 and 130 frames) and ran `perf` once. I did not play the natural clover win, `KeyR` restart, 2-player mode or the tablet and phone sizes.

1. **Looks as LOOK.md says: 8.** The start cell shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134 and `round-trees*` ×15. The `clover` rings glow. Brightness is 64% with 0% blown out, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `ai` and on `human` both play through, and the `div#hud` is intact. The natural win, `KeyR` and local play are still unplayed.
3. **Clip moment: 8.**
   - **AI reveal:** the "AI SHEEP" title and "Bite wasted." subtitle are crisp. The "baa?" bubble sits by the `wolf`, and the frame brightness is 58%, so the wash is gone.
   - **Human reveal:** a big red "GOTCHA" title, "PLAYER 1 has been found." and the red PLAYER 1 `div#tag` are all legible at 100 frames.
   - **Wool burst:** the `wool` cloud is a small, grey-beige lump near the `wolf`'s legs. It does not read as a big white poof, so it is the weakest part of the clip.
   - **Leap:** at 55 frames the `wolf` is mid-leap, but I can't see the slow-mo or camera punch-in in a still.
4. **Looks like refs/01.jpg: 9.** The start view shows sea, sand, cliffs, pines, `cloud` shapes and the `wolf` on `wolf-rock`.
5. **Solo fun and fair: 8.** The suspicion bar, the clover rings and the captions are in place. A natural win has not been verified.
6. **Local 2-player: 7.** Not re-run, and a 2-player bite is unverified.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 150 ms frame is SwiftShader on a busy host, so it is no signal.
8. **Juice: 8.** The captions, the bubble, the `wolf` pose and the titles are in place. The wool burst is weak.
9. **Works at any window size, HUD readable: 8.** The desktop HUD is readable. The tablet and phone sizes were not re-checked.
10. **Faults: 8.** I saw no console errors and no "Never visible" object. The wool burst is underwhelming.

**Next:**
1. **Make the wool burst big and white (asked again).**
   - **Do:** in game.js, spawn 80 or more `wool` sprites with a pure white tint, a scale of 2–3 world units and an initial upward velocity. Emit from about 0.8 above the sheep, and fade only after about 1 s.
   - **Check:** `look` `sheet` with an `ai` cell at about 85 frames shows a white cloud covering a clear part of the `wolf`'s body. `sample` at the cloud shows RGB above about 230.
2. **Play the natural clover win and `KeyR` restart (asked again).**
   - **Do:** run `interact` to walk onto each `clover` and hold `KeyE` with `until:{result:"win"}`, then press `KeyR`.
   - **Check:** `result` becomes "win". After `KeyR`, `observe` shows `bites` 3 and `result` null.
3. **Verify local 2-player and the tablet size (asked again).**
   - **Do:** press `KeyM`, then press `Enter` near a sheep, and run `viewports` with tablet and phone on a reveal.
   - **Check:** the bites go 3→2, and the title and `div#hud` do not overlap at 820×1180.

SCORE: 8.0
