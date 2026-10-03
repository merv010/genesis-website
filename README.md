# Team Genesis website

A responsive, static website built with the existing HTML, CSS, JavaScript and Vite setup. Production remains on Vercel; this redesign has not been deployed.

## Local preview

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open <http://127.0.0.1:5173/>. The preview is local to this computer.

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

The build output is `dist/`. Keep the existing Vercel deployment configuration. Do not publish until the preview is approved.

## Content and assets

- Sponsorship source: the supplied October 2026 **Genesis Sponsorship Proposal.pdf**, copied unchanged to `public/genesis-sponsorship-proposal.pdf`. Packages are €500, €800 and €1,200. All seven comparison rows and the allocation, cross-posting, delivery and logo-placement conditions are included.
- The hero photograph was extracted directly from page 2 of the proposal and is explicitly labelled as the previous robot in 2024. Original portraits and logo artwork are preserved. Smaller copies of the logo artwork improve loading.
- Ankit’s information follows the latest proposal: completed Master’s thesis in Artificial Intelligence and Internet of Things at the **University of Agder**.
- Arena game summaries were verified on the [IEEE Malta competition website](https://www.ieeemalta.org/ieee-robot-championship-2026/) on 3 October 2026. These are brief introductions; the official website supplies regulations.
- Existing sponsor artwork is retained. Its previous `href="#"` links were removed; confirmed sponsor website URLs were not supplied.
- Existing Instagram, Facebook and LinkedIn URLs are retained. Instagram and Facebook reached the correct Genesis profiles during checks. LinkedIn blocked automated inspection (HTTP 999), so its profile URL still needs a signed-in human check.
- There were no individual team profile links or verified engineering roles in the existing project, so none were added.

## Enquiries

Contact and package buttons use `mailto:` to open the visitor’s email app. Every package includes its name and price in the draft. Messages are sent by the visitor; there is no contact-form backend or online payment flow.

## Verification

Production build and `git diff --check` pass. Chromium browser checks covered 1440, 1024, 768, 390 and 320px layouts; no horizontal overflow, broken assets or console errors were found. Checks also covered sticky-header anchor offsets, active navigation, keyboard game disclosures, mobile-menu Escape and focus behaviour, package email subjects and bodies, exact PDF-download checksum, reduced motion and visible content without JavaScript.

Desktop and mobile screenshots were visually reviewed. Sponsor contrast and mobile headline wrapping were corrected during review. Temporary review files live in the ignored `tmp/` directory.

The favicon and social-sharing image are served from `public/`. Open Graph metadata uses the existing production domain and will become available there after deployment approval.
