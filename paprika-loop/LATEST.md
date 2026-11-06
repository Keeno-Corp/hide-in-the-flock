The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 50

**Session 50 verdict.** I opened the page, ran a `sheet` of start, AI reveal and human reveal at desktop size, ran the human reveal at 390×844, and ran `perf` once. I did not play the natural clover win, 2-player mode or the tablet reveals.

1. **Looks as LOOK.md says: 8.** The start moment shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134, `round-trees*` and the clover rings. Brightness is 64% with 0% blown out. No `Lighting:` or `Surfaces:` lines appeared.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `human` and on `ai` both reach their reveals. The `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION. The natural win has still not been played.
3. **Clip moment: 9.**
   - **Human reveal:** the red GOTCHA title, "PLAYER 1 has been found." and the red `div#tag` over the red figure all sit inside the frame.
   - **AI reveal:** the AI SHEEP title, "Just a sheep. Bite wasted." and the "baa?" `div#bubble` over the grey `wolf` all sit inside the frame.
   - **Phone human reveal:** at 390 px the title and `div#tag` fit. `div#reveal` [-4,142,393,273] is cut off by the screen edge only through its padded box, and the text itself is fully visible.
4. **Looks like refs/01.jpg: 9.** The start view shows sea, sand, cliffs, pines, puffy `cloud` shapes and the `wolf` on `wolf-rock`.
5. **Solo fun and fair: 8.** The suspicion bar, clover rings and bite lights are present. The win screen is unseen.
6. **Local 2-player: 8.** Carried over; I did not re-run it.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls and 103k triangles. The 134 ms frame is a SwiftShader artefact, so it is no signal.
8. **Juice: 9.** The reveal pounce fired 10 sounds (boom, stab1–3, thud, hit). The captions and the "baa?" bubble are in place.
9. **Works at any window size, HUD readable: 8.**
   - **Phone:** the larger HUD at 390 px is readable and fits inside [6,6,231,133].
   - **Cramped:** the HUD covers the top-left of the phone frame, and `div#mode` crowds the caption at the bottom.
   - **Unchecked:** the tablet reveals.
10. **Faults: 9.** I saw no console errors and no "Never visible" object.

**Next:**
1. **Verify the natural clover win and restart (asked again).**
   - **Do:** run `interact` to walk the player onto each `clover`, hold `KeyE`, then use `until:{result:"win"}`.
   - **Check:** the win screen shows a sensible timer. After `KeyR`, `wolf.bites` is 3 and the screen is back to play.
2. **Add the rim light and a stronger `wool` burst to the AI reveal.**
   - **Do:** give the `wolf` a rim light and enlarge the `wool` burst for `target:"ai"`.
   - **Check:** the `sheet` `ai` cell at 110 frames shows a visible rim on the grey `wolf` and more wool.
3. **Check 2-player and the tablet.**
   - **Do:** run `interact` with `KeyM`, then wolf moves and `Enter`, and look at the 3 bites. Run a tablet-size (820×1180) human reveal in the same way.
   - **Check:** the aim ring is clear, the bites drop 3→2, and the reveal titles fit inside 820 px.

SCORE: 8.3

## Iteration 51
**Did**: No code changes. Played the natural clover win through `interact`: `setState` t=176 and the player onto each `clover`, then hold `KeyE` until `result == "win"`. Pressed `KeyR` afterwards.
**Saw**: The win fires at t=183.78 with clovers 3. The "YOU BLENDED IN" title, the "THE FLOCK WINS" kicker and the caption all fit at 1280x800. Brightness 58%, 0% blown out, no console errors, no "Never visible" object. The HUD TIME reads 0:00 on the win screen, which is right because it counts down from 3:00. After `KeyR`: result null, bites 3, clovers 0, mode solo. The `rim` PointLight already exists in game.js (intensity 90 × `cam.close`), so the Next item "add a rim light" is not new work. No perf run.
**Next**: (1) Check 2-player (`KeyM`, wolf moves, `Enter`: bites 3→2, aim ring clear). (2) Run the tablet (820x1180) human reveal and see if the titles fit. (3) If the `wool` burst in the AI reveal looks thin in a `sheet`, enlarge it near game.js:544.
**Open**: 2-player and tablet reveals are still unchecked. The score has been 8.3 for several sessions, so small tweaks are not moving it. A visible change is needed, such as the AI reveal or more depth in the wolf's stalking.
