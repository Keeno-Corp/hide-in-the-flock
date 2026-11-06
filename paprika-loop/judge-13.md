**Judge 13**

I took a 3-cell `look` sheet (start at frame 150, human pounce, AI pounce) and one real-key `interact` in local mode. I also ran `perf`. There were no console errors, no `Lighting:` or `Surfaces:` lines, and no "Never visible" object. I did not check sound beyond the `interact` Sound line (boom, stab1–3, baa2 fired on the pounce).

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.5.**
   - The sky, sun disc, `ridge*`, `pines*`, `oaks*`, `*-ink` outlines and the paper grain read as storybook.
   - The `ground` is now smooth and painted, but it has no ink edge between tone bands.
   - The `sheep` wool shows light and dark faceted blobs, which looks more like low-poly than flat gouache.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The start wolf is 4.4%, above the 3.5% target.
   - The biggest remaining style gap is the faceted shading on `sheep` wool and the `ground`'s missing contour ink.
   - The wolf is dark (brightness 14% against 61% around it), but 0% of the frame is near black.
3. **Clip moment: 9.**
   - The AI cell shows the ink splash, the woodcut duotone, the "baa?" bubble and the caption "And the wolf was wrong, as wolves so often are."
   - The pounce framing is still crowded, with the wolf over the flock at 2.1%.
   - I did not see the "SHEEP" stamp card itself this session.
4. **Core loop and controls: 7.5.**
   - The solo HUD, the stamped cards and the toast "Wolf: walk to the flock with arrows, get close, Enter to pounce" read well.
   - I did not exercise the clover patches.
5. **Local 2-player: 7.**
   - `KeyM` switches to `mode: local`. Real `Enter` fired `pounce` (`pose: leap`) with the wolf at x 1.78, z -4.06.
   - The `interact` reported `human: false`, and the bites-left count never changed. The three Enters did not reach a WOLF WINS card, so bite counting from real keys is still unproven.
   - The pounce targeting reads weakly: `aim`, `aimArrow` and `wolfRing` are hidden in the picture.
6. **UI typography: 8.5.**
   - `div#hud`, `div#mode`, `div#toast` and `div#cap` are cream paper panels with ink borders and IM Fell type, and nothing is cut off.
   - The `div#mode` text is still small.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles, 54 draw calls and 0.63 MB of assets. The 287 ms frame is a software renderer, so it is no signal.
   - `window.__game` is present and the sheep are instanced.
8. **Juice: 7.5.**
   - The sound events and the cards work, and the sheep hop.

**Faults: 8.** There were no console errors and no fault lines. The `ground` ink edge and the real-key bite count are still open.

**Next:**
1. **Prove and fix real-key local bites (asked again).**
   - Run `interact` with `trace` on `bites` and `pounce.human`: `KeyM`, then walk the wolf with the arrows until the human is within reach, then press `Enter` three times with about 90 frames between presses.
   - It is done when the bites count falls to 0 and the WOLF WINS card appears. If the pounce never targets the human, make the aim snap to the nearest sheep within `reach` and show the `aimRing` in the local-mode view.
2. **Add a `ground-ink` contour pass (asked again, 4th time).**
   - Quantise the `ground` vertex colours to 3 flat tones and draw a dark-brown ink line along the tone borders.
   - The one call that shows it done is `look` with `zoom` [0, 180, 512, 340] at frame 150. It should show inked band edges.
3. **Flatten the wool shading.**
   - Give the `sheep` and `sheep-heads` a 2-step cream and ochre toon ramp instead of the faceted per-blob shading.
   - Pull the pounce camera back so `wolf-body` is 3% or more with clear space around it.
   - The one call that shows it done is `look` with `sheet` at the pounce cell. It should show the wolf at 3% or more over flat wool tones.

SCORE: 7.7
