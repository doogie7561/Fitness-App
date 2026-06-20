# Fitness Coach Project History

## Version 45 — RPG Character System
- Built real Character Generation Engine
- Removed manual class selection as the primary decision-maker
- Added goal checkboxes that influence character assignment
- Added Primary, Secondary, and Third goal priority
- Added Primary Archetypes:
  - Explorer
  - Guardian
  - Ranger
  - Phoenix
  - Sage
- Added Specializations:
  - Berserker
  - Shapeshifter
  - Windrunner
  - Lifebinder
  - Stonewarden
  - Wayfarer
  - Sentinel
  - Immortal
  - Dreamwalker
  - Dragon Slayer
  - Champion
- Added Traits:
  - Alchemist
  - Restkeeper
  - Iron Will
  - Survivor
  - Balanced
  - Relentless
- Added Character Codex
- Added Power Score and Level
- Added Achievements
- Added Evolution Suggestions
- Added character dashboard and character-based workout guidance

## Current Status
Status: Beta
Architecture: Minimal GitHub Pages deployment
Required files: index.html, manifest.json, icon.png
Storage: local browser storage
Security: no API keys, no embedded secrets, no external scripts


## Version 46 — Intuitive Navigation
- Reordered top navigation around daily use.
- Today is the first/default screen.
- Workout moved second.
- Character and Progress moved near the front.
- Recovery, Supplements, Codex, Assessment, and Backup moved later.
- Assessment renamed as setup/reassessment instead of a primary daily screen.
- Added Daily Flow guidance on the Today page.


## Version 47 — Automatic Local Backup
- Removed Backup tab from top navigation.
- Added automatic daily local backup snapshots.
- Keeps the last 14 daily snapshots in browser storage.
- Added Data Protection status on Today page.
- Adds weekly prompt to export a device-safe backup file, because browsers cannot silently save files to iCloud/Files.


## Version 48 — Backup Permission + Character Recalculate Fix
- Added an explicit Set Up Automatic Backup permission card.
- User can allow or decline backup reminders.
- Daily local snapshots only run after permission is allowed.
- Added Export Backup File Now after backup is enabled.
- Fixed Recalculate Character to rebuild from saved profile, goals, priorities, injuries, and latest assessment.


## Version 49 — Designable Avatar Builder
- Added a designable avatar on the Character page.
- Users can customize body type, outfit, accent color, equipment, background, and style.
- Avatar saves locally in `avatarProfile`.
- Avatar reflects the user's RPG archetype with a class badge.
- Added randomize and save controls.


## Version 50 — Workout Plan + Detailed Logging
- Restored visible workout plans in the Workout tab.
- Added weekday workout selector.
- Added per-exercise logging for weight, reps/time, sets, notes, complete, skip, and clear.
- Added full workout completion logging with all exercise details.
- Replaced one-click supplement logging with individual supplement checkboxes.
- Supplement logs now save each supplement separately.


## Version 51 — Guided Set Coach
- Added guided workout sessions broken down by individual set.
- Added rest timer between sets.
- Added audible voice coach motivation during work sets.
- Added audible next-exercise explanations during rest periods.
- Added pause, end session, skip set, skip rest, and complete set controls.
- Guided workouts save completed sets into workout history.
