# Note Reader

A sight-reading practice app for musicians learning to identify notes on the musical staff.

## What it does

Note Reader displays a random note on a staff and asks you to identify it by tapping the correct key on an on-screen piano keyboard. After 20 questions, you get a score with a breakdown of every answer.

### Clefs

- **Treble (G clef)** — covers the range typically played by the right hand
- **Bass (F clef)** — covers the range typically played by the left hand

### Levels

| Level        | Treble range   | Bass range               | Notes                              |
| ------------ | -------------- | ------------------------ | ---------------------------------- |
| Beginner     | E4 – F5        | G2 – A3                  | Staff lines and spaces only        |
| Intermediate | C4 – A5        | E2 – C4                  | Adds ledger lines above and below  |
| Advanced     | Full chromatic | Full chromatic (B1 – F4) | All accidentals (sharps and flats) |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Tech stack

| Tool                                                | Role                                       |
| --------------------------------------------------- | ------------------------------------------ |
| [React 19](https://react.dev)                       | UI framework                               |
| [TypeScript](https://www.typescriptlang.org)        | Type safety                                |
| [Vite](https://vite.dev)                            | Dev server and bundler                     |
| [VexFlow 5](https://www.vexflow.com)                | Music notation rendering                   |
| [Tone.js](https://tonejs.github.io)                 | Audio playback                             |
| [Ant Design 5](https://ant.design)                  | UI component library                       |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app) | PWA support (installable, offline-capable) |
| [ESLint 9](https://eslint.org)                      | Linting                                    |
