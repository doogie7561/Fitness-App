# v71 Cleanup Report

- Starting index.html size: 142,687 bytes
- Final index.html size: 124,439 bytes
- Net change: 18,248 bytes
- Remaining script blocks: 7

## Main change
The avatar area is now controlled by the v71 Portrait Engine. Older SVG/paper-doll mount points are hidden and older public render hooks are redirected to the portrait engine.

## Remaining cleanup candidate
A deeper rebuild could split HTML/CSS/JS into separate files and remove all historical inline version blocks entirely.
