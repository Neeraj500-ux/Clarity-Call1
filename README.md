# for High-Achieving Women

React + Vite + Tailwind CSS website. Home page (VSL style) plus 7 inside pages, all in the same dark-green and gold design.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into /dist
npm run preview    # preview the build
```

Requires Node.js 18 or newer.

## Pages

| URL | Page |
|---|---|
| `/` (also `/vsl`) | Home |
| `/about` | About Us |
| `/pricing` | Pricing |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/refund` | Refund & Cancellation Policy |
| `/shipping` | Shipping & Delivery Policy |
| `/contact` | Contact Us (with form) |

## Edit your details: `src/config.js`

- `contactEmail`: **change this to your real email.** It is used in the footer, policies and as the form destination.
- `formEndpoint`: optional Formspree / Getform URL. Leave empty and forms open the visitor's email app with the message ready.
- `bookingUrl`: optional Calendly/Cal.com/Typeform link. If set, every "Book Your Call" button opens it instead of the built-in form.
- `videoEmbedUrl`: optional YouTube/Vimeo embed URL shown above the button on the home page.

## Editing text

- Home page text: `src/pages/Home.jsx`
- Inside page text: `src/pages/*.jsx` (each page is a simple list of headings and paragraphs)
- Colors: `tailwind.config.js` (`forest`, `gold`, `cream`)
- Fonts (Playfair Display + Inter) are bundled, so no external font requests are made.

## Deploying

- **Vercel:** import the repo; `vercel.json` already handles page routing.
- **Netlify:** `public/_redirects` already handles page routing.
- Any other static host: serve `/dist` and redirect all paths to `index.html`.
