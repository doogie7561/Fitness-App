# Fitness Coach v45 — RPG Character System

Upload these files to the root of your GitHub repository:

- index.html
- manifest.json
- icon.png
- README.md
- FITNESS_COACH_CHANGELOG.md

## v45 Major Features

- Character Generation Engine
- Character Codex
- Character Evolution suggestions
- Power Score
- Achievements
- Character dashboard
- Goal-driven onboarding
- Multi-select goals with goal priority ranking
- Fantasy-style classes, specializations, and traits
- Character-influenced workout guidance


## v46 Navigation Update

The app now opens around the user’s daily workflow:

1. Today
2. Workout
3. Character
4. Progress
5. Recovery
6. Supplements
7. Codex
8. Assessment
9. Backup


## v47 Automatic Backup

The app now creates daily local backup snapshots automatically.
The Backup tab was removed from navigation.

Important:
A browser cannot silently save backup files to iCloud or Files every day.
Fitness Coach keeps local daily snapshots and periodically offers a manual file export for device-safe protection.


## v48
- Backup permission setup added.
- Recalculate Character button fixed.


## v49
- Added designable avatar builder on the Character page.


## v50
- Restored workout plan visibility.
- Added exercise-by-exercise logging.
- Added full workout completion logging.
- Added individual supplement logging.


## v51
- Added Guided Set Coach with rest timers and audible motivation.


## v52
- Seven-day workout plan.
- User-selected recovery days.
- Today page and Guided Set Coach now follow the user’s weekly recovery setup.


## v53
- Added safe ad placeholders.
- No live ad network code is included yet.
- Replace placeholders only after approval from AdSense or another ad network.


## v55
- Stable fix for workout plan loading and Guided Set Coach.
- Improved avatar display.


## v56
- Added dynamic realistic SVG avatar.
- Avatar can be customized and synced to fitness progress.


## v57
- Added XP and balanced progress bars.
- Workout plan guidance adapts to the weakest bar.
- User levels up only when all bars reach 100%.


## v58
- Added true paper-doll avatar layer architecture.
- Avatar now uses separate body, face, hair, outfit, equipment, background, and crest layers.


## v59
- Restored missing Character Progress panel.
- XP and status bars now appear on Character page.


## v60
- Added exercise demo modal and Watch Demo buttons.
- Video slots are placeholders until official demo videos are selected or created.


## v63
- Character page now uses a proper dashboard layout with avatar left and status bars right.


## v64
- Rebuilt Character page into a dedicated avatar-left, bars-right dashboard.


## v65
- Fantasy character evolution system.
- Assessment-driven physique.
- Gear progression and colored bars.


## v66
- Assessment Intelligence Engine.
- Quest system.
- Weakness/strength detection.
- Recovery score, volume recommendations, safeguards, and XP scaling.

## v68
- Fantasy avatar cleanup.
- Paper-doll/SVG avatar systems are no longer the user-facing renderer.
- Physique is assessment-driven and improves by level.


## v69
- Clean architecture release.
- Redundant legacy avatar/dashboard code removed where safely identifiable.
- Fantasy avatar remains the single user-facing renderer.

## v70
- Fixed avatar rendering by isolating the fantasy portrait in its own mount point.

## v71
- Fantasy portrait engine.
- Additional legacy avatar cleanup.

## v72
- Stabilized portrait card.
- Fixed missing avatar render.
- Portrait library replaces body-part avatar rendering.


## v74
- Character stabilization release.
- Permanent portrait card added to the Character dashboard.
- Blank avatar issue fixed.


## v75
- Added fantasy portrait artwork assets.
- Character portrait now loads asset images by class and level tier.


## v77
- Added fantasy app icon, favicon, Apple touch icon, and PWA manifest.


## v78
- Flat GitHub file structure.
- All files are at the same level as `index.html`.
- No folders required.


## v79
- Fantasy character card portrait pack.
- Cleaner RPG-style portraits with class crests instead of emoji-heavy placeholders.


## v80
- Uses PNG fantasy renderings only for character portraits.
- Removed SVG portrait assets and paper-doll wording.

## v81
- Workout is now the home screen.
- Today, Assessment, and Character are removed from main navigation.
- Character dashboard appears at top of Workout.
- Retake Assessment and Character Details live in Settings.

## v82
- Main navigation is now Workout, Quests, and Settings.
- Progress, Recovery, and Supplements are summarized on Workout and managed in Settings.


## v83
- Audit, cleanup, and safety pass.
- JavaScript syntax checked.
- Legacy avatar remnants cleaned where safely identifiable.
- PNG fantasy portrait pipeline preserved.


## v84
- Recovery days are edited only in Settings.
- Workout only shows recovery status and selected recovery-day summary.


## v85
- Stabilized avatar rendering.
- Added body-part recovery overlay to the avatar.
- Recovery states: Ready, Recovering, Fatigued.


## v86
- Workout tab stabilization pass.
- Workout, Quests, and Settings are the only visible main tabs.
- Workout now focuses on avatar/status and today's workout only.


## v87
- Clean Workout rewrite.
- Removed legacy layered code from active `index.html`.
- App now uses a clean Workout / Quests / Settings structure.


## v88
- Added exercise demo buttons and demo modal.
- Workout remains clean and auto-loaded.


## v89
- Avatar files condensed from 25 portraits to 5 class portraits.
- Renderer now loads `sage.png`, `guardian.png`, `ranger.png`, `phoenix.png`, and `explorer.png`.

## v90
- Avatar now guides today's workout based on body recovery percentages.
- Added workout rewards and better demo coaching cards.


## v91
- Removed in-app header icon.
- Fantasy icon remains for favicon/PWA/home-screen use only.


## v92
- New users start at 100% body recovery.
- Avatar markers now show clean status dots instead of large percentages.
- Class portraits refreshed while keeping only five avatar files.


## v93
- Workout demo cards now use the user's class portrait and class-specific coaching voice.


## v95
- Final avatar visual polish: better portrait fit, smaller recovery markers, cleaner class label.


## v97
- Fixed v2 portrait loading line.
- Restored side-by-side avatar/status bars.
- Improved portrait cropping for card-style artwork.


## v99
- Implemented V3 photorealistic male/female avatars.
- Avatar loader uses `${classKey}-${getAvatarStyle()}-v3.png`.

## v100
- Added per-set completion UI.
