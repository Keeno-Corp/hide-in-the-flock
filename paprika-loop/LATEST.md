The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 17

**Judge 17**

I took a 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`), one `interact` (walk and graze) and one `perf`. There were no `Lighting:` or `Surfaces:` lines. I did not check the clovers, the SHEEP card or the sound.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 8.**
   - The `sky`, sun disc, `ridge*`, `ground-ink`, grain and flat-cream `sheep*` wool hold.
   - `pines*` and `oaks*` are still faceted and thinly outlined.
   - The `ground` still has soft gradients.
   - 0% of the frame is near black, so the wolf is not the stark darkest shape.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The start wolf is 4.3%, which is acceptable.
   - The biggest remaining style gap is the trees and the smooth `ground`.
3. **Clip moment: 9.**
   - The AI pounce cell now has `wolf-body` at 5.5% (was 0.96%) with a readable leap.
   - The human cell has the woodcut duotone, ink splash, red "PLAYER 1" stamp and the caption.
4. **Core loop and controls: 7.5.**
   - The `KeyD` and `KeyE` walk-and-graze step works: `player.grazing` is true and `flock.graze` is 0.47.
   - The HUD panels read as storybook paper.
   - I did not check the clovers or the SHEEP card.
5. **Local 2-player: 7.**
   - `wolfMark` (red cone) and `wolfRing` now show, so the wolf can be found.
   - `wolf-body` is only 1.2% and is still partly swallowed by the flock, which is below the 1.5% target.
6. **UI typography: 8.5.** The IM Fell panels, the Alfa Slab stamp and the caption scroll are in style. The `div#mode` text is small.
7. **Convention and performance: 7.**
   - `perf` gives 188,746 triangles, 56 draw calls and 0.63 MB of assets.
   - The 265 ms frame is a software renderer, so it is no signal.
   - `window.__game` is present.
8. **Juice: 7.5.** Carried over; I did not run `feel`.

**Faults: 8.** There were no console errors. The faceted trees and the 1.2% local wolf are the remaining faults.

**Next:**
1. **Flatten the trees and the ground tones (asked again).**
   - Give the `pines*` and `oaks*` the same 2-step ochre toon ramp as the sheep, with a thicker `*-ink` hull.
   - Quantise the `ground` vertex colours to 3 flat tones.
   - The one call that shows it done is `look` with `zoom` [0, 100, 640, 450] at frame 150. It should show flat tree masses with inked edges and no smooth gradients on the grass.
2. **Make the local wolf bigger (asked again).**
   - Pull the local camera in further, or scale `wolf-body` ×1.3 in local mode only.
   - Draw `wolf-body` with `depthTest:false` and `renderOrder` 8, so that sheep wool no longer covers it.
   - The one call that shows it done is the local sheet cell after `KeyM` and 40 frames. It should show `wolf-body` at 1.5% or more.
3. **Make the wolf the darkest shape.**
   - Set the wolf's fill to near black (about #0e0a0c), and darken the sheep face tones slightly less than the wolf.
   - The one call that shows it done is the start `look`, which should report "near black" above 1%, with `sample` on the wolf pixels reading below 20 in each channel.

SCORE: 7.9

## Iteration 18
**Did**: game.js only. `treeInk` hull offset 0.07→0.14 and now also on `pines`. Local mode: `W.root` scale 10.4 (8 in solo), wolf materials `depthTest:false`, renderOrder 8, set each frame in the loop before `wolfMark`.
**Saw**: `look` sheet (start frame 150, local after KeyM+40): start wolf 2.5%, local wolf 11% (was 1.2%), wolf drawn over the wool, ground-ink and red `wolfMark` visible; trees have thicker ink outlines. 0% near black still reported (the wolf's 0x17110e is above the tool's cut-off). No console errors. No `perf`.
**Next**: (1) local wolf at 11% may be too large, try scale 9 and check the sheep still read; (2) 2-step ochre ramp for `pines*`/`round-trees*` fills and 3-tone quantised `ground` vertex colours (not done); (3) make the wolf darker (~#0e0a0c).
**Open**: depthTest off in local means the wolf draws over trees/rocks in front of it; not checked.
