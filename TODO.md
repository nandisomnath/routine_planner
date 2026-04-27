# Progress Tracking Implementation

## Steps
- [x] 1. Update `plansData.js` — convert subtopics to `{id, title}` objects
- [x] 2. Create `useProgress.js` hook — localStorage read/write logic
- [x] 3. Create `SubtopicItem.jsx` — animated checkbox component
- [x] 4. Update `PlanCard.jsx` — add plan-level progress bar
- [x] 5. Update `RoadmapNode.jsx` — add node progress + checkboxes + mark-all/reset
- [x] 6. Update `PlanDetail.jsx` — add overall progress in sticky header + back button with text
- [x] 7. Test & verify — build passes

## Features Delivered
- Plan-level progress bars on `/plans` with percentage
- Node-level progress bars inside each roadmap node
- Subtopic checkboxes with animated toggle (scale + color + strikethrough)
- localStorage persistence (`progress_<planId>` keys)
- "Mark all complete" + "Reset" buttons per topic
- Overall plan progress in sticky header on `/progress/[id]`
- Back button with icon + "Back" text on PlanDetail page
- Mobile responsive progress bars
- All existing animations preserved (expand/collapse, scroll focus)

