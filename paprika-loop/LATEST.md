The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 32

**Session 32 verdict.** I looked at a 3-cell sheet (start, human bite, AI bite), took a zoom on the wolf and ran `perf` once. I did not run `interact` or `feel`, did not check sound, and did not zoom on a clover. The sheet showed no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` still read as a storybook.
   - `wolf-body` is the darkest shape on screen (3% near black), so the Checks hold.
   - The wolf's brown `wolf-outline` rim shows.
   - The two `wolf-head` ears are now tall brown cones that read as horns. They are the one clearly wrong shape on the wolf.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - In the zoom the wolf is now a profile with a long snout, a yellow eye and a tapered tail. That is better than the plank.
   - The ears are taller than the head is deep, and the snout has no jaw notch.
   - Only two `wolf-leg`s show, as dark stubs below the body, and the other two sit behind the `wolf-rock`. The wolf looks stiff next to the WOLF turnaround's prowl pose.

3. **Clip moment: 9.**
   - The human bite shows "GOTCHA / HUMAN" in red ink, the "PLAYER 1" stamp, red splatter and a woodcut duotone.
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost." and the "baa?" bubble.
   - I did not time when the card lands.

4. **Core loop and controls: 7.5.**
   - Carried over without playing.
   - The `clover` rings read as green discs at the start camera, but they are not verified at zoom.
   - The HUD hint text is still tiny.

5. **Local 2-player: 7.** Carried over without playing. I did not check pounce targeting.

6. **UI typography: 8.5.** IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines. The HUD text is small.

7. **Convention and performance: 7.5.**
   - The page draws 115,310 triangles with 79 draw calls and 0.63 MB of assets, which is within the ~120k target.
   - The 240 ms frame is SwiftShader on a busy host (load 4.7), so it is not a signal.
   - `window.__game` is present.
   - The `#paper` overlay sits over the canvas at the start frame, which the builder did not chase.

8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The ears read as horns.
- The `clover` and HUD size are still unchecked.

**Next:**
1. **Fix the wolf's ears and add a jaw notch and legs (asked again).**
   - Shrink the `wolf-head` ears to about 0.25 tall, with a wider base and a slight backward tilt, so they sit just above the head line.
   - Cut a notch under the jaw in the `wolf-body` polygon.
   - Move the `wolf-rock` or the wolf so all four `wolf-leg`s show.
   - The one call that shows it done is `look` with `zoom` [250, 340, 760, 640]. It should show ears no taller than the head is deep, a jaw notch and four legs.
2. **Verify the `clover` leaves and add a glow ring when the player is near (asked again).**
   - Get a clover position from `observe`, then run `look` with `zoom` on it.
   - It should show three inked heart leaves with no z-fighting flicker.
3. **Enlarge the HUD hint text and play-check (asked again).**
   - Raise the top-right "[M] mode / WASD" hint and the `TIME` and `BITES` labels to at least 13px.
   - Check with `look` `viewports` ["laptop"].
   - Then run one `interact` solo pass with `Shift` run and `E` graze on a clover.
   - Check the pounce pose against the new wolf profile.

SCORE: 7.6

## Iteration 33
**Did**: game.js: `wolf-head` ears are now short cones (0.11×0.26, tilted back) instead of 0.55 horns; `wolf-rock` scale 1.9→1.5 so the rear `wolf-leg`s show.
**Saw**: `look` zoom [250,340,760,640] twice: ears sit just above the head line; now three-to-four legs visible (rear pair beside the rock). No jaw notch (head is a separate group from the `wolf-body` polygon). HUD font is already 19–22px in index.html, so I left it. No `perf`, no `interact`. Wolf may float slightly over the smaller rock (ROCK.top 4.1 unchanged); not checked.
**Next**: (1) check wolf foot height on the smaller rock, and the pounce pose; (2) zoom `look` on a clover and add a glow ring when near; (3) `interact` solo pass with Shift and E.
**Open**: jaw notch not done; clover zoom and play-check still open.
