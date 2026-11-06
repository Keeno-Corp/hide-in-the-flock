**Judge verdict, session 26**

1. **Looks as LOOK.md says: 8.**
   - `human260` shows the sea, `cliff`, `pines*` ×87, `sand`, `wolf-rock`, clouds and the `sheep*` flock.
   - Brightness is 61% and saturation 42%. The sheet reports no `Lighting:` or `Surfaces:` lines.
   - The `ai150` cell is only 26% saturated, on a close-up that is mostly grey `wolf` and white sheep.

2. **Plays as DESIGN.md says: 8.**
   - `KeyD` moved the player 1.9 units, and `KeyE` set `player.grazing` true with `flock.graze` at 0.52.
   - Sounds started (baa2, wind). The pounce was forced with `act`.
   - I did not play a full round with real keys.

3. **Clip moment: 9.**
   - **Banner gone, REPLAY shown:** the `human260` cell has no GOTCHA banner. It shows the "▶ REPLAY" tag and the PLAYER 1 `tag` over the wolf's kill spot, with the camera back at the play view. This closes last verdict's Next item 1.
   - **AI shrug bigger:** the `ai150` cell shows the `wolf` filling the frame, with "AI SHEEP", the "baa?" bubble and "Bite wasted." on top. The 0.5 → 0.7 change worked.
   - **Human reveal:** `human100` reads big and clear: "HUMAN!", a red "GOTCHA" and "PLAYER 1 has been found."
   - **Remaining gap:** the camera only cuts back to the play view by 260 frames. I did not see a smooth zoom-out that reads as a replay.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` show from the play camera, in bright low-poly colours.
   - On phone (390×844) the flock fills the frame and only a sliver of sea, `cliff` and trees shows at the top.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line, and win/lose with restart are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 135 ms on SwiftShader (host load 5.6), so it is no frame-time signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The caption voice is funny: "Completely innocent sheep. Awkward."
   - Sound fires on the grazing play, and the wool burst shows in `human100`.

9. **Works at any window size, HUD readable: 9.**
   - On phone the HUD (TIME, CLOVERS, WOLF BITES, SUSPICION) and the mode label are readable and do not overlap.
   - I did not run the reveal on phone, so the `div#reveal` overflow fix is unverified.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The `perf` figure is not a fault on this software renderer.
    - The 8px `div#reveal` overflow check on phone is still open.

**Next:**
1. **Play a full solo round with real keys.**
   - **Do:** walk to a `clover` and graze on it. Let suspicion rise and a natural pounce happen within the first minute. Then reach a win or lose screen and press `KeyR`. Fix whatever feels unfair or unclear.
   - **Check:** an `interact` with `until` on the win/lose state, then `look`.
2. **Verify the reveal on phone.**
   - **Do:** run `look` `sheet` of `pounce human` at 100 frames in a 390×844 window.
   - **Check:** `div#reveal` should no longer be reported cut off. The REPLAY tag and PLAYER 1 `tag` should sit clear of the HUD.
3. **Make the REPLAY beat feel like a replay.**
   - **Do:** ease the camera out over about 0.5 s instead of cutting back. Add a slight desaturation or letterbox, and a short "wool burst" re-play on the `wolf`.
   - **Check:** `look` `sheet` of `pounce human` at 200 and 230 frames. Each should show a different camera distance.

SCORE: 8.3
