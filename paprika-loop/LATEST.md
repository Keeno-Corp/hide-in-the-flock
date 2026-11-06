The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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
