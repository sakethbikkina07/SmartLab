# Backend integration guide

## Where to change code
All data access goes through `src/services/api.js` (resource tables) and `src/services/store.js` (small state). The demo login is in `src/context/Auth.jsx`. Set `VITE_API_URL` in `.env` (for example `http://localhost:8000/api`) to point the ready-made `http` Axios instance at your server.

## Important: reads are synchronous today
Pages call `load(key)` and `kv.get(key)` and use the result immediately. Real HTTP is asynchronous. The quickest safe pattern (no page changes):
1. Add `export async function preload(){...}` in `api.js` that GETs every resource below into an in-memory cache `cache[k]`.
2. Call it before rendering in `main.jsx` (await, then `createRoot(...).render(...)`).
3. Make `load(k)` return `cache[k]`, and make `save(k, rows)` / `crud(k)` update the cache and send the matching POST/PUT/DELETE in the background.

## Suggested REST endpoints (resource key = `sl_` data key)
Each supports: `GET /api/<k>/` list, `POST /api/<k>/` create, `PUT /api/<k>/<id>/` update, `DELETE /api/<k>/<id>/` delete. Rows are objects with `id` plus the fields shown in the table (see `src/data.js` for exact field names).
| Key | Used by |
|---|---|
| colleges, departments, faculty, students, subjects | Super Admin, College Admin, HOD |
| experiments, manuals, tasks, assessments, submissions | Faculty, Student |
| monitoring, attendance, resources, marks | Faculty, HOD |
| mcq, viva, notes, history, records, badges, skills | Faculty, Student |
| activity, users | Super Admin |

## Extra state stored through `kv` (needs its own endpoint or per-user field)
`pubtasks` tasks assigned by faculty | `pubmcq` published MCQ questions | `newcol` registered colleges | `track` experiment stage per student | `score` last MCQ score | `restore` code version to restore | `notifs` notifications.

## Auth
`Auth.jsx` fakes login by role. Replace `login(role)` with a POST to your login endpoint, keep the returned `{role, name, email}` (and token) in state, and send the token in an Axios interceptor on `http`. Route protection in `App.jsx` is UI only; enforce permissions on the server.

## Mock features to replace with real services
Code execution (`Dashboards.jsx` `Coding`, `run`), AI chat replies (`Chat`), manual extraction (`LabContent.jsx` `Manual`), AI MCQ and viva generation (`StudentActivity.jsx` `McqGen`, `LabContent.jsx` `Viva`), similarity and code review data, live monitoring (`StudentActivity.jsx` `Monitor`, needs websocket or polling), QR attendance (`LearningTools.jsx` `QR`, needs server-signed QR and verification).

## Still sample data (not tied to real records)
Chart series on HOD, Faculty and Student dashboards, Skill Passport skill bars, leaderboard rivals, analytics filters (they only shift the sample charts).
