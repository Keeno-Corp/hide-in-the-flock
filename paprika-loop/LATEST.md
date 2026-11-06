The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 12
**Did**: game.js only, one Next item. Wolf is bigger at start: in `animateWolf` the watch/stalk scale target is 7 in solo (was 4.4; 4.4 kept in local and during pounces, 2.4 for leap poses) and `wolf-rock` scale 1.3→1.9.
**Saw**: `look` sheet frames 0 and 150: subject wolf 2.6% and 3.0% (was 1.2% / 1.1%), dark silhouette now clearly reads over the flock, no faults listed; brightness 60%. Did not run `perf`.
**Next**: (1) Wolf is still just under 3.5%: add ~1.2× more scale or drop camera height slightly at start. (2) Ground bands: smooth normals + ink edge `ground-ink` pass, stronger indigo patches (not done). (3) Play solo lose card and real-key local 3-bite flow with `interact`.
**Open**: Ground ink edge, lose card and real-key local play still unproven. Larger wolf may overlap the flock top edge in pounce framing (not checked).

### Judge 12

**Judge 12**

I took a 3-cell `look` sheet (start, human pounce, lose after a forced bite) and ran `perf` with `costs`. I did not run `interact` on real keys, so real-key local play is still unproven. Sound was not checked. The sheet and `perf` reported no console errors, no `Lighting:` or `Surfaces:` lines, and no "Never visible" object.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.5.**
   - The sky, sun disc, `ridge*` ×3, `pines*` ×22, `oaks*`, the `*-ink` outline passes and the paper grain read as storybook.
   - The `ground` still shows soft facets and has no ink edge between its tone bands.
   - The start frame is still a 3D scene under a filter, though the `wolf-body` is now a real near-black mass.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The wolf at start is now 3% of the frame (was 1.2%), reading dark over the cream `sheep`.
   - The biggest remaining style gap is the `ground`: faceted tones with no inked edge.
   - The second gap is that the pounce framing's wolf overlaps and muddies the flock (human bite cell).
3. **Clip moment: 9.**
   - The human bite cell shows the ink splash, the woodcut duotone, the tilted "GOTCHA / HUMAN" stamp, the red `PLAYER 1` stamp and the caption "And so the hidden one was found."
   - The "HUMAN" headline is visible this time.
   - The AI "SHEEP" card was not sampled this session.
4. **Core loop and controls: 7.5.**
   - The solo lose card is now seen: "YOU WERE THE HUMAN / EATEN", with "The wolf got you · 0/3 clovers · R to play again · M to switch mode". It is a proper stamped storybook card with restart.
   - Clover patches and real-key solo play were not exercised this session.
   - The wolf at 3% at start is closer to readable.
5. **Local 2-player: 7.**
   - The WOLF WINS card was seen last session.
   - Real-key `Enter` targeting and bite counting are still unverified.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is still tiny.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles, 54 draw calls and 0.63 MB of assets. The 273 ms frame is on a software renderer, so it is no signal.
   - 60k triangles cast shadows.
   - The sheep use instancing.
8. **Juice: 7.**
   - Motion and cards are fine.
   - Sound was not checked.

**Faults: 8.** There were no console errors and no fault lines. The `ground` ink edge and real-key play are still open.

**Next:**
1. **Turn the `ground` facets into painted bands (asked again, 3rd time).**
   - In `game.js`, quantise the `ground` vertex colours to 3 flat tones using smooth normals.
   - Add a dark-brown ink edge along the tone borders, for example a `ground-ink` back-face or contour pass.
   - Make the indigo shadow patches stronger, near 0x4c5688 under the oaks.
   - The one call that shows it done is `look` with `zoom` [0, 180, 512, 340] at frame 0. It should show 3 flat tones with inked edges and no triangle facets.
2. **Prove real-key local play.**
   - Run `interact` with `trace` on the bites-left state. Press `KeyM`, then walk the wolf next to the human with the arrow keys and press `Enter` three times.
   - It should show bites counting down to the `WOLF WINS` card from real keys. Fix any targeting that does not respond.
3. **Raise the wolf at start to 3.5% or more, and clean the pounce framing.**
   - Scale the wolf another ~1.2×.
   - In the pounce cell, pull the camera so the large `wolf-body` does not smear over the flock, or give it a clean ink edge.
   - The one call that shows it done is `look` with `sheet` at frame 0. It should list `subject wolf` at 3.5% or more.

SCORE: 7.7
