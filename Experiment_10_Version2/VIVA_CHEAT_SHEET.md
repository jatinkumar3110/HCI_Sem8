# Experiment 10 Version 2 - Viva Cheat Sheet

## 30-Second Project Pitch
This project is a local-first, feature-rich Study Planner built using the full HCI cycle. Version 2 improves beyond a basic task app by adding adaptive nudges, AI-style coaching, role-based mentor/student workflows, accessibility controls, local A/B experimentation, and a guided demo mode. It demonstrates usability, efficiency, inclusivity, and evidence-based iteration without requiring cloud setup.

## 1-Minute Architecture Summary
- Frontend: HTML, CSS, JavaScript
- Libraries: Chart.js, SortableJS
- Data layer: LocalStorage (tasks, profile, members, challenges, experiments, nudges, notifications)
- Core modules:
  - Dashboard + command center
  - Kanban task board + analytics
  - AI Coach + smart plan generator
  - Community + Institute (role-based)
  - Accessibility controls
  - Command palette + notifications
  - A/B experiment lab + adaptive nudge engine
  - Guided demo script

## Top Viva Questions with Crisp Answers

### Q1. What is the core aim of Version 2?
To deliver a complete HCI-driven productivity product prototype that is practical, measurable, and inclusive, not just a static task manager.

### Q2. Which HCI principles are explicitly applied?
Nielsen heuristics, cognitive load reduction, efficiency of use (command palette), role-model mapping, accessibility principles, and iterative evidence via A/B testing.

### Q3. Why role-based mentor/student mode?
It prevents invalid actions, improves clarity, and mirrors real institutional workflows where permissions differ by responsibility.

### Q4. How does adaptive behavior work here?
The nudge engine reads live task signals (overdue, priority load, completion rate) and generates contextual next-step guidance.

### Q5. Why keep it local-first?
Local-first simplifies deployment in lab settings, enables offline demos, and supports rapid iteration without backend complexity.

### Q6. What problem does command palette solve?
It reduces interaction steps for frequent users, supporting flexibility and efficiency of use.

### Q7. How is accessibility handled?
Font scaling, dyslexia-friendly font mode, high contrast mode, and reduced motion mode are integrated and persisted.

### Q8. What is measured in Experiment Lab?
Variant-wise sessions, success logs, friction logs, task completions, and command usage to compare A vs B designs.

### Q9. How do you show error prevention and recovery?
Role gating prevents unauthorized actions, confirmations avoid destructive mistakes, and undo-delete restores accidentally removed tasks.

### Q10. Why guided demo script mode?
It provides a repeatable, evaluator-friendly walkthrough and ensures all key features are demonstrated consistently.

## Feature-to-HCI Mapping (Quick Table)
- Command Center -> Visibility of system status
- Undo Delete -> User control and freedom
- Role Gating -> Error prevention
- Command Palette -> Flexibility and efficiency
- Accessibility Panel -> Inclusive design / accessibility
- A/B Lab -> Evidence-driven iteration
- Adaptive Nudges -> Context-aware interaction support

## Common Follow-Up Answers

### If asked: "How to scale this to production?"
Add authentication, backend APIs, cloud database, role-based server authorization, and real analytics pipeline.

### If asked: "How to integrate real AI?"
Replace heuristic coach logic with an LLM API plus safety guardrails, prompt templates, and token/cost controls.

### If asked: "What next for research?"
Run structured usability tests across novice vs expert users, compare variant outcomes, and refine nudge accuracy.

## Quick Demo Script (90-120 seconds)
1. Load default preset.
2. Show Dashboard command center + adaptive nudge.
3. Open Tasks and use search/filter.
4. Open AI Coach and trigger a quick prompt.
5. Open Community tab and show challenge board.
6. Switch to mentor preset and open Institute dashboard.
7. Open Settings -> apply experiment mode.
8. Run Demo Script button for auto walkthrough.

## Last-Line Conclusion for Viva
Version 2 demonstrates that HCI is not only about UI appearance; it is about measurable, role-aware, inclusive, and adaptive interaction design that improves real user outcomes.
