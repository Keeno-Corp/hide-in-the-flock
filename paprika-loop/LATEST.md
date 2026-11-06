The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 22

The sheet is back and the phone reveal fits the width. I'm writing the verdict now.

**Judge verdict, session 22**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human cell:** "GOTCHA", "HUMAN!", the red PLAYER 1 tag and the red silhouette read big. The `wolf` lies flat and dark beside it.
   - **AI cell:** "AI SHEEP", "Bite wasted." and the "baa?" bubble are readable. The `wolf` is a small grey shape under the bubble, so the shrug is weak.
   - **Pink wash:** it is gone.
   - **Not checked:** the sheep pop and the end of the reveal, so there is no `REPLAY` beat yet.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the wolf sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the win/lose screens and the caption line are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 117 ms on SwiftShader (host load 4.6), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, caption line and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - **Phone play view:** the HUD and the "[M] Mode: SOLO" hint are larger and readable at 390 px.
   - **Phone reveal:** "GOTCHA" and the PLAYER 1 tag fit the width, but the sub-line "PLAYER 1 has been found." and the caption are tiny.
   - **Phone reveal framing:** the reveal sits in a small band with a lot of black above and below.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - A pale vertical band remains at the left of the human cells. It is probably a `rocks*` boulder under the reveal overlay.

**Next:**
1. **Phone reveal framing and small text.**
   - Make the reveal banner sub-line and caption at least 12 px, using `clamp()` or `vw`, at widths under 500 px.
   - Fill the phone screen more, with a larger letterbox-free crop or a taller GOTCHA.
   - Check with `look` `sheet` of `pounce human` at 150 frames with `resize: [390, 844]`. The sub-line should be readable and the black bars should be smaller.
2. **Check the sheep pop and add a "REPLAY" beat (asked again).**
   - Run `interact` `pounce human` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check by `look` `sheet` at about frame 170.
3. **Make the AI shrug bigger.**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat. Scale it up and use a clear head-shake or shrug, so it is not a small grey shape under the "baa?" bubble.
   - Check with the `ai` cell of `look` `sheet`: the `wolf` should fill about a third of the frame height.

SCORE: 8.1

## Iteration 23
**Did**: index.html phone media query (<=640px): `#rsub` 20px, `#rk` 18px, `#rbig` 25vw, `#cap` 16px, taller `.band` 34vh so the reveal fills more of the phone screen.
**Saw**: not looked at (no tools run this session); sizes are plain CSS.
**Next**: (1) `look` sheet `pounce human` at 150 frames, resize [390,844], check fit and bars; (2) sheep pop at 200 frames and a REPLAY beat; (3) bigger `wolf` close-up for the AI shrug.
**Open**: phone reveal fit unverified (25vw GOTCHA may overflow); sheep pop, REPLAY, AI shrug not done.
