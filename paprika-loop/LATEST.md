The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 25

**Judge verdict, session 25**

1. **Looks as LOOK.md says: 8.**
   - The reveal frame shows the sea, `cliff`, `sand`, `cloud` ×12, `wolf-rock`, `rocks*` and the `sheep*` flock.
   - Brightness is 60%, saturation 35–39%, and there are no `Lighting:` or `Surfaces:` lines.
   - Saturation is a little lower than last session's 45%.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings are on the meadow.
   - The pounce was forced with `act`. I did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human reveal:** "HUMAN!", a big red "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 `tag` read clearly.
   - **AI reveal:** "AI SHEEP", "Bite wasted.", the "baa?" bubble and the `wolf` shrug read. The `wolf` fills only about a quarter of the frame height at `ai150` on phone, where the target was about a third. Item 2 below was only partly met.
   - **Missing REPLAY beat:** at frame 260 the `human260` cell still shows the GOTCHA banner and the PLAYER 1 tag. There is no zoom-back or "REPLAY" beat.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, `cloud` and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.
   - `wolf-rock` and the crouched `wolf` are not clearly visible at phone size.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line and the win/lose screens are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 106 ms on SwiftShader (host load 5.0), so it is no frame-time signal.
   - It shows 50 draw calls, 100.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - 10 sounds start on the pounce (boom, stab1–3, thud, hit), and the wool burst shows.
   - The caption voice is funny.

9. **Works at any window size, HUD readable: 9.**
   - **Overlap fix:** at 390×844 `div#cap` [0, 762, 389, 779] now sits above `div#mode` [214, 797, 383, 835]. The "HTML over the canvas" line reports 0 overlap, so last verdict's Next item 3 is closed.
   - **Cut-off flag:** `div#reveal` is still reported cut off at [-8, 397], but its text is intact.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The `perf` figure is not a fault on this software renderer.
    - The only fault is the `div#reveal` cut-off by 8px on phone.

**Next:**
1. **Add the REPLAY beat (asked again).**
   - **Do:** after the reveal, hide `div#reveal`, ease the camera back to the play view, drop `aimLine`, and show a "REPLAY" tag.
   - **Check:** `look` `sheet` of `pounce human` at 260 frames. The banner should be gone and the "REPLAY" tag visible. The current cell still shows "GOTCHA".
2. **Make the AI shrug bigger (asked again).**
   - **Do:** raise the close-up factor again, from 0.5 to about 0.7 for an AI target. Alternatively scale the `wolf` up during the shrug and add a head-shake.
   - **Check:** `look` `sheet` cell `ai150` at 390×844. The `wolf` should span about a third of the frame height. It currently spans about a quarter.
3. **Play a full solo round.**
   - **Do:** playtest with real keys, from walking and grazing on a `clover` through suspicion rising to a pounce, then a win or lose screen and `KeyR`. Fix whatever feels unfair.
   - **Also:** fix the 8px `div#reveal` overflow on phone. Use `left:0; right:0` or `width:100vw`, and check that the "HTML over the canvas" line no longer says cut off.

SCORE: 8.2

## Iteration 26
**Did**: game.js reveal phase: `#reveal` banner fades out after p.t 2.0, a `#replayTag` ("▶ REPLAY", created in JS) shows from 2.1 until the reveal ends, `aimLine` hidden at 2.0; AI-target close-up factor in `updateCamera` 0.5 -> 0.7; human reveal scale 1.05 only above 640px (to stop the 8px phone overflow).
**Saw**: no tools run; `node --check game.js` passes.
**Next**: (1) `look` sheet `pounce human` at 260 for banner gone + REPLAY tag, `ai150` at 390x844 for wolf size, and check `div#reveal` no longer cut off; (2) the camera does not actually zoom back until p.t 2.0 only, check the ease reads as a replay; (3) full solo round with real keys.
**Open**: all changes unverified; page never opened this session.
