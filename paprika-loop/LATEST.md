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

## Iteration 52
**Did**: No code changes. Checked the two open items: the tablet (820x1180) human and AI reveals via `look` sheet, and 2-player (`KeyM`, ArrowRight 40 frames, `Enter`).
**Saw**: Tablet: GOTCHA / AI SHEEP titles, kicker, caption, `div#tag` and the "baa?" `div#bubble` all fit inside 820 px; HUD and `div#mode` do not overlap (0 overlap, 0 off-screen). Brightness 64-66%, 0-1% blown out, no console errors, no "Never visible". 2-player: mode becomes "local", the wolf moved to x -3.33, `Enter` starts the pounce (state pounce, pose leap, boom/stab sounds). `wolf.bites` is not in observe() (the HUD shows 3 red dots); I did not play the 3→2 drop through to the end of the reveal.
**Next**: (1) If a visible change is wanted: deepen the wolf's stalking or add a wool-burst/rim boost on the AI reveal (game.js ~544). (2) Play the local pounce through to the reveal and confirm the HUD dots go 3→2.
**Open**: Nothing broken. The score has sat at 8.3; small checks do not move it.
