The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 24

**Judge verdict, session 24**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×136, `wolf-rock`, the `wolf`, the `sheep*` flock and `cloud` ×12.
   - Brightness is 64%, saturation 45%, 0% near black. There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human reveal:** "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 tag read big. The `wolf` lies flat beside the red silhouette.
   - **AI reveal:** "AI SHEEP", "Bite wasted." and the "baa?" bubble read well, but the `wolf` shrug is still a mid-size grey shape.
   - **At 220 frames:** the human reveal is still on screen. There is no REPLAY beat.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, `cloud` and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the `wolf` sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line and the win/lose screens are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 124 ms on SwiftShader (host load 6.0), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - `interact` reports 10 sounds on the pounce (boom, stab1–3, thud, hit).
   - The wool, caption, bubble and tag read well.

9. **Works at any window size, HUD readable: 8.**
   - **GOTCHA fix:** at 390×844 the full word "GOTCHA" now fits inside the frame with no letters cut. That closes the last verdict's Next item 1.
   - **Phone reveal:** the sub-line, tag and caption are readable.
   - **Cut-off flag:** `div#reveal` is reported cut off by the screen edge at [-8, 397], but its text is intact.
   - **Overlap:** `div#mode` overlaps `div#cap` at the bottom. The caption is partly covered by the mode pill on phone.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The mode pill overlapping the caption on phone is minor.

**Next:**
1. **Add the REPLAY beat (asked again).**
   - Ease the `sheep*` back after the reveal, then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check with `look` `sheet` of `pounce human` at about frame 260, since the banner is still up at 220. The banner should be gone and the "REPLAY" tag visible.
2. **Make the AI shrug bigger (asked again).**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat, scaled up with a clear head-shake.
   - Check with the `ai150` cell of `look` `sheet`. The `wolf` should fill about a third of the frame height.
3. **Fix the phone caption overlap.**
   - Move `div#cap` above `div#mode`, or hide `div#mode` during a reveal, in the ≤640px query.
   - Check with `interact` `resize: [390, 844]`, then `pounce human`, `wait: 150`, `look: true`. The `div#cap` and `div#mode` overlap should be gone from the "HTML over the canvas" line.

SCORE: 8.1

## Iteration 25
**Did**: index.html ≤640px query: `#cap` bottom 5vh -> 64px so it clears `#mode` (Next 3). game.js `updateCamera`: close-up factor 0.32 -> 0.5 when the pounce target is an AI sheep, so the `wolf` shrug fills more of the frame (Next 2).
**Saw**: no tools run; edits are one-line CSS/number changes.
**Next**: (1) `look` sheet `ai150` to check the wolf fills ~1/3 height, and resize [390,844] `pounce human` wait 150 for cap/mode overlap; (2) REPLAY beat after the reveal (still not done): ease `sheep*` back, drop `aimLine`, "REPLAY" tag; (3) full solo round playtest.
**Open**: both changes unverified; REPLAY beat missing.
