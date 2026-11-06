The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 40
**Did**: game.js sheep geometry (`sheepBodyGeo`, `sheepHeadGeo`) `ico()` detail 2 → 1; `toonSheep` low band 196,176,140 → 232,224,204; `sheepMat` emissive 0x2e261c → 0x3a352a.
**Saw**: `perf`: 190,778 triangles (was 261k), 81 draw calls, 0.63 MB. Zoom [450,560,920,720]: sheep fleece still reads peach-orange with soft lumps, so the warm tint is probably from the post-process grade or the scene lights, not from the gradient map. No console errors seen. 
**Next**: find the warm cast (post shader / sun colour / `PAL`) and neutralise it on `sheep`; flatten `pines*`/`oaks*`/`ridge*` vertex gradients; clover zoom, KeyE solo pass and local Enter bite pass (skipped four sessions); thin the `aim` ring.
**Open**: sheep still peach; triangles 191k, target <160k not met. Clover/solo/bite passes untested.

### Judge 40

**Session 40 verdict.** I ran a 2-cell sheet (start, AI pounce) and `perf` once. I didn't test solo play, a clover, a local Enter bite or the win and lose screens, so items 4 and 5 are carried over, not re-scored from evidence.

1. **Looks as LOOK.md says: 7.**
   - The `sky`, sun disc, `ridge*`, `pines*`, `oaks*` and the grain read as a storybook at a glance.
   - The `sheep*` are still peach-orange, with soft lumps and gradients. They are not flat cream gouache.
   - `wolf-body` is a clear near-black shape, but it is only 1.3% of the start frame.
   - The hills and trees keep their gradient shading.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The biggest remaining style gap is the warm peach `sheep*` against BOARD's cream sheep with dark faces.
   - The wolf's ear, snout and tail now read in silhouette.

3. **Clip moment: 9.**
   - The AI pounce shows BAA? SHEEP, "Just a sheep. Bite lost.", a "baa?" bubble, a woodcut duotone and a big ink splash.
   - The bite counter drops to two.
   - I didn't re-run the human pounce this session.

4. **Core loop and controls: 7.** The HUD (TIME, CLOVERS, WOLF BITES, SUSPICION) and the caption read well. The clover, KeyE, win and lose screens have gone untested for four sessions.

5. **Local 2-player: 7.5.** Unchanged and untested through to a bite.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps.

7. **Convention and performance: 7.**
   - `perf` reports 190,778 triangles (down from 261k), 81 draw calls and 0.63 MB of assets.
   - The 307 ms frame is SwiftShader, so it is no signal.
   - The triangle target of under 160k is still missed.

8. **Juice: 7.5.** I didn't re-check sound or animation.

**Faults: 7.5.**
- No console errors, `Lighting:` or `Surfaces:` lines, and nothing marked `Never visible`.
- The sheep colour is still wrong after two sessions of work on it.

**Next:**
1. **Find the warm cast on `sheep*` and neutralise it (asked again).**
   - Check the post shader's grade, the sun and hemisphere light colours, and `sheepMat` emissive and colour in game.js.
   - Sheep fleece should come out near 0xf0e6cc.
   - Proof: `look` with `sample` at three fleece pixels around [350,300] on the start frame. Each should read cream, with R−B under about 40. They currently read orange.
2. **Run the clover, solo and local-bite passes (asked again, fourth time).**
   - Use `observe` to get a clover position, then `look` with `zoom` on it. It should show three inked leaves.
   - Run `interact` with KeyE held 120 frames and `trace` the progress state.
   - Run a local Enter pounce and confirm bites go from 3 to 2.
   - Force a win and a lose state and `look` at both cards.
3. **Flatten `pines*`, `oaks*` and `ridge*` (asked again).**
   - Use flat per-mass colour with no vertex gradient.
   - Proof: `look` with `sample` at two points on one hill face returning near-equal colour.
   - Then get triangles under 160k, for example by lowering `ico()` detail again or cutting the tree segments.
   - Proof: `perf` triangles under 160k.

SCORE: 7.4
