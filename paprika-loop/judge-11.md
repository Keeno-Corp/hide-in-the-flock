**Judge 11**

I took one 4-cell `look` sheet (start, human pounce, AI pounce, local 3 forced pounces) and ran `perf` with `costs`. I did not run `interact` on real keys, so the real keyboard flow is untested. I read no console errors. Sound was not checked.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.5.**
   - The sky, the sun disc, `ridge*` ×3, `pines*` ×22, `oaks*` and the paper grain read as storybook.
   - The `ground` now has faceted light and shade bands. They read as low-poly facets, not painted masses, and there is no ink edge. The indigo patches are faint.
   - The start frame still looks like a 3D scene under a filter.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png.
   - The `wolf-body` silhouette is dark, but the start `subject wolf` is 1.2%, down from 2.3% last session.
   - The biggest style gap is the faceted `ground` with no ink edge. The second is the tiny wolf at start.
3. **Clip moment: 9.**
   - Both bite cards read well in the sheet. The human bite shows the ink splash, a woodcut duotone freeze, a red `PLAYER 1` stamp and the caption "It had a name, and the name was Player One."
   - The AI bite shows the "baa?" bubble and the caption "Mistaken identity. The meadow keeps its secret."
   - The "HUMAN" and "SHEEP" headline stamps were not visible in the cells. Only `PLAYER 1` and "baa?" showed.
4. **Core loop and controls: 7.**
   - HUD, bites and caption work.
   - The solo lose card is still unseen.
   - The wolf is 1.2% of the frame at start, so its suspicion is not readable from the start framing.
5. **Local 2-player: 7.**
   - Three forced pounces now end the game with a "GOTCHA / WOLF WINS / Player 2 found PLAYER 1 · R to play again · M to switch mode" card. It is a proper stamped storybook card with a restart hint.
   - The pounces were forced through `action`, not Enter. Targeting with real keys is unverified.
   - The card sits over a very small wolf, 0.74%.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is still small.
   - The WOLF WINS card is strong.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles and 54 draw calls. The 374 ms frame is on a software renderer on a busy host, so it is no signal.
   - 60,286 triangles cast shadows.
   - `div#paper` cleared within the 2.3 s `perf` waited, so that item is done.
8. **Juice: 7.**
   - Visuals and motion are fine. Sound was not checked.

**Faults: 7.5.**
- `look` listed no `Lighting:` or `Surfaces:` fault lines and no "Never visible" object.
- The wolf is under the 3.5% target at start (1.2%).
- The solo lose card is unseen.

**Next:**
1. **Raise the wolf at start (asked again).**
   - Last session's lean did not raise the wolf. It fell from 2.3% to 1.2%.
   - Scale `wolf-rock` and the wolf root by about 1.8×, or put the wolf on the near ridge in front of the flock. Keep the pounce framing as it is.
   - The one call that shows it done is `look` with `sheet` at frame 0, which should list `subject wolf` at 3.5% or more. It then shows a near-black silhouette against the cream sheep.
2. **Turn the `ground` facets into painted bands (asked again).**
   - Quantise `ground` vertex colours to 3 flat tones using smooth normals, instead of the per-facet shading that shows triangles.
   - Draw a dark-brown ink line along the tone edges, for example a `ground-ink` back-face pass. Make the indigo patches stronger, with `sample` values near 0x4c5688 under the oaks.
   - The one call that shows it done is `look` with `zoom` [0, 180, 512, 340] at frame 0. It should show 3 flat tones with inked edges and no triangle facets.
3. **Prove the solo lose card and the real-key local play.**
   - Run `interact` with `look: true` and `trace`. Use `state` to set the time to about 1, or `pounce` on a human ×3 in solo, and let it end.
   - Then run `KeyM` and press wolf `Enter` next to a human three times, with `trace` on the bites-left state, to show real-key targeting counts bites.
   - It should show the stamped lose card with restart in solo, and `WOLF WINS` from real keys in local.

SCORE: 7.4
