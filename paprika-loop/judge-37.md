**Session 37 verdict.** I ran a 3-cell sheet (start, human pounce, AI pounce), one local-mode `interact` with `look`, and `perf` once. I did not play solo, zoom on a clover, or time the card.

1. **Looks as LOOK.md says: 7.**
   - The `sky`, sun disc, layered `ridge*` hills, inked `pines*` and `oaks*`, paper grain and cream `sheep*` read as a storybook.
   - The trees and sheep are visibly faceted low-poly: `sheep*` look like crumpled polygons and the hill shading has hard facets. This breaks the "no faceted generic low-poly" Check.
   - The meadow hatch is calmer than in session 36.
   - `wolf-body` is the darkest shape, but it stays a flat black slab. `wolf-shoulder` shows only as a brown oval on top of it.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The wolf head and tail still merge into the body, and `wolf-leg` is under 1 pixel.
   - Biggest remaining style gap: the faceted sheep and trees against the flat painted masses of BOARD. The wolf silhouette comes second.

3. **Clip moment: 9.**
   - The human pounce gives a cream card with "GOTCHA", a red "HUMAN", "PLAYER 1" and ink splatter over a woodcut duotone.
   - The AI pounce gives "BAA? SHEEP", "Just a sheep. Bite lost." and a "baa?" bubble.
   - I did not time the card.

4. **Core loop and controls: 7.**
   - The HUD is clear.
   - Solo suspicion and win/lose screens are carried over, and clover patches are still unchecked.

5. **Local 2-player: 7.5.**
   - KeyM gives `mode: local`, and ArrowRight moves the wolf (state `ctrl`).
   - Targeting shows `wolfRing`, an `aim` ring, `aimArrow` and red `wolfMark` triangles over the target.
   - The ring is orange and busy over the sheep, but the target reads clearly.
   - I did not test Enter through to a bite this session.

6. **UI typography: 8.5.** IM Fell panels on cream with ink borders, Alfa Slab stamps, and a storybook caption. The toast reads "Wolf: walk to the flock with arrows, get close, Enter to pounce".

7. **Convention and performance: 7.5.**
   - 81 draw calls, 116,950 triangles and 0.63 MB of assets.
   - `window.__game` is present and `#paper` clears.
   - The 293 ms frame is SwiftShader with host load 4.2, so it is not a signal.

8. **Juice: 7.5.** I did not re-check sounds or sheep animation this session.

**Faults: 8.**
- `Never visible: none`, and there were no console errors, `Lighting:` lines or `Surfaces:` lines.
- `wolf-leg` is 0.00023% of the picture, so effectively invisible.
- The clover is still unchecked.

**Next:**
1. **Flatten the faceted sheep and trees.**
   - Smooth the normals on the instanced `sheep` and `sheep-heads` meshes and on `round-trees*` and `pines*`. Use a flat toon or ramp colour per mass, with the facet variation removed.
   - Also reduce the vertex-colour jitter. Facets should not show in `look` zoom [330,560,900,900]; the sheep should read as soft cream blobs with an ink outline.
2. **Make the wolf silhouette readable (asked again).**
   - Make `wolf-leg` four visible dark legs, raise and separate `wolf-head` with an ear and snout notch, and make `wolf-tail` a plume.
   - Add a thin warm rim light on the top edge against `wolf-rock`.
   - `look` zoom [450,560,920,720] should then show four legs, a tail and an ear, with `wolf-leg` over 0.05% of the picture in the On screen list.
3. **Run the clover and solo passes (asked again).**
   - Get a clover position from `observe`, then `look` with `zoom` on it. It should show three inked heart leaves and a glow ring.
   - Run a solo `interact` of KeyE on the clover for about 120 frames, and confirm the progress state rises.
   - Run a local `interact` of Enter near a sheep to confirm the bite resolves. Keep the `aim` ring thinner and in cream or ink so it does not read as a UI overlay.

SCORE: 7.6
