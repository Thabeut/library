# The Library of Knowledge

An interactive web application that presents a collection of educational books in an immersive, cinematic experience. Explore books filled with lessons, tips, fun facts, quizzes, and videos, all wrapped in a beautiful animated interface.

## Features

- 🎬 **Cinematic Experience**: Video backgrounds with parallax mouse effects
- 📚 **Interactive Books**: Flip through pages with realistic page-flip animations
- 🎯 **Multiple Content Types**:
  - Inspirational quotes
  - Educational lessons
  - Practical tips
  - Fun facts
  - Interactive quizzes
  - Embedded videos
- 🎨 **Smooth Animations**: GSAP-powered transitions and effects
- 🎉 **Celebrations**: Confetti effects for quiz completions
- 📱 **Responsive Design**: Works across different screen sizes
- 🎭 **Platform Assistant**: Guided tour to help users navigate the library

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **react-pageflip** - Book page-flipping component
- **react-confetti** - Celebration effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd "The Library of Knowledge"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── assets/
│   ├── imgs/          # Image assets (title, loader backgrounds)
│   └── vids/          # Video assets (intro, scene1, scene2)
├── components/
│   ├── Book/          # Interactive book component with page-flipping
│   ├── BookSelection/ # Book selection interface
│   ├── EnterButton/   # Animated enter button
│   └── PlatformAssistant/ # Guided tour component
├── mocks/
│   └── books.ts       # Book data and types
├── views/
│   ├── Home/          # Main home view with video backgrounds
│   └── Loader/        # Initial loading screen
├── App.tsx            # Main app component
└── main.tsx           # Application entry point
```

## Key Components

### Home

The main view featuring:

- Video background with parallax mouse tracking
- Animated title and enter button
- Scene transitions between different video backgrounds
- Integration with PlatformAssistant, BookSelection, and Book components

### Book

Interactive book reader with:

- Realistic page-flipping animation
- Support for multiple page types (quotes, lessons, tips, fun facts, quizzes, videos)
- Quiz functionality with answer validation
- Confetti celebrations on quiz completion
- Quit functionality to return to book selection

### BookSelection

Grid-based interface for browsing and selecting books from the library collection.

### PlatformAssistant

Guided tour component that introduces users to the library and its features.

### Loader

Animated loading screen that displays before the main application.

## Book Content Types

Each book can contain the following page types:

- **Quote**: Inspirational quotes with author attribution
- **Lesson**: Educational content with titles and detailed text
- **Tip**: Practical advice and tips
- **Fun Fact**: Interesting facts and trivia
- **Quiz**: Interactive multiple-choice questions with immediate feedback
- **Video**: Embedded video content
