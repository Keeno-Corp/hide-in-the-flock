The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 21

**Judge verdict, session 21**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, the three CLOVERS outlines, the WOLF BITES dots and the SUSPICION bar, and the `clover` rings glow on the meadow.
   - I ran `interact` with the pounce action only, not with the keys, and I did not play a full round.

3. **Clip moment: 8.**
   - **AI cell:** the `wolf` is now fully visible, with no pine across it. The "AI SHEEP" banner, "Just a sheep. Bite wasted." and the "baa?" bubble sit beside its head. The bubble sits close to the head, but the wolf is still a dark, pale-tinted shape in the foreground and the shrug does not read clearly.
   - **Human cell:** "GOTCHA", "HUMAN!", the red PLAYER 1 tag and the red silhouette all read. The `wolf` lies flat and dark.
   - **Left half of the frame:** a pink wash covers the left of the human cells, apparently from the foreground `rocks*` and `sheep*` tinted by the reveal overlay. It looks like a fault.
   - **Darkness:** near black is 6% in both cells.
   - **Not checked:** the sheep pop and the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the win/lose screens and the caption line are present ("Even in nature, nobody blends in forever.").
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 123 ms on SwiftShader on a busy host (load 6.7), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 6.**
   - **Phone viewport:** the HUD panel and the "(M) Mode: SOLO" hint are tiny at 390 px. The hint is hard to read.
   - **Phone reveal:** I did not look at the reveal text at phone size. My "phone late" cell ran at the default size, so it says nothing about the phone.
   - **Laptop:** fine.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The pines pop in and out at the reveal ends, hidden by the letterbox.
    - There is a pink wash on the left of the reveal cells.

**Next:**
1. **Phone layout (asked again).**
   - Scale the HUD and the "(M) Mode" hint with `clamp()` or `vw` at widths under 500 px.
   - Check with `look` `viewports` `["phone"]`: the HUD text is about twice as big, the hint is readable and it does not cover the sheep.
   - Then run `look` `sheet` with `pounce human` at 150 frames and `state`/`steps` `resize: [390, 844]`. "GOTCHA" and the PLAYER 1 tag should fit the width.
2. **Clean the reveal colour.**
   - Find the source of the pink wash on the left of the human cell: an overlay gradient, a vignette tint, or `rocks*` and `sheep*` lit red.
   - Remove it or make it neutral.
   - Check with `look` `sample` on the left pixels of the `human` cell, around [60, 200]. They should read as grass green and sheep white, not pink.
3. **Check the sheep pop, then add a short "REPLAY" beat (asked again).**
   - Run `interact` `pounce human` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a 0.4 s zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check by `look` `sheet` at about frame 170.

SCORE: 8.0

## Iteration 22
**Did**: index.html: phone `@media(max-width:640px)` sizes up (HUD rows 22px, labels 14px, `#time` 28px, `#sbar` 100px, `#mode` 16px); `#vig` gradient now transparent to 62% and a duller red; game.js `vig` opacity 0.55/0.6 -> 0.4 in the human reveal.
**Saw**: `look` phone: HUD and the "[M] Mode" hint read larger, 609 on screen. Sheet pounce human at 150 frames: brightness 56%, near black 6%, the pink wash is gone from the left, though a faint pale vertical band is left near x 80-140 (maybe the reveal `.band` or a pale rock). Not run: perf, sheep pop, phone reveal.
**Next**: (1) `look` sheet pounce human with `resize [390,844]` to check GOTCHA and the tag fit; (2) `interact` pounce human 200 frames for the sheep pop; (3) the "REPLAY" beat, drop `aimLine`.
**Open**: the pale band at the left of the human cell is unexplained; the sheep pop and the phone reveal are unchecked.
