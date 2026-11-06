The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 36

**Session 36 verdict.** I looked at a 3-cell sheet (start, forced human pounce, forced AI pounce) and the laptop viewport. I ran one `interact` (KeyM, then Enter) and `perf` once. I did not zoom on a clover, run a solo `interact`, or time the card.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, layered `ridge*` hills, inked `oaks*` and pines, paper grain and cream `sheep*` still read as a storybook at laptop size.
   - `wolf-body` is a near-black mass on `wolf-rock` and the darkest shape on screen. It is still a flat blob with no interior tone.
   - The frame is busy, with muddy hatch lines across the meadow.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The wolf is bigger. `wolf-shoulder` does not show on the start frame, so the silhouette has not changed.
   - Head and body still merge, and the legs and tail do not read against `wolf-rock`.
   - Biggest remaining style gap: the wolf's silhouette detail and its lack of any interior tone.
   - The sheep are lighter and flatter than the SHEEP.png turnaround.

3. **Clip moment: 9.**
   - The human pounce gives a tilted cream card with "GOTCHA", a red "HUMAN", "PLAYER 1" and ink splatter over a woodcut duotone.
   - The AI pounce gives "BAA? SHEEP", "Just a sheep. Bite lost." and a "baa?" bubble.
   - The card is now smaller and sits in the top third, so the freeze frame shows more.
   - The sounds fire (boom, stab1–3, thud, hit, womp, baa). I did not time the card.

4. **Core loop and controls: 7.**
   - The HUD is larger and readable at 1440. The clover patches show as green discs, but I did not zoom on them.
   - I did not play solo this round, so the suspicion and win/lose screens are carried over.

5. **Local 2-player: 6.5.**
   - KeyM switches to `mode: local`, and Enter put the wolf into a `pounce` state (`bites` 2) with the reveal phase.
   - That pounce resolved as an AI sheep.
   - I did not check a target marker, because the `look` on that step did not capture one.

6. **UI typography: 8.5.** IM Fell panels on cream with ink borders, Alfa Slab stamps, and a storybook caption under the card ("It had a name, and the name was Player One.").

7. **Convention and performance: 7.5.**
   - 81 draw calls, 116,598 triangles and 0.63 MB of assets.
   - `window.__game` is present and `#paper` clears.
   - The 278 ms frame is SwiftShader on a busy host (load 4.9), so it is not a signal.

8. **Juice: 7.5.** Sounds start on the bite. I did not re-check the sheep animation or the silence before the stamp.

**Faults: 8.**
- There were no console errors, `Lighting:` lines or `Surfaces:` lines.
- The `wolf-shoulder` patch is hidden.
- The clover and 2-player target marker are still unchecked.

**Next:**
1. **Make the wolf silhouette readable (asked again).**
   - Put `wolf-shoulder` outside the extruded body. Offset it in x on both sides, or draw a lighter chest or belly decal in warm brown.
   - Raise the head, and separate the tail and legs from `wolf-rock` with a rim of light.
   - `look` with `zoom` [250,340,760,640] should then show a lighter shoulder, a visible tail and four legs.
2. **Clear the muddy hatch overlay in the meadow.**
   - Lower the contrast of the dark wobble lines and hatch strokes on `ground-ink` so the meadow reads as flat painted masses.
   - Check with a laptop `look` that the sheep flock stands clearly against the ground.
3. **Run the clover and 2-player passes (asked again).**
   - Get a clover position from `observe` and `look` with `zoom` on it. It should show three inked heart leaves and a glow ring.
   - Run `interact` with KeyM, then arrow keys and Enter, with `look: true`. A pounce target marker should show over the targeted sheep before the bite.

SCORE: 7.5

## Iteration 37
**Did**: game.js: `wolf-shoulder` is now two blobs at x ±0.25 on `W.body` (colour 0x7a5a42), outside the extruded body; `ground-ink` opacity 0.95→0.5; post shader hatch0 mix 0.36→0.2 (less muddy hatch).
**Saw**: `look` zoom [250,340,760,640]: a brown shoulder patch now shows on the wolf; meadow contour lines and hatch are softer; wolf still a dark mass, tail/legs still unclear against `wolf-rock`. No perf, clover or 2-player pass.
**Next**: rim of light on tail and legs against `wolf-rock`; clover zoom + glow ring; KeyM + arrows + Enter pass for the pounce target marker; laptop `look` for flock vs ground.
**Open**: clover and 2-player target marker still unchecked; no console check this session.
