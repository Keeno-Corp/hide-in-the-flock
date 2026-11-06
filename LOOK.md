# Look: Hide in the Flock (Storybook Pastoral)
Board: refs/sheets/LOOK.png (free; the paid board needs a funded image key: the fal key found here answered 403 "locked, TOP_UP", so top up fal, or add an OpenAI or Gemini key, and `sheet` kind board/turnaround can run)
## Palette
ink #2a1c12 · paper/UI #efe3c8 on ink · wool #f3e8cc · sheep face #2b211c · ochre grass #b9a24f · sage #8e9a58 · olive shade #6f7a45 · indigo shadow #3f4a6e · sky top #7d86a6 · dusty rose #d9a49a · apricot horizon #f2b47a · sun #ffe2a8 · far hills mauve #8a7f9a · wolf ink #17110e · stamp red #b3261e   (refs/01.jpg grass #919144 haze #c4c1a7 sampled; refs/02.jpg ink #2d1e10 paper #a28a66 sampled; study/2 indigo #47596f, glow #a28976 sampled; the rest builder's call, derived)
## Lighting
One low warm sun (~16° up) from the left-back, apricot #ffcf94, shadows long and raking across the meadow, hard-edged, filled with indigo (hemisphere sky rose, ground indigo #3f4a6e); distance fades by rose-mauve haze (fog #e6b497).   (refs/01.jpg mood, study/2-dusk-silhouette frame, inspiration)
## Materials
Matte, flat. Toon-banded (shade/mid/lit) vertex-colour fills with SMOOTH normals on crowns, rocks, bushes and wool (rounded painted masses, not facets); terrain colour masses with wobbly edges; no object textures; one full-frame paper grain + brush-noise pass makes it gouache.   (study/4 flat greens, refs/02.jpg paper)
## Shape language
Rounded fat cream sheep blobs with dark faces; smooth rolling sage/ochre terrain; rounded cone pines and lumpy oak crowns; three haze-faded flat ridge silhouettes behind the hills; stone wall runs; the wolf is one stark near-black silhouette (long snout, pointed ears, tail), the darkest shape on screen.   (study/1, study/3 trees; refs/03.jpg wolf)
## Post-processing
Render to target, then one pass: depth+luma Sobel ink outline (2 px, wobbled ~3 px, fades with distance, #2a1c12), woodcut diagonal hatching in deep shade, paper fibre grain, brush-noise modulation, warm vignette; held-frame duotone (ink + paper + one accent) on the bite.   (refs/02.jpg, builder's call)
## Camera
Slightly elevated, gentle ~14° tilt, FOV 42, follows the player loosely; horizon and sky about 25% of frame, like an illustrated page; never a top-down island view.   (study/5, builder's call)
## UI and type
IM Fell English (italic narration, body) and IM Fell English SC (labels), Alfa Slab One for stamps (self-hosted in fonts/). Cream paper panels #efe3c8 with 3 px ink border and a slight offset ink shadow; HUD top-left; narrator caption is a storybook line at the bottom in italic on a paper strip; stamped cards tilted, misregistered.   (refs/04.jpg title lettering, refs/03.jpg, builder's call)
## Sound mood
Hushed dusk: wind, soft baas, wool thumps, a low gong and stab on the bite, silence before the stamp, stamp thunk.   (study/STUDY.md sound note)
## Assets
style: stylized, flat · all code (geo/ico/cone builders; sheep instanced) · picked by builder: Sketchfab sheep/wolf/pine/wall candidates are untextured white or need recolour, no oak existed, library had no flat sheep or wolf; code gives exact palette control and one draw call for the flock.
## Avoid
Bright generic low-poly cyan sky, saturated grass, sea and island silhouette, glossy PBR, dark rounded UI boxes, system sans, busy clutter, any existing game's names or layouts.
## Checks
1. Opening look: sky at (640, 40) is dusty rose-apricot (measured #dec2a4, r > b by 20+), the sky shader tops out at #7d86a6 above the frame.
2. Meadow reads olive-ochre/sage (g ≥ b + 20), not neon: measured #7e7043 and #816a3e at (200, 700) and (1100, 400).
3. The wolf is the darkest object on screen in solo (Subject/sample under it < #30302c); sheep wool stays cream (> #d8cfae lit).
4. Ink outlines visible (zoom shows #2a1c12-ish 1-2 px edges) and paper grain over the frame; HUD in cream paper panels top-left in the serif face.
5. Compared (compare tool) against refs/01.jpg, study/1, study/4, refs/03.jpg and LOOK.png over four rounds: terrain and tree colours within ~30/255 of Fink greens, crowns read as rounded masses, ridges layered.
6. Bite: ink splash, held duotone frame, tilted stamp card "HUMAN"/"SHEEP" in the first minute of solo (`act pounce`).
