# The Edge-Node Universe — Modular Visual Experience

> **Status:** `[PROTOTYPE]` Player scaffold and first key art. No finished video
> clip is claimed by the presence of a scene in `scenes.json`.

This directory contains a lightweight static scene player for the cinematic
interpretation of END Theory. It is designed for GitHub Pages and ordinary
static hosting: no framework, account, analytics or server is required.

## Behaviour

- One active media element prevents a wall of videos.
- Viewers choose scenes or move with Previous/Next.
- Auto-continue is optional and begins only after viewer interaction.
- Progress is stored only in the visitor's local browser.
- Every scene can link to a theory section and a Painted Porch discussion.
- Captions, transcripts, reduced-motion behaviour and keyboard navigation are
  part of the baseline.
- A planned scene is displayed honestly rather than masquerading as completed media.

## Adding a finished clip

1. Export an H.264 MP4 with matching WebVTT captions and a compressed poster.
2. Host the media under the declared media boundary.
3. Set the scene's `video`, `poster` and `captions` fields in `scenes.json`.
4. Change `state` only after checking the rendered clip and captions.
5. Record major visual or narrative changes through the Commons lifecycle.

The video files should not silently accumulate inside the Commons repository.
Use release assets or a declared media repository once clips become material in
size. Scripts, captions, manifests and compressed posters may remain here.
