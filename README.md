# HTS Global landing page

A React and Vite landing page for HTS Global enquiries. It presents training routes for professionals and industrial services for organisations.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create `dist/`, then `npm run preview` to check the production build.

## Navigation component

The fixed liquid navbar is in `src/components/ui/liquid-glass-navbar.tsx`. This path keeps UI components under Vite's `src/` directory. TypeScript support is configured in `tsconfig.json`; run `npm run typecheck` after changing TSX files. The navbar provides its own styles and icons, so it has no Tailwind or shadcn dependency.

The hero is in `src/components/ui/hero-01.tsx`, with responsive styles in `src/styles.css`. It links to the enquiry form and services and shows short excerpts from public Google reviews. The reviewer photos in `public/images/reviews/` match those Google accounts; the review links are stored beside the excerpts in the hero component. Recheck the reviews and profile photos periodically.

To add shadcn/ui later, install Tailwind with `npm install tailwindcss @tailwindcss/vite`, add the Tailwind Vite plugin and `@import "tailwindcss"` to the app CSS, configure an `@/*` alias to `src/*` in Vite and TypeScript, then run `npx shadcn@latest init`. Follow the [existing Vite project guide](https://ui.shadcn.com/docs/installation/vite) for the configuration files.

## Enquiry flow

The service index previews each offering and fills the related form fields. Submitting the form opens Gmail with a prepared message to `info@htscoatings.in`. The page does not store enquiries or claim they were received. If a direct web submission flow is required, connect a form endpoint before launch.

The enquiry form requires a country and phone number. `libphonenumber-js` supplies international dialling codes and checks the number against the selected country. The maths verification is client-side only. The local Terms and Privacy pages are built from `terms-and-conditions/index.html` and `privacy-policy/index.html`, with React content in `src/LegalPage.jsx`; both link to the full published policies.

After 5 seconds of visible browsing, `src/components/ui/TimedEnquiryPopup.tsx` shows the animated CTA banner. Visitors can dismiss it, open the enquiry form, or email HTS. The prompt stays closed after dismissal until the page is reloaded.

## Assets

Site photographs in `public/images/` come from the [HTS Coatings gallery](https://www.htscoatings.in/gallery/). The three reviewer account photos in `public/images/reviews/` come from their public Google profiles. Replace these assets if the team supplies newer approved images.
