**Judge verdict, session 23**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human cell:** "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 tag read big on desktop. The `wolf` lies flat beside the red silhouette.
   - **AI cell:** "AI SHEEP", "Bite wasted." and the "baa?" bubble read well on the phone. The `wolf` is still a small grey shape under the bubble, so the shrug is weak.
   - **At 200 frames:** the human reveal is still on screen. There is no REPLAY beat, so I could not judge the sheep pop.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the wolf sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line and the win/lose screens are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 124 ms on SwiftShader (host load 6.1, a busy host), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, caption and wool read well.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - **Phone reveal:** the sub-line and caption are readable now.
   - **GOTCHA overflow:** at 390 px, `#rbig` at 25vw clips the "A" at both edges and shows "GOTCH". That is the overflow the builder flagged as unverified.
   - **Phone letterboxing:** the phone canvas still sits in a narrow band with black on both sides.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The clipped GOTCHA on phone is a visible fault.

**Next:**
1. **Fix the phone GOTCHA overflow (asked again).**
   - Lower `#rbig` to about 18vw, or add `white-space: nowrap` with a `clamp()`, inside the ≤640px query in `index.html`.
   - Check with `look` `sheet` of `pounce human` at 150 frames, `resize: [390, 844]`. The full word "GOTCHA" should show inside the frame with no letters cut.
2. **Add the REPLAY beat and check the sheep pop (asked again).**
   - Ease the `sheep*` back after the reveal, then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check with `look` `sheet` of `pounce human` at about frame 170. The banner should be gone and the "REPLAY" tag visible.
3. **Make the AI shrug bigger.**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat, scaled up with a clear head-shake, so it is not a small grey shape under the "baa?" bubble.
   - Check with the `ai` cell of `look` `sheet`. The `wolf` should fill about a third of the frame height.

SCORE: 8.0
