# v34 Audit Report

## What was cleaned
- Rebuilt the publishable app around one stable UI flow.
- Added visible Fitness Assessment and Functional Fitness Assessment screens.
- Added visible Unusual Pain & Safety Tracker.
- Added visible Supplement Coach.
- Kept dynamic goal-weight header and general app name: Fitness Coach.
- Kept device date/day/time tracking for today's plan.
- Updated manifest and service worker to v34.
- Moved redundant scaffold/spec files into `/docs` so the publish root is cleaner.
- Removed fragile API/OAuth scripts from active page loading.

## Functionality status
Functional in the PWA:
- Date/day/time awareness.
- Dynamic goal weight header.
- Basic fitness assessment save.
- Functional assessment scoring and save.
- Pain log with recommendations.
- Supplement logging.
- Backup/export/import/reset.
- PWA manifest and offline cache.
- Existing workout/tracking code remains present in `app.js`.

Still requires native/backend work:
- Apple Health / HealthKit live sync.
- Wearable live sync.
- Reliable push notifications.
- Cloud sync/accounts.

## Security notes
- Data remains local in browser storage.
- No OAuth secrets are embedded.
- API and HealthKit files are documentation/starter code only, moved to `/docs`.
- PIN/local privacy features, if present in inherited code, are light privacy only and not encryption.
- Users should export backups before clearing Safari data or reinstalling.

## Publishing notes
Upload the contents of this folder to GitHub Pages, not the ZIP itself.
If the old version appears, delete website data for the GitHub Pages URL or reinstall the Home Screen shortcut.
