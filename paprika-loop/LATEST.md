The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 29

**Session 29 verdict.** I looked at one 3-cell sheet (start at frame 60, human bite and AI bite at frame 200) and ran `perf` with `costs`. I did not run `interact`, `feel` or `viewports`, and I did not check sound. The sheet showed no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` read as a storybook.
   - The new `wolf-body` is a flat angular black slab with a long pointed snout. It is the darkest shape on screen (3% near black), but it looks like a flat plank, not an animal.
   - The `ground` still has hard patch edges.
   - The tree faces are still faceted.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.**
   - `wolf-body` is a rectangular slab with one spike. It has no shoulder hump, no tucked belly and no bushy tail.
   - It is at 5.8% of the frame. It is lean now, but the wolf is a worse match to the WOLF turnaround than a rounded body would be.
   - The flock is a dense cream clump.
3. **Clip moment: 9.**
   - The human bite at frame 200 shows the tilted "GOTCHA / HUMAN" stamp in red, the "PLAYER 1" stamp, red splatter, a woodcut duotone and the caption "And so the hidden one was found."
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost.", the "baa?" bubble and the caption "And the wolf was wrong, as wolves so often are."
   - I did not time how fast the card lands, or whether it is within the first minute of solo play.
4. **Core loop and controls: 7.5.**
   - I carried this over without playing this session.
   - The `clover` patches are still not drawn in the storybook style.
   - The HUD key hints are tiny.
5. **Local 2-player: 7.**
   - I carried this over without playing. I did not check pounce targeting.
6. **UI typography: 8.5.**
   - The IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines.
   - The HUD text is small.
7. **Convention and performance: 7.5.**
   - 135,570 triangles as drawn (132,672 in the scene), 61 draw calls, 0.63 MB of assets. The triangle count is still above the ~120k target.
   - The 251 ms frame is SwiftShader on a busy host (load 5.8), so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.**
- There were no console errors.
- The wolf is a flat slab.
- The `clover` patches are unfinished.
- Triangles are still above 120k.

**Next:**
1. **Shape the `wolf-body` profile (asked again).**
   - Add a shoulder hump, a tucked belly line and a bushy tail polygon to the extruded side profile.
   - Make the `wolf-leg`s shorter, angled and tapering to paws, and raise the head slightly so it reads as a prowling wolf.
   - Keep the single `wolf-outline` hull around the whole shape.
   - The one call that shows it done is `look` with `zoom` [60, 70, 260, 150] on the start frame. It should show a curved back, a tapered tail and bent legs, not a rectangle.
2. **Draw the `clover` patches in the storybook style (asked again, not started).**
   - Make each patch an inked ring with a three-leaf motif larger than a sheep's foot, in a bright green that stands out from the `ground`, and give it a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position. It should show inked leaf shapes.
3. **Cut the triangles to about 120k or less (asked again).**
   - Halve `bushes` (8.2k), `walls` (7.8k) and `rocks` (6.4k).
   - Give `sheep-shadow` (10.1k) and `sheep-heads-shadow` (8.1k) one lower-poly shared shadow proxy.
   - The one call that shows it done is `perf` with `costs`. It should read about 120k or less, with the flock silhouette unchanged in a `look`.

SCORE: 7.5

## Iteration 30
**Did**: game.js wolf block: `wolf-body` profile now has a shoulder hump, tucked belly, thigh and a bushy tail polygon (16 points); `wolf-leg`s shorter (0.55) with paws; `wolf-tail` blob shrunk and moved to (0,0.8,-1.3). `clover` groups got three inked heart-shaped leaves each (bright green 0x9be04a, dark outline), staggered in y by 0.012 to avoid z-fighting.
**Saw**: `look` target wolf: curved back with hump, tapered tail and shorter legs, still a dark silhouette with a brown rim. Clover close view showed the leaf layers z-fighting (look's Surfaces lines); I staggered their y after that and did not re-look. 0 console errors. Perf and triangle count not run.
**Next**: (1) re-`look` at a clover with `zoom` to confirm the leaves read and no z-fight; (2) cut triangles to ~120k (`bushes`, `walls`, `rocks`, a shared low-poly `sheep-shadow` proxy) and re-run `perf costs`; (3) check wolf pounce/leap poses against the new profile.
**Open**: triangle cut not started; no interact replay; clover leaf fix unverified.
