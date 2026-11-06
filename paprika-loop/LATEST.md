The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 6
**Did**: index.html `@media(max-width:640px)` shrinks `#hud`, moves `#mode` to bottom-right and hides its `small` text, moves `#toast` low; game.js camera fov widens when aspect<1.4 (keeps ~1.4 horizontal view, max 80); `W.root` scale 5.2→3.8; `wolf-rock` mesh scaled 1.3 so the crouched wolf sits on it.
**Saw**: opening look: `wolf-rock` 0.64% (was 0.21%), `wolf` ×4 0.52%, 0 overlap in HUD, no Never-visible; phone cell: HUD and mode panel no longer overlap, wider meadow view (the black side bars in the phone cell look like the montage's cell layout, canvas is 390 wide). `sand` still 0.27%; `pines` coplanar note at y=4.30 unfixed. No `perf`.
**Next**: (1) bigger bright `aim` ring/target-sheep tint in Local mode, keep `reach` visible in leap; (2) widen sand beach >1% (lower far ground edge); (3) fix `pines` coplanar face; add a tutorial hint for clovers.
**Open**: aim ring, sand, pines face not done; not re-played this session.

### Judge 6

**Judge verdict, session 6**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are listed on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off, and there is no `Lighting:` line.
   - `sand` is still 0.27% [405,302,741,321]. It is a pale line behind the rocks.
   - The `pines` coplanar face at y=4.30 is still unfixed.
2. **Plays as DESIGN.md says: 7.**
   - I did not replay the solo loop or `interact` this session. This carries over from session 4. The `SUSPICION` bar, clover icons and bite dots show in the HUD.
3. **The clip moment: 7.**
   - The AI case reads well: a "BITE WASTED / AI SHEEP / Just a sheep. Bite wasted." banner, a "baa?" bubble, the wolf's bite dots dropping to 2, and a documentary caption ("A completely innocent sheep. Awkward.").
   - The wolf at the pounce is a giant, flat-shaded brown slab whose arms stick out stiffly sideways. It reads as a T-pose, not a leap or a shrug.
   - I saw the human-reveal banner (PLAYER 1 tag) only in earlier sessions. At frame 50 of the human pounce it had not shown yet. The pounce build-up is slow and the wolf covers half the frame, which makes the clip clumsy.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and bright meadow all show.
   - `wolf-rock` is up to 0.64%, but the wolf is a brown lump on its right side, not clearly crouched on top.
   - The beach is not a visible wedge.
5. **Solo is fun and fair: 7.**
   - The suspicion bar and the "Shift (suspicious!)" hint are there.
   - The 3 `clover` objects are 0.15% of the frame, and there is no tutorial text to point at them.
6. **Local 2-player: 6.**
   - `aim` and `reach` are "Hidden by the game" in the idle look. I did not test them this session.
   - The aim ring is still not clearly readable, which is the same open item from Iteration 6.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` works, with its keys, actions and `observe`.
   - `perf` reads 125 ms with 67 draw calls and 102k triangles. That is SwiftShader only, so it is not a fault.
8. **Juice: 7.**
   - Captions, banners, the "baa?" bubble and the wolf's walk, crouch and leap are all there.
   - Sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The Iteration 6 fix (smaller HUD, `#mode` moved) was seen only as a phone cell in Iteration 6, and I did not re-run `viewports`.
   - The laptop-size HUD is fine.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar face and the thin sand strip are still open.
    - The wolf is oversized and stiff in the pounce.

**Next:**
1. **Make the sand beach a real wedge, and fix the `pines` coplanar face (asked again).**
   - Beach: lower the far `ground` edge, or add a sand ring mesh at the shoreline in front of the rocks, so `sand` is above 1%.
   - Pines: offset the duplicated faces at y=4.30 by 0.001 or delete the hidden one.
   - To check, run `look` with `sample` at (640,310). It should read sand-coloured, not #ced5ba, and `sand` should be above 1%. The `Surfaces:` line should be gone.
2. **Rework the wolf's pounce pose and size.**
   - Make the wolf about 40% smaller in the pounce. Fold the limbs forward in the leap (front legs forward, hind legs back) so it does not read as a T-pose. Give it a pale muzzle and a dark nose.
   - Add a clear shrug on a miss, with shoulders up and the head tilted.
   - To check, run `look` with a `sheet` of the pounce at frames 20, 40 and 70 for `human` and `ai`. The wolf should fill less than a third of the frame, with a visible leap arc and the banner readable.
3. **Make the local-mode `aim` ring and the clovers readable.**
   - Make the `aim` ring 3–4 units wide, bright, pulsing, with a tint on the targeted sheep. Keep `reach` visible during the leap.
   - Add a "find the clovers" hint line and a faint glow or sparkle on each `clover`.
   - To check, run `interact` with `M` and ArrowRight ×30, with `look: true`. `aim` should be above 0.05% in the list. The `clover` share should rise above 0.3%.

SCORE: 6.7
