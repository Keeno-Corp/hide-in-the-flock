The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 38

**Session 38 verdict.** The AI reveal and the EATEN screen both work. I did not replay the clover win, the 2-player mode or a phone reveal. The phone and tablet checks show only the opening, so the reveal HUD at those sizes is still unchecked.

1. **Looks as LOOK.md says: 8.**
   - The opening look has `sky`, `sea`, `cliff`, `sand`, `wolf-rock`, `pines*` ×134, `clover` ×11 and `cloud` ×42.
   - It has no `Lighting:` or `Surfaces:` lines, and no object is "Never visible".
   - On the AI reveal frame, grey is 42% and saturation 35%.

2. **Plays as DESIGN.md says: 8.**
   - `{action:"pounce",target:"ai"}` reached `pounce.ph` "reveal" at frame 79 with `bites` 2, `wolf.pose` "shrug" and `pounce.human` false.
   - A forced human pounce gave `result:"lose"` and the EATEN screen.
   - After the EATEN screen, the `div#hud` bite lights still showed three, which looks inconsistent with a loss. I did not read `wolf.bites` or press `KeyR`.
   - The natural clover win was not replayed, for the fifth session in a row.

3. **Clip moment: 9.**
   - The AI reveal shows "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" `div#bubble` and the caption "Mistaken identity. Nature is humbling."
   - The whole `wolf` shows from legs to ears (527–794 px wide, 4% share), with a few `wool` tufts across its legs.
   - The "AI SHEEP" title still covers the top of the wolf's head. The title and `div#bubble` stack over the wolf, which crowds the 5-second clip.
   - 9 sounds played, among them `boom`, `stab1` to `stab3`, `thud`, `hit` and `womp`.

4. **Looks like refs/01.jpg: 9.**
   - The sea, sand, pines, grey `cliff` and `cloud`s are all visible from the play camera, and the wolf is on `wolf-rock`.

5. **Solo fun and fair: 8.**
   - The suspicion bar, clover drops and bite lights are all in `div#hud`, and the glowing clover patches show.
   - The EATEN screen reads "The wolf got you · 0/3 clovers · R to play again · M to switch mode".

6. **Local 2-player: 8.**
   - Carried over from earlier sessions; I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` and the `act` actions work, and there are `sheep*` ×101 on screen.
   - `perf` gave 144 ms a frame, 82 draw calls and 103k triangles on a software renderer, so the frame time is no signal. Host load was 1.8.

8. **Juice: 9.**
   - Baas, wind, stings, `thud`, `womp` and the documentary caption voice all fire.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps, 0 off-screen and 0 cut off.
   - On the phone opening look, `div#hud` and the mode chip are readable and the chip sits at the bottom edge.
   - A reveal on phone or tablet was not checked.

10. **Faults: 9.**
    - There are no console errors, and the opening look has no "Never visible" objects.
    - The `perf` frame time is a software-renderer artefact.

**Next:**
1. **Check the reveal on phone (asked again).**
   - **Do:** run `look` with `sheet:[{state:{},steps:[{action:"pounce",target:"human"}],frames:150}]` at 390×844, using `interact` with `{resize:[390,844]}` first.
   - **Check:** the "GOTCHA" title, `div#tag`, the sub line and `div#hud` show 0 overlaps and 0 cut off. If the title overflows, size it with `min(vw, vh)`.
2. **Replay the natural clover win and the restart (asked again).**
   - **Do:** walk to each `clover` and hold `KeyE`, then press `KeyR` after the EATEN screen.
   - **Check:** `interact` with `until:{result:"win"}` shows the win screen. After `KeyR`, `wolf.bites` is 3. The `div#hud` bite lights match `wolf.bites` on the EATEN screen.
3. **Clear the wolf's head in the AI reveal.**
   - **Do:** lower the "AI SHEEP" title in `div#hud`'s layer or raise the camera lookAt a little, so the title no longer covers the wolf's ears.
   - **Check:** `look` after the AI pounce plus 60 frames. The `wolf` bbox top should sit below the title's bottom edge, and the `div#bubble` should not overlap the sub line.

SCORE: 8.4

## Iteration 39
**Did**: No code change. Checked the reveal HUD on phone (390x844) with `look` sheet: human pounce +150 and AI pounce +150.
**Saw**: "GOTCHA" and "AI SHEEP" titles fit the width, sub line, `div#hud`, tag ("PLAYER 1") and mode chip all readable, no overlap or cut-off seen. AI reveal: bubble "baa?" over the wolf, title above it, 2 of 3 bite lights lit. Grey/saturation 30-32%. No console errors. `perf` not run.
**Next**: (1) Replay natural clover win + KeyR (`wolf.bites` back to 3; bite lights match `wolf.bites` on EATEN). (2) Nudge AI reveal lookAt drop so title clears wolf ears at desktop size. (3) Tablet reveal check.
**Open**: Win/EATEN+restart still unreplayed; tablet reveal unchecked.
