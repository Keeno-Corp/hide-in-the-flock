**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 6.** The sky at the top of the frame is rose-apricot, and the meadow reads olive-ochre. The `ridge*` ×3 mauve ridges are layered, and paper grain and ink outlines show. Check 3 passes: `wolf` subject brightness is 14% against 51% around it. The faults:
   - The `pines*` ×40 are dark flat green cones, and the `round-trees*` are glossy lollipop balls with visible facets. They read as 3D game assets, not painted masses.
   - The sky is mostly flat cream, and the sun disc is small and pale.
   - The wolf takes only 0.68% of the frame.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.** The `sheep*` ×101 are small cream lumps with no indigo belly, ears or thin dark legs. `wolf` and `wolf-rock` are low and small, with no crouch silhouette. The biggest remaining style gap is that the trees and sheep have 3D shading while the sheet is flat gouache.
3. **Clip moment: 8.5.** `interact` with a human pounce shows the held duotone frame, a tilted HUMAN stamp card with GOTCHA, a PLAYER 1 tag, the `splash` ink splash and the `cap` caption. The sound list has boom, stab ×3, thud and hit. The wolf `pounce` reveal runs in about 1.2 s. I did not view the AI-sheep variant (SHEEP and baa?) or check the slow-mo and camera punch-in.
4. **Core loop and controls: 6.** The HUD shows time, clovers, wolf bites and suspicion, and the `mode` panel lists the controls. The `clover` ×3 are nearly invisible: 0.1% of the frame, drawn as pale ghost columns. I did not test grazing, the win and lose cards or restart.
5. **Local 2-player: 4.** I did not run it. `wolfRing`, `aim` and `aimArrow` are hidden in solo, so targeting clarity is unverified.
6. **UI typography: 8.** The HUD is on cream paper panels with ink borders in IM Fell and Alfa Slab. The `#hud` and `#mode` boxes are not cut off or overlapping, and the `cap` caption is a storybook line. I did not check small window sizes.
7. **Convention and performance: 7.** `__game` works, play starts on load, and the flock is ~101 sheep in a few draw calls (45 total). `perf` reads 321 ms a frame on SwiftShader, which says nothing about a real GPU. There are 322k triangles, which is heavy for a flat style, and the `div#paper` overlay stays up at 0.55 opacity.
8. **Juice: 6.** The bite has a layered sound stack. Sheep grazing animation was not looked at.

**Faults: 6.5.** There are no console errors, `Never visible` is none, and the opening look has no `Lighting:` or `Surfaces:` fault lines. The second `look`, on the held bite frame, flagged a `Surface:` fault: `ground` covers 57% with dense fine detail (49/255) that reads as noise and shimmers as it moves. That frame is the woodcut duotone, so the detail is probably the hatching and grain in the post pass. It is not confirmed as intended, and it may also show in normal play. The `player` object is not seen by the ID image.

**Next:**
1. **Trees: flatten `pines*` and `round-trees*`.** The tree masses look the most like a 3D game. Remove the specular and facet shading. Use 2–3 flat toon bands in sage and olive with an indigo shade side. Soften the pine cones and fade them into haze with distance. The check is a `look` zoom on a pine and a round tree showing flat banded fills with no gloss. Also run a search for oak, pine and sheep models in the words a library would use ("stylized flat sheep", "low poly pine tree"), since these are still code-made and the asset search files hold no search for them.
2. **Sheep to the SHEEP.png sheet (asked again).** Add an indigo underbelly band, thin dark legs, visible dark ears and a head-down graze pose, and make the sheep a little larger. The check is a `look` zoom on the front flock showing an indigo belly and dark legs, with wool still above #d8cfae.
3. **Sky, sun and clovers, plus the ground noise.**
   - Make the sun disc large and flat, add stronger rose and apricot cloud bands, and enlarge the mauve ridges. The sky part was asked last round and is still not done (asked again). The check is `look` with `sample` at (640,40) and at the sun, which should show r−b above 40 with a visible disc.
   - Give the `clover` ×3 an ink-outlined painted patch that shows at least 0.5% of the frame.
   - Fade the hatching and the `ground` detail with distance in the post pass, so the `Surface:` line on `ground` clears in a `look` after `interact` steps. Check the plain gameplay frame too.

SCORE: 6.3
