The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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
