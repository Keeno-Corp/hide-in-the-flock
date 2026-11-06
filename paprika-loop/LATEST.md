The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 72
**Did**: `index.html` phone media query: `#toast` now wraps (`white-space:normal`, `max-width:88vw`, 15px, centred) because on 390px the local-mode toast was clipped at both edges.
**Saw**: phone `look` sheet after `KeyM` before the fix: toast text cut ("k to the flock … Enter ("). After: two lines, fully inside the screen, above the `#mode` pill, no overlap with `#hud`. Phone human-pounce reveal (120 frames): "HUMAN! GOTCHA", "PLAYER 1 has been found." and `#cap` all fit in 390px, no overlap with `#hud`. No console errors. I did not run `perf`, a real win, or the wolf dash.
**Next**: (1) Real win with `until` result win and high timescale; check TIME freezes. (2) Wolf Shift dash for P2 plus a pounce-cooldown ring. (3) Measure the nearest sheep to the wolf after `KeyM`.
**Open**: the real win time is unverified for a fourth session.

### Judge 72

**Session 72 verdict.** I opened the page and forced an AI-sheep pounce, then waited at 4× timescale. The wolf's AI ate the standing player, so the run ended in `result` lose and I did not reach a win. I ran `perf` once. I did not retake the phone looks. I am relying on Iteration 72's report for the wrapped phone toast and the phone reveal. This is the fifth session the real win time is unverified.

1. **Looks as LOOK.md says: 9.** `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×134, `round-trees*` ×15, `cloud` ×44 and `rocks*` ×38 all show. There are no `Lighting:` or `Surfaces:` lines, and the `sheep*` ×101 are varied.
2. **Plays as DESIGN.md says: 8.** The state reaches `result` lose with `wolf.state` done and `wolf.pose` land, and `bites` falls to 2 after the AI pounce. The lose screen shows "EATEN", "R to play again" and "M to switch mode". The `player` state shows `susp` 2.23. I did not play a win.
3. **Clip moment: 9.** The forced pounce fired 42 sounds: boom, stab1–3, thud, hit, womp and baa. The HUD showed `WOLF BITES` at two red dots out of three, and the `div#tag` "PLAYER 1" sits over the player. The reveal reads clearly. I did not replay a clean human reveal this session.
4. **Looks like refs/01.jpg: 9.** `sea`, `sand`, `cliff`, `pines*` and puffy `cloud` all show from the play camera. The wolf sits crouched on `wolf-rock`.
5. **Solo fun and fair: 7.** `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION, and `clover` ×4 glow in the look. The lose screen works with restart. A standing player was eaten within about 25 s, which looks harsh. The win screen is still unseen, and "TIME" is unverified on it.
6. **Local 2-player: 8.** `wolfRing`, `aimArrow` and `aimLine` exist but are hidden in solo, as expected. Iteration 72's phone toast fix reports two wrapped lines with no overlap. I did not measure the wolf's distance to the nearest sheep after `KeyM`.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 148 ms frame is SwiftShader, which `perf` says is no budget signal. Host load was 2.9.
8. **Juice: 8.** The `sheep-heads*` ×88, `bubble`, the caption voice, the wool burst and the sound set are all present, and the wind and baa loops run.
9. **Any window size, HUD readable: 8.** On the desktop look, `div#hud`, `div#mode` and `div#tag` have 0 overlap and nothing is cut off. Iteration 72 reports the phone toast and phone reveal fit inside 390 px. I did not retake them.
10. **Faults: 9.** There are no console errors and no "Never visible" object. The `player` is not found by the ID image, which is expected for its own shader.

**Next:**
1. **Verify a real win and its frozen TIME.** (asked again)
   - **Do:** run `interact` with `{state:{...}}` or `eval` to put the three clovers' progress near done. A cleaner way is to set the wolf's bites to 3 and the player's `susp` to 0, then step with `until: {result:"win"}`.
   - **Check:** the state shows `result` win. Then 120 more frames leave `t` unchanged.
2. **Make solo's first minute fairer.** Add a visible suspicion warning, such as a wolf head-turn or "!" before it commits to a pounce. Give a standing, grazing player a longer grace period before the wolf's first pounce.
   - **Check:** `interact` holding E for 600 frames at 1× ends with `result` not lose, and `player.susp` stays below the pounce threshold.
3. **Add a wolf dash for P2 and a pounce-cooldown ring.** (asked again)
   - **Do:** give the local wolf a Shift dash with a cooldown, and show a ring fill on `wolfRing` when Enter is ready.
   - **Check:** after `KeyM`, `interact` with ArrowRight + ShiftRight for 30 frames moves `wolf.x` further than ArrowRight alone, and `look` shows the ring fill.

SCORE: 8.3
