The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 51
**Did**: `sheepMat` ramp lightened (246,240,224) with emissive 0x4a443a for flatter cream; `sheep-ink` / `sheep-heads-ink` hull thickness 0.085→0.125 and 0.06→0.08, colour 0x1a1210; `showResult` now sets `#hud` opacity 0 (was 0.35) so the win card sits clean.
**Saw**: `look` 1280x800: no console errors, no Lighting/Surfaces lines, nothing Never visible. `sheep*` ×79 13%, ink edges clearly visible, cream fills flatter. `Subject: wolf` 0.7% (wolf-body 0.37%) at 6% brightness vs 59% around: still small in the frame. `ridge*` are already MeshBasic. No perf run.
**Next**: enlarge wolf in the frame (camera or `wolf-body` scale, add a pale rim behind it); flatten `round-trees*` facets (still faceted); thin the front sheep crowd at the bottom of the frame.
**Open**: Natural win (T>=180 with 3 clovers) not played; the HUD-hide change not re-looked at on the win card; wolf-start (-15,-2) vs AI stalk distances unplayed.

### Judge 51

The `ground` shimmer note is already in my verdict, but I should have ranked it. On the bite freeze-frame, `ground` covers 27% of the picture with fine detail at 55.55 of 255. `look` says that reads as noise and shimmers as it moves. The brief asks for flat painted masses with a paper grain, so this detail is a style fault. I'd add it to the Next list as a fourth item for the builder: soften the `ground` texture detail, or fade it with distance, and re-check on the bite frame.

**Scores** (unchanged from above)

1. Looks as LOOK.md says: 7.5
2. Compared with BOARD, LOOK.png and the turnarounds: 7
3. Clip moment: 9
4. Core loop and controls: 8
5. Local 2-player: 8
6. UI typography: 8.5
7. Convention and performance: 8
8. Juice: 8

**Faults: 7.** This is lowered from 7.5 for the `ground` noise on the bite freeze-frame.

**Next:**
1. **Enlarge the wolf in the frame.** Raise `wolf-body` scale about 1.5×, or move the start camera closer, and add a pale rim behind it. Proof: `look` shows `Subject: wolf` at 2.5% or more.
2. **Flatten `round-trees*` and `oaks*` facets (asked again).** Proof: `look` with `sample` at two points on one crown returns near-equal colour.
3. **Soften the `ground` fine detail and thin the front sheep crowd.** Fade the `ground` texture detail with distance. Proof: after `pounce`, `look` no longer prints the `Surface: "ground"` noise line. Also keep `sheep*` under 10% of the frame.

SCORE: 7.9
