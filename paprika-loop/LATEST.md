The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 64

**Session 64 verdict.** I ran a three-cell `sheet` (start, `ai` at 85 frames, `human` at 100 frames). I also ran `viewports` for tablet and phone, `perf` once, and a local-mode `KeyM` then `Enter` step. I did not play the natural clover win or `KeyR` restart.

1. **Looks as LOOK.md says: 8.** The start cell shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134 and `round-trees*` ×15. The `clover` rings glow, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `ai` and on `human` both play through. Local mode toggles with `KeyM`, but the natural win and `KeyR` are still unplayed.
3. **Clip moment: 9.**
   - **AI reveal:** the "AI SHEEP" title, "Bite wasted." subtitle and "baa?" bubble are all legible. The `wool` is now a big cream-white cloud covering the sheep and part of the `wolf`.
   - **Human reveal:** the red "GOTCHA" title, "PLAYER 1 has been found." and the PLAYER 1 `div#tag` are legible, and the `wool` poof sits under the tag.
   - **Not seen:** I can't see the slow-mo or camera punch-in in a still.
4. **Looks like refs/01.jpg: 9.** Sea, sand, cliffs, pines, `cloud` shapes and the `wolf` on `wolf-rock` all show.
5. **Solo fun and fair: 8.** The suspicion bar, the clover rings and the captions are in place. A natural win is unverified.
6. **Local 2-player: 6.** After `KeyM`, `wolf.state` is "ctrl" and the wolf sits at (-8, -6). `Enter` with no sheep in range did not change `bites`, and I got no pounce or feedback from it. I have not seen a 2-player bite.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 288 ms frame is SwiftShader on a busy host (load 6.2), so it is no signal.
8. **Juice: 8.** The wool burst now reads, and the captions, bubble and titles are in place. Sound shows wind and baa starting.
9. **Works at any window size, HUD readable: 7.**
   - **Tablet 820×1180:** `div#hud` is readable, but the bottom caption is not visible.
   - **Phone 390×844:** the `div#hud` panel is readable. The canvas is letterboxed to about 270 px wide, so the picture is small, and the phone cell is cropped by the grid.
   - **Not seen:** a reveal title at these sizes.
10. **Faults: 8.** I saw no console errors and no "Never visible" object.

**Next:**
1. **Verify the local 2-player bite (asked again).**
   - **Do:** `interact` with `KeyM`, then walk the wolf with the arrow keys to a sheep and press `Enter`. If no pounce fires, add feedback such as a "no target" nudge or a visible target ring on the nearest sheep.
   - **Check:** `observe` shows `bites` going 3→2, and the reveal title plays.
2. **Play the natural clover win and `KeyR` restart (asked again).**
   - **Do:** walk onto each `clover` and hold `KeyE` with `until:{result:"win"}`, then press `KeyR`.
   - **Check:** `result` becomes "win". After `KeyR`, `observe` shows `bites` 3 and `result` null.
3. **Check a reveal on tablet and phone.**
   - **Do:** `look` `sheet` with a `state.viewport` or `resize` step, then `pounce` `ai`, at 390×844 and 820×1180.
   - **Check:** the title is not covered by the `wool` cloud, and it does not overlap `div#hud`. Also fix the phone canvas, which should fill the width instead of leaving black bars.

SCORE: 7.9

## Iteration 66
**Did**: Played the natural clover win in solo (setState t=200, player on each `clover`, hold `KeyE`; wolf pounce mid-way paused T until it ended): `result` null→"win", title "YOU BLENDED IN" legible. `KeyR` after: `result` null, `bites` 3, `clovers` 0. Checked reveal at 390×844 via `resize`: title/sub/bubble/`div#cap` visible, no overlaps, but `div#reveal` was 4px cut off at the edges; `#rbig` phone size 17vw→15vw in index.html.
**Saw**: Win look: brightness 59%, 0% blown out, `div#reveal` overlaps `div#hud` bounds only in the box, not the text; no console errors; no Never-visible objects. Phone canvas fills 390×844 (no letterbox; the judge's cell was the sheet).
**Next**: (1) Reveal at 820×1180 (not checked). (2) Win-screen `div#hud` TIME reads 0:00 after win (countdown shown, maybe show "3:00" or hold final time). (3) More polish/depth in flock behaviour.
**Open**: Tablet reveal unverified; the 15vw change not re-looked.
