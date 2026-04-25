# Experiment 1: Introduction to HCI Through Memory Recall and Response Time

## 1. Aim
- To understand basic Human-Computer Interaction concepts by designing and using a memory recall and reaction time interface.
- To observe how interface design affects human cognition, speed, and accuracy.

## 2. Theory / Background
- Human-Computer Interaction (HCI) is the study of how people interact with digital systems and how to design systems that are efficient, effective, and satisfying.
- This experiment combines two cognitive tasks:
  - Memory recall task (remember and reproduce items).
  - Reaction time task (respond quickly to a visual cue).
- Relevant HCI and cognitive principles:
  - Miller's idea of short-term memory capacity (commonly taught as around 7 +/- 2 chunks).
  - Feedback principle: users should know system status immediately.
  - Consistency and visibility: predictable controls reduce cognitive load.
  - Speed-accuracy tradeoff: faster responses may increase mistakes.
- Useful model:
  - Reaction response can be interpreted with decision complexity ideas from Hick-Hyman law.
  - Simpler choices generally reduce decision time.

## 3. Materials / Requirements
- Software:
  - Web browser (Chrome/Edge/Firefox).
  - Code editor (VS Code).
- Technologies:
  - HTML for structure.
  - CSS for styling and theme behavior.
  - JavaScript for timing, scoring, and analytics.
  - Chart library integration for performance visualization.

## 4. Procedure / Methodology
1. Open the experiment web page and inspect major sections: experiment area, analytics, settings.
2. Start memory test.
3. Observe listed items for a fixed duration.
4. Enter remembered items into recall inputs.
5. Submit recall and note score percentage.
6. Start reaction-time trials.
7. Click/press based on visual signal across multiple attempts.
8. Record each trial's time and compute average.
9. Review table and charts for memory score and response trend.
10. Toggle theme/settings and rerun to observe usability effects.

## 5. Data Representation (if applicable)
- Recall Score
   - Description: Correct recalled items divided by total items
   - Unit: %
   - Interpretation: Higher means better memory retention
- Trial Reaction Time
   - Description: Time from signal onset to user action
   - Unit: ms
   - Interpretation: Lower means faster response
- Average Reaction Time
   - Description: Mean of all reaction trials
   - Unit: ms
   - Interpretation: Overall motor-cognitive speed
- Attempt Timestamp
   - Description: Date-time of experiment run
   - Unit: Date-Time
   - Interpretation: Supports session comparison

## 6. Observations
- Users perform better when instructions are clear and visible before task start.
- Real-time progress indicators reduce uncertainty.
- Repeated reaction trials usually show slight improvement due to learning effect.
- Dark mode and contrast settings influence comfort during long interactions.

## 7. Result / Conclusion
- The experiment successfully demonstrates core HCI principles using measurable cognitive tasks.
- Memory and reaction outcomes show how interface clarity, timing feedback, and consistency affect user performance.
- Students understand how to convert user actions into analyzable usability metrics.

## 8. Applications / HCI Relevance
- Cognitive assessment interfaces.
- Brain-training and educational apps.
- Safety-critical systems requiring quick responses.
- UI validation where responsiveness and feedback are essential.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is HCI?
   A: HCI is the discipline that designs and studies interactions between humans and computer systems to improve usability and user experience.
2. Q: Why is memory recall useful in HCI experiments?
   A: It helps measure cognitive load, retention, and interface support for user memory.
3. Q: Why do we measure reaction time?
   A: Reaction time indicates how quickly users perceive a stimulus and execute an action.
4. Q: What does high recall score indicate?
   A: It indicates better short-term memory performance under given interface conditions.
5. Q: What does a lower average reaction time indicate?
   A: Faster perception-action cycle and potentially better interface efficiency.
6. Q: Why are multiple trials used?
   A: To reduce random variance and get more reliable performance estimates.
7. Q: What is immediate feedback in this experiment?
   A: Live timer/progress updates and instant score/results after submission.
8. Q: How does consistency help users?
   A: Repeated layout patterns and predictable controls reduce mental effort.
9. Q: How can theme toggling affect usability?
   A: It can improve readability and comfort based on lighting and user preference.
10. Q: Which cognitive concept is reflected in recall task design?
    A: Limited short-term memory capacity and memory decay over time.

## 11. Advanced Viva / Discussion
1. How would you redesign the recall task to test recognition versus recall, and what difference do you expect in score?
2. If reaction-time variance is high, what design factors (color contrast, button size, latency) would you audit first?
3. What are limitations of browser-based timing for strict cognitive experiments?
4. How can you separate motor delay from decision delay in the measured time?
5. Future scope: add adaptive difficulty and personalized cognitive baselines.

---

# Experiment 2: Input Efficiency Comparison (Mouse, Keyboard, Touch)

## 1. Aim
- To compare the efficiency of mouse, keyboard, and touch input methods using measurable performance metrics.
- To relate input behavior with HCI laws such as Fitts' law and typing accuracy principles.

## 2. Theory / Background
- Different input devices are suitable for different tasks.
- Efficiency depends on speed, error rate, and user familiarity.
- HCI laws and concepts:
  - Fitts' Law: movement time increases with distance and decreases with target size.
  - Hick-Hyman Law: more choices increase decision time.
  - Throughput concept: combines speed and accuracy for input evaluation.
- Practical implication: interface controls must match dominant input mode.

## 3. Materials / Requirements
- Browser and code editor.
- HTML/CSS/JavaScript implementation.
- Stopwatch/timer logic in JavaScript.
- Input tracking logic for clicks, keystrokes, and taps.

## 4. Procedure / Methodology
1. Open the experiment and identify tabs for mouse, keyboard, touch, and results.
2. Mouse test:
   - Start test.
   - Click numbered targets in required order.
   - Note completion time and wrong clicks.
3. Keyboard test:
   - Type the target sentence shown.
   - Observe live accuracy and typing errors.
   - Record completion time.
4. Touch test:
   - Tap target zone repeatedly as instructed.
   - Record time and tap completion.
5. Compare all three methods in the final results panel.

## 5. Data Representation (if applicable)
- Input Mode: Mouse
   - Time Taken: t_m seconds
   - Error Count: e_m
   - Accuracy: Based on sequence correctness
   - Comment: Good for pointing tasks
- Input Mode: Keyboard
   - Time Taken: t_k seconds
   - Error Count: e_k
   - Accuracy: Character-level %
   - Comment: Good for text entry
- Input Mode: Touch
   - Time Taken: t_t seconds
   - Error Count: e_t
   - Accuracy: Task completion basis
   - Comment: Good for direct manipulation

## 6. Observations
- Keyboard is often fastest for continuous text entry.
- Mouse performance is sensitive to target spacing and size.
- Touch speed depends on target dimensions and mobile ergonomics.
- Real-time feedback helps users correct behavior quickly.

## 7. Result / Conclusion
- Input efficiency is task-dependent, not universally device-dependent.
- The experiment demonstrates how performance metrics can guide device-specific interface design.
- HCI laws become directly observable in practical UI tasks.

## 8. Applications / HCI Relevance
- Form design optimization.
- Desktop vs mobile interaction planning.
- Accessibility adjustments for motor limitations.
- Usability benchmarking for multi-device systems.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is the main goal of this experiment?
   A: To compare input modes on speed, errors, and usability.
2. Q: State Fitts' law in simple form.
   A: Larger and closer targets are faster to select than smaller and farther targets.
3. Q: Why track both time and errors?
   A: Speed alone is incomplete; high speed with many errors is poor usability.
4. Q: Why is keyboard tested with a fixed sentence?
   A: It provides consistent text complexity for fair comparison.
5. Q: Why can touch input be error-prone?
   A: Finger occlusion, small target size, and limited precision can increase mistakes.
6. Q: What does input accuracy indicate?
   A: Correctness of user actions relative to expected actions.
7. Q: Which method is usually best for drag/point tasks?
   A: Mouse or touch, depending on device context.
8. Q: Which method is usually best for long text?
   A: Keyboard due to faster discrete character entry.
9. Q: How can we improve mouse-test usability?
   A: Increase target size, reduce spacing complexity, and provide clearer sequence cues.
10. Q: What is a fair test condition in this context?
    A: Same user, similar environment, and identical task instructions for each mode.

## 11. Advanced Viva / Discussion
1. How would you compute statistical significance between input modes across many users?
2. How does handedness influence results, and how should experiment design account for it?
3. What limitations arise from testing touch input on non-touch hardware simulations?
4. Suggest improvements for measuring throughput (bits/s) in this setup.
5. Future scope: adaptive interfaces that switch controls based on detected input device.

---

# Experiment 3: Interactive UI with Multi-Modal Event Handling

## 1. Aim
- To design and evaluate an interactive UI supporting mouse, keyboard, and touch interactions.
- To log user events and study feedback-driven interaction quality.

## 2. Theory / Background
- Interactive systems must provide immediate, understandable feedback.
- Event-driven programming is central to modern UI behavior.
- Core HCI principles used:
  - Visibility of system status.
  - User control and freedom.
  - Consistency across interaction methods.
  - Recognition over recall through visible controls.
- Logs are valuable for usability analysis, debugging, and behavior pattern detection.

## 3. Materials / Requirements
- Web browser and developer tools.
- HTML for sections (mouse, keyboard, touch, log).
- CSS for layout, hover/focus states, and readability.
- JavaScript event listeners and centralized interaction logging.

## 4. Procedure / Methodology
1. Launch the page and inspect all interaction sections.
2. Perform mouse actions:
   - Click interaction button.
   - Select colors from palette.
3. Perform keyboard actions:
   - Type text in input field.
   - Trigger special keys like Enter/Backspace.
4. Perform touch/click zone interactions and observe tap count.
5. Monitor real-time interaction log with timestamps.
6. Reset logs and repeat to test reproducibility.

## 5. Data Representation (if applicable)
- Event Type: Mouse Click
   - Data Captured: Action detail, timestamp
   - Purpose: Measures direct manipulation behavior
- Event Type: Keyboard Input
   - Data Captured: Text length, key actions, timestamp
   - Purpose: Measures text interaction dynamics
- Event Type: Touch/Tap
   - Data Captured: Tap count, timestamp
   - Purpose: Measures quick touch responsiveness
- Event Type: System Log
   - Data Captured: Unified event stream
   - Purpose: Supports interaction analysis

## 6. Observations
- Instant visual changes (e.g., color update) improve perceived responsiveness.
- Live counters (word/character) reduce user uncertainty during typing.
- Unified logs provide strong traceability for interaction debugging.
- Distinct affordances for each input type improve discoverability.

## 7. Result / Conclusion
- The interactive UI successfully demonstrates multi-modal event handling.
- Logging plus immediate feedback creates a measurable and explainable interaction system.
- Students understand how to map user actions into structured UX evidence.

## 8. Applications / HCI Relevance
- Event analytics in web products.
- Interaction telemetry for UX research.
- Accessibility testing for multi-input systems.
- Rapid prototyping of interactive components.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is event-driven UI programming?
   A: A programming model where interface behavior is triggered by user/system events.
2. Q: Why maintain a centralized interaction log?
   A: It creates a single, consistent record for analysis and debugging.
3. Q: What is immediate feedback?
   A: Instant system response after user action, such as visual change or count update.
4. Q: Why track timestamp for each event?
   A: To analyze sequence, latency, and temporal behavior patterns.
5. Q: How does keyboard feedback improve usability?
   A: It helps users monitor input correctness and progress in real time.
6. Q: What is an affordance in this UI?
   A: Visual cues such as button shape and color that suggest possible actions.
7. Q: Why support multiple input modalities?
   A: Users operate across devices and abilities; modality support improves inclusiveness.
8. Q: What is the benefit of reset/clear controls?
   A: They give users control and simplify repeated testing.
9. Q: How would you expand this experiment analytically?
   A: Add coordinate logging, dwell time, and error-state tracking.
10. Q: Name one usability risk in event-heavy UIs.
    A: Information overload if logs and feedback are excessive or noisy.

## 11. Advanced Viva / Discussion
1. How would you convert event logs into a user journey map?
2. What privacy concerns arise when detailed interaction logs are stored?
3. How can event throttling/debouncing improve performance in high-frequency interactions?
4. Which metrics indicate friction in this UI (hesitation, repeated undo actions, long pauses)?
5. Future scope: integrate heatmaps and session replay with consent controls.

---

# Experiment 4: To-Do List from Wireframe to Prototype

## 1. Aim
- To implement a complete to-do interface from a wireframe concept.
- To study information architecture, task management UX, and persistent client-side data storage.

## 2. Theory / Background
- Wireframing defines layout and navigation before visual polishing.
- Prototyping validates interaction flow with real controls and data.
- HCI principles involved:
  - Consistency in navigation.
  - Minimal cognitive load through clear grouping.
  - Error prevention using confirmations.
  - Visual hierarchy using color and spacing.
- Local persistence (such as browser storage) supports continuity between sessions.

## 3. Materials / Requirements
- Browser and editor.
- HTML for sidebar, task list, form, settings.
- CSS for layout and priority visuals.
- JavaScript for create/read/delete task logic and storage.

## 4. Procedure / Methodology
1. Open the app and inspect navigation sections.
2. Go to Add Task screen.
3. Enter title, description, and priority.
4. Save task and return to task list.
5. Observe priority badge colors and created timestamp.
6. Delete a task and confirm action.
7. Refresh page to verify data persistence.
8. Explore settings options such as toggles and clear data.

## 5. Data Representation (if applicable)
- Field: Task Title
   - Type: Text
   - Purpose: Primary task identifier
- Field: Description
   - Type: Text
   - Purpose: Additional context
- Field: Priority
   - Type: Low/Medium/High
   - Purpose: Helps ordering and urgency judgment
- Field: Created At
   - Type: Date-Time
   - Purpose: Timeline tracking
- Field: Completion State (optional extension)
   - Type: Boolean
   - Purpose: Workflow status tracking

## 6. Observations
- Sidebar-based navigation helps beginners understand available actions quickly.
- Priority color coding allows fast scanning of urgent tasks.
- Confirmation prompts reduce accidental destructive actions.
- Local storage improves practical usability in lab conditions.

## 7. Result / Conclusion
- A functional to-do prototype was built from wireframe design principles.
- The experiment demonstrates transformation from conceptual UI structure to working interaction model.
- Students learn practical CRUD-style UX with persistence and safety mechanisms.

## 8. Applications / HCI Relevance
- Personal productivity tools.
- Student planner apps.
- Team task boards.
- Any interface requiring list management and state persistence.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is a wireframe?
   A: A low-fidelity blueprint showing layout, structure, and navigation.
2. Q: Why build a prototype after wireframe?
   A: To validate interactions and usability before full deployment.
3. Q: Why use priority badges?
   A: They provide quick visual cues for urgency.
4. Q: What is the role of local storage in this experiment?
   A: It persists tasks across browser sessions without backend setup.
5. Q: Why is delete confirmation important?
   A: It prevents accidental loss of user data.
6. Q: What is information architecture here?
   A: Logical organization into Task List, Add Task, and Settings sections.
7. Q: How does consistency improve this app?
   A: Similar styling and behavior reduce learning effort.
8. Q: Which usability heuristic is seen in confirmations?
   A: Error prevention and user control/freedom.
9. Q: How can this app be made more accessible?
   A: Add keyboard navigation, ARIA labels, and stronger contrast alternatives.
10. Q: What is one limitation of local-only storage?
    A: Data is tied to browser/device and lacks cloud sync by default.

## 11. Advanced Viva / Discussion
1. How would you add edit and undo operations while maintaining simplicity?
2. Should priority use color only, or color plus icon/text for accessibility?
3. What conflict strategy is needed if multi-device sync is added later?
4. Compare sidebar navigation vs bottom tab navigation for mobile usage.
5. Future scope: add reminder notifications, recurring tasks, and analytics.

---

# Experiment 5: Applying HCI in SDLC

## 1. Aim
- To understand how HCI principles are integrated across SDLC phases: Requirements, Design, Implementation, and Evaluation.
- To build and evaluate a note-management prototype with structured feedback.

## 2. Theory / Background
- Software Development Life Cycle (SDLC) in HCI is iterative and user-centered.
- Typical HCI-aware SDLC flow:
  - Requirements: user goals, constraints, usability targets.
  - Design: interaction patterns, visual hierarchy, workflows.
  - Implementation: coding and integration.
  - Evaluation: usability review, ratings, and iteration.
- Usability dimensions:
  - Effectiveness, efficiency, satisfaction, learnability, error tolerance.

## 3. Materials / Requirements
- Web browser and editor.
- HTML phase cards and content sections.
- CSS for phase highlighting and readability.
- JavaScript for phase switching, notes CRUD, and star-rating feedback.

## 4. Procedure / Methodology
1. Open experiment and review phase cards.
2. Visit Requirements section and list usability goals.
3. Visit Design section and review visual/interaction choices.
4. In Implementation section, create and manage notes.
5. In Evaluation section, submit star ratings and comments.
6. Store and inspect saved notes and feedback.
7. Identify one improvement and map it back to SDLC phase.

## 5. Data Representation (if applicable)
- SDLC Phase: Requirements
   - Data Captured: Usability goals, constraints
   - Example Output: Efficiency target, accessibility needs
- SDLC Phase: Design
   - Data Captured: Interaction and visual decisions
   - Example Output: Button style, layout choices
- SDLC Phase: Implementation
   - Data Captured: Functional records
   - Example Output: Note entries with timestamps
- SDLC Phase: Evaluation
   - Data Captured: Ratings and comments
   - Example Output: Ease score, clarity score, qualitative feedback

## 6. Observations
- Explicit phase separation improves conceptual clarity for students.
- Users can see direct linkage between requirements and implementation decisions.
- Star ratings simplify quick UX assessment in lab settings.
- Feedback data naturally motivates iterative redesign.

## 7. Result / Conclusion
- The experiment demonstrates end-to-end HCI-driven SDLC in one integrated prototype.
- Students learn that usability is not a final step; it is continuous across phases.
- Evaluation outcomes can be directly converted into redesign actions.

## 8. Applications / HCI Relevance
- Educational software engineering labs.
- Product teams practicing design reviews.
- Early-stage startup validation workflows.
- Continuous improvement frameworks in UX engineering.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: Why is HCI important in SDLC?
   A: It ensures user needs guide development from start to finish.
2. Q: What happens in HCI requirements phase?
   A: User goals, tasks, constraints, and usability targets are identified.
3. Q: Why separate design and implementation?
   A: Design explores interaction choices before committing to code.
4. Q: What is usability evaluation in this experiment?
   A: Collecting user ratings/comments to measure UX quality.
5. Q: How does star rating help?
   A: It provides quick quantitative feedback for comparison across iterations.
6. Q: What is iterative design?
   A: Repeated cycle of build, test, learn, and improve.
7. Q: Can good functionality still have poor UX?
   A: Yes, if users struggle to learn or operate the interface efficiently.
8. Q: Give one example of requirement-to-design mapping.
   A: Requirement: reduce errors; design: add clear labels and confirmations.
9. Q: What is a practical output of evaluation phase?
   A: Prioritized list of UI improvements backed by user feedback.
10. Q: Why store feedback history?
    A: To track progress and justify design decisions over time.

## 11. Advanced Viva / Discussion
1. How would you translate low clarity ratings into concrete UI changes?
2. Compare heuristic evaluation and user testing in SDLC evaluation stage.
3. What bias can appear in star-only feedback collection?
4. How can you define measurable usability acceptance criteria before coding?
5. Future scope: integrate SUS questionnaire and task-success analytics.

---

# Experiment 6: Nielsen Heuristics Evaluation Framework

## 1. Aim
- To perform a structured usability evaluation using Nielsen's 10 heuristics.
- To generate issue reports with severity and actionable recommendations.

## 2. Theory / Background
- Heuristic evaluation is an expert-review method for finding usability issues quickly.
- Nielsen's 10 heuristics include:
  - Visibility of system status.
  - Match between system and real world.
  - User control and freedom.
  - Consistency and standards.
  - Error prevention.
  - Recognition rather than recall.
  - Flexibility and efficiency of use.
  - Aesthetic and minimalist design.
  - Help users recognize, diagnose, recover from errors.
  - Help and documentation.
- Severity helps prioritize fixes by impact and urgency.

## 3. Materials / Requirements
- Browser and editor.
- HTML cards/forms for heuristic-wise review.
- CSS dashboard for status and score visuals.
- JavaScript for dynamic card generation, score computation, and report output.

## 4. Procedure / Methodology
1. Open the evaluator and choose target system.
2. Enter evaluator details.
3. For each of 10 heuristics:
   - Mark status (compliant or needs work).
   - Set severity (low/medium/high).
   - Write issue description.
   - Add suggested fix.
4. Review auto-updated summary metrics.
5. Generate final report.
6. Copy/export report for submission.
7. Repeat using sample presets to compare evaluations.

## 5. Data Representation (if applicable)
- Heuristic: Visibility
   - Status: Needs Work
   - Severity: High
   - Issue Example: No loading feedback
   - Suggested Improvement: Add progress/spinner state
- Heuristic: Error Prevention
   - Status: Needs Work
   - Severity: Medium
   - Issue Example: Missing validation
   - Suggested Improvement: Add field constraints and hints
- Heuristic: User Control
   - Status: Compliant
   - Severity: Low
   - Issue Example: Undo exists
   - Suggested Improvement: Maintain shortcut discoverability
- Aggregate Metric: Usability Score
   - Formula: (Compliant Heuristics / 10) x 100
   - Meaning: Overall heuristic compliance
- Aggregate Metric: Needs Work Count
   - Formula: Number of non-compliant heuristics
   - Meaning: Repair workload indicator

## 6. Observations
- Structured cards force evaluators to reason systematically.
- Severity labeling improves fix prioritization.
- Presets make training and demonstration faster.
- Report generation supports clear communication with stakeholders.

## 7. Result / Conclusion
- The framework enables fast, repeatable heuristic audits.
- Students can identify, classify, and communicate usability problems effectively.
- The experiment demonstrates evidence-based UX improvement planning.

## 8. Applications / HCI Relevance
- Pre-release usability inspection.
- Design QA in educational and industry projects.
- Comparative review of alternate interface versions.
- Documentation-ready UX defect tracking.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is heuristic evaluation?
   A: A usability inspection method where experts check UI against known heuristics.
2. Q: Why use Nielsen heuristics?
   A: They provide a widely accepted and practical checklist for usability quality.
3. Q: What is severity in usability review?
   A: A priority level indicating impact and urgency of an issue.
4. Q: Why does this experiment need both issue and suggestion fields?
   A: Problem identification alone is incomplete without actionable fixes.
5. Q: How is usability score computed?
   A: By percentage of heuristics marked compliant.
6. Q: Is high score equal to perfect UX?
   A: Not always; user testing may still reveal context-specific problems.
7. Q: Which heuristic addresses unclear error messages?
   A: Help users recognize, diagnose, and recover from errors.
8. Q: Which heuristic encourages simpler screens?
   A: Aesthetic and minimalist design.
9. Q: Why keep evaluator identity in report?
   A: For accountability, reproducibility, and multi-review comparison.
10. Q: What is one limitation of heuristic evaluation?
    A: It may miss domain-specific issues without real user behavior data.

## 11. Advanced Viva / Discussion
1. How would you combine heuristic findings with usability-test recordings?
2. Propose a severity matrix using impact x frequency x persistence.
3. What inter-rater reliability issues can occur across multiple evaluators?
4. How can this framework be adapted for mobile-specific heuristics?
5. Future scope: AI-assisted issue clustering and recommendation ranking.

---

# Experiment 7: Cognitive Modeling Using KLM and GOMS

## 1. Aim
- To model user task performance using KLM and GOMS.
- To estimate task completion time and identify interaction bottlenecks.

## 2. Theory / Background
- KLM (Keystroke-Level Model) predicts expert task time by summing operator times.
- Common operators:
  - K: keystroke/button press.
  - P: pointing with mouse/touch.
  - H: homing (switch hand between devices).
  - M: mental preparation.
  - R: system response/wait.
- Core KLM expression:
$$
T_{task} = n_K t_K + n_P t_P + n_H t_H + n_M t_M + n_R t_R
$$
- GOMS decomposes interaction into Goals, Operators, Methods, and Selection rules.
- Cognitive modeling helps compare alternate workflows before implementation.

## 3. Materials / Requirements
- Browser and editor.
- HTML for task selection, operator builder, and GOMS fields.
- CSS for operator chips and prediction panels.
- JavaScript for operator-time mapping, sequence editing, and total-time computation.

## 4. Procedure / Methodology
1. Choose predefined task (or enter custom task).
2. Add operator sequence step-by-step.
3. Observe real-time predicted total time.
4. Record operator count and distribution.
5. Fill GOMS sections:
   - Goal
   - Operators
   - Methods
   - Selection rules
6. Load sample presets and compare predicted times.
7. Propose optimized method and recompute time.

## 5. Data Representation (if applicable)
- Operator: K
   - Typical Time: 0.28 s
   - Role: Key/button actuation
- Operator: P
   - Typical Time: 1.10 s
   - Role: Pointing to target
- Operator: H
   - Typical Time: 0.40 s
   - Role: Device hand movement
- Operator: M
   - Typical Time: 1.35 s
   - Role: Mental preparation
- Operator: R
   - Typical Time: 1.00 s
   - Role: System response
- Task Version: Baseline Method
   - Operator Sequence Length: n1
   - Predicted Time: T1 s
   - Efficiency Label: Needs Optimization/Fair/Good
- Task Version: Improved Method
   - Operator Sequence Length: n2
   - Predicted Time: T2 s
   - Efficiency Label: Better if T2 < T1

## 6. Observations
- Mental and pointing operators heavily influence total time.
- Keyboard shortcuts often reduce homing and pointing overhead.
- Small workflow changes can produce measurable time savings.
- GOMS documentation improves reasoning about method selection.

## 7. Result / Conclusion
- KLM/GOMS modeling successfully estimates task effort and highlights optimization opportunities.
- The experiment demonstrates quantitative UX improvement without expensive user trials.
- Students learn analytical design decision-making.

## 8. Applications / HCI Relevance
- Productivity tool optimization.
- Workflow redesign in enterprise software.
- Predictive comparison of interaction alternatives.
- Human factors analysis in repeated tasks.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is KLM used for?
   A: Predicting expert user task time at operator level.
2. Q: What is GOMS used for?
   A: Structuring task behavior into goals, methods, and decision rules.
3. Q: Why include M (mental operator)?
   A: Cognitive preparation time affects real interaction speed.
4. Q: What does H (homing) represent?
   A: Hand movement between keyboard and pointing device.
5. Q: How is total KLM time calculated?
   A: By summing time contributions of all operators in sequence.
6. Q: Why compare two methods for same task?
   A: To identify faster, lower-effort workflows.
7. Q: Does KLM model novice users well?
   A: Not fully; it is strongest for practiced/expert behavior.
8. Q: What does a high M count suggest?
   A: Task may be cognitively complex or poorly guided.
9. Q: Can KLM include system latency?
   A: Yes, through response operator R.
10. Q: Give one optimization strategy from KLM insight.
    A: Reduce pointer travel and add shortcuts to minimize P and H operators.

## 11. Advanced Viva / Discussion
1. How would you calibrate operator times for your own user population?
2. When can KLM predictions conflict with real usability outcomes?
3. How can GOMS model branching tasks and error recovery steps?
4. What is the tradeoff between discoverability and shortcut-heavy optimization?
5. Future scope: combine KLM with actual telemetry for hybrid prediction models.

---

# Experiment 8: Mobile App UI Design and Evaluation (To-Do App)

## 1. Aim
- To design and evaluate a mobile-first to-do application with login, filtering, analytics, and settings.
- To study mobile usability, responsiveness, and personalization features such as dark mode.

## 2. Theory / Background
- Mobile-first design starts from small screens and scales upward.
- Good mobile UX requires:
  - Clear hierarchy.
  - Touch-friendly target sizing.
  - Minimal navigation friction.
- Relevant HCI principles:
  - Fitts' law for touch target size and distance.
  - Recognition over recall via visible filters.
  - Feedback and status visibility through cards/charts.
  - Consistency across tabs and states.

## 3. Materials / Requirements
- Browser and editor.
- HTML for authentication, task list, analytics, and settings sections.
- CSS with responsive rules, theme variables, and mobile-oriented layout.
- JavaScript for authentication flow, filtering, task management, and chart updates.

## 4. Procedure / Methodology
1. Launch app and test responsive/device preview controls.
2. Complete login with valid input.
3. Add multiple tasks with different priorities/status.
4. Apply search and filter combinations.
5. Mark tasks complete and verify list updates.
6. Open analytics and observe total count and completion rate.
7. Toggle dark mode and check visual adaptation.
8. Test export/import and logout controls.

## 5. Data Representation (if applicable)
- Dataset: Task Record
   - Fields: Title, description, priority, due date, completed status
- Dataset: Session State
   - Fields: Logged-in user, active tab, active filters
- Dataset: Analytics
   - Fields: Total tasks, completed tasks, completion percentage
- Metric: Completion Rate
   - Formula: (Completed Tasks / Total Tasks) x 100
- Metric: Pending Count
   - Formula: Total Tasks - Completed Tasks

## 6. Observations
- Combined search and filters significantly reduce task-finding effort.
- Mobile-style layout improves focus by reducing clutter.
- Dark mode improves comfort for prolonged usage.
- Chart-based summaries improve quick progress understanding.

## 7. Result / Conclusion
- A functional mobile-first productivity interface was successfully implemented.
- The experiment demonstrates integration of authentication, task flow, analytics, and personalization in a single UX.
- Students gain practical knowledge of responsive and data-driven UI design.

## 8. Applications / HCI Relevance
- Student planner/mobile productivity apps.
- Habit trackers and reminder systems.
- Lightweight task tools for small teams.
- UX studies of mobile interaction patterns.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is mobile-first design?
   A: A design strategy that prioritizes small-screen usability before desktop expansion.
2. Q: Why include login in this experiment?
   A: It simulates personalized user flows and data privacy boundaries.
3. Q: Why are filters important in task apps?
   A: They reduce cognitive load by showing only relevant items.
4. Q: How does dark mode support usability?
   A: It can reduce eye strain and improve comfort in low-light contexts.
5. Q: What is completion rate?
   A: Percentage of completed tasks among total tasks.
6. Q: Why use visual analytics cards/charts?
   A: They communicate status quickly without reading detailed lists.
7. Q: How does responsive design differ from adaptive design?
   A: Responsive fluidly adjusts layout; adaptive serves predefined layouts for breakpoints.
8. Q: Which HCI law relates to touch target design?
   A: Fitts' law.
9. Q: Why persist settings and tasks locally?
   A: To preserve user state and improve continuity.
10. Q: What is one UX risk in mobile to-do apps?
    A: Overloaded controls on small screens causing interaction errors.

## 11. Advanced Viva / Discussion
1. How would you support offline-first syncing with conflict resolution later?
2. What accessibility additions are needed for low vision and motor impairments?
3. How can notifications be optimized to avoid alert fatigue?
4. Compare bottom navigation and sidebar navigation for mobile ergonomics.
5. Future scope: integrate voice input and smart task prioritization.

---

# Experiment 9: Modern UI Elements (Kanban, Inline Editing, Modal, Analytics)

## 1. Aim
- To implement modern interaction patterns including Kanban workflow, drag-and-drop, inline editing, and modal-based entry.
- To evaluate how advanced UI elements affect usability and productivity.

## 2. Theory / Background
- Modern UI emphasizes direct manipulation, contextual editing, and visual workflow.
- Key HCI concepts used:
  - Direct manipulation (drag-and-drop).
  - Progressive disclosure (show details only when needed).
  - Immediate feedback and state visibility.
  - Consistency and minimalism across components.
- Workflow visualization (To Do -> Doing -> Done) supports mental model alignment.

## 3. Materials / Requirements
- Browser and editor.
- HTML tabs for Kanban, inline editing, modal, analytics, settings.
- CSS for board cards, modal overlay, and responsive behavior.
- JavaScript for data state, drag/drop movement, filtering, editing, and chart refresh.

## 4. Procedure / Methodology
1. Open app and switch to Kanban tab.
2. Add cards with title and priority using modal dialog.
3. Drag cards between To Do, Doing, and Done columns.
4. Apply search and priority filters.
5. Use inline editing for item text updates.
6. Open analytics and verify counts and progress indicators.
7. Toggle theme/settings and observe UI consistency.

## 5. Data Representation (if applicable)
- Entity: Card
   - Fields: Title, priority, status column
- Entity: Board State
   - Fields: To Do list, Doing list, Done list
- Entity: Analytics
   - Fields: Total cards, per-column count, completion percentage
- Progress Metric: Completion Percentage
   - Formula: (Done Cards / Total Cards) x 100

## 6. Observations
- Drag-and-drop improves task-flow comprehension and engagement.
- Inline editing reduces context switching compared to separate edit forms.
- Modal entry keeps primary board clean while supporting structured input.
- Analytics improves self-monitoring and planning behavior.

## 7. Result / Conclusion
- The experiment successfully integrates multiple modern UI patterns in one coherent interface.
- Users can manage workflow faster due to direct manipulation and contextual controls.
- Students understand practical tradeoffs between convenience and complexity.

## 8. Applications / HCI Relevance
- Project management tools.
- Agile sprint boards.
- Personal workflow managers.
- Collaborative productivity systems.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: What is a Kanban board?
   A: A visual workflow system that organizes tasks by stage.
2. Q: Why use drag-and-drop in task apps?
   A: It supports natural direct manipulation of task state.
3. Q: What is inline editing?
   A: Editing content directly in place without navigating to another form.
4. Q: Why use modal dialog for adding cards?
   A: It focuses user attention on a single structured action.
5. Q: What is progressive disclosure here?
   A: Showing summary cards first and exposing details only when needed.
6. Q: How do filters improve usability?
   A: They narrow visible information and reduce search effort.
7. Q: What is one risk of heavy drag-and-drop usage?
   A: Accessibility barriers for keyboard-only users if alternatives are missing.
8. Q: Why maintain analytics tab?
   A: To provide measurable progress and decision support.
9. Q: Which heuristic is strongly represented by board counts/progress?
   A: Visibility of system status.
10. Q: Give one limitation of modal dialogs.
    A: They can interrupt flow if overused or poorly timed.

## 11. Advanced Viva / Discussion
1. How would you design keyboard-accessible reordering for Kanban cards?
2. Compare modal-based create flow with inline quick-add UX.
3. How can priority bias affect user behavior on boards?
4. What architecture changes are needed for real-time multi-user collaboration?
5. Future scope: add swimlanes, dependencies, and predictive task risk scoring.

---

# Experiment 10: Smart Student Study Planner (Version 2)

## 1. Aim
- To build and evaluate a comprehensive HCI mini-project demonstrating full user-centered design in a real-world academic productivity context.
- To integrate advanced features: role-based UI, adaptive nudges, accessibility controls, device simulation, and analytics.

## 2. Theory / Background
- This experiment represents an end-to-end HCI application, not just a single widget.
- It combines:
  - User-centered design.
  - Multi-tab information architecture.
  - Adaptive guidance (nudge engine).
  - Role-specific interaction models (student vs mentor).
  - Usability instrumentation (interaction logs/heatmap mode).
- Relevant principles/models:
  - Nielsen heuristics for consistency, visibility, and control.
  - Progressive disclosure for advanced tools like command palette.
  - Fitts' law for touch and pointer target design.
  - Data-driven iteration through A/B variant tracking.

## 3. Materials / Requirements
- Browser and code editor.
- Structured project documents:
  - Research/personas/questionnaire/survey summary.
  - Requirements and user stories.
  - Task flow, wireframes, and component definitions.
  - Usability testing observations and iteration logs.
- Prototype stack:
  - HTML for full app shell and tabs.
  - CSS for themes, responsiveness, accessibility modes.
  - JavaScript for state management, analytics, and advanced interactions.

## 4. Procedure / Methodology
1. Open Version 2 prototype.
2. Explore device preview controls and switch between form factors.
3. Navigate through tabs: Dashboard, Tasks, AI Coach, Community, Institute, Analytics, Settings.
4. Create/update tasks and move them across workflow states.
5. Switch user role preset (student/mentor) and observe interface changes.
6. Enable usability test mode and perform sample interactions.
7. Observe logged behavior and heatmap-style interaction evidence.
8. Test command palette shortcuts for faster task execution.
9. Change accessibility settings (font scale, high contrast, reduced motion, dyslexia-friendly mode).
10. Toggle A/B UI variant and compare interaction behavior.
11. Review KPI cards and analytics outcomes.
12. Export or review stored data for iterative UX improvements.

## 5. Data Representation (if applicable)
- Data Group: Task Data
   - Example Fields: Title, priority, due date, status, timestamps
   - Use: Workflow and productivity tracking
- Data Group: User Profile
   - Example Fields: Name, role, preferences
   - Use: Personalization and access control
- Data Group: Accessibility State
   - Example Fields: Font scale, contrast mode, motion preference
   - Use: Inclusive UX adaptation
- Data Group: Experiment Metrics
   - Example Fields: Variant, success/friction counts, command usage
   - Use: A/B and usability analysis
- Data Group: Interaction Logs
   - Example Fields: Event type, time, coordinates
   - Use: Heatmap and behavior diagnostics
- KPI: Productivity Rate
   - Formula: (Completed Tasks / Total Tasks) x 100
- KPI: Daily Completion
   - Formula: Completed Today / Planned Today
- KPI: Consistency Trend
   - Formula: Derived from repeated task completion history

## 6. Observations
- Role-based controls reduce clutter by showing relevant actions per persona.
- Accessibility settings materially change readability and comfort.
- Command palette improves expert-user speed for repetitive actions.
- Usability-test mode provides concrete evidence for interface refinement.
- Multi-device simulation helps validate responsive behavior quickly in labs.

## 7. Result / Conclusion
- Version 2 successfully demonstrates a mature HCI prototype with lifecycle depth from research to evaluation.
- The experiment integrates functionality, usability, accessibility, and analytics in one cohesive system.
- Students gain practical understanding of how advanced HCI concepts operate in a near production-style project.

## 8. Applications / HCI Relevance
- Smart academic planning systems.
- Institutional learner monitoring dashboards.
- Mentor-student coaching platforms.
- Research-grade usability instrumentation prototypes.

## 9. Learning Outcomes
- Understand the core concept and objective of the experiment
- Apply theoretical knowledge to practical implementation
- Analyze results using relevant metrics and interpret system behavior
- Develop problem-solving skills in debugging, optimization, and evaluation

## 10. Viva Questions with Answers (IMPORTANT)
1. Q: Why is this considered an advanced HCI experiment?
   A: It combines complete UX lifecycle artifacts with a feature-rich interactive prototype.
2. Q: What is role-based interface design?
   A: Showing different controls/content based on user role and responsibilities.
3. Q: Why include an adaptive nudge engine?
   A: To guide users contextually and reduce decision paralysis.
4. Q: What is the purpose of usability-test mode?
   A: To capture real interaction evidence for diagnosing usability issues.
5. Q: Why is A/B variant support useful?
   A: It enables evidence-based comparison of alternate UI designs.
6. Q: How do accessibility controls improve HCI quality?
   A: They support diverse user needs and improve inclusiveness.
7. Q: What is the command palette advantage?
   A: Faster access for power users and reduced navigation time.
8. Q: Why simulate multiple devices inside one prototype?
   A: To test responsive behavior and interaction adaptability quickly.
9. Q: Which HCI principle is reflected by KPI cards and notifications?
   A: Visibility of system status.
10. Q: What is one limitation of local-first prototype architecture?
    A: No automatic cloud sync/collaboration unless backend integration is added.

## 11. Advanced Viva / Discussion
1. How would you validate whether nudges improve outcomes instead of causing distraction?
2. Propose an ethical framework for storing interaction telemetry and heatmap data.
3. How should mentor and student workflows be tested to avoid role-confusion?
4. What backend architecture is required to move from local-first to collaborative real-time product?
5. Future scope: AI-based personalized study recommendations, calendar sync, and predictive risk alerts.

---

# Final Notes for Practical Exam Preparation
- Revise each experiment in three layers:
  - Concept layer (theory, principles, laws).
  - Implementation layer (HTML/CSS/JS logic and flow).
  - Evaluation layer (metrics, observations, conclusions).
- For viva, remember:
  - Definitions must be concise.
  - Link each answer to a practical feature seen in the experiment.
  - Mention one limitation and one improvement whenever possible.
- For lab record writing:
  - Keep headings identical to manual format.
  - Include at least one metric table and one observation set per experiment.
  - Write conclusion as outcome plus learning takeaway.
