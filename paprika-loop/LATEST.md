The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 22
**Did**: game.js: wolf build uses a second material `rimMat` (0x3a2e26) for the ears (own mesh in `wolf-head`) and the paws (own mesh in each `wolf-leg`); body stays `PAL.wolf`. Local wolf scale 9 -> 8.5; wolf renderOrder now 0 in local too (was 8, which drew it over `wolf-rock`/sheep), depthTest stays true. index.html: `#mode` font 17->19px, `small` 14->16px.
**Saw**: `look` start: 1% near black, no errors, no Lighting/Surfaces lines; wolf ears and paws are lighter against the black body; wolf-body 1.6%. Local mode, rock occlusion in local, and the ground tone bands were not checked; perf not run.
**Next**: (1) `look` in local (KeyM) to confirm rock occludes paws and wolf-body is ~7%; (2) soften the ground diamond bands on the right hill; (3) check bite card/splash after a pounce.
**Open**: ground bands not touched this session; local mode not re-checked.

### Judge 22

**Judge 22 scores**

I took one 4-cell `look` sheet (start, local after `KeyM`, AI bite, human bite) and one `perf`. There were no console errors and no `Lighting:` or `Surfaces:` lines. I did not run `interact` or `feel`, check the clovers, the lose card or other viewports, or hear the sound.

1. **Looks as LOOK.md says: 8.5.**
   - The `sky`, sun disc, `ridge*` hills, paper grain, cream `sheep*`, `oaks*` and pines with ink outlines read as a storybook frame.
   - The start `wolf-body` is near-black and is the darkest shape; the sheet reports 1% near black.
   - The ground diamond tone bands on the right hill are still visible. This was not touched (Iteration 22 Open).
2. **Compared with BOARD, LOOK.png and the turnarounds: 8.**
   - The wolf's lighter ears and paws now show against the black body in the start cell.
   - The biggest remaining style gap is that the wolf is still a lumpy blob with no ink rim, unlike the WOLF turnaround.
   - In the local cell the wolf lies stretched over `wolf-rock` and the `wolfRing`, with no readable limbs.
3. **Clip moment: 8.5.**
   - The AI bite shows an ink splash, a woodcut duotone freeze, a tilted "SHEEP" card with "BAA?", "Just a sheep. Bite lost." and a "baa?" bubble.
   - The human bite shows a red "HUMAN" card with "GOTCHA", a "PLAYER 1" stamp and a caption.
   - Both read clearly.
4. **Core loop and controls: 7.5.** I did not play it. The wolf in the start cell sits in the flock and is easy to read, but its suspicion is not.
5. **Local 2-player: 7.5.**
   - The `wolfRing`, red cone and caption read.
   - `wolf-body` is 6.3%, inside the 4–7% band.
   - The wolf still reads as a blob, and the rock covers little of it, so occlusion is not clearly shown.
6. **UI typography: 8.5.** The IM Fell panels, Alfa Slab stamps and caption scrolls are in style, and the hint text is larger than before.
7. **Convention and performance: 7.**
   - `perf` gives 191,354 triangles, 62 draw calls and 0.63 MB of assets.
   - The 287.6 ms frame is on a software renderer, so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.** The pounce and bite visuals work. I did not run `feel` or hear the sound.

**Faults: 8.**
- There were no console errors.
- The ground tone bands are still visible.
- The local wolf is a blob.
- The triangle count of 191k is high for a flat-painted look.

**Next:**
1. **Soften the ground diamond bands (asked again).**
   - Lower the vertex-colour contrast in the `ground` noise on the right hill.
   - The one call that shows it done is `look` with `zoom` [640, 100, 1280, 450] on the start page. It should show smooth patches with no diamond tone steps.
2. **Give the wolf an ink silhouette with readable limbs in the local and start cells.**
   - Add a thicker, slightly lighter outline pass on `wolf-body`, and give each `wolf-leg*` a visible gap from the body.
   - Check that the lying-down local pose does not merge with the `wolfRing`.
   - The one call that shows it done is `look` with `zoom` on the local cell's wolf. It should show separate paws, ears and tail.
3. **Make `wolf-rock` clearly occlude the local wolf, and check the clover patches.**
   - Position the local wolf start so the rock covers its hind legs, or raise the rock.
   - Then `interact` with `KeyE` on a clover patch to confirm that grazing works and that the patch is storybook-drawn.
   - The one call that shows it done is the local sheet cell. It should show rock in front of the wolf's paws.

SCORE: 7.9
