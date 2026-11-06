**Session 68 verdict.** I forced a human pounce and an AI pounce, a forced win, a local bite (`KeyM`, `ArrowDown` ×60, `Enter`, wait) and ran `perf` once. I did not take a tablet `#cap` look or run a win-state time check. The `#cap` pill did show in the desktop captures.

1. **Looks as LOOK.md says: 9.** `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×141, `round-trees*` and `cloud` are all on screen in the win-state look. There are no `Lighting:` or `Surfaces:` lines. The sheep are still a fairly uniform white mass.
2. **Plays as DESIGN.md says: 8.** The `KeyM` toggle works. In local mode `Enter` now resolves: `wolf.state` went watch → ctrl → pounce, with `pounce.ph` leap → reveal and `bites` 3→2. The 60-frame walk before `Enter` is still needed, because the wolf starts at its rock, far from every sheep.
3. **Clip moment: 9.** The human reveal shows "HUMAN!" with a huge red "GOTCHA", the "PLAYER 1 has been found." line, the PLAYER 1 `div#tag`, the wool burst and a caption. The AI reveal shows "BITE WASTED" and "AI SHEEP", with "Just a sheep. Bite wasted.", a "baa?" bubble and the wolf shrug. Both read at a glance, and the pounce sting sounds (boom, stab1–3, thud) fired.
4. **Looks like refs/01.jpg: 9.** Sea, sand, grey `cliff`, `pines*`, puffy `cloud`s and `wolf-rock` all show from the play camera. The win-state look shows the whole island.
5. **Solo fun and fair: 8.** `div#hud` shows TIME, CLOVERS, WOLF BITES and the SUSPICION bar. The win screen "YOU BLENDED IN" gives its restart and mode keys. The win-screen time is unverified: the forced win shows TIME 3:00 with Three minutes in the subtitle. That is the forced state, not a real play.
6. **Local 2-player: 8.** The bite resolves, and the `reach` ring and `aim` dimming now give feedback. I did not look at the ring colours this session, and there is still no on-screen hint that the wolf must walk to the flock first.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 157 ms frame is SwiftShader on a host with load 3.5, so it is not a signal.
8. **Juice: 8.** Sounds fired (boom, stab, thud, womp, baa, wind), and the wool burst, the caption voice ("The wolf reconsiders his life choices.") and the sheep heads are in place.
9. **Works at any window size, HUD readable: 8.** At 1280×800 `div#hud`, `div#mode`, `div#cap` and `div#tag` do not overlap or get cut off. I did not check phone or tablet this session.
10. **Faults: 8.** No console errors and no "Never visible" object. The 157 ms frame is a software-renderer reading and not a fault.

**Next:**
1. **Flock depth and variety.**
   - **Do:** vary the `sheep*` instance scale and wool tint (cream, grey, a few with dark patches), and spread them into loose clusters so the meadow stops reading as one white mass.
   - **Check:** a `look` of the win-state camera shows varied silhouettes and colours in the flock.
2. **Local-mode onboarding for the wolf player.**
   - **Do:** add a line in `div#mode` or a toast at the start of local mode such as "Walk to the flock, aim with arrows, Enter to pounce". Optionally start the local wolf closer to the flock.
   - **Check:** an `interact` of `KeyM` plus `look` shows the hint on screen, and `Enter` after a short walk still takes `bites` 3→2.
3. **Verify the small-screen `#cap` and the real win time.**
   - **Do:** play a real win to confirm `#time` freezes, using `until` on `result` with a high timescale. Then `look` with `viewports` ["phone", "tablet"] during a reveal.
   - **Check:** the win `look` shows a TIME that matches the elapsed time and does not keep changing. The tablet and phone looks show a centred, legible `#cap` pill that stays inside the viewport.

SCORE: 8.3
