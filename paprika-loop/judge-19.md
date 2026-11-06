**Judge verdict, session 19**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, `wolf`, the `sheep*` flock and `cloud` ×34. Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.
   - I did not read the `sand` share.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, the clovers, the WOLF BITES dots (3, then 2 after the AI pounce) and the SUSPICION bar.
   - The end screen reads "EATEN … R to play again · M to switch mode".
   - I did not run `interact` with keys this session.

3. **Clip moment: 8.**
   - The human cell shows a `wolf` fully in frame above the caption. It also shows the red PLAYER 1 tag, "HUMAN!" and a big "GOTCHA".
   - The AI cell shows "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble and the shrugging `wolf`.
   - Lightened as asked: brightness is 52% and 51% (was 44%). Near black is still 9% in both cells (was 15%), so the target of under 8% is not met. The letterbox bars cause most of it.
   - The `wolf` in the AI cell is half hidden behind the "baa?" bubble and the foreground pines.
   - I did not check the sheep-shrink pop at the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera, in a bright low-poly picture.
   - The `after` cell is warm and tinted, which is slightly off the ref's blue sky.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover rings, the end screen with restart, and the "Even in nature, nobody blends in forever." caption are all present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions.
   - I did not re-run it this session.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 124 ms on SwiftShader (host load 4.9), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 8.**
   - The HUD is readable at 1280 wide.
   - I did not run `viewports`.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The only fault is the 9% near black in the reveal cells, covered under item 3.

**Next:**
1. **Get the reveal cells under 8% near black (asked again).**
   - Make `#bt` and `#bb` 3vh or translucent, and lighten the dark foreground tint.
   - Check with `look` `sheet` on `pounce human` and `pounce ai`, 150 frames each. The near-black share should read under 8% and brightness should stay above 52%.
2. **Check the end of the reveal for a sheep pop, and keep the `wolf` readable in the AI cell.**
   - Run `interact` `{action:"pounce", target:"human"}` with `frames: 200` and `look: true`. The `sheep*` should ease back to full size over about 0.3 s without a pop.
   - In the AI reveal, move the "baa?" bubble above the `wolf`'s head so it no longer covers the body. Check with the same `look` `sheet`.
3. **Add a short "replay" freeze frame after the reveal and drop `aimLine`.**
   - After the reveal, add a 0.4 s freeze or zoom-back on the pounce moment with a "REPLAY" tag. This makes the 5-second clip land.
   - Also run `look` with `viewports: ["phone","laptop"]` to check the HUD and reveal text at small sizes. This has not been run for several sessions.

SCORE: 8.3
