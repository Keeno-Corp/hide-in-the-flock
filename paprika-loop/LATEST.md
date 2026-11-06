The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 14
**Did**: game.js only. `localPounce` and the `aim`/`reach` in-range test use reach 7 (was 4.6), so a wandering sheep no longer makes later Enters fail with "Nothing in reach".
**Saw**: real-key `interact` in local mode (KeyM, ArrowRight ×60, Enter ×3 with 200-frame waits): before the change bites went 3→2 and the later Enters missed. After it, bites went 3→1 by frame 576, with sounds for both pounces; the third pounce was still in flight when the steps ended, so bites=0 and the SHEEP WIN card are not yet seen. No `look` or `perf` run this session; no console errors.
**Next**: (1) Run the same play with longer waits (~330 frames per pounce) to confirm bites 0 and SHEEP WIN. (2) `ground-ink` contour pass on the tone bands (still not done). (3) Flatten the `sheep` wool shading and pull the pounce camera back so the wolf shows at 3% or more.
**Open**: `reach` ring radius is still drawn at 4.5, so it understates the new 7 reach. Ground ink edge and wool toon ramp not done.

### Judge 14

**Judge 14**

I took a 3-cell `look` sheet (start, AI pounce, human pounce), one real-key local-mode `interact` with `look`, and `perf`. There were no console errors, no `Lighting:` or `Surfaces:` lines, and no "Never visible" object. I did not exercise the clover patches or the sound beyond the `interact` Sound line.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.5.**
   - The sky, sun disc, `ridge*`, `pines*`, `oaks*`, `*-ink` outlines, grain and the dusk palette read as storybook.
   - The `ground` is still smooth bands with no ink contour between tones.
   - The `sheep` wool is still faceted light and dark blobs, which reads as low-poly rather than flat gouache.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The start wolf is 4.4%, above the 3.5% target. It is a dark silhouette (brightness 14% against 65% around it), but 0% of the frame is near black.
   - The biggest remaining style gap is the wool shading and the `ground`'s missing ink edges.
3. **Clip moment: 9.**
   - The AI pounce (leap, splash, duotone, "baa?") held up this session.
   - The human cell shows the EATEN card with the red PLAYER 1 stamp.
   - The wolf is only 0.31% of the frame in the human cell and 0.36% at the end of the local play, so the pounce framing is still too far back.
4. **Core loop and controls: 7.5.**
   - The solo HUD, the stamped cards and the restart hints are readable.
   - The clover patches were not exercised.
5. **Local 2-player: 8.**
   - Real keys now work end to end: `KeyM`, `ArrowRight`, then three `Enter` presses took `bites` from 3 to 1 by frame 472, then to 0.
   - The "BAA-RAVO / SHEEP WIN" card came up with restart and mode-switch hints.
   - The pounce targeting is still weak. `aim`, `aimArrow` and `wolfRing` are hidden in local mode, and the `reach` ring is drawn at 4.5 against a real reach of 7.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type, and nothing is cut off.
   - The `div#mode` text is small.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles, 54 draw calls and 0.63 MB of assets. The 265 ms frame is a software renderer, so it is no signal.
   - `window.__game` is present and the sheep are instanced.
8. **Juice: 7.5.**
   - The Sound line shows boom, stab, baa, thud and wind firing, and the sheep hop.

**Faults: 8.** There were no console errors and no fault lines. The `ground` contour ink is still open, and `reach` is mis-drawn.

**Next:**
1. **Add a `ground-ink` contour pass (asked again, 5th time).**
   - Quantise the `ground` vertex colours to 3 flat tones and draw a dark-brown ink line along the tone borders.
   - The one call that shows it done is `look` with `zoom` [0, 400, 640, 800] at frame 150. It should show inked band edges.
2. **Flatten the wool shading and pull the pounce camera back (asked again).**
   - Give the `sheep` and `sheep-heads` a 2-step cream and ochre toon ramp.
   - Put the wolf at 3% or more over the flock during the pounce.
   - The one call that shows it done is `look` with `sheet` at the pounce cell. It should show `wolf-body` at 3% or more over flat wool tones.
3. **Make local-mode pounce targeting readable.**
   - Draw the `reach` ring at the real radius of 7.
   - Show `aimRing` and `aimArrow` on the nearest sheep in local mode, and add a short "P1 sheep" marker.
   - The one call that shows it done is `look` after `KeyM`. It should show a ring and an arrow on screen, and `reach` and `aim` no longer in the hidden list.

SCORE: 7.7
