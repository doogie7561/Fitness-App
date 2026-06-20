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


## Version 52 — Seven-Day Plan + User-Selected Recovery Days
- Changed the workout system from a fixed 5-day plan to a 7-day weekly plan.
- Added Sunday and Saturday programming.
- Added user-selected recovery days.
- Recovery days override the scheduled workout with mobility, walking, and recovery work.
- Today page now reflects whether today is a training day or recovery day.
- Guided Set Coach uses the recovery-aware 7-day workout plan.


## Version 53 — Ad Placeholders
- Added inactive banner ad placeholder areas.
- Added placeholders to Today, Character, Progress, and Codex pages.
- Avoided ads inside workout timers, set logging, pain logging, and supplement logging.
- Added comment marker for future approved ad-network script.


## Version 55 — Stable Workout + Guided Coach Fix
- Fixed workout plan loading.
- Fixed Start Guided Workout.
- Consolidated 7-day recovery plan and Guided Set Coach into one stable implementation.
- Improved avatar rendering and visible outfit/equipment behavior.


## Version 56 — Dynamic Realistic SVG Avatar
- Added a more realistic SVG avatar system.
- Added body frame, build, skin tone, hair style, facial hair, and eye color controls.
- Added improved equipment options including barbell and kettlebell.
- Avatar body proportions now respond to weight/goal, strength, conditioning, and archetype.
- Added Sync to Progress button.
- Improved outfit visibility and class-themed equipment.


## Version 57 — Progress Bar Workout Engine
- Added XP bar with earned XP and percentage label.
- Added Strength, Endurance, Mobility, Recovery, and Consistency bars with percentage labels.
- Workout guidance now adapts to the user's weakest bar.
- Level up only occurs when all five bars reach 100%.
- After level up, bars reset to 15% and next XP tier increases.
- Workouts, recovery days, supplements, pain logs, and assessments add XP/bar progress.


## Version 58 — Paper Doll Avatar Foundation
- Replaced the single-drawing avatar presentation with a true layered paper-doll system.
- Added separate avatar layers: background, body, outfit, face, hair, equipment, crest, and UI label.
- Avatar controls now swap layers rather than redrawing a single static character.
- Added visible layer indicators under the avatar.


## Version 59 — Character Progress Panel Restore
- Fixed missing Character Progress panel.
- Guaranteed the XP and status bars appear on the Character page.
- Added XP percentage and earned XP display.
- Added Strength, Endurance, Mobility, Recovery, and Consistency percentage bars.
- Added weakest-bar training focus panel.
