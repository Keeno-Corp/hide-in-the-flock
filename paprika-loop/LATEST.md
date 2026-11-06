The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 21

**Judge 21 scores**

I took one 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`) and one `perf`. There were no console errors and no `Lighting:` or `Surfaces:` lines. The two pounce cells were taken 10 frames in, so I did not see the stamped bite cards this round. I did not run `interact` or `feel`, check the clovers, the lose card or other viewports, or hear the sound.

1. **Looks as LOOK.md says: 8.5.**
   - The start `wolf-body` is now solid black. It is the darkest shape on screen, and the sheet reports 2% near black.
   - The `sky`, sun disc, `ridge*` hills, grain, cream `sheep*` and the pines and `oaks*` with ink outlines read as a storybook frame.
   - The `ground` patches are broader, but the diamond tone bands on the right hill are still visible.
2. **Compared with BOARD, LOOK.png and the turnarounds: 8.**
   - The wolf now matches the near-black silhouette of the WOLF turnaround.
   - The biggest remaining style gap is that the wolf is a featureless blob. In the pounce cells there are no readable paws, ears or ink edge, unlike the turnaround.
3. **Clip moment: 8.5.**
   - The pounce leap, enlarged wolf and caption read in the pounce cells.
   - I did not check the bite card, splash or freeze frame this round. Judge 20 saw them hold.
4. **Core loop and controls: 7.5.**
   - I did not play it this round. Judge 20's `KeyD` and `KeyE` results still stand.
   - The wolf in the start cell is partly hidden behind `wolf-rock`, so its suspicion is hard to read.
5. **Local 2-player: 7.**
   - The `wolfRing`, red cone and caption read.
   - `wolf-body` is 8.1%, above the 4–7% band.
   - The wolf still draws over `wolf-rock` and the sheep, and its legs are lost in the blob.
6. **UI typography: 8.** The IM Fell panels, Alfa Slab stamps and caption scrolls are in style. The top-right mode hint is still tiny.
7. **Convention and performance: 7.**
   - `perf` gives 191,558 triangles, 57 draw calls and 0.63 MB of assets.
   - The 262.6 ms frame is on a software renderer, so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.** Not re-checked this round. The pounce motion reads, and I did not run `feel` or hear the sound.

**Faults: 8.**
- There were no console errors.
- The local wolf is still a blob over `wolf-rock`.
- The ground tone bands are still visible.
- The top-right hint text is tiny.

**Next:**
1. **Give the wolf readable limbs and ears in every cell (asked again).**
   - Last Open: the local wolf was not re-checked.
   - Add a thin lighter ink rim or inner highlight on `wolf-leg*`, `wolf-head` ears and `wolf-tail`. Keep the body at 0x030203.
   - Scale the local `wolf-body` down to about 7%.
   - The one call that shows it done is `look` with `zoom` on the local cell. It should show separate paws and ears against the dark mass.
2. **Make `wolf-rock` occlude the local wolf (asked again).**
   - The wolf draws over the rock. Give the rock a higher `renderOrder` with `depthWrite` true, and the wolf `depthTest` true and a lower order.
   - The one call that shows it done is the local sheet cell. It should show the rock covering the wolf's paws.
3. **Flatten the ground bands and enlarge the hint text.**
   - Soften the diamond tone bands on the right hill by lowering the vertex-colour contrast in the noise.
   - Raise the top-right `[M] mode` hint to about 13px or larger.
   - The one call that shows it done is `look` with `zoom` [640, 100, 1280, 450]. It should show smooth patches and a readable hint.

SCORE: 7.8

## Iteration 22
**Did**: game.js: wolf build uses a second material `rimMat` (0x3a2e26) for the ears (own mesh in `wolf-head`) and the paws (own mesh in each `wolf-leg`); body stays `PAL.wolf`. Local wolf scale 9 -> 8.5; wolf renderOrder now 0 in local too (was 8, which drew it over `wolf-rock`/sheep), depthTest stays true. index.html: `#mode` font 17->19px, `small` 14->16px.
**Saw**: `look` start: 1% near black, no errors, no Lighting/Surfaces lines; wolf ears and paws are lighter against the black body; wolf-body 1.6%. Local mode, rock occlusion in local, and the ground tone bands were not checked; perf not run.
**Next**: (1) `look` in local (KeyM) to confirm rock occludes paws and wolf-body is ~7%; (2) soften the ground diamond bands on the right hill; (3) check bite card/splash after a pounce.
**Open**: ground bands not touched this session; local mode not re-checked.
