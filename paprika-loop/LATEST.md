The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 8

**Judge verdict, session 8**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - `sand` is still 0.43%, [362,298,794,321], and the sample at (640,310) is #dbd8be. Iteration 8 widened the ring, but the beach is still a pale strip behind the rocks.
   - The `Surfaces:` line for `pines` at y=4.30 is still there, 17 × 73 units. It has now been open for 4 sessions.
2. **Plays as DESIGN.md says: 7.**
   - I pressed `M`, then ArrowRight ×30. The mode switched to local and the `wolf` moved to x=-4.5 with pose "walk".
   - Solo HUD shows the `SUSPICION` bar, 3 clover icons and the 3 bite dots.
3. **The clip moment: 8.**
   - The pounce is much better than in session 7. In h50 the wolf is a small, readable leap over the flock and no black boxes fill the frame.
   - By frame 100 the human case shows "HUMAN! GOTCHA", "PLAYER 1 has been found." and a red PLAYER 1 tag over a red figure.
   - The AI case shows "BITE WASTED / AI SHEEP", a "baa?" bubble, bite dots dropping to 2 and wool particles.
   - The a100 wolf is still a brown stiff figure standing on its hind legs. It reads as a shrug only weakly.
   - The slow-mo arc and the wool burst are not strong in a50, where the wolf is a dark lump at distance.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and the bright meadow all show.
   - `wolf-rock` is 0.64%. The wolf in the idle look is a brown lump beside the rock, not crouched on top.
   - The beach is a thin sliver.
5. **Solo fun and fair: 7.**
   - The suspicion bar, the hint line, the captions and the restart key are present.
   - The 3 `clover` objects are 0.15% of the frame and the glow is hard to see. They are findable only as small green blobs.
6. **Local 2-player: 7.**
   - After ArrowRight ×30 the `aim` ring shows as a faint orange ring under the wolf at about (470,400) in the picture.
   - It is visible but dim, and `aim` is listed only under "not found by the ID image". The pounce target is not obvious from the wolf's position among 90 sheep.
   - 3 bites show in the local HUD.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` has its keys and actions, and `observe` works.
   - `perf` reads 170 ms with 68 draw calls and 102k triangles on SwiftShader. Host load is 3.0 on 8 cores. There is no signal about a real GPU.
   - 68 draw calls and 102k triangles are modest.
8. **Juice: 7.**
   - The banners, the "baa?" bubble, wool bursts and the nature-documentary captions ("That sheep walks like it has somewhere to be.", "A completely innocent sheep. Awkward.") are good.
   - The sound line was not checked. Sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The 1280×800 HUD is fine. I did not run `viewports` this session, so it stays at 6.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar line, the thin beach and the wolf not crouched on its rock are all still open.

**Next:**
1. **Fix the `pines` coplanar face for real (asked again).**
   - Iteration 8 shortened the trunk cone, and the same y=4.30 line is still listed. Find the plane another way.
   - Run `eval` to list, for each `pines` mesh, the distinct y values of its vertex positions and which part owns the y=4.30 ones.
   - Likely it is the shared base disc of two stacked cone tiers. Offset the upper tier's base by 0.01, or drop its bottom cap (`openEnded`).
   - To check, run `look`. The `Surfaces:` line for `pines` is gone.
2. **Make the beach a real wedge (asked again).**
   - `sand` is 144×144 and the ring change had no effect, because `ground` covers it. Lower the `ground` vertex heights where the distance from the centre is above about 55, so the shore slopes under the sand. Alternatively raise `sand` y by 0.05 above `ground` with polygonOffset.
   - Make the sand colour warmer, about #e8d49a.
   - To check, run `look` with `sample` at (640,310) and (500,300). `sand` should be above 1% in the list and read as a golden strip against the sea.
3. **Make the wolf read as crouched on `wolf-rock`, and make the clovers and `aim` pop (asked again).**
   - The wolf at idle is a brown lump beside the rock. Put its `root` on top of `wolf-rock`, with a crouch pose (front legs down, head low). Add a pale muzzle and a dark nose.
   - Give each `clover` a pulsing pale-yellow sparkle ring, or a vertical light beam, that is visible at the play distance.
   - Make the `aim` ring brighter, with an emissive colour and a radius of 2.5.
   - To check, run `look` for the idle frame. `wolf` sits on top of `wolf-rock` and `clover` is above 0.3%. Then run `interact` with `M` and ArrowRight ×30, with `look: true`. The ring should be clearly visible.

SCORE: 6.9

## Iteration 9
**Did**: game.js ground vertex colour: `sand` now #e8d49a, applied where cy<2.4 and r>26 (wider, stronger shore). `pineGeo` tiers nudged (y 1.51/2.53/3.46) to break coplanar planes. `aim` ring 1.6–2.5 radius, orange #ff6a2a. Clover `star` group gained an open cylinder beam (6 tall) and a taller cross.
**Saw**: opening look: sand now shows as a golden path strip along the shore/trails, no `Surfaces:` line for `pines`, no Never-visible, HUD 0 overlap. `sand` ring still 0.43% (ground hides it, but the ground colour now carries the beach). `clover` 0.15% (beam is opacity-pulsed, only visible near). perf not run; local-mode aim not re-checked.
**Next**: (1) put the wolf on top of `wolf-rock` in a crouch with a pale muzzle; (2) check the clover beam and `aim` in play via interact (M, ArrowRight×30); (3) run `viewports` for HUD at small sizes.
**Open**: wolf still beside the rock; clover beam brightness unverified; perf unmeasured.
