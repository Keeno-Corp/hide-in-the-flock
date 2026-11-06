The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 18
**Did**: game.js only. `treeInk` hull offset 0.07→0.14 and now also on `pines`. Local mode: `W.root` scale 10.4 (8 in solo), wolf materials `depthTest:false`, renderOrder 8, set each frame in the loop before `wolfMark`.
**Saw**: `look` sheet (start frame 150, local after KeyM+40): start wolf 2.5%, local wolf 11% (was 1.2%), wolf drawn over the wool, ground-ink and red `wolfMark` visible; trees have thicker ink outlines. 0% near black still reported (the wolf's 0x17110e is above the tool's cut-off). No console errors. No `perf`.
**Next**: (1) local wolf at 11% may be too large, try scale 9 and check the sheep still read; (2) 2-step ochre ramp for `pines*`/`round-trees*` fills and 3-tone quantised `ground` vertex colours (not done); (3) make the wolf darker (~#0e0a0c).
**Open**: depthTest off in local means the wolf draws over trees/rocks in front of it; not checked.

### Judge 18

**Judge 18**

I took a 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`) and one `perf`. There were no `Lighting:` or `Surfaces:` lines. I did not run `interact` or `feel`, and I did not check the clovers, the sound, or any viewport other than the default.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 8.**
   - The `sky`, sun disc, `ridge*`, `ground-ink`, grain and cream `sheep*` wool read as a storybook frame.
   - `pines*` and `oaks*` now have thicker ink outlines, but their fills are still faceted.
   - The `ground` still has smooth gradients.
   - 0% of the frame is near black, so the wolf is not yet the stark darkest shape. The wolf's 0x17110e fill is above the tool's cut-off.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The start wolf is 2.5%, down from 4.3% last session.
   - The biggest remaining style gap is the trees' faceted fills and the smooth `ground`.
3. **Clip moment: 9.**
   - The human cell has the woodcut duotone, ink splash, red "HUMAN" stamp, "GOTCHA", the "PLAYER 1" ribbon and the caption.
   - The AI cell has the "SHEEP" card, the "baa?" bubble and "Bite lost".
   - In the AI cell the wolf is 0%, so the bite beat has a big black blob but no readable wolf.
4. **Core loop and controls: 7.5.**
   - The HUD panels are paper cards with ink borders and read well.
   - I did not run a walk-and-graze `interact`, and I did not check the clovers or the lose card.
5. **Local 2-player: 7.5.**
   - `wolf-body` is 11% (was 1.2%) and is drawn over the wool, with the red `wolfMark` cone and the `wolfRing` visible.
   - It is now so large that it hides much of the flock and the targeting area. This is the first sign of overshoot.
   - Last session's Open about `depthTest:false` is confirmed in the local cell: the wolf draws over everything in front of it.
6. **UI typography: 8.5.** The IM Fell panels, the Alfa Slab stamps and the caption scrolls are in style. The `div#mode` hint text is still small.
7. **Convention and performance: 7.**
   - `perf` gives 191,558 triangles, 57 draw calls and 0.63 MB of assets.
   - The 277 ms frame is a software renderer on a host with load 5.1, so it is no signal.
   - `window.__game` is present.
8. **Juice: 7.5.** Carried over. I did not run `feel` and did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The local wolf is oversized at 11%.
- The trees' fills and the `ground` are still smooth or faceted.
- 0% near black remains.

**Next:**
1. **Flatten the trees and the ground tones (asked again).**
   - Give the `pines*` and `round-trees*` fills a 2-step ochre toon ramp, as the sheep have.
   - Quantise the `ground` vertex colours to 3 flat tones.
   - The one call that shows it done is `look` with `zoom` [0, 100, 640, 450] at frame 150. It should show flat tree masses with inked edges and no smooth grass gradients.
2. **Tune the local wolf (asked again).**
   - Set the local `W.root` scale to about 9 instead of 10.4, so the flock and the pounce target read again.
   - Draw only the wolf over the sheep, not over trees and rocks, by using `renderOrder` without `depthTest:false` where possible.
   - The one call that shows it done is the local sheet cell after `KeyM` and 40 frames. It should show `wolf-body` at 4–7%, with the sheep still countable around it.
3. **Make the wolf the darkest shape (asked again).**
   - Set the wolf's fill to about #0a0709 and lighten the dusk ground behind it a little.
   - The one call that shows it done is the start `look`. It should report "near black" above 1%, and `sample` on the wolf body should read below 20 in each channel.

SCORE: 7.9
