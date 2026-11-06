The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 31

**Judge verdict, session 31**

1. **Looks as LOOK.md says: 8.**
   - The play frame shows `sea`, `cliff`, `sand`, `pines*` ×136, `cloud` ×34, `wolf-rock`, `sheep*` ×97 and `clover` ×4 glowing, on a bright meadow. Saturation is 45% and green 51%. There are no `Lighting:` or `Surfaces:` lines.
   - The reveal frame is still 26% saturation with 74% grey. I did not take a `sample`.

2. **Plays as DESIGN.md says: 7.**
   - A forced AI pounce took `wolf.state` from "watch" to "pounce" and `bites` from 3 to 2 at frame 79.
   - `setState({result:"lose"})` now works: `result` changed to "lose" and the replay ran. The "EATEN" title is faded behind `div#replayTag`, its sub line is nearly invisible against the sky, and it never gets a clear moment.
   - I did not re-check the win screen this session; the builder saw it work. I did not run the 90 s graze, so the `w.afterAI` cooldown is still unverified.

3. **Clip moment: 9.**
   - The reveal shows "AI SHEEP", the "BITE WASTED" kicker, the "Just a sheep. Bite wasted." subline, `div#bubble` "baa?" over the wolf in the "shrug" pose, `div#cap` "A completely innocent sheep. Awkward.", and the `div#replayTag`.
   - Nine sounds played: `boom`, `stab1` to `stab3`, `thud`, `hit`, `womp` ×2 and `baa`.
   - The grey `div.band` behind the title still washes the frame out.

4. **Looks like refs/01.jpg: 9.**
   - The play camera shows the sea, sand beach, grey `cliff`, pines and puffy `cloud` objects, with the `wolf` crouched on `wolf-rock`.

5. **Solo fun and fair: 7.**
   - The suspicion bar and clover glows read clearly, and the win and lose screens now both exist.
   - The 14 s AI-bite cooldown is unmeasured, and I did not play a full solo round.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` works and the page starts playing on load.
   - `perf` gave 125.5 ms per frame with 76 draw calls and 102.7k triangles. This is a software renderer, so the frame time is no signal.

8. **Juice: 8.**
   - Baas, `womp`, `boom`, `stab*`, `thud` and `hit` all fire. The caption voice is funny.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps and nothing is cut off. I did not re-run other sizes.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.

**Next:**
1. **Verify the AI-bite cooldown (asked again).**
   - **Do:** run a 90 s graze with `trace:["bites","wolf.state"]`, in two or three `wait` chunks if needed.
   - **Check:** two `bites` changes should be at least 14 s apart after the walk back.
2. **Make the reveal frame vivid (asked again).**
   - **Do:** find what greys 74% of the frame: the `div.band` gradient behind the title, the dark `wolf` filling the view, or the overlay tint. Make the band narrower or more transparent and ease the grade.
   - **Check:** `look` after `{action:"pounce",target:"ai"}` and `wait:150`. Saturation should be above 35%, and `sample` at (200, 600) should read a vivid green.
3. **Make the lose and win titles readable.**
   - **Do:** add a soft dark backing to the title and sub line, and fade the `div#replayTag` out before the end title (or move it off it). Today "EATEN" and "The wolf got you · R to play again" sit ghosted over the sky.
   - **Check:** `interact` `[{state:{result:"lose"}},{wait:200}]` with `look`. The title should be opaque and the sub line legible, with no replay tag over it.

SCORE: 8.0

## Iteration 32
**Did**: `#rsub` in index.html now has a dark rounded backing (`#1b2a1acc`); `endGame` in game.js hides `#replayTag`.
**Saw**: `setState({result:"lose"})` + 200 frames: "EATEN" opaque, sub line legible on its backing, no replay tag; saturation 43%, green 50%, no `Lighting:`/`Surfaces:`, no `Never visible`. No perf, no 90 s graze, no reveal sample this session.
**Next**: (1) 90 s graze with `trace:["bites","wolf.state"]` for the 14 s AI-bite gap; (2) reveal frame saturation (26%): `div.band` is already faint, so check the `renderer.domElement.style.filter` and wolf dark mass; (3) check the win screen with the new sub backing.
**Open**: the AI-bite cooldown and reveal grade are still unmeasured.
