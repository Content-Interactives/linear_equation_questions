# Linear Equation Questions — Technical README (repository root)

This repository hosts a **single deployable app** under **`two_point_drawing/`**. The Git root does not contain its own `package.json`; all install, build, and source live in that subdirectory.

**Live build:** [https://content-interactives.github.io/linear_equation_questions/](https://content-interactives.github.io/linear_equation_questions/)

**Component-level documentation:** see [two_point_drawing/README.md](two_point_drawing/README.md).

---

## Layout

```
linear_equation_questions/          # Git root (this README only)
└── two_point_drawing/              # Vite + React application
    package.json
    vite.config.js                  # base: '/linear_equation_questions/' (GitHub Pages)
    index.html
    src/
      main.jsx, App.jsx, App.css, index.css
      components/TwoPointDrawing.jsx
      engine/
        questionRegistry.js         # Registers factories; createRandomQuestion()
        questionTypes/              # Per-type generators + grade()
        grading/                    # gradeLine, geometry, tolerances
        feedback/                   # buildFeedback, misconceptionDetectors
```

---

## Stack (application)

| Layer | Technology |
|--------|------------|
| Build | Vite 7 (`@vitejs/plugin-react`) |
| UI | React 19 |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer; `App.css` for layout/chrome |
| Lint | ESLint 9 |
| Deploy | `gh-pages -d dist` (see `predeploy` / `deploy` in `two_point_drawing/package.json`) |

---

## Behavior (summary)

1. **`App.jsx`** holds `currentQuestion` from `createRandomQuestion()`, submit/new-question handlers, and feedback state.
2. **`TwoPointDrawing`** (imperative ref API: `getStudentDrawingData()`, `reset()`) renders the coordinate plane and student line.
3. Each **question object** exposes a `prompt`, `typeId`, and **`grade(studentData)`** returning correctness plus metadata for feedback.
4. **`questionRegistry.js`** maps `typeId` → factory. Registered types include two-point, equation, slope–point, and parallel-line variants (see registry file for exact IDs).
5. Incorrect submissions use **`buildFeedback`** in `engine/feedback/` to produce reflective questions for the UI.

---

## Commands

Run from **`two_point_drawing/`**:

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server |
| `npm run build` | Output to `two_point_drawing/dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |
| `npm run deploy` | Build then publish `dist` via gh-pages |

Changing the hosting path requires updating **`base`** in `two_point_drawing/vite.config.js` to match the URL segment (currently aligned with `/linear_equation_questions/`).

---

## Embedding

The app is a standard SPA bundle from Vite. Embed via the deployed origin or self-hosted `dist`; there is no built-in LMS or `postMessage` contract documented in this repo.
