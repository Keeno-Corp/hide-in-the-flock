The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 37
**Did**: In `updateCamera` (game.js) the renderer `toneMappingExposure` now drops from 1.05 to 0.88 with `cam.close`, to cut the washed-out AI/human reveal frame. One line, syntax-checked only.
**Saw**: Not looked at: no `look` or `perf` run this session, so the grey and wolf-share numbers are unmeasured.
**Next**: (1) `look` after the AI pounce plus 150 frames: grey under 55%? wolf share above 6%? Nudge the camera if the wolf is behind wool. (2) Check the human pounce reveal reaches "reveal". (3) Check phone and tablet HUD sizes.
**Open**: The exposure change is unverified visually; revert it if the reveal looks dull.

### Judge 37

Session 37 verdict: the human reveal now works, and the exposure change from session 37 made the reveal frames less washed out. I opened the page and played the human reveal, the AI reveal, the opening look and `perf`. I did not play the clover win, the EATEN screen, the 2-player mode or phone and tablet sizes this session.

1. **Looks as LOOK.md says: 8.**
   - The opening look has `sky`, `sea`, `cliff`, `sand`, `wolf-rock`, `pines*` ×142 and `clover` ×11. It has no `Lighting:` or `Surfaces:` lines, and saturation is 44%.
   - The human reveal frame has grey at 48% (it was 65%) and saturation at 38%, so it is no longer washed out.
   - The AI reveal frame has saturation at 30%, and wool and the grey `wolf` still pull it towards grey.

2. **Plays as DESIGN.md says: 8.**
   - `{action:"pounce",target:"human"}` with `until:{"pounce.ph":"reveal"}` reached "reveal" at frame 109, with `pounce.human` true and `wolf.pose` "land".
   - `wolf.bites` was not read after the human pounce. The bite lights in `div#hud` still showed three on that frame.
   - The natural clover win, the EATEN screen and the restart were not replayed, for the fourth session in a row.

3. **Clip moment: 9.**
   - The human reveal shows the "HUMAN!" kicker, the huge "GOTCHA" title, the "PLAYER 1 has been found." sub line and the red `div#tag` "PLAYER 1" over the player.
   - The caption reads "Even in nature, nobody blends in forever".
   - 10 sounds played, among them `boom`, `stab1` to `stab3`, `thud` and `hit`.
   - The AI reveal shows "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", a "baa?" bubble and the caption "Mistaken identity. Nature is humbling."
   - In the AI reveal the `wolf` is still partly covered by `wool` at the bottom of the frame.

4. **Looks like refs/01.jpg: 9.**
   - The opening look shows the sea, sand strip, pine forests, grey `cliff` and `cloud`s, with the wolf on `wolf-rock`.
   - It is bright and low-poly.

5. **Solo fun and fair: 8.**
   - The suspicion bar, the three clover drops and the bite lights are all in `div#hud`, and the glowing clover patches are visible in the opening.
   - A full win and lose round was not replayed.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions; I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` and the `act` actions work, and the page starts playing on load.
   - `perf` gave 146 ms per frame, 82 draw calls and 103k triangles on a software renderer, with host load 1.7. The frame time is no signal.

8. **Juice: 9.**
   - Baas, stings, `boom`, `thud`, `hit` and the documentary caption voice all fire.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps, 0 off-screen and 0 cut off.
   - Phone and tablet sizes are unchecked.

10. **Faults: 9.**
    - There are no console errors and no "Never visible" objects.
    - The `perf` frame time is a software-renderer artefact.

**Next:**
1. **Run the full solo round (asked again).**
   - **Do:** walk to each `clover` and hold E, then let the wolf eat the player three times.
   - **Check:** `interact` with `until:{result:"win"}` shows the win screen. A forced human pounce should show the EATEN screen, and `{key:"KeyR"}` should reset `bites` to 3.
2. **Keep the wolf clear of wool in the AI reveal.**
   - **Do:** raise the camera target or push the punch-in so the `wolf` sits above the nearest sheep, or hide sheep within about 3 units of the wolf during "reveal".
   - **Check:** `look` after the AI pounce plus 60 frames. The `wolf` share should be above 6%, with no `wool` over its head.
3. **Check phone and tablet HUD sizes.**
   - **Do:** `look` with `viewports:["phone","tablet"]` during a reveal.
   - **Check:** `div#tag`, the title and `div#hud` should show 0 overlaps and 0 cut off. If the "GOTCHA" title overflows on the phone, scale it with `min(vw, vh)`.

SCORE: 8.4
