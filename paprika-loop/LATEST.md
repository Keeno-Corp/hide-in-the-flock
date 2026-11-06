The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 31
**Did**: game.js: added low-poly `shBody`/`shHead` (ico detail 0) used only for the `sheep-shadow`/`sheep-heads-shadow` proxy meshes (the ink hulls keep `hullBody`/`hullHead`); `rockGeo` second blob and `bushGeo` two side blobs dropped to ico detail 0.
**Saw**: `perf costs`: 112,412 triangles in scene (115,310 as drawn, was 136k), 79 draw calls, 0 console errors. Start `look`: flock silhouette unchanged, clover rings read as green discs with a leaf at the start camera (no z-fight visible, not zoomed). The wolf is still a black plank, 4.7% of frame, with the snout pointing right; its legs are thin sticks and the rim is faint.
**Next**: (1) make the wolf read: ears, a snout notch, a warm brown thick `wolf-outline`, legs with gaps; check with `look` zoom [270,385,610,570]; (2) zoom `look` on a clover and add a glow ring when near; (3) enlarge HUD hint text.
**Open**: wolf pounce/leap poses unchecked against the new profile; no interact replay this session.

### Judge 31

**Session 31 verdict.** I looked at a 3-cell sheet (start, human bite, AI bite), took a zoom on the wolf and ran `perf` with `costs`. I did not run `interact` or `feel`, did not check sound, and did not zoom on a clover. The sheet showed no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` still read as a storybook.
   - `wolf-body` is the darkest shape on screen (2% near black), so the Checks hold.
   - The `wolf-outline` rim is now a thick warm brown and is visible. The wolf still has no readable head or legs.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - In the zoom the wolf is a rounded plank. There are two small brown spikes on its back that could be ears, a yellow eye dot at the right edge, and no snout notch.
   - Its `wolf-leg`s are thin dark sticks hidden behind the `wolf-rock` and the sheep. It does not match the WOLF turnaround's prowl pose.
3. **Clip moment: 9.**
   - The human bite shows the "GOTCHA / HUMAN" stamp in red ink, the "PLAYER 1" stamp, red splatter and a woodcut duotone.
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost." and the "baa?" bubble.
   - I did not time when the card lands.
4. **Core loop and controls: 7.5.**
   - Carried over without playing.
   - The `clover` rings read as green discs at the start camera, but they are not verified at zoom.
   - The HUD hint text is tiny.
5. **Local 2-player: 7.** Carried over without playing. I did not check pounce targeting.
6. **UI typography: 8.5.** IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines. The HUD text is small.
7. **Convention and performance: 7.5.**
   - The page draws 115,310 triangles, with 112,412 in the scene. That is within the ~120k target. It uses 79 draw calls and 0.63 MB of assets.
   - The 348 ms frame is SwiftShader on a busy host (load 4.8), so it is not a signal.
   - `window.__game` is present.
8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The triangle target is met.
- The wolf silhouette is still a plank.
- The `clover` fix is unverified at zoom.

**Next:**
1. **Make the wolf read as a wolf (asked again).**
   - The rim is done. What is left is the shape.
   - Rebuild the `wolf-body` silhouette: a lowered head with a tapered snout and a notch under the jaw, two ears that stick up above the head line, and a narrower waist.
   - Lift the body off the `wolf-rock` so four `wolf-leg`s show with gaps between them, and taper the tail.
   - The one call that shows it done is `look` with `zoom` [270, 385, 610, 570] on the start frame. It should show a head with ears and snout, four separate legs, and a tapered tail, not a rounded slab.
2. **Verify the `clover` leaves (asked again).**
   - Take a clover position from `observe`, then run `look` with `zoom` on it.
   - It should show three inked heart leaves with no z-fighting flicker.
   - Add a soft glow ring when the player is near.
3. **Enlarge the HUD hint text and play-check (asked again).**
   - Raise the font size of the top-right "[M] mode / WASD" hint and of the left-hand `TIME` and `BITES` labels, so they read at a laptop viewport. Check with `look` `viewports` ["laptop"].
   - Then run one `interact` solo pass with `Shift` run and `E` graze on a clover.
   - Check the wolf's pounce pose against the new profile, since the last Open says it is unchecked.

SCORE: 7.6
