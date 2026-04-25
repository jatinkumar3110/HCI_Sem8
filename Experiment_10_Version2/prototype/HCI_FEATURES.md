# Experiment 10: Enhanced Smart Student Study Planner
## HCI Features & Device Preview System

### 🎯 Overview
This experiment demonstrates advanced HCI principles through:
- **Realistic Device Mockups** (Desktop, Laptop, Tablet, Android, iPhone)
- **Browser Chrome Simulation** (URL bar + window controls)
- **HCI Analytics Layer** (Interaction tracking, heatmaps, UX metrics)
- **Usability Testing Mode** (Record user interactions, export logs)
- **Pomodoro Timer** (25-min focus sessions with break tracking)
- **Advanced Task Management** (Priorities, filtering, drag-and-drop)

---

## 🖥️ Device Preview System

### Device Types & Dimensions
| Device | Width | Height | Features |
|--------|-------|--------|----------|
| 🖥️ Desktop | 1440px | 900px | Large screen, comfortable viewing |
| 💻 Laptop | 1280px | 800px | Portable work device |
| 📱 Tablet | 768px | 1024px | iPad-like experience |
| 🤖 Android | 412px | 915px | Mobile portrait/landscape |
| 🍎 iPhone | 375px | 812px | iPhone-like with notch |

### How to Use Device Preview
1. Click any device button in the toolbar (e.g., "🖥️ Desktop")
2. The app resizes to match that device's dimensions
3. For mobile devices, orientation button becomes active
4. Click **"🔄 Rotate"** to switch between portrait ↔ landscape (mobile only)
5. Click **"⛶ Fullscreen"** to expand device to full width/height

### Browser Chrome Simulation
- **URL Bar**: Shows `https://studyplanner.hci.app`
- **Window Controls**: Minimize (🟡), Maximize (🟢), Close (🔴) buttons
- **Realistic Styling**: Matches OS-level browser appearance

### Device Frame Customization
- **Drag Border**: Hover over device frame edges to see resize handle (⟲)
- **Mouse Drag**: Click & drag to manually resize the device frame
- **Hardware Bezel**: Dark border simulates physical device hardware
- **Responsive Design**: Content adapts to new dimensions

---

## 📊 HCI Analytics Layer

### Usability Testing Mode
Turn on **"🧪 Usability Test"** button to start recording user interactions:

**What Gets Tracked:**
- ✅ Every mouse click (with coordinates)
- ✅ All form inputs (keyboard events)
- ✅ Navigation tab switches
- ✅ Task drag-and-drop operations
- ✅ Session duration (in seconds)
- ✅ Interaction heatmap (click point locations)

**Recording Indicator:**
- Red "Recording..." badge appears when testing is active
- Pulsing animation shows mode is live

### Analytics Overlay
Once in Usability Test mode, click **"📊 Analytics"** to reveal:

**UX Metrics Dashboard:**
- 🔢 **Interactions**: Total number of recorded actions
- 🎯 **Click Density**: Clicks per second (interaction frequency)
- ⏱️ **Session Time**: Duration since test started
- ✅ **Task Completion**: % of tasks marked as done

**Interaction Heatmap:**
- Red gradient overlay on device screen
- Shows where users clicked most frequently
- Intensity increases with more clicks in same area
- Helps identify "hot zones" for UX improvement

### Exporting Interaction Data
When you stop Usability Test (toggle off):
- Automatic JSON export of all interactions
- File saved as `hci-interactions-YYYY-MM-DD.json`
- Includes:
  - Device used
  - Orientation (portrait/landscape)
  - Session duration
  - All individual interactions with timestamps
  - Heatmap click coordinates

**Use Cases:**
- Analyze user behavior patterns
- Identify usability bottlenecks
- Compare interaction patterns across devices
- Validate HCI design decisions

---

## ⏱️ Pomodoro Timer System

### What is Pomodoro?
A time management technique: **25 minutes focus → 5 minutes break**

### Using the Timer
1. Widget appears in bottom-right corner (above FAB)
2. Click **"▶"** to start 25-minute focus session
3. Click **"⏸"** to pause the timer
4. Click **"↻"** to reset (back to 25:00)

### Features
- **Focus Session**: 25 minutes work (default)
- **Break Session**: 5 minutes rest
- **Auto-switching**: Timer automatically switches between focus/break
- **Toast Notifications**: Alerts when session/break completes
- **Persistent Time**: Timer display updates every second

### Status Display
- 🎯 **Focus**: During work session
- ☕ **Break**: During break period
- Time displayed in `MM:SS` format

---

## 📋 Task Management Enhancements

### Task Properties
Each task now includes:
- **Title**: Task name (required)
- **Description**: Detailed notes (optional)
- **Due Date**: When task is due (required)
- **Priority Level**:
  - 🔴 **High** (red accent)
  - 🟡 **Normal** (yellow accent, default)
  - 🟢 **Low** (green accent)

### Task Status Flow
```
📝 To Do → ⚡ In Progress → ✅ Done
```
- Drag tasks between columns
- Status updates instantly in localStorage
- Progress indicators update automatically

### Priority Color Indicators
- Task cards show colored left border matching priority
- Background subtly tinted with priority color
- Priority badge displayed in top-right of card

### Advanced Features
- ✅ **Edit**: Click ✏️ to modify existing task
- 🗑️ **Delete**: Click 🗑️ to remove task
- 📌 **Kanban Board**: Visual workflow management
- 🔢 **Task Counts**: Real-time counter per status

---

## 📈 Dashboard & Analytics

### Dashboard Tab
**Key Metrics:**
- ⏱️ Tasks Due Today
- ✅ Completed Today
- 📌 Total Tasks
- 🎯 Productivity Rate (% complete)
- 📊 Progress Bar
- 📅 Upcoming Tasks (next 5)

### Analytics Tab
**Three Chart Types:**
1. **Task Completion Rate**: Doughnut chart (Completed vs Remaining)
2. **Task Distribution**: Pie chart (To Do, In Progress, Done)
3. **Weekly Productivity**: Line chart (7-day trend)

### Analytics Export
- Navigate to Settings tab
- Click **"📥 Export Tasks"** for JSON backup
- Filename: `tasks-YYYY-MM-DD.json`
- Contains all task data for external analysis

---

## 🌓 Dark Mode

### Theme Toggle
- Click **"🌙"** button in header to toggle dark mode
- Preference saved to localStorage
- On reload, remembers your choice
- Works with all devices and features
- Respects system color scheme preference

### Dark Mode Features
- 🔷 Device frame background adjusts
- 🎨 All text/colors maintain contrast
- 🌘 Reduced eye strain in low-light environments
- 💾 Persistent across sessions

---

## ⚙️ Settings Tab

### Display Settings
- **Dark Mode**: Toggle between light/dark themes
- **Enable Animations**: Smooth transitions (on/off)

### Data Management
- **📥 Export Tasks**: Download tasks as JSON
- **🗑️ Clear All Tasks**: Remove all tasks permanently
- **🔄 Reset Analytics**: Reset task status to initial state

### Advanced Options
- All settings persist to localStorage
- Can reset individual aspects without losing others
- Export before clearing for backup

---

## 🔄 Device Orientation (Mobile)

### Portrait Mode
- Default view for mobile devices
- Full height, smaller width display
- Notch visible at top (iPhone style)
- Optimal for vertical scrolling

### Landscape Mode
- Wider view for landscape use
- Width and height swap
- Notch hidden automatically
- Better for side-by-side content

### How to Switch
1. Select mobile device (Android/iPhone) in toolbar
2. **"🔄 Rotate"** button becomes active
3. Click to toggle orientation
4. Rotation animation plays (0.8 seconds)
5. Select opposite orientation button to revert

### Orientation Lock
- Orientation only toggles on mobile devices
- Desktop/Laptop/Tablet show "Rotate" as disabled
- Previous orientation preference remembered per device

---

## 💾 Data Persistence

### LocalStorage Items
| Item | Purpose | Format |
|------|---------|--------|
| `exp10_tasks` | All task data | JSON array |
| `darkMode` | Theme preference | Boolean |
| `devicePreview` | Selected device | String |
| `enableAnimations` | Animation toggle | Boolean |

### Auto-Save
- Tasks save automatically after add/edit/delete
- All changes persistent across page reloads
- No manual save required

---

## 📱 Responsive Behavior

### Adaptive UI
- **Desktop (>1024px)**: Full-width navigation, multiple columns
- **Tablet (768-1024px)**: Adjusted sizing, optimized spacing
- **Mobile (<768px)**: Stack layout, touch-optimized buttons

### Device Frame Scaling
- Frames scale smoothly on smaller screens
- Always visible and usable
- Maintains aspect ratios
- Responsive to window resize

### High-DPI (Retina) Displays
- Enhanced shadows and visual depth
- Crisp text rendering
- Optimized for 2x or higher pixel density

---

## 🚀 Performance Features

### Optimizations
- Debounced interaction tracking
- Efficient DOM updates
- CSS transforms for smooth animations
- Canvas rendering for heatmaps
- LocalStorage caching

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## 🎓 HCI Principles Demonstrated

### 1. **Device Diversity**
   - Recognizes different device contexts
   - Appropriate interaction patterns per device
   - Hardware simulation (notches, bezels)

### 2. **User Tracking & Analytics**
   - Measures actual user behavior
   - Heatmap reveals interaction patterns
   - Quantifies usability metrics

### 3. **Cognitive Ergonomics**
   - Pomodoro timer supports focused work
   - Clear task status visualization
   - Visual priority indicators

### 4. **Accessibility**
   - Dark mode for low-light environments
   - High contrast colors (WCAG compliant)
   - Keyboard navigation support
   - Semantic HTML

### 5. **User Preferences**
   - Theme personalization
   - Animation toggle
   - Device preference memory
   - Data export for user control

### 6. **Feedback & Affordance**
   - Toast notifications for actions
   - Visual state changes
   - Cursor hints (resize handle)
   - Modal focus management

---

## 🐛 Troubleshooting

### Device Frame Not Showing
- Ensure JavaScript is enabled
- Check browser console for errors
- Refresh page (F5)
- Clear cache if problems persist

### Analytics Not Recording
- Click "🧪 Usability Test" to activate mode
- Red "Recording..." badge should appear
- Ensure "🧪 Usability Test" is toggled ON
- Interactions only logged when mode is active

### Heatmap Not Visible
- Activate "🧪 Usability Test" mode first
- Toggle "📊 Analytics" button on
- Perform some clicks in the app
- Heatmap displays over device screen with red gradient

### Pomodoro Timer Not Starting
- Clear browser cache
- Check browser's developer console
- Ensure JavaScript is enabled
- Try in different browser

### Data Not Saving
- Check localStorage is enabled
- Not in private/incognito mode
- Desktop has sufficient storage
- Try export/backup before clearing

---

## 📚 Technical Stack

- **HTML5**: Semantic markup + device frame structure
- **CSS3**: Variables, transforms, animations, flexbox, grid
- **JavaScript**: ES6+, localStorage API, Canvas API
- **Libraries**: Chart.js (analytics), Sortable.js (drag-drop)
- **Design**: Mobile-first responsive, HCI-based UX

---

## 🎯 Key Takeaways

This enhancement demonstrates how modern web applications can:
1. **Emulate Real Devices** (mockups instead of just responsive design)
2. **Capture User Data** (interaction tracking for UX research)
3. **Provide Productivity Tools** (Pomodoro, task management)
4. **Respect User Preferences** (themes, animations, data export)
5. **Support Different Workflows** (device types, orientations)

Perfect for HCI labs, usability testing, and understanding user behavior at scale!
