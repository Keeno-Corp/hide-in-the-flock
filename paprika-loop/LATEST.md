The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 44

**Session 44 verdict.** I looked at the AI and human reveals at desktop size and ran `perf` once. I did not check the phone or tablet reveals, the natural clover win, or 2-player mode.

1. **Looks as LOOK.md says: 8.** The sheet shows `sea`, `sand`, `cliff`, `wolf-rock`, `sheep*`, `round-trees*` and `clover ×5`. It lists no `Lighting:` or `Surfaces:` lines. Brightness is 57–61% and 0–1% is blown out.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `ai` and `human` both reach their reveal screens. The `div#hud` shows the TIME, CLOVERS, WOLF BITES and SUSPICION rows. I did not replay the natural clover win.
3. **Clip moment: 9.**
   - **AI reveal:** it shows "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble and the grey `wolf`. This session's change is visible: the sheep around the `wolf` are cleared, so it stands alone and readable. The "baa?" bubble sits clear of the sub line.
   - **Human reveal:** it shows the red "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 `div#tag` over the red figure on `wolf-rock`. It reads at a glance.
4. **Looks like refs/01.jpg: 9.** Sea, cliffs, pines, rocks and a green low-poly meadow are all visible. The reveal cameras are close, so the beach and sky show less than in the opening view.
5. **Solo fun and fair: 8.** The suspicion bar, clover and bite lights are present. The win screen is still unseen.
6. **Local 2-player: 8.** Carried over from earlier sessions. I did not re-run it.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls and 103k triangles. The 137 ms frame time is a SwiftShader artefact (host load 4.4), so it is no signal.
8. **Juice: 9.** The documentary captions ("Mistaken identity. Nature is humbling.", "Even in nature, nobody blends in forever.") and the "baa?" bubble are in place. I did not check the sounds this session.
9. **Works at any window size, HUD readable: 7.** The `div#hud` panel and mode-help panel text is tiny at 1280 wide. The phone and tablet reveals have gone unchecked for three sessions.
10. **Faults: 9.** `perf` flagged no "Never visible" object and I saw no console errors.

**Next:**
1. **Check the reveals on phone and tablet (asked again).**
   - **Do:** run `look` with `viewports:["phone","tablet"]`, then `interact` with `{resize:[390,844]}` and `{action:"pounce",target:"human"}` plus 110 frames.
   - **Check:** the "GOTCHA" title and "AI SHEEP" title, `div#tag` and sub line sit inside the frame. If the title overflows, size it with `min(vw,vh)`. Also enlarge the HUD text with a `clamp()` on small screens.
2. **Verify the natural clover win and restart (asked again).**
   - **Do:** add `wolf.bites` and `clovers` to `observe()`. Walk the player to each `clover` and hold `KeyE`. Don't use the `setState` shortcut.
   - **Check:** `interact` with `until:{result:"win"}` shows the win screen with the timer reading sensibly. After `KeyR`, `wolf.bites` is 3.
3. **Add beyond-brief polish to the reveals.**
   - **Do:** give the `wolf` a brief rim light or a bigger shrug in the AI reveal. Add a slow zoom or camera shake on the human GOTCHA, and a confetti-style `wool` burst.
   - **Check:** `look` with `sheet` on both pounces after 100 frames. The AI reveal should show a visibly bigger `wolf` shrug, and the human reveal a stronger burst around `div#tag`.

SCORE: 8.3

## Iteration 48
**Did**: game.js:550 added `camShake.kick(1.6)` right before `showResult('GOTCHA'…)` so the human reveal has a stronger shake (judge Next 3, partial). Syntax-checked only.
**Saw**: Not viewed on screen this session; no perf run.
**Next**: (1) Look at the human pounce after 100 frames to check the shake doesn't push `div#tag` out of frame. (2) Natural clover win (needs eatenCount()>=3 && T>=180), then KeyR, wolf.bites 3. (3) Bigger wolf shrug in the AI reveal; recheck 2-player.
**Open**: Shake change unverified visually; natural win, tablet AI reveal, 2-player unchecked.
