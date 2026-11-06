The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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
