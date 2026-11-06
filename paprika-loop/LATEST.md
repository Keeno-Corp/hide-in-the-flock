The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 33
**Did**: game.js: `wolf-head` ears are now short cones (0.11×0.26, tilted back) instead of 0.55 horns; `wolf-rock` scale 1.9→1.5 so the rear `wolf-leg`s show.
**Saw**: `look` zoom [250,340,760,640] twice: ears sit just above the head line; now three-to-four legs visible (rear pair beside the rock). No jaw notch (head is a separate group from the `wolf-body` polygon). HUD font is already 19–22px in index.html, so I left it. No `perf`, no `interact`. Wolf may float slightly over the smaller rock (ROCK.top 4.1 unchanged); not checked.
**Next**: (1) check wolf foot height on the smaller rock, and the pounce pose; (2) zoom `look` on a clover and add a glow ring when near; (3) `interact` solo pass with Shift and E.
**Open**: jaw notch not done; clover zoom and play-check still open.

### Judge 33

**Session 33 verdict.** I looked at a 3-cell sheet (start, human bite, AI bite), took the wolf zoom [250,340,760,640] and ran `perf` once. I did not run `interact` or `feel`, did not check sound, and did not zoom on a clover. The sheet showed no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky` and sun disc, the layered `ridge*` hills, the inked `oaks*` and pines, the paper grain and the cream `sheep*` still read as a storybook.
   - `wolf-body` is the darkest shape on screen (3% near black), so that Check holds.
   - The `wolf-head` ears are now small cones and no longer read as horns.
   - The wolf is still a large flat blob. Its brown `wolf-outline` is a thick offset halo, not an ink line, and the hatching on it reads as a texture.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The zoom shows a profile with a long snout, a yellow eye and four `wolf-leg`s, which is better than last round.
   - There is no jaw notch, so the snout is a plain wedge.
   - The body is a stiff rectangle with no shoulder, haunch or tail curve, unlike the WOLF turnaround's prowl.
   - The legs are straight dark stubs, and the front pair sits in front of the `wolf-rock`.
   - Biggest remaining style gap: the wolf's silhouette is a block with no neck, chest or haunch shape.

3. **Clip moment: 9.**
   - The human bite shows "GOTCHA / HUMAN" in red ink, the "PLAYER 1" stamp, red splatter and a woodcut duotone.
   - The AI bite shows "BAA? / SHEEP", "Just a sheep. Bite lost." and the "baa?" bubble.
   - I did not time when the card lands.

4. **Core loop and controls: 7.5.**
   - Carried over without playing.
   - The `clover` rings read as green discs at the start camera, but they are not verified at zoom.
   - The HUD text is small in the 1280-wide sheet.

5. **Local 2-player: 7.** Carried over without playing. I did not check pounce targeting.

6. **UI typography: 8.5.** IM Fell panels and Alfa Slab stamps on cream have ink borders, and the captions are storybook lines. The HUD panels are tiny in the 1280×800 view.

7. **Convention and performance: 7.5.**
   - The page draws 115,310 triangles with 79 draw calls and 0.63 MB of assets.
   - The 247 ms frame is SwiftShader on a busy host (load 4.9), so it is not a signal.
   - `window.__game` is present.
   - The `#paper` overlay cleared after about 2.3 s.

8. **Juice: 7.5.**
   - The pounce, splash and stamps work.
   - I did not hear the sound.

**Faults: 7.5.**
- There were no console errors.
- The wolf's brown halo is thick.
- The `clover` and play pass are still unchecked.

**Next:**
1. **Reshape the wolf silhouette and add a jaw notch (asked again).**
   - Edit the `wolf-body` polygon in game.js. The head is a separate group, so the notch has to be a gap under the jaw on the snout mesh (`wolf-head`) or a cut-out in that group.
   - Give the polygon a raised shoulder, a sloped back, a tucked belly and a curved tail.
   - Thin the `wolf-outline` offset to about a third of its current width, so it reads as ink rather than a halo.
   - The one call that shows it done is `look` with `zoom` [250, 340, 760, 640]. It should show a notch below the snout, a back that is not a flat rectangle and a thin outline.
2. **Verify the `clover` leaves and add a glow ring when the player is near (asked again).**
   - Get a clover position from `observe`, then run `look` with `zoom` on it. It should show three inked heart leaves.
   - Then run `look` with `sample` at the ring pixels while the player stands beside it.
3. **Play-check solo with `interact` and enlarge the HUD (asked again).**
   - Run one `interact`: hold `ShiftLeft` for 60 frames, then `E` on a clover, with `trace` on the state's suspicion value.
   - Check that the Motion line shows eased movement.
   - Raise the HUD panel text, which is tiny at 1280 wide, and check it with `look` `viewports` ["laptop"].

SCORE: 7.6
