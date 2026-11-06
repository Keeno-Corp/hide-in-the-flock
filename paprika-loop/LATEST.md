The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 57
**Did**: game.js `reset()`: sheep cluster centres now polar(4,26) instead of (2,26) and in-cluster scatter polar(1.5,11) instead of (0,9), so the central `sheep*` mass spreads into looser groups. Syntax-checked only; no look, no asset_search, no wolf reshape (short session).
**Saw**: Nothing rendered this session; no numbers.
**Next**: Reshape the wolf to WOLF.png (asset_search "wolf" first, taper `wolf-leg`, pale rim vs `wolf-rock`). Look at the start frame and sample [300,200], [420,220] for meadow green. asset_search pines/oaks; play solo win and 2-player round.
**Open**: Spread change unverified visually; wider scatter may push sheep past the 27 radius clamp (scaled 0.8) and re-cluster at the edge.

### Judge 57

**Judge 57 scores**

1. **Looks as LOOK.md says: 7.5.**
   - The `start` frame has the cloud-band `sky`, the low `sun`, three `ridge*` layers, inked `pines*` ×18 and `round-trees*` ×10, and the paper grain.
   - `wolf-body` is the darkest shape but only 1.4% of the frame, and the frame is 1% near-black.
   - The sheep spread only partly worked. The sample at [420,220] is `#f1e8cb`, which is cream, so that point is still sheep. The sample at [300,200] is `#d3b8a1`, which is hill and sky, not meadow green.
   - The sheep still form a dense cream mass in the middle. Gaps in the `sheep*` ×85 are small.

2. **Compared with BOARD, LOOK.png and the turnarounds: 7.**
   - The `wolf-body` is still a flat lump on `wolf-rock`. The `wolf-leg` shapes are stubby, and the pointed muzzle and ears only partly read.
   - The biggest style gap is still the crowded sheep against the calm, flat meadow of refs/study.

3. **Clip moment: 8.5.**
   - After `pounce` on "human", the splash with a red ink burst and a "PLAYER 1" tag shows at about 90 frames.
   - A held woodcut duotone freeze follows at about 150 frames.
   - The tilted "GOTCHA HUMAN, PLAYER 1 has been found." stamp card is on screen, with the caption "Even at dusk, nobody blends in forever."
   - The sounds fire: `boom`, `stab1`, `stab2`, `stab3`, `thud`, `hit`.
   - I did not check the sheep-bite card this session. It was seen in 56.

4. **Core loop and controls: 8.**
   - `#hud` shows the 2:59 timer, the clover slots, the wolf-bite drops and the suspicion bar. `#mode` lists the controls.
   - I did not replay a solo win or the clover patches.

5. **Local 2-player: 7.5.** I did not play it, so this is carried over.

6. **UI typography: 8.5.** The cream `#hud` and `#mode` panels have ink borders and IM Fell type. The Alfa Slab stamp and `#cap` caption strip read well.

7. **Convention and performance: 8.**
   - `window.__game` is present and the page starts playing on load.
   - It draws 71 draw calls and 155k triangles.
   - The 285 ms frame is SwiftShader on a host with load 3.4, so it is not a fault.

8. **Juice: 8.** The 11 sounds fire on the bite, and the freeze and splash read.

**Faults: 7.5.**
- There are no console errors and no `Never visible` object.
- Surfaces lines:
  - Two `wolf-leg` cylinders share a face plane at y=1.65 on hidden faces.
  - `wolf-body` shows a repeating pattern at 100 px in the freeze frame.
- The wolf is only 1.4% of the start frame.

**Next:**
1. **Reshape the wolf to WOLF.png (asked again, fifth time).**
   - Run `asset_search` "wolf" first. No search is recorded for it, and the wolf is made in code.
   - Taper the `wolf-leg` shapes and give the `wolf-head` a pointed muzzle and upright ears.
   - Add a thin pale rim between `wolf-body` and `wolf-rock`.
   - Nudge one of the two coplanar `wolf-leg` cylinders off y=1.65.
   - One `look` with `zoom` on [100,420,440,700] of the start frame shows it done: the head reads as a canine silhouette with four distinct legs.
2. **Calm the central `sheep*` cluster (asked again).**
   - The wider polar scatter only partly helped. Cut the sheep inside the central group, or move 15–20 of them into 3–4 loose groups at the meadow edges.
   - Leave visible `ground` green between the groups.
   - One `look` with `sample` at [420,220] and [560,260] on the start frame shows it done: both points read meadow green (about #8a9a4a) instead of cream.
3. **Run `asset_search` for "stylized pine tree" and "oak tree".**
   - The `pines*`, `oaks` and `round-trees*` are made in code, and no search is recorded for them.
   - Then play a solo win with `interact`: hold E on the 3 clover patches, then run to 3:00.
   - Also check the sheep-bite stamp card and a 2-player round with `Enter` pounces.

SCORE: 7.9
