**Judge 20 scores (Must have, in order)**

I took one 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`), one `perf` and one short `interact` (hold `KeyD` for 40 frames, then `KeyE` for 30). There were no `Lighting:` or `Surfaces:` lines and no console errors. I did not run `feel`, check the clovers or the lose card, hear the sound, or check other viewports.

1. **Looks as LOOK.md says: 8.**
   - The `sky`, sun disc, `ridge*`, grain, cream `sheep*` and flat-facet `ground` read as a storybook frame.
   - `pines*` and `round-trees*` now look as flat masses, but their faceted fills are still visible.
   - The tool still reports 0% near black in every cell. The start `wolf-body` is 2.5% and is not the stark darkest shape.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The biggest remaining style gap is the wolf's body colour. It reads dark brown and not near black, so it does not match the WOLF turnaround.
   - The `ground` facet pattern now looks like patchwork triangles, not painted masses. The tile edges are visible.
3. **Clip moment: 9.**
   - The AI cell now shows the "SHEEP" card with "BAA?", "Just a sheep. Bite lost." and the "baa?" bubble. The ink splash and duotone freeze read clearly.
   - The human cell shows "GOTCHA HUMAN", the red "PLAYER 1" ribbon and the caption "And so the hidden one was found."
   - Both clip frames read in 5 seconds.
4. **Core loop and controls: 7.5.**
   - `interact` with `KeyD` moved `player.x` to 1.27, and `KeyE` set `player.grazing` true.
   - `topSusp` moved to 0.21, so the suspicion meter responds, and the baa sounds fired.
   - The Motion line says the wolf stopped at frame 22 and did not move again. I did not check whether that is intended.
5. **Local 2-player: 8.**
   - `wolf-body` is 8.1%, a little above the 4–7% target band.
   - The `wolfRing` and red cone read. The wolf still draws over the `wolf-rock` and sheep and is a flat blob, so the paws and legs are lost.
6. **UI typography: 8.5.** The IM Fell panels, Alfa Slab stamps and caption scrolls are in style. The top-right mode hint text is still tiny.
7. **Convention and performance: 7.**
   - `perf` gives 191,558 triangles, 57 draw calls and 0.63 MB of assets.
   - The 264 ms frame is on a software renderer with host load 5.3, so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.** The pounce, ink splash and stamp cards read, and the baa sounds fired. I did not run `feel` and did not hear the gong or the silence before the stamp.

**Faults: 7.5.**
- There were no console errors.
- 0% near black in all four cells.
- The local wolf is still a flat blob with no paws or legs readable, and 8.1% is above target.
- The start wolf is small and partly hidden behind `wolf-rock`.

**Next:**
1. **Make the wolf near black (asked again).**
   - Last Open: wolf body colour not checked against lifting.
   - Find what lifts `wolf-body`: the toon ramp, fog, the grain pass or an emissive/ambient term. Force an unlit material or colour 0x050305 with `fog:false`.
   - The one call that shows it done is the start `look` with `sample` on the wolf body. It should read below 20 per channel and "near black" should be above 1%.
2. **Give the local wolf readable limbs and scale it to 7% (asked again).**
   - Scale the local `wolf-body` to about 8.5 and add a lighter ink outline, or a rim on the `wolf-leg*`, so paws and ears separate from the dark mass.
   - Make the local wolf hide behind `wolf-rock` when it should. Last Open: renderOrder alone does not do it, so the rock needs to write depth before the wolf, or the wolf needs a different draw order.
   - The one call that shows it done is the local sheet cell after `KeyM`. It should show `wolf-rock` covering the wolf's paws and `wolf-body` at 7%.
3. **Soften the `ground` triangle patchwork and finish the trees.**
   - Merge the flat per-triangle `ground` colours into larger painted patches: quantise by noise cell, not by triangle.
   - Add the dark outline to `pines*` and `round-trees*` crowns.
   - The one call that shows it done is `look` with `zoom` [0, 100, 640, 450] at frame 150. It should show broad flat patches with no visible triangle edges.

SCORE: 7.9
