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

### Judge 3

Trees are flatter now; sheep and wolf are unchanged.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky and `ridge*` ×3 layers hold. The sun disc samples #efcea6 at (640,40), and grain and ink outlines are present.
   - `pines*` ×19, `round-trees*` ×12 and `oaks*` ×3 now read as flat two-tone masses with ink outlines.
   - The `ground` is still shaded and noisy with soft shadows. The `wolf` (14% brightness against 51% around it) is the darkest shape.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `sheep*` ×101 are still small cream lumps with no dark legs or indigo belly.
   - The `wolf` takes 0.61% of the frame. It sits behind `wolf-rock` as a blob, and the look says "0 of its 0 named parts show".
   - The biggest remaining style gap is that the sheep and wolf do not match their turnarounds, and the ground shading is still 3D.
3. **Clip moment: 9.**
   - "pounce human" shows a woodcut duotone freeze, the `splash`, a red PLAYER 1 tag and a caption.
   - "pounce ai" shows a `baa?` bubble and a caption. Both read clearly.
   - I did not check the slow-mo or the camera punch-in.
4. **Core loop and controls: 6.5.**
   - The `clover` ×7 patches are green discs with ink rings, and the pale columns are gone.
   - The HUD shows time, clovers, bites and suspicion. The "play" cell (D held for 60 frames) shows the wolf running.
   - I did not test grazing, the win and lose cards or restart.
5. **Local 2-player: 6.** I did not play it this session. Last session's "local" cell showed the mode panel and targeting, but the wolf is tiny in frame.
6. **UI typography: 8.5.** The cream panels (`div#hud`, `div#mode`) have ink borders and IM Fell and Alfa Slab type. There is no overlap, and nothing is cut off or off-screen.
7. **Convention and performance: 6.5.**
   - `__game` works and play starts on load.
   - `perf` reads 396 ms on SwiftShader, which says nothing about a GPU.
   - 328k triangles is heavy for a flat style, mostly the `tufts*` ×346, the `rocks*` and the `sheep*` ×101. `div#paper` stays up.
8. **Juice: 6.5.** The visual bite beat is strong. I did not check sound, grazing or wolf animation closely.

**Faults: 7.** There are no console errors, `Never visible` is none, and there are no `Lighting:` or `Surfaces:` lines. Only `perf` is over budget, and that is a software-render artefact.

**Next:**
1. **Sheep to the turnaround (asked again).** This has been in Next for two sessions.
   - Enlarge the `sheep*` about 1.4×. Make the legs and ears dark brown-indigo and the belly indigo.
   - Run `asset_search` for "stylized sheep" first, since `asset-hits.json` holds no search for it.
   - The check is `look` with zoom [230,460,700,690], showing dark legs and ears distinct from cream wool.
2. **Wolf visibility (asked again).**
   - Move `wolf-rock`, or move the wolf off it, so the `wolf` silhouette shows in full against the field.
   - Enlarge the `wolf` so it takes at least 1.5% of the frame, and give it a crouch pose. Run `asset_search` for "wolf", since the wolf is code-made.
   - The check is `look`, where the Subject line says "named parts show" with more than 0 and a share above 1.5%.
3. **Ground bands and triangles.**
   - Flatten the `ground` into 2–3 painted bands with a flat toon material, and fade the post-pass hatching with distance.
   - Cut the `tufts*` ×346 to about 120. That drops triangles from 329k.
   - The check is `look` with `sample` on neighbouring ground pixels, which should be near uniform, and `perf` triangles under 200k.

SCORE: 6.9

## Iteration 4
**Did**: game.js only. `SS` 1.3 to 1.8 (sheep ~1.4× larger); `sheepMat` emissive 0x645440 to 0x4a3e30 and leg colour 0x1c1514 so dark legs and heads read against the wool; `wolf` root scale 4.4 to 6.2; `tufts` count 520 to 180.
**Saw**: `look` frame 0: `wolf` 1.4% of the frame [348,516,593,671], silhouette now readable above `wolf-rock` (still "0 of its 0 named parts show"); `sheep*` ×98 are bigger with dark legs and heads; `tufts*` ×92; no console errors, no Lighting/Surfaces lines, Never visible none. I did not run `perf` or `asset_search`.
**Next**: (1) Flatten `ground` into 2–3 painted bands and fade the post-pass hatching with distance. (2) Move the wolf a bit off the rock edge or raise it so it passes 1.5% and the named parts show. (3) Play grazing, win/lose and local 2-player; run `perf` for triangles (target under 200k).
**Open**: Ground bands, `asset_search` for sheep/wolf, `perf`, and the grazing and 2-player flows were not done.

### Judge 4

**Judge 4**

Sheep and wolf are bigger since session 3. The `ground` and the wolf's position are unchanged. I looked, played the pounce, local and graze cells, and ran `perf`.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, `ridge*` ×3, the sun disc, ink-outlined `pines*`/`round-trees*`/`oaks*` and the paper grain all hold.
   - The `ground` is still smoothly shaded with soft 3D shadow patches and a hatching texture. It is not flat painted bands.
   - The `wolf` is the darkest shape (14% brightness against 54% around it).
   - The `sheep*` look like 3D low-poly lumps with some per-face shading.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `sheep*` ×98 are larger, with dark legs and heads, but they are still clumped and faceted rather than flat cream shapes with ink outlines.
   - The `wolf` is now 1.4% of the frame, up from 0.61%. It reads as a silhouette but still overlaps `wolf-rock`, and the look says "0 of its 0 named parts show".
   - The biggest remaining style gap is that the ground and the sheep are still shaded 3D, against BOARD's flat gouache masses.
3. **Clip moment: 9.**
   - "pounce human" shows a woodcut duotone freeze, the red `splash`, a red PLAYER 1 tag and the caption "And so the hidden one was found."
   - "pounce ai" shows the `baa?` bubble and the caption "And the wolf was wrong, as wolves so often are."
   - The slow-mo and camera punch-in were not checked. The HUMAN/SHEEP stamp card is not visible in these frames, so I could not confirm it.
4. **Core loop and controls: 6.5.**
   - The `clover` ×8 patches are drawn as green rings with ink outlines, but they are small and low-contrast.
   - The graze cell (E held for 60 frames) shows the clover counter staying at 0 of 3 and the timer ticking, so I could not confirm that grazing registers. I did not see the win or lose card or restart.
5. **Local 2-player: 6.5.**
   - The "local" cell shows the mode panel, a caption and a red arrow marker.
   - It also shows an orange targeting ring under the wolf, which is clear and in style.
   - The wolf takes only 0.8% of the frame in that cell, and I did not play the 3 bites through.
6. **UI typography: 8.5.** `div#hud` and `div#mode` are cream panels with ink borders and IM Fell and Alfa Slab type. There is no overlap and nothing is cut off. The narrator caption is a storybook line.
7. **Convention and performance: 6.**
   - `__game` works and play starts on load.
   - `perf` reads 333 ms of frame work on SwiftShader, which says nothing about a GPU.
   - 322k triangles is heavy for a flat style: `ground` 180k, `sheep` 61k, `bushes` 18k, `rocks` 14k, `sheep-heads` 14k. `div#paper` stays up.
8. **Juice: 6.5.** The visual bite beat is strong. I did not check sound, and the wolf visibly has animation in the graze cell, but I did not check the sheep's grazing bob.

**Faults: 7.** There are no console errors, no `Lighting:` or `Surfaces:` lines, and `Never visible` is none. The only fault is that `perf` is over budget, which is a software-render artefact. The `ground` mesh holds 180k triangles, which is an over-built plane.

**Next:**
1. **Flatten and slim the `ground` (asked again).**
   - Cut the `ground` mesh from 180k to about 20k triangles.
   - Swap its material for a flat toon material with 2–3 painted bands, and remove the soft shadow patches.
   - The check is `look` with `sample` on neighbouring ground pixels, which should be near uniform, and `perf` triangles under 200k.
2. **Wolf visibility (asked again).**
   - Move the `wolf` so it stands on the open grass or on top of `wolf-rock`, not behind it.
   - Give it a crouch pose and enlarge it to at least 2% of the frame.
   - Run `asset_search` for "wolf" and "stylized sheep" first, because `asset-hits.json` holds no search for either and both are code-made.
   - The check is `look`, where the Subject line says "named parts show" with more than 0 and a share above 2%.
3. **Sheep outlines and grazing proof.**
   - Give the `sheep*` an ink outline or a flat two-tone cream material.
   - Fix or show the clover graze: hold E on a `clover` and show the clover counter going up.
   - The check is an `interact` with E held on a `clover`, where the state's clover count goes above 0.

SCORE: 6.9

## Iteration 5
**Did**: game.js only. `ground` PlaneGeometry N 300 to 110 (180k to ~24k triangles); its vertex colours now use hard steps (`patch` > -0.35 warm, > 1.1 ochre, olive on a threshold) instead of smoothsteps, so it reads as painted bands. `ROCK.top` 3.15 to 4.1 so `wolf` stands above `wolf-rock`. Clover graze radius 1.9 to 2.6.
**Saw**: `look` frame 0: `wolf` 1.4% [348,514,593,672], its silhouette now sits on top of `wolf-rock`, still "0 of its 0 named parts show"; ground bands visible but the toon shadow patches remain; no console errors, no Lighting/Surfaces, Never visible none. `perf`: 166,728 triangles (was 322k), 48 draw calls, 308 ms on SwiftShader (no budget signal). I did not run `asset_search` or play graze/2-player.
**Next**: (1) Raise wolf to 2%+ (scale up or crop camera nearer the rock) and name its parts. (2) Give `sheep*` ink outlines or flat two-tone cream. (3) `interact` with E held within 2.6 of a `clover` and confirm `clovers` > 0 in state; play the 3 bites in local mode.
**Open**: Graze counter not verified; ground still has soft shading from toon + shadows; `asset_search` for wolf/sheep never run.

### Judge 5

**Judge 5**

The `ground` is now cheaper, and the wolf's position and size are unchanged since session 4. The wolf is still 1.4% of the frame with "0 of its 0 named parts show". I did not run `asset_search` or the 3-bite 2-player play-through.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky with cloud bands, the sun disc, `ridge*` ×3, `pines*`, `round-trees*`, `oaks*` and the paper grain all hold.
   - The `ground` is still smoothly shaded with large soft shadow bands. Only the colours are stepped.
   - The `sheep*` are still faceted, shaded 3D lumps, not flat cream shapes with ink outlines.
   - The `wolf` is the darkest shape (14% brightness against 54% around it).
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `wolf` is a clean silhouette standing on `wolf-rock`, and that is better.
   - The sheep still read as 3D lumps. That is the biggest remaining style gap, and it is the same gap as last round.
3. **Clip moment: 7.5.**
   - After 70 frames, "pounce human" and "pounce ai" show only a tiny wolf (0.42% and 0.25%) in a low, wide camera, with a caption.
   - I saw no splash, duotone freeze or stamp card at that moment, so I could not see the beat land.
   - Session 4's frames did show the duotone freeze, `splash` and `baa?`.
4. **Core loop and controls: 6.**
   - `clover` ×8 are green rings with ink outlines, but they are low-contrast.
   - E held for 120 frames away from a `clover` leaves `clovers` at 0, as it should, and the player's `grazing` flag goes true.
   - I still have not seen the counter go up, or the win or lose card.
5. **Local 2-player: 6.5.**
   - The "local" cell shows the red arrow marker, an orange targeting ring and a caption panel.
   - The wolf is only 0.55% of the frame there, and the 3 bites were not played.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell / Alfa Slab type.
   - Nothing overlaps or is cut off, and the narrator captions are storybook lines.
7. **Convention and performance: 6.5.**
   - `__game` works and play starts on load.
   - Triangles are down from 322k to 167k, with 48 draw calls.
   - `perf` reads 267 ms per frame on SwiftShader (host load 5.2), which is no budget signal.
   - `div#paper` stays up.
8. **Juice: 6.5.**
   - Sound events fire (baa, baa2, wind).
   - The wolf stops and settles after walking.
   - I did not check the gong, stab or grazing bob.

**Faults: 7.5.** No console errors, no `Lighting:` or `Surfaces:` lines, and `Never visible` is none.

**Next:**
1. **Wolf and sheep are still code-made, and `asset_search` has never been run for either (asked again).**
   - Run `asset_search` for "wolf" and "stylized sheep".
   - If nothing fits, rebuild the wolf with a crouch pose and visible head, ears, tail and legs, and name those parts.
   - Scale the wolf up or pull the camera nearer `wolf-rock` so it exceeds 2% of the frame.
   - The check is `look`, where the Subject line shows more than 0 named parts and a share above 2%.
2. **Make the clip frame readable.**
   - In "pounce human", the camera punches in on the wolf and sheep so they are large, not a tiny speck on a low camera.
   - Show the `splash`, the woodcut freeze and the HUMAN stamp card. The check is a sheet cell at roughly frames 90 and 130 after the pounce.
3. **Flatten the sheep and the ground, and prove grazing.**
   - Give the `sheep*` an ink outline (back-face hull) and a flat two-tone cream material.
   - Drop the soft shadow bands on the `ground` for hard painted shadow shapes.
   - Move the player onto a `clover`, hold E, and show `clovers` go above 0 in an `interact` `expect`.

SCORE: 6.9

## Iteration 6
**Did**: game.js only. `asset_search` "low poly wolf" run: hits were a dog, a white fox and a 430-tri blue wolf (Wolf - Low poly, 78aeb85f…), none picked (kept the code wolf). Sheep ink outline: `sheep-ink` / `sheep-heads-ink` InstancedMeshes sharing `bodyIM`/`headIM` instanceMatrix, normal-pushed hull, BackSide `0x2b211c`. `W.root` scale 6.2 to 8; parts named `wolf-body`, `wolf-head`, `wolf-tail`, `wolf-leg`.
**Saw**: `look` frame 0: `wolf` 2.1% [328,489,642,693], "1 of its 1 named parts show", 14% brightness vs 48% around; sheep now read with dark ink rims; no console errors, no Lighting/Surfaces, Never visible none. Perf not run.
**Next**: (1) Clip frame: camera punch-in on wolf+sheep during "pounce human", check sheet at frames ~90/130. (2) Flatten sheep to two-tone cream, harder `ground` shadow shapes. (3) Prove grazing: move P onto a `clover`, hold E, expect `clovers` > 0.
**Open**: Grazing count and 3-bite local play still unverified; clip moment not touched; the wolf-body ×1 only counts one part in Subject.

### Judge 6

**Judge 6**

I did not run `asset_search`, the 3-bite 2-player play-through, a clover-grazing `interact`, or a win or lose card. I judged from `look` sheet cells and one `perf`.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, `ridge*` ×3, the sun disc, `pines*`, `oaks*` and the paper grain all hold.
   - The `sheep*` now have ink rims (`sheep-ink`).
   - They are still shaded, lumpy 3D clusters rather than flat cream shapes. The `ground` still has smooth shading with large soft bands.
   - Both read as 3D game, not woodcut or gouache.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.**
   - The ink rims on the sheep close part of the gap to the turnarounds.
   - The wolf is a dark silhouette. In the start cell its "subject wolf" share is 0.76%, so the 2.1% Iteration 6 measured is not what this frame shows.
   - The biggest remaining style gap is the flat two-tone cream sheep and the hard-edged painted `ground`.
3. **Clip moment: 8.5.**
   - "pounce human" shows a low, wide leaping wolf with a caption, and the camera is closer than before.
   - After 110 frames, the woodcut duotone freeze, `splash`, a tilted GOTCHA / HUMAN card in red ink and a PLAYER 1 ribbon are all on screen.
   - The AI case shows "BAA? SHEEP. Just a sheep. Bite lost." with a `baa?` bubble, and the bite counter drops to 2.
   - The weak spot is the pounce frame itself: the wolf is 1.3% of it, and there is no clear punch-in on the wolf and the target sheep.
4. **Core loop and controls: 6.**
   - The HUD shows TIME 2:59, GANTERS, WOLF BITES and SUSPICION. The `clover` rings are visible but low-contrast.
   - The counter going up, the win card and the lose card remain unseen.
5. **Local 2-player: 6.**
   - I did not play the 3 bites this round, so this holds the previous 6.5 less a little for the wolf's small on-screen size.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell and Alfa Slab type, and the caption lines are storybook.
   - The mode panel's text is small.
7. **Convention and performance: 6.5.**
   - `perf` reads 287 ms per frame with 242k triangles and 50 draw calls, up from 167k last session. The host is a software renderer, so the frame time is not a budget signal.
   - The triangle count is rising again, and the sheep ink hulls probably account for much of it.
   - `div#paper` stays up over the canvas (opacity 0.55, still there after 5.2 s).
8. **Juice: 6.5.**
   - I did not check the sound or animation this round, so this holds the last score.

**Faults: 7.5.** `look` reported no `Lighting:` or `Surfaces:` lines and nothing under `Never visible`. I did not read console errors this round.

**Next:**
1. **Flatten the sheep and the `ground`, the biggest style gap.**
   - Make the `sheep*` a flat two-tone cream (a toon or 2-step material with no smooth gradient) under the existing `sheep-ink`.
   - Replace the soft shading on the `ground` with hard-edged painted shadow shapes.
   - The check is `look` on frame 0 with `zoom` on the sheep cluster, which should show two flat tones and no gradient.
2. **Punch the camera in on the pounce (asked again).**
   - In "pounce human" at about frame 50, move the camera to a close three-quarter view on the wolf and the target sheep.
   - The check is the sheet cell at wait 50, where the subject wolf share should be above 5%.
3. **Prove the core loop.**
   - Use `interact` to move the player onto a `clover` and hold E, expecting `clovers` > 0.
   - Raise the `clover` ring contrast to a bright cream ring on a darker patch.
   - Add an `interact` that wins (3 clovers) and one that loses (3 bites), and look at the stamped cards.

SCORE: 7.1

## Iteration 7
**Did**: game.js only. New 2-step toon gradients: `toonSheep` (dark step ~0.68) on `sheepMat`, `toonGround` (dark step ~0.8, defined next to `toonMap` because the ground builds before later consts) on `ground`. Pounce punch-in: `updateCamera` scale 0.3 to 0.52 of `cam.punch`, fov drop 12 to 16, and `lookAt` y/z now lerp to the low close view with `cam.punch` (before, a lower camera looked over the flock).
**Saw**: `look` frame 0: wolf 2.4%, sheep read as two-tone cream with ink rims, `ground` bands still soft in vertex colours; no Lighting/Surfaces, Never visible none. Sheet "pounce human" at 30 frames: wolf 4.7% mid-leap over the flock, big sheep in front; at 60: 2.8%. Perf not run.
**Next**: (1) Prove the core loop: put P on a `clover`, hold E, expect `clovers` > 0; raise clover ring contrast; then win (3 clovers) and lose (3 bites) cards. (2) Ground vertex-colour banding (hard-edged paint patches) instead of smooth hills colours. (3) Cut triangles: sheep ink hulls (242k tris).
**Open**: Grazing, win/lose cards and 3-bite local play still unverified; the wolf at frame 0 still a dark silhouette (2.4%); `div#paper` stays over the canvas.

### Judge 7

**Judge 7**

I did not play the 3-bite local game, the win or lose cards, or a successful clover graze. The `interact` run grazed away from any clover, and I did not run `asset_search`. I judged from the 4-cell `look` sheet, one `interact` (walk and graze) and one `perf`.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, sun disc, `ridge*` ×3, `pines*`, `oaks*` and paper grain hold.
   - The `sheep*` now read as two-tone cream under `sheep-ink`, so the flattening is visible.
   - The `ground` and the `round-trees*` are still smooth, soft-shaded 3D masses with faceted edges. The `ground` bands are soft, not hard-edged painted shapes.
   - The pounce-frame lighting is more muddy-olive than gouache dusk. The picture still reads as a 3D game with a filter.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are closer to SHEEP.png. The wolf is a near-black silhouette and the darkest shape.
   - In the start cell the wolf is only 0.69% of the frame and sits small behind the flock.
   - The biggest remaining style gap is the `ground` and `round-trees*`, which are not flat painted masses with wobbly ink outlines. They have no `sheep-ink` equivalent.
3. **Clip moment: 9.**
   - "pounce30" now has a real punch-in: the wolf is 4.6% mid-leap over the flock, with big foreground sheep and a caption.
   - "pounce110" shows the woodcut duotone, `splash`, a tilted red-ink GOTCHA / HUMAN card and a PLAYER 1 ribbon. The bite counter shows 3 drops.
   - "ai" shows a SHEEP card with "Just a sheep. Bite lost.", a `baa?` bubble, and the counter down to 2 drops. The wolf is 11% there.
   - The leap reads well in a 5-second clip.
4. **Core loop and controls: 5.5.**
   - The HUD shows TIME 2:59, GANTERS, WOLF BITES and SUSPICION.
   - After walking right and grazing for 60 frames, `clovers` stayed 0. The player was at x 1.9 and was not on a clover, so this is not proof of a bug, but the loop is still unproven.
   - The `clover` ring at about (110, 280) is low-contrast pale green on green.
   - The win and lose cards are still unseen.
5. **Local 2-player: 6.**
   - Pounce and the bite card work through the same path.
   - The 3 bites, wolf targeting and the lose card were not played.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell and Alfa Slab type. The caption lines are storybook.
   - The text in `div#mode` is tiny at 1280 px.
7. **Convention and performance: 6.5.**
   - `perf` gives 295 ms per frame, 50 draw calls and 242k triangles, on a software renderer, so the frame time is not a budget signal.
   - The triangle count is still high. The `sheep-ink*` hulls are about 100 extra instanced meshes.
   - `div#paper` still covers the canvas at 0.55 opacity after 5 s.
8. **Juice: 7.**
   - The `interact` Sound line reported baa, baa2 and wind starting.
   - The bite card has its splash and freeze.
   - I did not hear the munch, gong or stab.

**Faults: 7.5.** `look` listed no `Lighting:` or `Surfaces:` lines and nothing under "Never visible". I did not read console errors this session. The `perf` run did not fault, but the `div#paper` overlay and the 242k triangles are open.

**Next:**
1. **Prove the core loop (asked again).**
   - Use `observe` to read a `clover` position.
   - Then run `interact` with `{state:{player:{x,z}}}` onto it, `{key:"KeyE", frames:90}`, and `expect {clovers:[1,3]}`.
   - Raise the `clover` ring contrast to a bright cream ring on a dark patch.
   - Then force 3 clovers and 3 bites, and `look` at both stamped cards.
   - The check is that `clovers` > 0 in the `interact` reply and a win card is on screen.
2. **Flatten the `ground` and `round-trees*` (the biggest style gap).**
   - Replace the smooth `ground` vertex colours with 3–4 hard-edged painted bands and shadow patches.
   - Give `round-trees*` and `oaks*` the same toon 2-step material plus an ink hull.
   - The check is a frame-0 `look` with `zoom` on the left tree cluster and the foreground `ground`. It should show flat tones with a dark outline and no gradient.
3. **Cut triangles and bring the wolf up at frame 0.**
   - Merge or simplify the `sheep-ink*` hulls (a back-face scale on a low-poly sphere), and lower `wool` detail. Target well under 150k triangles in `perf`.
   - Add a slightly larger or closer wolf start framing, or a `wolf-rock` stance, so the "subject wolf" share at frame 0 is above 2%.
   - Fade `div#paper` out within 1 s, or fold it into the post pass, so `perf` no longer samples under an overlay.

SCORE: 6.9

## Iteration 8
**Did**: game.js `clovers` only: ring/star colour to bright cream 0xfff6d0, ring wider (1.0–1.9), `patch` darker green 0x4f6a2c at 0.9 so the ring reads on a dark patch. Verified the loop by play.
**Saw**: `interact` with state player (14,-5), hold E 170 frames: `clovers` 1 ✓ (cloverProgress 1.01), toast "Clover eaten! 1/3", munch/powerup sounds. State clovers 3 + t 181: win card "THE FLOCK WINS / YOU BLENDED IN" shown. Bites 2 + pounce human: GOTCHA HUMAN card, PLAYER 1 tag, bite counter shows 3rd drop dashed. look: no Lighting/Surfaces faults at frame 0; the `ground` flagged as fine-detail noise at pounce close-up; Never visible none. Ring change not re-looked; perf not run.
**Next**: (1) Look at the clover ring after the colour change. (2) Flatten `ground` into hard painted bands and toon-ify `round-trees*`/`oaks*` with ink hulls. (3) Cut triangles (sheep-ink hulls, 242k), enlarge the wolf at frame 0 (1.2%), soften ground detail up close.
**Open**: Lose card (3rd bite ending) not seen by itself; `div#paper` grain stays over the canvas at 0.55 (deliberate look); the 3-bite local game unplayed.

### Judge 8

**Judge 8**

I looked at a 3-cell `look` sheet (start, pounce30, clover) and ran `perf` once. I did not re-check the clover ring close up. I did not play the 3-bite local game or the lose card. I did not read console errors, and `interact` was not run this session.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, sun disc, `ridge*` ×3, `pines*` ×20 and paper grain hold, and the two-tone cream `sheep*` under `sheep-ink` read as storybook.
   - The `ground` and `round-trees*` are still smooth, gradient-shaded 3D masses with no ink outline.
   - The overall picture is a 3D scene under a filter. It is not yet flat gouache.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png, and `wolf-body` is the darkest shape.
   - The wolf is only 2.4% of the frame at start and 1.4% in the clover cell, and sits small and low-left.
   - The biggest style gap is still the `ground` and `round-trees*`, which have no `sheep-ink` equivalent and no hard painted bands.
3. **Clip moment: 9.**
   - pounce30 shows the wolf mid-leap at 4.6% over a dense flock, with a caption.
   - Iteration 8's Saw line records the HUMAN card, the PLAYER 1 tag and the bite counter. I did not re-look at the bite card this session.
4. **Core loop and controls: 7.**
   - Iteration 8 proved the clover graze: `clovers` reached 1 with the toast "Clover eaten! 1/3". It also showed the win card "THE FLOCK WINS".
   - The `clover` ring is still not visible in the start or clover cells at this scale.
   - The lose card is unseen on its own.
5. **Local 2-player: 6.**
   - Pounce uses the same path as solo.
   - The 3 bites, the wolf targeting and the lose card were not played.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is tiny at 1280 px.
7. **Convention and performance: 6.**
   - `perf` gives 242,264 triangles and 50 draw calls, with the frame at 292 ms. The host is a software renderer, so the frame time is not a budget signal.
   - `sheep` and `sheep-ink` are 61k triangles each. `sheep-heads` and `sheep-heads-ink` are 14k each, and 135k triangles cast shadows.
   - `bushes` (18k) and `rocks` (14k) cost more than their flat look needs.
   - `div#paper` is still up after 5.2 s.
8. **Juice: 7.**
   - Iteration 8's Saw line records munch and powerup sounds and the bite card's splash and freeze.
   - I did not hear the gong or stab.

**Faults: 7.** `look` listed no `Lighting:` or `Surfaces:` lines. The `look` output showed no "Never visible" line. `perf` reports `div#paper` over the canvas, and the triangle count is open. I did not read console errors.

**Next:**
1. **Flatten the `ground` and `round-trees*` (asked again).**
   - Replace the smooth `ground` vertex colours with 3–4 hard-edged painted bands and long indigo shadow patches.
   - Give `round-trees*` and `oaks*` the same 2-step toon material and an ink hull as `sheep-ink`.
   - The one call that shows it done is `look` with `zoom` on the left tree cluster and the foreground `ground`. It should show flat tones with a dark outline and no gradient.
2. **Cut triangles (asked again).**
   - Swap the `sheep-ink` and `sheep-heads-ink` hulls for a low-poly sphere with back-face scaling.
   - Lower the `wool` detail, and simplify `bushes` and `rocks`.
   - Stop shadow casting for `sheep`.
   - The one call that shows it done is `perf` with `costs`. It should show well under 150k triangles and under 60k casting shadows.
3. **Bring the wolf up at frame 0 and make the clover ring read.**
   - Frame the start camera so the wolf is at least 3% of the picture in `look`. Alternatively, put `wolf-rock` in the foreground.
   - Make the `clovers` ring visible from the start camera at low zoom: a bright cream ring on a dark patch, larger.
   - Fade `div#paper` out, or fold it into the post pass.
   - The one call that shows it done is `look` with `sample` at the clover ring pixels, which should read cream against dark green.

SCORE: 7.1

## Iteration 9
**Did**: game.js only. `sheep-ink`/`sheep-heads-ink` now hull the new low-poly `hullBody`/`hullHead` (10k+8k tris, was ~75k). New `treeInk()` adds back-face ink hulls `round-trees-ink` and `oaks-ink`. `rocks` and `bushes` ico detail 2→1. `ground` hill/far colour blends quantised to 3 steps.
**Saw**: `look` frame 0: no Lighting/Surfaces faults, Never visible none; trees now have dark outlines. Wolf 2.3% of frame (unchanged). `perf`: 179,282 tris (was 242k), 52 draw calls, 117k casting shadows (still over 60k target: `sheep` 61k, `sheep-heads` 14k). Ground still reads as soft gradient slopes, not hard bands. Clover ring visible as a small green ring bottom-left; not zoomed.
**Next**: (1) Cut shadow casters: give `sheep` a low-poly customDepthMaterial or a shadow-only proxy; lower `ground` N 110→70. (2) Make `ground` hard-banded: flat normals + a 2-step toonGround. (3) Bring wolf up at frame 0 (camera or wolf-rock scale), fade `div#paper`.
**Open**: Ground banding and wolf size not addressed; lose card and 3-bite local game still unplayed; no play run this session.

### Judge 9

**Judge 9**

I took one 3-cell `look` sheet (start, pounce, bitecard) and ran `perf` with `costs`. I did not run `interact`, so the lose card, the 3-bite local game and the clover graze were not played this session. I did not read console errors.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, the sun disc, `ridge*` ×3, `pines*` ×21 and the paper grain read as storybook. The `oaks*` and `round-trees*` now have ink hulls.
   - The `ground` is still smooth gradient slopes with no hard painted bands, so the frame reads as a 3D scene under a filter, not flat gouache.
   - The raking indigo shadows are weak in the start cell.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png.
   - `wolf-body` is the darkest shape, but it is only 2.3% of the frame at start and sits small and low-left.
   - The biggest style gap is the `ground`, which has no hard bands and no ink edge.
3. **Clip moment: 9.**
   - The pounce cell shows the wolf mid-leap at 3.6% over a dense flock, with the caption "Dusk is patient. The wolf is patient too."
   - The bitecard cell shows the woodcut duotone freeze with the ink splash and red drops, a tilted "GOTCHA / HUMAN" stamp card, "PLAYER 1 has been found." and a "PLAYER 1" tag.
   - The "baa?" SHEEP variant was not looked at.
4. **Core loop and controls: 7.**
   - Not played this session. Iteration 8 proved the clover graze and the win card.
   - The `clover` ring is small and hard to read at the start camera.
   - The lose card is still unseen on its own.
5. **Local 2-player: 6.**
   - Not played. It shares the pounce path with solo, and the 3 bites and the targeting are unverified.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is tiny at 1280 px.
   - The stamp card and the narrator caption read well.
7. **Convention and performance: 6.5.**
   - `perf` gives 179,282 triangles and 52 draw calls, down from 242k. The frame time of 276 ms is on a software renderer, so it is no signal.
   - 117,594 triangles cast shadows. `sheep` (61k) and `sheep-heads` (14k) are the cause. This is above the 60k target.
   - `ground` is 24,200 triangles.
   - `div#paper` is still up after 5.1 s.
8. **Juice: 7.**
   - The bite card, splash and freeze are seen.
   - Sound was not heard or checked this session.

**Faults: 7.** `look` listed no `Lighting:` or `Surfaces:` lines and no "Never visible" object. The `perf` figures are not a fault on a software renderer. `div#paper` over the canvas, the shadow-caster count and the unread console errors remain open.

**Next:**
1. **Make the `ground` hard-banded (asked again).**
   - Use flat normals and a 2–3 step toon ramp, with an indigo shadow patch under the oaks and hills.
   - The one call that shows it done is `look` with `zoom` on the foreground `ground` at the start camera. It should show flat tone steps with hard edges and no smooth gradient.
2. **Cut shadow casters (asked again).**
   - Give `sheep` and `sheep-heads` a low-poly shadow proxy or a `customDepthMaterial`.
   - Lower the `ground` grid from 110 to 70.
   - The one call that shows it done is `perf` with `costs`. It should show under 60k casting shadows and `ground` under 12k.
3. **Bring the wolf up at frame 0, and play the untested paths.**
   - Move the start camera so `wolf-body` is at least 3.5% of the picture in `look`, or scale `wolf-rock` in the foreground.
   - Make the `clovers` ring brighter and larger, and fade `div#paper` out within about 2 s.
   - Then run one `interact` that loses all 3 bites in local mode (`Enter` ×3, `KeyM`) with `look: true`, to see the lose card and the 3-bite flow.
   - The `look` with `sample` at the ring pixels should read cream against dark green.

SCORE: 7.1

## Iteration 10
**Did**: game.js only. `sheep` and `sheep-heads` no longer cast shadows; new `sheep-shadow` and `sheep-heads-shadow` InstancedMeshes (hullBody/hullHead, colorWrite false, sharing the instanceMatrix) cast them instead. `ground` grid N 110→70.
**Saw**: `look` frame 0: no Lighting/Surfaces faults, Never visible none, shadows from sheep still drawn. `perf` costs: 183k tris, 54 draw calls, 60,286 casting shadows (was 117k; target 60k, nearly met), `ground` 9,800 tris (was 24k). Wolf still 2.3% of frame. `div#paper` still up after 5.2 s. Frame time 264 ms on a software renderer, no signal.
**Next**: (1) Make `ground` hard-banded: flat normals and a 2-step toonGround, with indigo patches. (2) Bring the wolf up at frame 0 (camera or `wolf-rock` scale), fade `div#paper` within 2 s, brighten the clover ring. (3) Play the lose card and the 3-bite local game with `interact`.
**Open**: Ground banding, wolf size and `div#paper` fade not done. Lose card and local mode still unplayed. Shadow casters 286 over the 60k target (60,286).

### Judge 10

**Judge 10**

I took one 3-cell `look` sheet (start, a local-mode 3-pounce attempt, and a solo AI-sheep bite) and ran `perf` with `costs`. The lose card did not appear in the sheet, so it is still unseen. I did not read console errors.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, the sun disc, `ridge*` ×3, `pines*` and the paper grain read as storybook.
   - The `ground` is still a smooth gradient with no hard bands and no ink edge. It reads as a 3D scene under a filter, not flat gouache.
   - The raking indigo shadows are barely visible.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png.
   - `wolf-body` is the darkest shape but only 2.3% of the frame at start.
   - The biggest style gap is still the `ground` banding.
3. **Clip moment: 8.5.**
   - The "baa?" sheep variant now shows, as a speech bubble over the flock.
   - The caption line "And the wolf was wrong, as wolves so often are" shows with it.
   - The pounce and the HUMAN card were seen in Judge 9.
   - In the sheepbite cell the wolf is only 0.32% of the frame, so the bite is hard to read from the start framing.
4. **Core loop and controls: 7.**
   - The `clover` ring is visible as an orange ring in the lose cell.
   - The lose card was not reached, so I could not see it.
5. **Local 2-player: 5.5.**
   - The mode toggled to "LOCAL 2-PLAYER" in the HUD.
   - My forced pounces did not end the game, so the 3-bite flow and the lose card are still unverified.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is small.
   - The caption banner reads well.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles and 54 draw calls. The 320 ms frame is on a software renderer, so it is no signal.
   - 60,286 triangles cast shadows, about at the 60k target. `sheep-shadow` and `sheep-heads-shadow` now carry the sheep shadows.
   - `ground` is 9.8k triangles, down from 24k.
   - `div#paper` is still up after 5.1 s.
8. **Juice: 7.**
   - Visuals are fine. Sound was not checked.

**Faults: 7.** `look` listed no `Lighting:` or `Surfaces:` fault lines and no "Never visible" object. Open items: `div#paper` over the canvas, the lose card never seen, and unread console errors.

**Next:**
1. **Make the `ground` hard-banded (asked again).**
   - Use flat normals and a 2-step toon ramp, with indigo patches under the oaks and hills. Draw a dark ink edge where the bands meet.
   - The one call that shows it done is `look` with `zoom` on the foreground `ground` at the start camera. It should show flat tone steps with hard edges.
2. **Bring the wolf up and fade `div#paper` (asked again).**
   - Move the start camera or scale `wolf-rock` so `wolf-body` is at least 3.5% of the frame at start. The pounce camera should also keep the wolf above 1% in the sheepbite cell.
   - Fade `div#paper` out within about 2 s.
   - The one call that shows it done is `look` with `sheet` at frame 0. It should list the wolf at 3.5% or more. `perf` should no longer name `div#paper` as an overlay.
3. **Prove the lose card and the 3-bite local game.**
   - Run `interact` with `look: true` and `trace` on the bites-left state. Use `KeyM`, then wolf `Enter` presses next to a human, so it reaches the 3rd bite.
   - If `action: pounce` does not count bites in local mode, fix it so it does.
   - It should show the lose card as a stamped storybook card with restart.

SCORE: 7.1
