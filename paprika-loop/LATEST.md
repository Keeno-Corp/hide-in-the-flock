The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 48

**Session 48 verdict.** I ran the sheet (human reveal, AI reveal, start) at desktop size, the phone and tablet start views, and `perf` once. I did not play the natural clover win, 2-player mode, or the phone/tablet reveals.

1. **Looks as LOOK.md says: 8.** The start moment shows `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×141, `round-trees*` and clover rings. No `Lighting:` or `Surfaces:` lines appeared. Brightness is 64% and 0% is blown out.
2. **Plays as DESIGN.md says: 8.** Forced `pounce` on `human` and `ai` both reach their reveals. The `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION. The natural win has gone unplayed for many sessions.
3. **Clip moment: 9.**
   - **Human reveal:** the red GOTCHA title, "PLAYER 1 has been found." and the red PLAYER 1 `div#tag` over the red figure all sit inside the frame. The new `camShake.kick(1.6)` does not push `div#tag` out at frame 110.
   - **AI reveal:** AI SHEEP, "Just a sheep. Bite wasted." and the "baa?" bubble over the grey `wolf` all sit inside the frame.
4. **Looks like refs/01.jpg: 9.** The start view and the tablet view show sea, sand, cliffs, pines, puffy clouds and the `wolf` on its rock. The phone view crops the pines and cliff because it is a narrow portrait frame.
5. **Solo fun and fair: 8.** The suspicion bar, clover rings and bite lights are present. The win screen is still unseen.
6. **Local 2-player: 8.** Carried over from earlier sessions; I did not re-run it.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls and 103k triangles. The 137 ms frame time is a SwiftShader artefact, so it is no signal.
8. **Juice: 9.** The captions and the "baa?" bubble are in place. I did not check sound this session.
9. **Works at any window size, HUD readable: 7.**
   - **Phone and tablet starts:** the HUD is readable and sits inside the frame on both. The phone mode-help is pushed to the bottom.
   - **Still unchecked:** the reveal titles on phone and tablet.
   - **Still small:** the desktop HUD text is tiny.
10. **Faults: 9.** I saw no console errors and no "Never visible" object.

**Next:**
1. **Check the reveals on phone (asked again).**
   - **Do:** run `interact` with `{resize:[390,844]}`, `{action:"pounce",target:"human"}` and `{wait:110}`, with `look:true`. Repeat with `target:"ai"`.
   - **Check:** the GOTCHA and AI SHEEP titles, the sub line and `div#tag` sit inside 390 px. If a title overflows, size it with `min(vw,vh)`.
2. **Verify the natural clover win and restart (asked again).**
   - **Do:** walk the player to each `clover` and hold `KeyE`, then run `interact` with `until:{result:"win"}`.
   - **Check:** the win screen shows a sensible timer. After `KeyR`, `wolf.bites` is 3.
3. **Add beyond-brief polish to the AI reveal.**
   - **Do:** give the `wolf` a bigger shrug and a rim light, with a stronger `wool` burst.
   - **Check:** a `sheet` of the `ai` pounce at 110 frames shows a visibly larger shrug.

SCORE: 8.3

## Iteration 49
**Did**: No code changes. Checked judge Next 1: phone reveals at 390x844.
**Saw**: Human pounce at 110 frames: GOTCHA title, sub line `div#reveal` and `div#tag` PLAYER 1 all sit inside 390 px (reveal box reads -4..393 only from the title tilt; picture shows nothing clipped). AI pounce: AI SHEEP title, sub line, "baa?" `div#bubble` all inside. No console errors, no Never visible. Brightness 62-65%. No perf run.
**Next**: (1) Natural clover win: walk to each `clover`, hold KeyE, `until:{result:"win"}`, then KeyR and check `wolf.bites` 3. (2) Bigger wolf shrug and rim light in the AI reveal. (3) Larger desktop HUD text.
**Open**: Natural win, 2-player and tablet reveals still unchecked.
