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


## Version 60 — Exercise Demo Support
- Added Watch Demo buttons to workout exercise cards.
- Added demo support inside Guided Set Coach.
- Added exercise explanation modal with setup, steps, common mistakes, and safety notes.
- Added video placeholder area for future embedded exercise videos.
- Added YouTube search link fallback for each exercise demo.


## Version 63 — Character Dashboard Restructure
- Rebuilt Character page layout at runtime into a dedicated two-column dashboard.
- Paper-doll avatar is placed on the left.
- XP and status bars are placed on the right.
- Recalculate Character and Retake Setup moved below the dashboard.
- Avatar customization moved below the dashboard.
- Removed user-facing paper-doll debug layer labels.


## Version 64 — Dedicated Character Dashboard Rebuild
- Added a new dedicated Character Dashboard component.
- Avatar is rendered in a new left-side dashboard slot.
- XP and status bars are rendered in a new right-side dashboard slot.
- Old stacked avatar/progress panels are hidden from the primary Character view.
- Training focus is placed directly under the bars.
- Class crest is moved to the title card instead of floating over the avatar.


## Version 65 — Fantasy Character Evolution
- Replaced stick-figure/paper-doll presentation with a fantasy character portrait system.
- Removed body type selection from user-facing customization.
- Avatar physique is now assessment-driven and improves by level.
- Added class-specific fantasy gear tiers.
- Added current gear, next unlock, and gear progress.
- Moved class crest/title into the character title card.
- Added colored XP and status bars.
- Kept the v64 dashboard layout: avatar left, progress bars right.


## Version 66 — Assessment Intelligence + Quest System
- Added Assessment Intelligence Engine.
- Added automatic primary weakness, secondary weakness, and primary strength detection.
- Added recovery score.
- Added assessment-driven workout volume recommendations.
- Added safety/substitution rules based on injuries and mobility.
- Added XP multiplier based on challenge level.
- Added auto-generated character titles.
- Added Quests tab.
- Added daily quests generated from weakest bars, recovery, and assessment.
- Quests reward XP and progress bars.
- Quest completion can trigger level-up when all bars are maxed.

## Version 68 — Fantasy Avatar Cleanup
- Made the fantasy portrait renderer the single user-facing avatar system.
- Removed body type/body frame/outfit body-mechanics selection from visible customization.
- Physique is now driven by assessment data and level progression.
- Legacy paper-doll/SVG render hooks are redirected to the fantasy portrait renderer.
- Renamed Avatar Customization to Appearance.


## Version 69 — Clean Architecture Release
- Removed several superseded legacy avatar/dashboard scripts from the user-facing build.
- Removed old paper-doll/SVG avatar CSS blocks where safely identifiable.
- Kept the fantasy avatar system as the single user-facing avatar renderer.
- Hid obsolete body/frame/outfit body-shaping controls.
- Added a clean architecture controller to bridge current systems.
- Added user-facing note that physique is assessment-driven and level-driven.

## Version 70 — Avatar Render Fix
- Added a dedicated fantasy avatar mount point.
- Hid the old v64 avatar stage so legacy renderers cannot visibly overwrite it.
- Rewired public avatar render hooks to the dedicated fantasy renderer.

## Version 71 — Portrait Engine Cleanup
- Replaced visible avatar body-part drawing with a dedicated portrait card engine.
- Removed additional superseded avatar scripts and CSS where safely identifiable.
- Hidden old paper-doll/SVG mount points.
- Appearance is cosmetic; physique/stature are controlled by assessment, class, gear tier, and level.

## Version 72 — Stabilized Portrait Library
- Added a permanent portrait-card component.
- Fixed blank avatar area by ensuring the portrait mount always attaches to the Character dashboard.
- Switched to an artwork-style portrait card instead of visible SVG body-part drawing.
- Hidden old avatar mount points.
- Added stabilization cleanup report.


# Architecture Notes

## Current Architecture
- Portrait Library
- Character Progression Engine
- Assessment Intelligence
- Guided Workout System
- Quest System
- Recovery System
- Supplement Tracking
- Automatic Backup

## Deprecated Systems
- Paper Doll Renderer
- SVG Avatar Renderer
- Legacy Avatar Builder
- Legacy Avatar Mounts

## Future Roadmap
- True fantasy portrait artwork
- Character evolution tiers
- Achievement system
- Guilds and social features
- Premium coaching

## Version 73 — Documentation Cleanup

### Features
- Consolidated development cleanup history into the changelog.

### Bug Fixes
- Removed standalone cleanup reports from release package.

### Technical Debt Removed
- V69_CLEANUP_REPORT.md
- V71_CLEANUP_REPORT.md
- V72_STABILIZATION_REPORT.md


## Version 74 — Character Stabilization
### Bug Fixes
- Replaced the legacy `v64AvatarStage` dependency with a permanent `characterPortraitCard`.
- Removed duplicate Character Progress panel markup where safely identifiable.
- Fixed blank avatar area by making the portrait card part of the Character dashboard structure.
- Rewired avatar render hooks to target only the permanent portrait card.

### Technical Debt Removed
- Legacy avatar stage dependency.
- Duplicate progression panel remnants.
- Runtime-only portrait insertion dependency.


## Version 75 — Fantasy Portrait Assets
### Features
- Added `assets/portraits/` with class-and-tier fantasy portrait assets.
- Portrait card now loads artwork files instead of drawing a character with CSS body parts.
- Portrait selection is based on class and level tier.

### Technical Debt Removed
- CSS-drawn character is no longer the primary visible portrait.
- Character portrait renderer now acts as an image asset selector.


## Version 77 — Fantasy App Icon
### Features
- Added the fantasy shield/progress-bar app icon.
- Added favicon.
- Added Apple touch icon.
- Added PWA manifest icons.
- Added full-size marketing icon asset.

### Files Added
- `favicon.png`
- `apple-touch-icon.png`
- `app-icon-192.png`
- `app-icon-512.png`
- `fitness-coach-fantasy-icon.png`
- `manifest.webmanifest`


## Version 78 — Flat GitHub File Structure
### Features
- Flattened project structure so all files sit at the same repository level as `index.html`.
- Removed nested asset folders from the release package.
- Updated portrait and icon references to load from the repository root.

### Upload Note
- Upload every file inside the extracted `Fitness_Coach` folder directly into the GitHub repository root.
- No folders are required for this version.


## Version 79 — Fantasy Character Card Pack
### Features
- Replaced placeholder portrait SVGs with cleaner RPG character-card style artwork.
- Removed repeated emoji symbols from the portrait artwork.
- Added class-specific crests:
  - Sage: ARCANE
  - Guardian: WARD
  - Ranger: STORM
  - Phoenix: EMBER
  - Explorer: PATH
- Kept the flat GitHub-friendly structure.

### Technical Debt Removed
- Reduced reliance on visible emoji overlays inside the portrait card.
- Portrait visuals now better match the fantasy shield app icon style.


## Version 80 — PNG Fantasy Renderings Only
### Features
- Removed avatar SVG portrait files.
- Added PNG fantasy character card renderings for every class and tier.
- Updated portrait renderer to load `.png` portrait assets only.
- Kept the flat GitHub-friendly file structure.

### Technical Debt Removed
- Removed visible SVG portrait assets.
- Removed remaining paper-doll/SVG wording from the user-facing portrait flow.
- The character portrait pipeline now uses static fantasy rendering images only.

## Version 81 — Workout Home Navigation Cleanup
### Features
- Removed Today, Assessment, and Character from main navigation.
- Made Workout the daily home screen.
- Moved character portrait, XP, and status bars to the top of Workout.
- Auto-launches assessment when no assessment/profile exists.
- Added Retake Assessment and Character Details under Settings.
- Condensed gear display: Current Gear and percentage appear together.
- Moved Next Unlock and gear progression details to Settings.

## Version 82 — Three Tab Cleanup
### Features
- Main navigation simplified to Workout, Quests, and Settings.
- Progress, Recovery, and Supplements are no longer primary tabs.
- Added Progress Snapshot, Recovery Status, and Today's Supplements summary cards to Workout.
- Added Progress History, Recovery Setup, and Supplements sections under Settings.

### Technical Debt Removed
- Reduced remaining main-navigation clutter.
- Moved secondary/rare-use screens into Settings while keeping daily summaries on Workout.


## Version 83 — Audit, Cleanup, and Safety Pass
### Validation
- JavaScript syntax check: Passed
- Required PNG portrait assets: All present
- SVG portrait assets: None present
- Flat GitHub file structure preserved.

### Cleanup
- Removed safely identifiable legacy avatar mount remnants.
- Removed superseded legacy avatar renderer scripts where identifiable.
- Preserved the current PNG fantasy rendering pipeline.
- Preserved Workout / Quests / Settings navigation.
- Preserved Settings-based Retake Assessment and Character Details.

### Safety
- Added link hardening for external links opened in new tabs.
- Added escaping helper for Settings character details.
- Added runtime guards for navigation cleanup and summary rendering.


## Version 84 — Recovery Days Consolidation
### Bug Fixes
- Consolidated recovery-day editing into Settings only.
- Workout keeps only a Recovery Status summary.
- Recovery Days button in Settings now scrolls to the single recovery-day editor.
- Recovery days are saved consistently to `recoveryDays`, `userProfile.recoveryDays`, and `weeklyPlan.recoveryDays`.

### Technical Debt Removed
- Hid duplicate recovery-day setup panels from the Workout page.
- Reduced duplicate recovery configuration surfaces.


## Version 85 — Avatar Stabilization + Recovery Overlay
### Features
- Added recovery indicators directly onto the character portrait.
- Body regions shown: Head, Chest, Back, Arms, Core, Legs.
- Uses three recovery states only:
  - Ready
  - Recovering
  - Fatigued
- Tapping a recovery marker shows recovery details and recommendation.
- Avatar renderer now creates a stable Workout dashboard if the old container is missing.
- Added fallback message if a portrait image file is missing.

### Bug Fixes
- Stabilized avatar rendering after navigation cleanup.
- Ensured portrait remains on the Workout page.
- Ensured compact gear display still renders under the portrait.


## Version 86 — Workout Only Stabilization
### Focus
- Only the Workout tab was changed.
- Navigation is visually limited to Workout, Quests, and Settings.
- Workout was rebuilt as a clean daily-use screen.

### Workout Changes
- Removed recovery-day setup from Workout.
- Removed voice-coach settings from Workout.
- Removed Codex, Progress, Recovery, Supplements, Character, Today, and Assessment from main navigation.
- Restored avatar, level, XP, status bars, and compact gear at the top of Workout.
- Restored Today's Workout, exercise cards, logging, guided workout, and rest timer.
- Settings now holds placeholders for rare-use setup items.


## Version 87 — Clean Workout Rewrite
### Major Change
- Replaced the layered legacy `index.html` with a clean current app file.
- Removed old v50/v51/v52/v57/v64/v69/v72 patch layers from the active code.
- Main navigation is now only Workout, Quests, and Settings.

### Workout
- Rebuilt from scratch:
  - Avatar portrait
  - Recovery markers
  - XP/status bars
  - Compact gear
  - Today's workout
  - Exercise cards
  - Exercise logging
  - Guided workout
  - Rest timer

### Settings
- Moved rare-use items into Settings:
  - Retake Assessment placeholder
  - Recovery Days
  - Character Details
  - Voice Coach rest timer
  - Codex
  - Data backup/reset

### Stability
- Preserved flat GitHub-friendly file structure.
- Preserved PNG portrait assets.
- JavaScript syntax checked.


## Version 88 — Workout Refinement
### Workout Changes
- Added Demo buttons to each exercise card.
- Added exercise demo modal with video placeholder and coaching steps.
- Kept workout auto-loaded; no manual Load Workout Plan button.
- Kept Guided Workout hidden until Start Guided Workout is pressed.
- Kept Workout focused on avatar/status, today's workout, and guided flow.


## Version 89 — Condensed Avatar Files
### Cleanup
- Reduced avatar portrait files from 25 to 5.
- Kept one permanent portrait per class:
  - `sage.png`
  - `guardian.png`
  - `ranger.png`
  - `phoenix.png`
  - `explorer.png`
- Removed tiered portrait files.
- Updated renderer to load class portraits instead of tier portraits.

### Progression
- Visual progression is now represented through level, XP, status bars, current gear, gear percentage, and recovery overlays rather than separate portrait files.

## Version 90 — Workout Completion Pass
### Added
- Avatar-guided workout selection based on body recovery percentages.
- Workout prioritizes recovered body regions and protects fatigued areas.
- Workout completion rewards: XP, Strength, Endurance, Mobility, and Consistency.
- Reward summary screen after completing workout.
- Better exercise demo coaching cards.
- Empty-state guidance when no profile/assessment exists.

### Preserved
- Avatar structure.
- Recovery overlay concept.
- Status bars.
- Gear system.
- Exercise card layout.
- Guided workout flow.


## Version 91 — Icon/Header Cleanup
### Cleanup
- Removed the in-app header icon to give Workout more vertical space.
- Kept fantasy icon files only for favicon, Apple touch icon, and PWA/home-screen use.
- Removed leftover `icon.png` if present.
- Ensured manifest uses `app-icon-192.png` and `app-icon-512.png`.
- Removed old `manifest.json` if present in favor of `manifest.webmanifest`.
