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
