# Repository Guidelines

## Project Structure & Module Organization

This is a React and Vite landing page for HTS Global enquiries. The home page lives in `src/App.jsx`, with its entry point in `src/main.jsx` and styles in `src/styles.css`. The fixed navbar and hero components live in `src/components/ui/`. Local legal pages use `src/LegalPage.jsx` and the HTML entry points in `terms-and-conditions/` and `privacy-policy/`. HTS photographs live in `public/images/`. The project-local design skill is in `.agents/skills/design-taste-frontend/`. Place tests beside the code they cover (for example, `src/components/EnquiryForm.test.jsx`).

## Build, Test, and Development Commands

Use the scripts in `package.json`:

- `npm install` — install locked dependencies.
- `npm run dev` — start the local development server.
- `npm run typecheck` — check TypeScript components.
- `npm run build` — type-check and produce a production build.
- `npm run preview` — serve the production build locally.

Run `node .agents/skills/design-taste-frontend/scripts/lint.mjs src` and `node .agents/skills/design-taste-frontend/scripts/inspect.mjs http://127.0.0.1:4173/` when changing the page design; start the preview server on port 4173 first.

## Coding Style & Naming Conventions

Use two-space indentation in JSX, JavaScript, CSS, and JSON. Name React components in PascalCase (`EnquiryForm.jsx`), hooks with a `use` prefix, and other modules in camelCase. Keep components focused and use semantic HTML with accessible form labels. Prefer clear, specific CSS class names over broad selectors. No general formatter or JavaScript linter is configured; the project design skill provides its own page lint and browser inspection tools.

Use `@phosphor-icons/react` for new or replaced interface icons. Import individual icons, as in `@phosphor-icons/react/dist/csr/MagnifyingGlass`. Mark decorative icons `aria-hidden` and label icon-only controls.

## Testing Guidelines

No automated test framework or coverage target is configured. Add tests for meaningful behaviour, especially enquiry form validation and submission states, using `*.test.jsx` or `*.test.js` names. Before a pull request, run `npm run build`, the design skill checks, and a manual check of the service selector and enquiry form.

## Commit & Pull Request Guidelines

There is no Git repository or commit history here, so no existing commit convention can be inferred. Use short, imperative commit subjects such as `Add enquiry form validation`. Pull requests should explain the change, list verification steps, link any related issue, and include desktop and mobile screenshots for visual changes. Never commit API keys or real lead data. The current enquiry flow opens a prepared email; document any future form backend and its configuration.

## Agent-Specific Instructions

Whatever action you can do yourself, please do yourself. This includes starting apps and verifying your work.
