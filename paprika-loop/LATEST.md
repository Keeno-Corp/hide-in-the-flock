The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 20
**Did**: Letterbox bars `#bt`/`#bb` 5vh→3vh (game.js, all `cam.punch` heights); AI-reveal `#bubble` placed higher (`t.y + 4.2`) so it clears the `wolf`.
**Saw**: sheet human|ai at 150 frames: brightness 54%/54%, near black 6%/6% (was 9%), no console errors. The `wolf` in the AI cell is still partly behind the foreground pines. Not run: perf, viewports, sheep-shrink pop at reveal end, sand share.
**Next**: (1) `interact` pounce human 200 frames, check sheep un-shrink pop; (2) `look` viewports phone/laptop for HUD and reveal text; (3) short "REPLAY" freeze after reveal, drop `aimLine`.
**Open**: sheep-shrink pop and phone layout unchecked; AI-cell `wolf` partly hidden by pines.

### Judge 20

**Judge verdict, session 20**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×136, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds. Brightness is 64%, saturation 45%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME 2:59, the three CLOVERS outlines, the WOLF BITES dots and the SUSPICION bar. The `clover` rings glow on the meadow.
   - I ran `interact` with the pounce action, not with the keys.

3. **Clip moment: 8.**
   - **Human cell:** the `wolf` lies flat in frame under a big red "GOTCHA". The red PLAYER 1 tag and "PLAYER 1 has been found." sit above it.
   - **AI cell:** "AI SHEEP", "Just a sheep. Bite wasted." and the "baa?" bubble all show.
   - **Darkness:** the target is met. Near black is 6% in both cells (was 9%) and brightness is 54%.
   - **Wolf in the AI cell:** the `wolf` is still half behind the pines and the bubble. It does not read clearly as the shrug.
   - **Sheep pop:** I did not check the sheep shrink-and-pop at the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.
   - The `human` cell is a little hazy and warm.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the end screen with restart and the caption line are all present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 232.8 ms on SwiftShader (host load 5.4), so it is no signal.
   - It shows 77 draw calls, 102.8k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - The laptop 1440×900 cell is fine.
   - The phone cell is a narrow portrait strip with a tiny HUD panel. The controls hint ("(M) Mode: SOLO") sits at the bottom corner and is small. I did not look at the reveal text at phone size.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The only open fault is the AI-cell `wolf` partly hidden.

**Next:**
1. **Make the `wolf` clear in the AI reveal.**
   - Raise or shift the reveal camera so the foreground `pines*` don't cross the `wolf`, for example by hiding pines near the camera during `cam.punch`.
   - Move the "baa?" bubble beside the head.
   - Check with `look` `sheet` on `pounce ai`, 150 frames. The whole `wolf` should show without a pine across it.
2. **Make the phone layout work.**
   - Scale the HUD up with `clamp()` or `vw`, and enlarge the mode hint at narrow widths.
   - Run `look` `viewports` `["phone"]` and `sheet` `pounce human` at phone size. The "GOTCHA" and PLAYER 1 tag should fit the width.
3. **Check the sheep pop, then add a short "REPLAY" beat (asked again).**
   - Run `interact` `{action:"pounce", target:"human"}` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a 0.4 s zoom-back with a "REPLAY" tag after the reveal and drop `aimLine`. Check by `look` `sheet` at about frame 170.

SCORE: 8.2
