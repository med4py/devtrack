# DevTrack

DevTrack is a responsive developer productivity dashboard for tracking tasks, learning topics, and study progress. It keeps data in local storage so the app works without a backend and feels like a polished portfolio-ready frontend.

## Features

- Dashboard with task and learning summary cards
- Task management for creating, editing, searching, filtering, and deleting work items
- Learning tracker with progress bars and status management
- Statistics page for task and learning insights
- Light/dark theme toggle with persistent settings
- LocalStorage-powered persistence for tasks, topics, and theme
- Mobile-friendly navigation and responsive layout

## Tech Stack

- React
- Vite
- React Router
- Bootstrap 5
- Bootstrap Icons
- CSS custom variables and responsive design

## React Concepts Used

- Components and props
- State and effect management
- Context API
- Custom localStorage hook
- React Router navigation and route guards
- Memoized derived data
- Conditional rendering and array operations

## Project Structure

- src/components — reusable UI pieces
- src/context — app-wide state and CRUD functions
- src/data — sample initial data
- src/hooks — localStorage hook
- src/pages — route-level screens
- src/utils — shared statistics helpers

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Screenshots

Placeholder: add dashboard screenshots here in a future polish pass.

## Future Improvements

- Backend API and database sync
- Authentication and user profiles
- Cloud sync across devices
- Drag-and-drop task organization
- Charts for richer reporting
- Notifications and reminders
