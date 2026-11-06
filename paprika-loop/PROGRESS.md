# Progress

The request is in PROMPT.md. Each session of the loop appends one section here: a builder's `## Iteration n` (Did, Saw, Next, Open) and the judge's `### Judge n` (its scores, Next). LATEST.md holds the last of each, rewritten by the loop after every session; the next builder reads the latest Judge's Next there first.

## Iteration 1
**Did**: The page already existed (loop 1), so it was improved in place. (1) `loop()` in game.js now ends with a draw-nothing `renderer.render(scene, camera)` on empty layer 31 (no clear, no shadow update). Before this, the tools saw only the post-pass quad: `look target`, `subject` and `On screen` could not see the wolf or the player. `window.scene/camera/renderer` and `__game.scene/camera` are exposed, and `__game.subject` is now `'wolf'`. (2) The wolf (`W.root`, `W.body`, `W.head`, `W.legs`, `W.tail`) is rebuilt from smooth spheres and tapers as one flat `PAL.wolf` MeshBasicMaterial, so no facets. It has a long snout, tall cone ears, slim legs, a bush tail and small yellow eye glints. The group layout and animation poses are unchanged. (3) The pines are cut from 130 to 64 and moved out to radius 52+, so the horizon is open like BOARD.png.
**Saw**: The opening frame has a rose-apricot sky (#edd4af at (640,40)), an ochre-sage meadow and ink outlines. The wolf reads as a clean near-black silhouette at 0.77% of the frame; its subject brightness is 14% against 52% around it. The bite beat works: the leap, then the held duotone frame with the HUMAN stamp, GOTCHA, PLAYER 1 and the ink splash at about frame 110-170. The AI sheep path gives SHEEP and baa?. I did not run `perf`; the software renderer says nothing about frame time.
**Gaps vs BOARD/SHEEP/WOLF sheets**: BOARD has a bigger flat sun and brighter pink-orange cloud bands, with layered mauve hills that are wider and softer. Ours has a small pale sun and a mostly flat cream sky, with the ridges barely showing. Sheep in SHEEP.png have an indigo underbelly shadow, thin dark legs, and the dark head with ears visible; ours are small cream lumps with no indigo belly. The wolf is still low and small next to BOARD, where it crouches on a bigger rock, and the leap pose is not as long as WOLF.png's.
**Next**: (1) Sky: a larger sun disc and stronger rose/apricot cloud bands, plus mauve ridges with real size. (2) Sheep: an indigo belly band, slimmer legs, visible ears, and a graze pose with the head down. (3) Make the wolf and its rock larger and bring the wolf's head up in `crouch` (head.rotation.x about -0.1). (4, done after the handoff: wall blocks got tiny unique height offsets, so the walls z-fight warning is gone.) (5) The game uses `Math.random` in places; swap it for the seeded rng.
**Open**: Nothing broken. `look` with a custom `camera` bypasses the post pass, so no ink shows there and the picture misleads, and a plain `look` afterwards can reuse that camera until `open` is called again. Not checked: local 2-player and the clover grazing flow.

### Judge 1

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 6.** The sky at the top of the frame is rose-apricot, and the meadow reads olive-ochre. The `ridge*` ×3 mauve ridges are layered, and paper grain and ink outlines show. Check 3 passes: `wolf` subject brightness is 14% against 51% around it. The faults:
   - The `pines*` ×40 are dark flat green cones, and the `round-trees*` are glossy lollipop balls with visible facets. They read as 3D game assets, not painted masses.
   - The sky is mostly flat cream, and the sun disc is small and pale.
   - The wolf takes only 0.68% of the frame.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.** The `sheep*` ×101 are small cream lumps with no indigo belly, ears or thin dark legs. `wolf` and `wolf-rock` are low and small, with no crouch silhouette. The biggest remaining style gap is that the trees and sheep have 3D shading while the sheet is flat gouache.
3. **Clip moment: 8.5.** `interact` with a human pounce shows the held duotone frame, a tilted HUMAN stamp card with GOTCHA, a PLAYER 1 tag, the `splash` ink splash and the `cap` caption. The sound list has boom, stab ×3, thud and hit. The wolf `pounce` reveal runs in about 1.2 s. I did not view the AI-sheep variant (SHEEP and baa?) or check the slow-mo and camera punch-in.
4. **Core loop and controls: 6.** The HUD shows time, clovers, wolf bites and suspicion, and the `mode` panel lists the controls. The `clover` ×3 are nearly invisible: 0.1% of the frame, drawn as pale ghost columns. I did not test grazing, the win and lose cards or restart.
5. **Local 2-player: 4.** I did not run it. `wolfRing`, `aim` and `aimArrow` are hidden in solo, so targeting clarity is unverified.
6. **UI typography: 8.** The HUD is on cream paper panels with ink borders in IM Fell and Alfa Slab. The `#hud` and `#mode` boxes are not cut off or overlapping, and the `cap` caption is a storybook line. I did not check small window sizes.
7. **Convention and performance: 7.** `__game` works, play starts on load, and the flock is ~101 sheep in a few draw calls (45 total). `perf` reads 321 ms a frame on SwiftShader, which says nothing about a real GPU. There are 322k triangles, which is heavy for a flat style, and the `div#paper` overlay stays up at 0.55 opacity.
8. **Juice: 6.** The bite has a layered sound stack. Sheep grazing animation was not looked at.

**Faults: 6.5.** There are no console errors, `Never visible` is none, and the opening look has no `Lighting:` or `Surfaces:` fault lines. The second `look`, on the held bite frame, flagged a `Surface:` fault: `ground` covers 57% with dense fine detail (49/255) that reads as noise and shimmers as it moves. That frame is the woodcut duotone, so the detail is probably the hatching and grain in the post pass. It is not confirmed as intended, and it may also show in normal play. The `player` object is not seen by the ID image.

**Next:**
1. **Trees: flatten `pines*` and `round-trees*`.** The tree masses look the most like a 3D game. Remove the specular and facet shading. Use 2–3 flat toon bands in sage and olive with an indigo shade side. Soften the pine cones and fade them into haze with distance. The check is a `look` zoom on a pine and a round tree showing flat banded fills with no gloss. Also run a search for oak, pine and sheep models in the words a library would use ("stylized flat sheep", "low poly pine tree"), since these are still code-made and the asset search files hold no search for them.
2. **Sheep to the SHEEP.png sheet (asked again).** Add an indigo underbelly band, thin dark legs, visible dark ears and a head-down graze pose, and make the sheep a little larger. The check is a `look` zoom on the front flock showing an indigo belly and dark legs, with wool still above #d8cfae.
3. **Sky, sun and clovers, plus the ground noise.**
   - Make the sun disc large and flat, add stronger rose and apricot cloud bands, and enlarge the mauve ridges. The sky part was asked last round and is still not done (asked again). The check is `look` with `sample` at (640,40) and at the sun, which should show r−b above 40 with a visible disc.
   - Give the `clover` ×3 an ink-outlined painted patch that shows at least 0.5% of the frame.
   - Fade the hatching and the `ground` detail with distance in the post pass, so the `Surface:` line on `ground` clears in a `look` after `interact` steps. Check the plain gameplay frame too.

SCORE: 6.3

## The request changed

paprika-loop/PROMPT.md changed before session 2; the Next lists above were written before it. Changed lines:
+ Browser three.js game (plain page, no build step; index.html, game.js, fx.js, geo.js, fonts/): a sheep hidden among ~100 AI sheep in a dusk meadow; a wolf has 3 bites. Solo (AI wolf hunts the player) and local 2-player on one keyboard (second player is the wolf). The page is improved in place, not rebuilt. The look is held to LOOK.md, CHARACTERS.md, the picture sheets refs/sheets/BOARD.png (look board: key art, palette, bite inset), refs/sheets/SHEEP.png and refs/sheets/WOLF.png (character turnarounds), refs/sheets/LOOK.png and the references in refs/ (01 Fink pastoral painting, 03 Vogel woodcut) and refs/study/ (layered-hill and flat-meadow frames). STYLE IS JUDGED AS HARD AS GAMEPLAY.
+ 2. `compare` against refs/sheets/BOARD.png (the target frame), refs/01.jpg and refs/sheets/LOOK.png; sheep and wolf match their turnarounds keeps improving or holding; the judge names the biggest remaining style gap each round.
- Browser three.js game (plain page, no build step; index.html, game.js, fx.js, geo.js, fonts/): a sheep hidden among ~100 AI sheep in a dusk meadow; a wolf has 3 bites. Solo (AI wolf hunts the player) and local 2-player on one keyboard (second player is the wolf). The page is improved in place, not rebuilt. The look is held to LOOK.md, CHARACTERS.md, refs/sheets/LOOK.png and the references in refs/ (01 Fink pastoral painting, 03 Vogel woodcut) and refs/study/ (layered-hill and flat-meadow frames). STYLE IS JUDGED AS HARD AS GAMEPLAY.
- 2. `compare` against refs/01.jpg and refs/sheets/LOOK.png keeps improving or holding; the judge names the biggest remaining style gap each round.

## Iteration 2
**Did**: game.js only, small edits. (1) Sky shader: sun disc about 4x wider, with a rose ring, stronger glow (.8), cloud bands start earlier, and the cloud colour is rose/apricot instead of cream. (2) Sheep: `sheepBodyGeo` gets an indigo belly ellipsoid (0x4a5278) and thinner near-black legs. (3) `clover` ×3 each get a painted green `patch` disc (r 2.6) with an ink `outl` ring.
**Saw**: One `look` at frame 0. The sun disc is large and pale with a visible halo. The clover patches show as green discs, 1.2% of the frame. The sheep belly is hard to see at this camera distance, so I did not zoom. The `walls` z-fighting warning is back in `look`: a 9.2×0.51 plane, probably the cap stones from `Math.random` offsets. No console errors. I did not run `perf`.
**Next**: (1) Trees are untouched: flatten `pines*` and `round-trees*` (still shaded like 3D assets), and run `asset_search` for stylized trees and sheep. (2) Zoom-check the sheep belly, ears and graze pose. (3) Fade the post-pass hatching with distance, to clear the `ground` Surface line. (4) Fix the `walls` z-fight for good: use polygonOffset or a fixed seeded offset. (5) Wolf and rock size, the crouch pose, and the seeded rng.
**Open**: (walls z-fight fixed after the note: random block lengths plus polygonOffset on the walls material; a `look` shows no Surfaces line.) The sky and sheep changes are not compared against BOARD.png. Local 2-player and the clover grazing flow are still unplayed.

### Judge 2

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 6.5.**
   - The sky now has a large flat sun disc with a rose halo, and cloud bands. `sample` at (640,40) gives #efcea6, so r−b is 73.
   - The `ridge*` ×3 are layered, and the grain and ink outlines hold. The `wolf` is the darkest shape: 14% brightness against 53% around it.
   - The `pines*` ×42 and `round-trees*` ×11 are still shaded 3D cones and lollipop balls with facets. They read as game assets, not painted masses.
   - The `ground` is still shaded and noisy, and the raking shadows are soft.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `sheep*` ×100 are still small cream lumps. The indigo belly and legs are not readable at this distance.
   - The `wolf` takes 0.65% of the frame and sits behind `wolf-rock`, with no crouch silhouette like WOLF.png.
   - The biggest remaining style gap is still 3D shading on the trees and sheep against flat gouache.
3. **Clip moment: 9.** The sheet shows the "pounce human" cell as a woodcut freeze with a tilted GOTCHA / HUMAN stamp, a PLAYER 1 tag, the `splash` and a caption. The "pounce ai" cell shows BAA? / SHEEP, "Just a sheep. Bite lost." and a `baa?` bubble. Both read clearly. I did not check slow-mo or the camera punch-in.
4. **Core loop and controls: 6.5.**
   - The `clover` patches are now green discs with ink rings, 1.1% of the frame. They are findable, but the faint pale columns on them still look like ghosts.
   - The HUD shows time, clovers, bites and suspicion.
   - I did not test grazing, the win and lose cards or restart.
5. **Local 2-player: 6.** The "local" sheet cell shows a mode panel with P1 and P2 controls, a storybook hint caption "Wolf: walk to the flock with arrows…", a `wolfRing` and a red marker above the target. Pounce targeting is visible. The wolf is tiny, and I did not play a full bite.
6. **UI typography: 8.5.** The cream paper panels have ink borders, with IM Fell and Alfa Slab type. There is no overlap and nothing is cut off. I did not check small window sizes.
7. **Convention and performance: 6.5.** `__game` works and play starts on load. There are ~100 instanced sheep in 51 draw calls. `perf` reads 359 ms on SwiftShader, which says nothing about a GPU. 331k triangles is heavy for a flat style, mostly the `pines*`, `tufts*` ×335 and `rocks*`. `div#paper` stays up.
8. **Juice: 6.5.** The bite sound stack was seen last round and the visual beat is strong. Grazing and wolf animation were not checked closely. In the "play" cell the wolf has a running pose.

**Faults: 7.** There are no console errors and `Never visible` is none. The `walls` z-fight is gone, with no `Lighting:` or `Surfaces:` lines on the opening look. Only `perf` is over budget, and that is a software-render artefact.

**Next:**
1. **Trees: flatten `pines*` and `round-trees*` (asked again).** This is the biggest remaining style gap, and it has been untouched for two sessions.
   - Use a flat 2–3 band toon material in sage and olive with an indigo shade side, no specular, and smooth normals on the ball trees. Halve the pine count to cut triangles.
   - Run `asset_search` for "stylized pine tree" and "low poly oak", and for "stylized sheep" and "wolf", since these are all still code-made and the asset search files hold no search for them.
   - The check is a `look` zoom on [0,150,500,450] showing flat banded fills with no gloss or facets.
2. **Sheep and wolf to the turnarounds.**
   - Enlarge the sheep about 1.4×. Make the legs and ears distinctly dark, and the belly indigo, so they read at the flock distance.
   - Raise or shift `wolf-rock` so the `wolf` silhouette is not hidden. Move the camera closer or make the wolf larger so it takes more than 1.5% of the frame, and give it a crouch pose.
   - The check is a `look` zoom on the flock [230,460,700,690], showing dark legs and an indigo belly with the wolf's full outline against the sky or the field.
3. **Ground and clovers.**
   - Flatten the `ground` shading into painted bands. Fade the post-pass hatching with distance, so the hatching does not shimmer on the `ground`.
   - Remove the pale translucent column over each `clover`, or turn it into a small painted flower glint.
   - The check is a `look` with `sample` on the ground, where neighbouring pixels should be near uniform. The `Surfaces:` line should stay clear after `interact` steps.

SCORE: 6.8

## Iteration 3
**Did**: game.js only. (1) New `toon2` 2-band gradient and `treeMat()` (emissive 0x1c2a22): `pines` and `round-trees` (via `scatterInst` name test) and `oaks` now use it, so they look flatter. (2) `pines` count halved, 64 to 32. (3) Removed the pale translucent cylinder from each clover glint (`sp`); the clover keeps its patch disc and cross.
**Saw**: `look` at frame 0: `pines*` ×19, `round-trees*` ×12, `oaks*` ×3. Trees read as flat two-tone masses with ink outlines. The clover columns are gone in the zoom. The wolf is still 0.77% of the frame and sits behind `wolf-rock` in a blob silhouette. No console errors and no Surfaces or Lighting lines. I did not run `perf`.
**Next**: (1) Sheep ~1.4× larger with darker ears and legs, so they read at flock distance. (2) Move `wolf-rock` or the wolf so the full silhouette shows, give it a crouch, and make it bigger in frame. (3) Flatten the `ground` into painted bands and fade the post-pass hatching with distance. (4) Run `asset_search` for stylized sheep and wolf, as the Judge asked.
**Open**: Sheep, wolf, ground and asset_search were not done this session. Local 2-player and the grazing flow are still unplayed.
