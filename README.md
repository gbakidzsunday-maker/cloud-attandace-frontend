# Attendance App — Moshood Abiola Polytechnic, Department of Computer Science

A single React (Vite) app serving three roles from one codebase:

| Role     | Login route       | Home after login     |
|----------|--------------------|------------------------|
| Student  | `/` or `/login`    | `/sessions`             |
| Lecturer | `/lecturer/login`  | `/lecturer/courses`     |
| Admin    | `/admin/login`     | `/admin/dashboard`      |

The student login is the app's main/default page, as requested. Lecturer and
admin each have their own dedicated login route, and `ProtectedRoute` keeps
each area fenced off to its own role — a lecturer hitting `/admin/dashboard`
gets bounced to `/lecturer/courses`, not to a login screen they'd bounce off
again.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

Runs at http://localhost:5173.

## What's new vs. the two-app version

- Merged the former `lecturer-app` and `student-app` into one app.
- Added an **Admin** role and area:
  - `/admin/dashboard` — landing page with quick links
  - `/admin/lecturers` — list of lecturer accounts
  - `/admin/lecturers/new` — **create a lecturer account** (the admin's core duty)
- `AuthContext.login(email, password, expectedRole)` now checks the signed-in
  account's role against the login page used, and tells the person which
  login page to use instead if they picked the wrong one.

## Backend additions needed

The documented backend (see `backend-documentation.md` from the earlier
delivery) only had `LECTURER` and `STUDENT` roles. To support this app as-is,
the backend needs:

1. `USER.role` to also accept `ADMIN`.
2. Two admin-only endpoints (guarded by `require_role("ADMIN")`):
   - `POST /admin/lecturers` — body `{ full_name, email, password }`, creates
     a user with `role = LECTURER`.
   - `GET /admin/lecturers` — returns lecturer accounts, e.g. with a
     `course_count` for the list view.
3. At least one seeded admin account (admins aren't self-service — someone
   with database access creates the first one).

Ask me to update `backend-documentation.md` and the FastAPI code for these
if you'd like — the frontend calls are already wired up in `src/api/client.js`.
