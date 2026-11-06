**Session 30 verdict.** I looked at one 3-cell sheet (start, human bite, AI bite) and ran `perf` with `costs`. I did not run `interact`, `feel` or `viewports`, and I did not check sound. I did not re-`look` at a clover, so the builder's leaf-stagger fix is unverified. The sheet showed no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` still read as a storybook.
   - `wolf-body` is the darkest shape on screen (3% near black) and now has a hump and a tail. It is still a heavy flat black mass, and its `wolf-outline` rim is barely visible.
   - The `ground` still has hard patch edges.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The wolf at 5.9% of the frame has a back curve, but the head, snout and legs are not readable at the start camera. It does not match the WOLF turnaround's prowl pose.
   - The flock is a dense cream clump.
3. **Clip moment: 9.**
   - The human bite shows the "GOTCHA / HUMAN" stamp in red, the "PLAYER 1" stamp, red splatter and a woodcut duotone.
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost.", the "baa?" bubble and a storybook caption.
   - I did not time when the card lands.
4. **Core loop and controls: 7.5.**
   - Carried over without playing this session.
   - The new `clover` leaves are visible as small green discs near the flock, but I did not zoom in to check they read as inked leaves.
   - The HUD key hints are tiny.
5. **Local 2-player: 7.** Carried over without playing. I did not check pounce targeting.
6. **UI typography: 8.5.** IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines. The HUD text is small.
7. **Convention and performance: 7.**
   - 136,062 triangles as drawn (133,164 in the scene), 79 draw calls, 0.63 MB of assets. The triangle count is still above the ~120k target and the cut has not been started.
   - The 269 ms frame is SwiftShader on a busy host (load 6.2), so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.**
- There were no console errors.
- The wolf silhouette is still weak.
- The triangle count is above target.
- The `clover` fix is unverified.

**Next:**
1. **Cut the triangles to about 120k or less (asked again).**
   - Halve `bushes` (8.2k), `walls` (7.8k) and `rocks` (6.4k).
   - Give `sheep-shadow` (10.1k) and `sheep-heads-shadow` (8.1k) one lower-poly shared shadow proxy.
   - Drop the `sheep-ink` (10.1k) segment count.
   - The one call that shows it done is `perf` with `costs`. It should read about 120k or less in total, with the flock silhouette unchanged in a `look`.
2. **Make the wolf read as a wolf (asked again).**
   - Raise the head, add two pointed ears, and give the snout a notch under the jaw.
   - Make the `wolf-leg`s visibly separate dark shapes with gaps between them.
   - Thicken the `wolf-outline` rim in warm brown so the silhouette separates from the hills.
   - The one call that shows it done is `look` with `zoom` [60, 70, 260, 150] on the start frame. It should show ears, a snout with a notch, four separate legs and a tapered tail, not a plank.
3. **Verify the `clover` leaves (asked again).**
   - Run `look` with `zoom` on a clover position, taken from `observe`.
   - It should show three inked heart leaves with no z-fighting flicker.
   - Add a soft glow ring when the player is near.
   - Also enlarge the HUD hint text.

SCORE: 7.6
