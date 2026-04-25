# Smart Student Study Planner - Experiment 10 Version 2

## Overview
Version 2 is a feature-rich, local-first HCI mini project prototype focused on productivity, collaboration, role-based workflows, accessibility, and measurable UX improvements.

The app demonstrates the full HCI cycle with practical product maturity features that can be presented in viva/demo sessions without cloud setup.

## Version 2 Highlights

### Core Productivity
- Dashboard with task KPIs, progress, and upcoming work.
- Kanban task board with drag-and-drop status movement.
- Smart plan generator that creates structured study sessions.
- Pomodoro support and quick task actions.

### AI-Inspired Experience
- AI Coach tab with quick prompts and contextual suggestions.
- Command center with delivery risk, consistency score, and focus recommendation.
- Adaptive nudge engine with apply/dismiss feedback and nudge history.

### Collaboration and Role Models
- Community tab with local member management and challenge assignment.
- Institute tab with learner metrics and ranking.
- Role-based access model:
  - Mentor mode: full community/institute controls.
  - Student mode: restricted actions and scoped visibility.

### Usability and Power Features
- Command palette (Ctrl/Cmd + K) for fast action execution.
- Notification center for local activity and event updates.
- Task search and priority filter chips.
- Undo-safe deletion workflow (via command action).

### Accessibility and Inclusivity
- Font scaling.
- Dyslexia-friendly font mode.
- High contrast mode.
- Reduced motion mode.

### Experimentation and Evaluation
- Local A/B Experiment Lab:
  - Variant switching (A/B).
  - Density mode (comfy/compact).
  - Success/friction logging.
  - Variant comparison insights.
- Guided demo script mode for automated end-to-end walkthrough.

## HCI Principles Applied
- Nielsen heuristics (visibility, user control, consistency, error prevention, flexibility).
- Cognitive load reduction using progressive disclosure and guided actions.
- GOMS/KLM efficiency through command palette and quick commands.
- Role-based mental model alignment (mentor/student task boundaries).
- Accessibility-first controls for inclusive interaction.
- Evidence-based iteration via experiment and interaction metrics.

## Local-First Architecture
- Frontend: HTML, CSS, JavaScript.
- Libraries: Chart.js, SortableJS.
- Persistence: LocalStorage (no backend required).
- Supports offline-friendly demo in lab environment.

## Recommended Demo Flow
1. Load default preset data.
2. Switch to student preset and show dashboard + nudge engine.
3. Open Tasks, search/filter tasks, and move a task across columns.
4. Use AI Coach quick prompt.
5. Open Community tab and show challenge board.
6. Switch to mentor preset and open Institute dashboard.
7. Apply experiment mode and compare variant insights.
8. Run guided demo script for complete walkthrough.

## Folder Structure
- research/ - surveys, results, personas
- requirements/ - user stories and functional requirements
- design/ - wireframes, task flow, UI components
- usability_testing/ - task scripts, observations, iteration logs
- prototype/ - working Version 2 app (index.html, styles.css, app.js)
- screenshots/ - visual evidence for report/demo

## Files to Run
- Prototype entry: prototype/index.html
- Main logic: prototype/app.js
- Styles and responsive UI: prototype/styles.css

## Note
This repository version is optimized for local demonstration and academic evaluation. Business/investment and cloud deployment layers can be added as a separate future phase.
