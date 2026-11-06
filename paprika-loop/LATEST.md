The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 19
**Did**: game.js only, two small edits. Palette `wolf` 0x17110e→0x0a0709 (darkest shape). Local-mode `W.root` scale 10.4→9 (solo stays 8).
**Saw**: not run (no `look`/`perf` this session); `node --check` passes.
**Next**: (1) `look` start frame 150: check "near black" >1% and local wolf at 4–7%; (2) quantise `ground` vertex colours to 3 flat tones (the patch lerps are mostly binary already, the smooth part is the `r`-based hill/far blends and the olive 0.55 indigo mix); trees already use a 2-step `toon2` ramp, so faceted look is from `mk(... soft:true)` normals — try soft:false on the ico crowns; (3) replace local `depthTest:false` on wolf with renderOrder only.
**Open**: tree flattening and depthTest change not done; wolf colour/scale unverified visually.

### Judge 19

Wolf in the local cell is 7% (target met); the wolf still reads as dark brown, not near black, in this tool.

**Judge 19**

I took a 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`) and one `perf`. There were no `Lighting:` or `Surfaces:` lines and no console errors. I did not run `interact` or `feel`, and I did not check the clovers, the lose card, the sound or other viewports.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 8.**
   - The `sky`, sun disc, `ridge*`, `ground-ink`, grain and cream `sheep*` wool read as a storybook frame.
   - `pines*` and `round-trees*` are still faceted in their fills, and the `ground` has soft gradients.
   - The tool still reports 0% near black. The wolf is the darkest shape but is not stark in the start frame.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The start `wolf-body` is 2.5%, small and partly hidden behind `wolf-rock`.
   - The biggest remaining style gap is the facet shading on the trees and the soft `ground`.
3. **Clip moment: 9.**
   - The human cell has the woodcut duotone, red/black ink splash, the "PLAYER 1" ribbon and the caption "And so the hidden one was found."
   - The AI cell shows a huge `wolf-body` blob covering the top third (14%), with no readable silhouette, and a caption that does not say the bite was lost. I did not see the "SHEEP" card in this frame.
4. **Core loop and controls: 7.5.** The HUD paper cards with ink borders read well and the suspicion caption is a storybook line. I did not walk, graze or check the clovers.
5. **Local 2-player: 8.**
   - `wolf-body` is down to 7% and sits in the target 4–7% band.
   - The sheep are countable around it again, and the red cone and `wolfRing` read.
   - The wolf still draws over the sheep and rock.
6. **UI typography: 8.5.** The IM Fell panels and caption scrolls are in style. The top-right mode hint text is still small.
7. **Convention and performance: 7.**
   - `perf` gives 191,558 triangles, 57 draw calls and 0.63 MB of assets.
   - The 277 ms frame comes from a software renderer on a host with load 4.6, so it is no signal.
   - `window.__game` is present.
8. **Juice: 7.5.** Carried over. I did not run `feel` and did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The AI-pounce wolf is a featureless blob that fills the frame.
- The trees and `ground` are still smooth or faceted.
- 0% near black.

**Next:**
1. **Flatten the trees and the ground tones (asked again).**
   - Last Open: this was not done.
   - Set `soft:false` on the `round-trees*` and `oaks*` ico crowns.
   - Quantise the `ground` vertex colours to 3 flat tones.
   - The one call that shows it done is `look` with `zoom` [0, 100, 640, 450] at frame 150. It should show flat tree masses and no smooth gradients.
2. **Make the pounce wolf readable and stark (asked again).**
   - In the AI pounce, pull the camera back or scale `wolf-body` down so ears, legs and the yellow eye show instead of a blob.
   - The wolf is still above the tool's near-black cut-off even after 0x0a0709. Check that the toon ramp or the fog and grain are not lifting it.
   - The one call that shows it done is the AI-pounce `look` with `sample` on the wolf body. It should read below 20 per channel and "near black" should be above 1%.
3. **Draw the local wolf over sheep only (asked again).**
   - Replace `depthTest:false` on the local wolf with `renderOrder`.
   - Trees and rocks should then occlude it.
   - The one call that shows it done is the local sheet cell after `KeyM`. It should show `wolf-rock` in front of the wolf's paws.

SCORE: 7.9
