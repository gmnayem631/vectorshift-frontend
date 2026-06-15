# PipelineAI — Frontend

A visual pipeline builder built with React and ReactFlow. Users can drag and drop nodes onto a canvas, connect them to form a data pipeline, and submit the pipeline for analysis.

## Tech Stack

- **React** — UI framework
- **ReactFlow** — drag and drop canvas and node/edge management
- **Zustand** — global state management
- **Tailwind CSS** — utility-first styling
- **DaisyUI** — component library for modals
- **React Hot Toast** — toast notifications

## Features

- 9 draggable node types — Input, Output, Text, LLM, API Call, Condition, Note, Data Transform, File Upload
- Reusable `BaseNode` abstraction — all nodes share a single base component
- Dynamic Text Node — auto-resizes as you type and generates input handles from `{{variable}}` patterns
- Connect nodes with animated edges to build a pipeline
- Submit pipeline to backend and view node count, edge count, and pipeline status in a modal
- Clear canvas button to reset and start fresh

## Getting Started

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`

## Project Structure

```
src/
├── nodes/
│ ├── BaseNode.jsx # Shared base component for all nodes
│ ├── inputNode.jsx
│ ├── outputNode.jsx
│ ├── llmNode.jsx
│ ├── textNode.jsx
│ ├── apiCallNode.jsx
│ ├── conditionNode.jsx
│ ├── noteNode.jsx
│ ├── dataTransformNode.jsx
│ └── fileUploadNode.jsx
├── App.js # Root layout
├── ui.js # ReactFlow canvas
├── toolbar.js # Sidebar with draggable nodes
├── draggableNode.js # Draggable node button component
├── submit.js # Submit button and result modal
└── store.js # Zustand global state
```

## Live Demo

[https://vectorship-pipeline.netlify.app](https://vectorship-pipeline.netlify.app)

## Backend

The backend repository can be found at [vectorshift-backend](https://github.com/gmnayem631/vectorshift-backend)
