# Command Center - BlueIOT Frontend

Digital Twin Dashboard for real-time indoor tracking and monitoring.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Three.js** with React Three Fiber for 3D rendering
- **Zustand** for state management
- **ESLint** and **Prettier** for code quality

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Code Quality

### Linting

```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Auto-fix linting errors
```

### Formatting

```bash
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── store/          # Zustand state management
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
└── dist/               # Production build output
```

## Features

- 3D floor plan visualization with Three.js
- Real-time entity tracking
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Fast HMR with Vite

## Requirements

- Node.js 18+ 
- npm or yarn
