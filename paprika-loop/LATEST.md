The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 45

**Session 45 verdict.** I opened the page, took a 3-cell `sheet` (start after 40 frames, `{eaten:3}` after 60 frames, human pounce after 90 frames) and ran `perf` once. I did not run 2-player or check sound this session, so items 5 and 8 are carried over.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, `ridge*`, grain, inked `pines*` and cream `sheep*` read as a storybook.
   - The `ridge*` and `ground` still have soft gradients where BOARD has flat masses.
   - The `sheep*` are still cotton lumps.
   - `wolf-body` is the darkest shape and reads as a clear silhouette.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The wolf is now readable in `start+40`: `Subject: wolf` 3%, up from 1.9%.
   - The biggest style gap is still the gradient shading on `ridge*` and `ground`, plus soft sheep outlines.
   - `wolf-rock` and the front `sheep*` still crowd the wolf.

3. **Clip moment: 9.5.**
   - The human pounce frame has `wolf-body` at 49%, an ink splash, red `PLAYER 1` stamp, a woodcut duotone and the caption "It had a name, and the name was Player One."
   - It reads clearly in a clip.

4. **Core loop and controls: 7.5.**
   - The HUD shows timer, clovers, wolf bites and suspicion.
   - The `win` cell shows no stamped card after `{state:{eaten:3}}` and 60 frames. That `state` key is probably not what the win check reads.
   - The 3-clover win has still not been confirmed in four sessions.

5. **Local 2-player: 8.** Carried over from session 41.

6. **UI typography: 8.5.** Cream paper panels with ink borders, IM Fell text and Alfa Slab stamps.

7. **Convention and performance: 8.**
   - `perf` reports 150,816 triangles, 75 draw calls and 0.63 MB of assets.
   - The 271 ms frame is SwiftShader, so it is no signal.

8. **Juice: 8.** Carried over, not re-checked.

**Faults: 8.** No console errors, no `Lighting:` or `Surfaces:` lines, and nothing `Never visible`. The wolf is still crowded at the start.

**Next:**
1. **Flatten `ridge*`, `oaks*`, `round-trees*` and `ground` (asked again, fourth time).**
   - Use flat per-mass colour with no vertex gradient, keeping the ink outline.
   - Proof: `look` with `sample` at two points on one hill face returns near-equal colour.
2. **Prove the 3-clover win (asked again).**
   - Read `observe` to find the real clover state key, or use `interact` holding KeyE on each clover.
   - Proof: `interact` with `look: true` shows a stamped win card with a restart. If none appears, fix the win trigger.
3. **Separate the wolf from the flock at the start, and soften the sheep.**
   - Move `wolf-rock` (ROCK, game.js:259) and the wolf start onto clear ground, and add a pale rim behind `wolf-body`.
   - Give the `sheep*` flatter, inked, wobbly outlines with a cream flat fill, under the 160k triangle budget.
   - Proof: `look` at frame 40 shows `Subject: wolf` at 4% or more with no `sheep*` overlapping it.

SCORE: 7.9

## Iteration 46
**Did**: No code change. Proved the 3-clover win: `checkWin` (game.js:837) needs `eatenCount()>=3 && T>=180`, and the `state` keys are `clovers` and `t`, not `eaten`.
**Saw**: `interact` with `{state:{clovers:3,t:181}}` gives `result:"win"` ✓. The look shows the stamped "YOU BLENDED IN" card with "R to play again · M to switch mode". No console errors, nothing Never visible. The wolf is 1.6% in the win frame, crowded by sheep and `wolf-rock`.
**Next**: Flatten `ridge*`/`oaks*`/`round-trees*`/`ground` vertex gradients. Move `wolf-rock` (ROCK game.js:259) and the wolf start to clear ground, and add a pale rim behind `wolf-body`. Make `sheep*` outlines flatter and inked.
**Open**: Flattening, the rock move and the sheep restyle are not done. The win only fires at T>=180 even if all 3 clovers are eaten earlier, which is by design ("Three minutes").
