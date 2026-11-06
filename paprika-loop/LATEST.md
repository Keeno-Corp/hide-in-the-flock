The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 23
**Did**: game.js ground vertex colours: indigo patch is now a smooth lerp (`0.4*sm(0.5,0.9,ip)`) instead of a hard step; hill/far `Math.round(..*3)/3` banding replaced by smooth lerps. Intended to remove the diamond tone bands on the right hill.
**Saw**: not run this session (no look/perf); change unverified visually.
**Next**: (1) `look` zoom [640,100,1280,450] to confirm bands gone; (2) wolf ink silhouette / separate limbs in local; (3) rock occluding local wolf paws, clover grazing check.
**Open**: wolf items untouched; verify `sm` is defined and no console errors.

### Judge 23

**Judge 23 scores**

I took one 3-cell `look` sheet (start, AI bite, human bite), a zoom on the right hill, one `perf`, and one `interact` (walk right, then graze with `KeyE`). The `interact` showed `player.grazing` true and `topSusp` at 0.28. There were no console errors and no `Lighting:` or `Surfaces:` lines. I did not check local 2-player, the lose card or other viewports, and I did not hear the sound.

1. **Looks as LOOK.md says: 8.5.**
   - The `sky` with cloud bands and sun disc, the `ridge*` hills, the inked `pines*`, `oaks*` and `round-trees*`, the paper grain and the cream `sheep*` read as a storybook frame.
   - `wolf-body` is the darkest shape, at 2% near black.
   - The zoom on the right hill [640,100,1280,450] shows the diamond tone bands are gone, so the Iteration 23 fix worked.
   - The `ground` is now smooth patches with a wobbly ink line. It still has a hard yellow-to-green edge and a faint diagonal hatch over the `pines*`.
2. **Compared with BOARD, LOOK.png and the turnarounds: 8.**
   - The remaining style gap is the wolf.
   - In the interact frame `wolf-body`, `wolf-head ×4`, `wolf-leg ×8` and `wolf-tail` merge into one black lump with no ink rim, and it crowds the `sheep*`.
   - The WOLF turnaround has a clear lean silhouette.
3. **Clip moment: 8.5.**
   - The AI bite shows an ink splash, a woodcut duotone freeze, a tilted "SHEEP" card with "BAA?", "Just a sheep. Bite lost." and a "baa?" bubble.
   - The human bite shows a red "HUMAN" card with "GOTCHA", a red "PLAYER 1" stamp and a caption.
   - Both read in 5 seconds.
4. **Core loop and controls: 7.5.**
   - Walk and graze work, and the `suspicion` HUD bar and `topSusp` respond.
   - The wolf stops after 22 frames and sits on top of the flock.
   - The `clover ×10` patches are only small green rings, so they are hard to find.
   - I did not play through to the win or lose card.
5. **Local 2-player: 7.** I did not run it this session, so this carries over from Judge 22. `wolfRing` and `aim` are hidden in solo as expected. The local wolf lying over `wolf-rock` was still a blob in the last check.
6. **UI typography: 8.5.** The IM Fell panels in `#hud` and `#mode` have ink borders, with no overlap or cut-off text. The Alfa Slab stamps are in style.
7. **Convention and performance: 7.**
   - `perf` gives 191,354 triangles, 62 draw calls and 0.63 MB of assets.
   - The 275 ms frame is on a software renderer, so it is not a signal.
   - 191k triangles is high for a flat-painted look, and 234 ms of the frame is the main scene.
   - `window.__game` is present.
8. **Juice: 7.5.** The pounce and bite visuals work, and grazing registers. I did not run `feel` or hear the sound.

**Faults: 8.** There were no console errors. The wolf is a blob and its `wolf-head ×4` and `wolf-leg ×8` parts overlap. The triangle count is high. The ground edge is hard.

**Next:**
1. **Give the wolf an ink silhouette with readable limbs (asked again).**
   - Add a slightly lighter dark-brown ink rim pass on `wolf-body` and `wolf-head`, as `sheep-ink*` does, and separate the `wolf-leg` meshes from the body.
   - Tuck the stray `wolf-head ×4` copies in or remove them.
   - The one call that shows it done is `look` with `zoom` [250, 300, 650, 650] on the start page. It should show a rim, two ears, a snout and separate legs.
2. **Make the clover patches findable and storybook-drawn.**
   - The `clover ×10` are faint rings.
   - Draw each as an inked patch with a small three-leaf motif, and add a gentle glow or sparkle when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position, such as around [480, 550]. It should show a leaf motif in an ink outline.
3. **Make the local wolf read clearly and occlude behind `wolf-rock` (asked again).**
   - Press `KeyM`, then `look` with `zoom` on the wolf.
   - The wolf's pose should be upright and distinct from the `wolfRing`, and the rock should cover its hind legs.
   - After that, cut the triangle count by lowering the sheep or tree detail. `perf` with `variants` hiding `pines*` and `round-trees*` shows what each costs.

SCORE: 7.9
