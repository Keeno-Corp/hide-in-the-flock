The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 48
**Did**: `wolf-shoulder` colour changed from brown 0x7a5a42 to near-black 0x1c1814 (game.js:295), so `wolf-body` reads as one dark silhouette.
**Saw**: Read the win check (game.js:839): win needs `eatenCount()>=3 && T>=180`, i.e. three minutes of play as well as three clovers, so the judge's 60-frame wait after `setState` cannot show it; the `act({action:'win'})` path (555) and the loop at 1011 are the proofs. I did not run `look` or `perf` this session.
**Next**: Prove the win by running to T=180 with 3 real clovers (eval `T`), or tell the judge in the HUD that the win comes at 3:00. Flatten `ridge*`, `oaks*`, `round-trees*`. Add a pale rim behind `wolf-body`; move wolf start/`wolf-rock` away from front sheep; flat cream `sheep*` with thicker ink.
**Open**: Wolf recolour not looked at. Ridge/tree flattening, wolf rim and sheep restyle still not done.

### Judge 48

The wolf is now one near-black silhouette, but it still sits against the front flock. The win is still unproven.

**Scores**

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, inked `pines*`, `ridge*` and grain read as a storybook.
   - `wolf-body` and `wolf-shoulder` are now one dark mass.
   - The `round-trees*` and `oaks*` are still faceted and generic low-poly.
   - The `sheep*` (×79) are still soft cream lumps with thin ink.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The wolf shape is better, but `Subject: wolf` is still 3% at frame 40.
   - `wolf-rock` and the front `sheep*` crowd the wolf.
   - The biggest style gap is the faceted trees and soft sheep.
3. **Clip moment: 9.5.**
   - The pounce cell shows `wolf-body` at 50%, an ink splash and a woodcut duotone.
   - It also shows a red `PLAYER 1` stamp and the caption "It had a name, and the name was Player One."
4. **Core loop and controls: 7.**
   - The HUD shows the `TIME 2:59` timer, `CLOVERS`, `WOLF BITES` and `SUSPICION`.
   - This session I did not run `interact` and did not see the win card.
   - The win needs three clovers and `T>=180`, per the builder's reading of game.js:839. The player is never told that.
5. **Local 2-player: 8.** Carried over, not checked this session.
6. **UI typography: 8.5.** Cream panels with ink borders, IM Fell text and the Alfa Slab stamp.
7. **Convention and performance: 8.**
   - `perf` reports 75 draw calls, 150,816 triangles and 0.63 MB of assets.
   - The 395 ms frame is SwiftShader and is no signal.
8. **Juice: 8.** Carried over, not checked this session.

**Faults: 8.**
- I saw no console errors and no `Lighting:` or `Surfaces:` lines.
- The wolf is still crowded by sheep and `wolf-rock`.

**Next:**
1. **Prove the win with real clovers (asked again).**
   - Play three clover grazes, then set `T` to 179 with `eval` and step 120 frames.
   - Also show "3:00" on the clover HUD line, or lower the win threshold so a three-clover win doesn't wait three minutes.
   - Proof: `interact` with `expect: {result: "win"}` and `look: true` shows a stamped win card with a restart.
2. **Make the wolf stand apart from the flock (asked again).**
   - Add a pale rim or halo behind `wolf-body`.
   - Move the wolf start and `wolf-rock` left and up, away from the front sheep.
   - Proof: `look` at frame 40 shows `Subject: wolf` at 4% or more, with no `sheep*` boxes overlapping the wolf box.
3. **Flatten `round-trees*`, `oaks*` and `ridge*` (asked again, sixth time).**
   - Use one flat toon or unlit tint per mass, with no vertex gradient, keeping the ink outline.
   - Give the `sheep*` flat cream fills with thicker `sheep-ink*`.
   - Proof: `look` with `sample` at two points on one `round-trees*` crown returns near-equal colour.

SCORE: 7.9
