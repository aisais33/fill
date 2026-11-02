# Fargate Systems Training — Deployment Guide

Post-build checklist for taking the site from development to production.

---

## 1. Replace Visual Placeholders

The site currently uses a placeholder logo: a brown square with amber bar-chart lines rendered as an inline SVG. Before launch, replace the following:

- **Header logo** — In every HTML file (`index.html`, `thanks.html`, `privacy.html`, `terms.html`), locate the `<svg>` element inside the `<header>` and replace it with the final logo asset (e.g. an `<img>` tag referencing your production logo file).
- **Footer** — If the footer should also display a logo or wordmark, add it in each file's `<footer>` section.
- **Favicon** — Replace the inline SVG `data:` URI in each `<link rel="icon">` tag with a reference to your production favicon files (`.ico`, `.png`, or `.svg`).
- **Open Graph image** — Add an `og:image` meta tag to every page pointing to a production-hosted social-sharing image (minimum 1200 × 630 px).

---

## 2. Connect Real Services

### Form Submission

The enquiry form currently submits to `thanks.html` as a static redirect. Connect it to your backend or form-handling service:

- Update the `<form>` element's `action` attribute and `method` to point to your server endpoint, API route, or third-party form service.
- Ensure `thanks.html` is used as the post-submission redirect destination.

### Google Tag Manager

- Create a GTM container for the site.
- Add the GTM snippet to the `<head>` and `<body>` of every HTML file.
- Configure Google Analytics (GA4) and Google Ads conversion tags within GTM.
- Ensure all analytics and marketing tags fire only after the user has granted consent via a cookie banner.

### Domain and URLs

- Replace every instance of `{{SITE_URL}}` in `og:url` meta tags across all HTML files with the production domain (e.g. `https://www.fargatesystems.co.uk`).

### Contact Details

Verify the following details are correct across all pages. If any change before launch, search-and-replace across all HTML files:

| Detail | Current Value |
|---|---|
| Phone | +44 131 247 8603 |
| Address | 54 George Street, 3rd Floor, Edinburgh EH2 2LR |
| Email | enquiries@fargatesystems.co.uk |
| Company No. | 08534217 |
| VAT | GB 183 4726 09 |

---

## 3. Replace Tailwind CDN

The site currently loads Tailwind CSS via the CDN play script (`https://cdn.tailwindcss.com`). This is not suitable for production. Before launch:

1. Set up a build step using the Tailwind CLI or a bundler plugin (PostCSS, Vite, etc.).
2. Configure `tailwind.config.js` with the brand colours, fonts, and content paths already defined in each HTML file's inline `tailwind.config`.
3. Generate a minified production CSS file.
4. Replace the `<script src="https://cdn.tailwindcss.com"></script>` and the inline `<script>tailwind.config = { ... }</script>` blocks with a `<link rel="stylesheet" href="...">` reference to your compiled CSS.
5. Verify that all pages render correctly after the switch.

---

## 4. Final Verification

Complete every item before the site goes live:

- [ ] All placeholder logos and favicons have been replaced with production assets.
- [ ] `og:image` meta tags are present on every page and point to a valid, publicly accessible image.
- [ ] All `{{SITE_URL}}` placeholders have been replaced with the production domain.
- [ ] The enquiry form submits data to a working backend and redirects to `thanks.html`.
- [ ] GTM is installed and analytics/advertising tags fire only after cookie consent.
- [ ] A cookie-consent banner is implemented and functional.
- [ ] Tailwind CDN has been replaced with a production build of the CSS.
- [ ] All pages pass HTML validation (W3C validator) with no critical errors.
- [ ] The site loads correctly over HTTPS with a valid TLS certificate.
- [ ] Privacy Policy and Terms of Service links are accessible from every page footer.
