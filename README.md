# Start Here · St. Nicholas Secondary welcome site

Written by the Secondary Ambassadors for new students (Grades 6–11).

- `web/` is the whole site (static, no build). Text lives in `web/content.js`.
- Hosted on Render (static site, auto-deploy from `main`).
- "Ask an Ambassador" saves to Supabase table `booklet_questions` (insert-only for the public key).

Rule: only facts we have checked. Anything a grade team still owes is marked `todo: true` in `content.js`.
