The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 28

**Session 28 verdict.** I looked at one 3-cell sheet (start at frame 60, human bite and AI bite at frame 200) and ran `perf` with `costs`. I did not run `interact`, `feel` or `viewports`, and I did not check sound. There were no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 8.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` read as a storybook.
   - The wolf is the darkest shape on screen (2% near black), and its outline is thinner now.
   - The `ground` still has hard yellow-to-green patch edges.
   - The tree faces are still faceted.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The wolf is down to 5% of the frame at scale 2.8, but `wolf-body` is still a lumpy barrel with a ragged back and stiff `wolf-leg`s. It is not the lean WOLF turnaround, and that is still the biggest style gap.
   - The flock is a dense cream clump, though better than before.
3. **Clip moment: 9.**
   - At frame 200 the human bite shows the tilted "GOTCHA / HUMAN" stamp in red, the "PLAYER 1" stamp, red splatter, a woodcut duotone and the caption "And so the hidden one was found."
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost.", the "baa?" bubble and the caption "Mistaken identity. The meadow keeps its secret."
   - I did not time how fast the card lands, or whether it is within the first minute of solo play.
4. **Core loop and controls: 7.5.**
   - I carried this over without playing this session.
   - The HUD shows the timer, bite pips, clover counters and suspicion bar.
   - The `clover` patches are still not drawn in the storybook style.
   - The HUD key hints are tiny.
5. **Local 2-player: 7.**
   - I carried this over without playing. The wolf's silhouette is readable, but I did not check pounce targeting.
6. **UI typography: 8.5.**
   - The IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines.
   - The HUD text is small.
7. **Convention and performance: 7.5.**
   - 135k triangles in the scene (138k as drawn), 61 draw calls, 0.63 MB of assets. The triangle count is still above the ~120k target.
   - `window.__game` is present.
   - The 258 ms frame is SwiftShader on a busy host (load 7.1), so it is not a signal.
8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The wolf body is still blobby.
- The `clover` patches are unfinished.
- Triangles are still above 120k.

**Next:**
1. **Rebuild `wolf-body` as a lean profile silhouette (asked again).**
   - Make it one extruded side-profile polygon with a long snout, two sharp ears, a lowered head, four slim legs and a thin tail. The extruded polygon replaces the barrel and the block `wolf-leg`s.
   - Keep the single `wolf-outline` hull around the whole shape.
   - The one call that shows it done is `look` with `zoom` [100, 130, 450, 330]. It should show a pointed, slim profile with the outline hugging it, and `subject wolf` should be about 3–4%.
2. **Draw the `clover` patches in the storybook style (asked again, not started).**
   - Make each patch an inked ring with a three-leaf motif larger than a sheep's foot, in a bright green that stands out from the `ground`, and give it a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position, for example the green rings near the lower-left flock. It should show inked leaf shapes.
3. **Cut the triangles to about 120k or less (asked again).**
   - Drop `bushes` detail (8k) and `walls` detail (7.7k) by about half. Halve `rocks` (6.4k), `sheep-heads-shadow` (8k) and `sheep-shadow` (10k), which could share a lower-poly shadow proxy.
   - The one call that shows it done is `perf` with `costs`. It should read about 120k or less, with the flock silhouette unchanged in a `look`.

SCORE: 7.8

## Iteration 29
**Did**: game.js wolf block: `wolf-body` is now one extruded side-profile polygon (12 points, depth 0.32, bevel 2) replacing the blob barrel; `wolf-outline` uses welded/smoothed normals so the rim has no gaps; `wolf-leg`s slimmer (r 0.065) and closer together; `wolf-tail` thinner; `wolf-head` skull smaller, snout longer (0.8), ears 6-sided cones.
**Saw**: `look` target wolf: lean angular profile with a lowered head and thin outline; sheet frame 60: subject wolf 5.8%, no console errors in the open. From the game camera it reads as a flat dark slab on stilts, so it is still not the WOLF turnaround. Perf not run.
**Next**: (1) give the wolf profile a shaped back (shoulder hump, tucked belly, bushy tail polygon) and shorter legs; (2) clover three-leaf inked motif + glow near player (not started); (3) cut triangles to ~120k (bushes, walls, rocks, shadow proxies) and re-run `perf costs`.
**Open**: clover and triangle cut not started; no interact replay; wolf pose angles (leap/grin) not re-checked against the new profile.
