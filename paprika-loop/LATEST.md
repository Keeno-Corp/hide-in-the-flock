The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 27

**Judge verdict, session 27**

1. **Looks as LOOK.md says: 8.**
   - The h230 cell shows the sea, `cliff`, `pines*`, `wolf-rock`, `rocks*` and the `sheep*` flock in bright low-poly colours. The sheet reports no `Lighting:` or `Surfaces:` lines.
   - Saturation drops to 25–26% in h200, h230 and ai150. The new `saturate(0.6)` filter probably explains part of that. I did not sample a quiet play-camera moment, so I can't separate the filter from the scene.

2. **Plays as DESIGN.md says: 8.**
   - I carried this forward from session 26 and did not re-run `interact` this session.
   - The pounce was forced with `act`. No full round has been played with real keys for several sessions.

3. **Clip moment: 9.**
   - **Human reveal:** h100 reads big. It shows the "HUMAN!" caption, the red "GOTCHA", "PLAYER 1 has been found.", the PLAYER 1 `tag` and the wool burst.
   - **Replay beat:** the camera pulls back and desaturates, and "▶ REPLAY" appears by h230. h200 is still close with the banner up, so the zoom-out is staged and not a hard cut. This closes last session's replay item.
   - **AI reveal:** ai150 shows the `wolf` filling the frame, with "AI SHEEP", "baa?" and "Bite wasted."
   - **Remaining gap:** the "baa?" bubble sits on top of the "SHEEP" lettering in ai150 and covers the "E".

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, sand, clouds and `wolf-rock` all show in h230 and h200.
   - The reveal desaturation makes the picture duller than the ref until it clears.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` ×5 rings, the caption voice, and win/lose with restart are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` gives 118 ms per frame on SwiftShader with host load 6.3, so it says nothing about a real GPU.
   - It reports 76 draw calls, 102.7k triangles and 0 MB of assets.
   - The canvas CSS filter is untested on real hardware.

8. **Juice: 8.**
   - Captions: "Even in nature, nobody blends in forever." and "A completely innocent sheep. Awkward."
   - I did not test sound this session.

9. **Works at any window size, HUD readable: 8.**
   - The desktop HUD is readable and does not overlap the reveal.
   - The phone reveal check (`div#reveal` overflow) is still unverified.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object. The `perf` figure is not a fault on a software renderer.
    - The phone overflow check is still open.

**Next:**
1. **Play a full solo round with real keys (asked again).**
   - **Do:** walk to a `clover` and graze. Let suspicion rise and a natural pounce happen within the first minute. Then reach the win or lose screen and press `KeyR`. Fix whatever feels unfair or unclear.
   - **Check:** `interact` with `until` on the win/lose state, then `look`. It should show the end screen, and after `KeyR` a fresh round.
2. **Verify the reveal on phone (asked again).**
   - **Do:** run `look` with `sheet` of `pounce human` at 100 and 230 frames, opened at 390×844 (`open` with `size` [390, 844]).
   - **Check:** `div#reveal` is no longer reported cut off, and the REPLAY tag and PLAYER 1 `tag` sit clear of the HUD.
3. **Fix the "baa?" bubble covering the "SHEEP" lettering.**
   - **Do:** move the bubble to the wolf's head area, below the banner caption.
   - **Check:** `look` `sheet` of `pounce ai` at 150 frames. "SHEEP" should read in full and the bubble should sit over the `wolf`.

SCORE: 8.2

## Iteration 28
**Did**: game.js reveal: the "baa?" `#bubble` top is clamped to at least 60% of innerHeight, so it no longer covers the banner lettering ("AI SHEEP").
**Saw**: `look` sheet at 390x844 (pounce human at 100 and 230 frames, pounce ai at 150 frames): no `Lighting:`/`Surfaces:` lines. "AI SHEEP" reads in full and the bubble sits over the `wolf`. In h100 and h230 the GOTCHA banner, REPLAY tag and PLAYER 1 `tag` all fit and clear the HUD. Saturation is 23-35% (the reveal filter lowers it). `perf` not run.
**Next**: (1) full solo round with real keys through to the win/lose screen and `KeyR` (still not done); (2) check the bubble clamp at desktop size; (3) the reveal filter may cost fps on a weak GPU, so consider a lighter overlay instead.
**Open**: no full round played with real keys again; the reveal canvas CSS filter is untested on a real GPU.
