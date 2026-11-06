The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 3

**Judge verdict, session 3**

1. **Looks as LOOK.md says: 6.**
   - Sky is 21%, `sea` 9.7% and `ground` 36%. The meadow is bright and low-poly, with no `Lighting:` or `Surfaces:` lines.
   - `cloud` ×35 is now 3.2% and puffy clouds show in the opening frame. That is the one visible gain since session 2.
   - `wolf` is 0.68% [366,473,508,584], crouched by `wolf-rock`. It is still small, and it reads as a grey lump among the white sheep.
   - The `pines*` ×146 (13%) wall the left and right edges.
2. **Plays as DESIGN.md's Core loop and Controls say: 5.**
   - I put the player at (-7, 9) by `state` and held E for 240 frames. `player.grazing` turned true, but `clovers` stayed 0 and `cloverProgress.0` stayed 0.
   - I did not stand on a `clover` position, so this proves nothing about collecting. It also leaves unverified whether the player can find and use a patch.
   - Setting `state: {t: 1}` only moved the clock to 3.02. The win and lose screens are still not seen, so they are unverified for the third session.
3. **The clip moment: 7.**
   - The slow-mo leap fills the frame, with the wolf stretched across the sheep and the nature-documentary caption below it. This works.
   - My `pounce` sheet cells showed only the leap and the captions "Something about that sheep is... off." and "That sheep walks like it has somewhere to be." Both are shown before the verdict. I did not see the reveal cards ("HUMAN! GOTCHA", "AI SHEEP") this session. Session 2 saw them.
   - The wolf in the leap is a dark grey slab with boxy front legs.
4. **Looks like refs/01.jpg: 5.**
   - The `sea` band and the clouds are now there.
   - The sand beach and the grey cliffs are still missing, for the third session. The shoreline is hidden behind the `pines*` and the sea meets the hill directly.
   - The wolf is not prominent, so "wolf crouched on its rock" does not read at a glance.
5. **Solo is genuinely fun and fair: 5.**
   - The `SUSPICION` bar is present, and the player's blending (`flock.graze`) responds.
   - The 3 `clover` objects are only 0.05–0.15% of the frame and hard to find. There is no marker or hint.
   - The win and lose screens and restart are unseen.
6. **Local 2-player: 5.**
   - Session 2 saw the mode toggle. I did not play the Enter pounce, and the `aim` and `reach` indicators were hidden and never seen.
7. **`window.__game`, no build, ~100 sheep at 60 fps: 6.**
   - `__game` works and `sheep*` is ×101.
   - `perf` reads 148 ms median with 69 draw calls and 102k tris. The host load is 4.8 and the renderer is SwiftShader, so this is not a real-GPU number and is not scored down.
   - The `cloud` meshes are 46 draw calls and `tufts*` are about 11k tris, which are reasonable to trim.
8. **Juice: 7.**
   - Sound events fired: wind, baa and baa2.
   - The captions are funny. The wool burst and the caption cards work.
   - The grazing head bob is not visible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - `#hud` and `#mode` have 0 cut off at 1280×800. `viewports` was not run.
10. **Faults: 7.**
    - There are no console errors and no `Never visible` object.
    - The scenery gaps from refs/01.jpg are still there. The leap legs are still boxy.

**Next:**
1. **Sand strip and grey cliffs (asked again, third time).** The shore is behind the `pines*`. Thin or remove the `pines*` in the back 25% of the island, between the camera's far edge and the `sea`. Put a sand ring mesh (#d9c98a) at the shoreline, and one grey low-poly cliff block on the right at the back. Search for it in an asset library: "low poly cliff rock". To check, `look` with `sample` at (640, 215) and (640, 235). Sand shows as #d9c98a-ish instead of green or blue, and `look` lists a `cliff` or `sand` object above 1%.
2. **Make the wolf big and readable on its rock (asked again).** The wolf is 0.68% now. Raise it above 1.5% by scaling `wolf` and `wolf-rock` ×1.6, or move the opening camera closer and lower. Give the wolf a lighter or warmer colour such as brown-grey #8a7560 so it stands out from the white sheep. Round the leap legs by replacing the boxes with capsule or cylinder limbs. The `look` list should show `wolf` above 1.5%, and the `pounce` sheet pose should read as a wolf.
3. **Play what nobody has verified, in order (asked again).**
   - Read the real `clover` positions with `eval` (`window.__game` or the scene's `clover` objects). Use `interact` to put the player exactly on one, hold E, and expect `clovers` to go to 1. Add a glowing ring or sparkle on each `clover` so it is findable; they are 0.05% of the frame now.
   - Add an `act` action for the end of the round, such as `{action:"win"}` and `{action:"lose"}`. Then `look` at both screens and the R restart.
   - Play the Local-mode Enter pounce with the `aim` indicator visible, and show it in a `sheet` moment.

SCORE: 6.0

## Iteration 4
**Did**: `wolf` scale 3.6→5.2 and recoloured brown-grey (#8a7560, light #c9b393); added `cliff` (grey icosahedron at 34,5,-44) and `sand` ring (r46-62 at sea level) next to `sea`; pines at the back (z<-20) now 97% culled so the horizon is open; clover star markers are larger (scale 2, y 2.2) and always faintly visible (35%+ opacity, full when near); `act({action:'win'|'lose'})` added to end the round for checks.
**Saw**: opening look: `wolf` ×6 1.6% (was 0.68%), `cliff` 1.4%, `sand` 0.05% (thin sliver, still tiny), clover ×3 0.12%, pines ×137 12%, no Never-visible, no errors. `{action:"win"}` shows the "THE FLOCK WINS / YOU BLENDED IN" band, readable. No `perf` run this session.
**Next**: (1) sand is only a sliver: widen/raise it where the hill meets the sea (the `ground` mesh hides it); (2) play clover grazing on a real clover position (14,-5), (-3,15), (-19,8) with E held, and the `lose` screen and Local Enter pounce, still unverified; (3) round the leap legs (capsules instead of boxes), merge cloud puffs.
**Open**: leap legs still boxy; clover collection, lose screen and Local pounce not played this session; no perf number.
