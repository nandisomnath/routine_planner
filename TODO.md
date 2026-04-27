# Routine Enhancement TODO

## Plan
- [x] Step 0: Analyze codebase and create plan
- [x] Step 1: Update backend (`backend/routes/routines.js`)
  - Add `subjectName`, `startTime`, `endTime`, `date`, `isFollowed`, `status` fields
  - Update validation functions
  - Add PATCH endpoint for updating routines
- [x] Step 2: Update frontend API (`frontend/src/api/api.js`)
  - Ensure `createRoutine` accepts new fields
  - Ensure `updateRoutine` works for patching
- [x] Step 3: Update frontend page (`frontend/src/pages/Routine.jsx`)
  - Add `date` input field
  - Add `isFollowed` checkbox display
  - Add routine status logic (upcoming, completed, backlog, missed)
  - Display routines in sections: Upcoming, Completed, Backlog
  - Allow re-scheduling backlog items
- [x] Step 4: Update CSS (`frontend/src/index.css`)
  - Add styles for backlog items, status badges, checkbox styling, section headers
- [x] Step 5: Test and verify
  - Build passed successfully
