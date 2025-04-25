# Pian Ai - Emotion Recording and Goal Tracking Application

[简体中文](README.md) | [English](README_EN.md)

Pian Ai is a Vue.js-based single-page application designed to help users record emotions, track goals, and create personalized visual boards. The name "Pian Ai" implies a special fondness for someone or something, and this application is designed to record and express these special feelings.

## Features

### 1. Emotion Diary / Confession Letters
- Record daily mood fluctuations, thoughts, or write "confession letters" with strong emotions like lyrics
- Support for various emotion tags (Determined, Happy, Anticipating, Conflicted, Bittersweet, Missing, Touched, Calm)
- Each emotion has a corresponding icon for intuitive expression
- Support for deleting unwanted diary entries

### 2. Determination Imprints / Goal Tracking
- Set personal goals or determinations related to this "special fondness"
- Record goal completion progress through check-ins
- Intuitive progress bars showing completion status
- Support for deleting goals that are no longer needed

### 3. "My Answer" Visual Board
- A personalized display board showcasing all core beliefs and feelings about this "special fondness"
- Support for adding images, lyrics/quotes, and text content
- Customize the background color of each content item
- Multiple preset color options available

## Technology Stack

- **Frontend Framework**: Vue.js
- **UI Component Library**: Quasar Framework
- **State Management**: Vuex
- **Routing**: Vue Router
- **Icon Library**: Bootstrap Icons

## Visual Design

- Modern color scheme with pink and purple as primary colors
- Responsive design adapting to different screen sizes
- Bottom navigation bar for mobile, top navigation bar for desktop
- Card-based layout with elegant shadows and transition effects
- Rich icons to enhance visual experience

## Project Setup

### Install Dependencies
```
npm install
```

### Compile and Hot-Reload for Development
```
npm run serve
```

### Compile and Minify for Production
```
npm run build
```

### Lint and Fix Files
```
npm run lint
```

## Project Structure

```
src/
├── assets/            # Static resources
├── components/        # Reusable components
│   └── MobileNavBar.vue  # Mobile navigation bar
├── router/            # Route configuration
├── store/             # Vuex state management
├── views/             # Page views
│   ├── DiaryView.vue     # Emotion diary page
│   ├── GoalsView.vue     # Goal tracking page
│   ├── HomeView.vue      # Home page
│   └── VisualBoardView.vue  # Visual board page
├── App.vue            # Root component
└── main.js            # Entry file
```

## Data Storage

The application uses the browser's localStorage for data storage, including:
- Diary entries
- Goals and check-in records
- Visual board content

## Custom Configuration
For more configuration information, please refer to [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
