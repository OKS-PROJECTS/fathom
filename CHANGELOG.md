# Changelog

> Requires oks-ui ^1.4.1

## [Unreleased]

## [1.0.0] — 2026-10-13

### Added
- Project scaffold: Next.js App Router, TypeScript, Tailwind v4 (layout only), oks-ui.
- Application shell: fixed sidebar with grouped navigation and "Show more" rows, space switcher, search through a command palette (`cmd + /`), user menu, notifications and chat drawers, mobile menu drawer.
- Dashboard with highlights, teams table, block list and charts.
- Public Profile: nine profile layouts, projects (2 and 3 columns), works, teams, network, activity, campaigns (card and list) and an empty state.
- My Account: get started, user and company profile, four settings layouts, billing (basic, enterprise, plans, history), security (overview, allowed IPs, privacy, devices, backup and recovery, sessions, log), members and roles (teams, team info, members, import, roles, permissions toggler and check), integrations, notifications, API keys, appearance, invite a friend and activity.
- Network: get started, five user-card layouts and six user tables.
- Store - Client: home, search results (grid and list), product details, wishlist, four-step checkout, my orders and order receipt.
- Authentication: Classic and Branded layouts for sign in, sign up, two-factor, check email and the three reset-password screens; welcome message; account deactivated; 404 and 500 pages.
- GitHub Pages demo: a static export built and deployed by a workflow on every push to `main`.
- Component gallery at `/components`: buttons, form fields, feedback, navigation, data and overlays.
- README screenshots in `screenshots/`.
- Light and dark themes with a saved preference.
- Reusable building blocks: `Surface`, `PageHeader`, `Container`, `DataGridCard`, tile grids, help cards, FAQ card, generated product art.

### Changed
- All sample names, copy and data are original content.
- Component sizing follows a 28 / 34 / 40 px density scale through theme tokens.
- Modals, drawers and date pickers render only in the browser so server and client output always agree.

### Fixed
- Store search shortcut badge no longer wraps onto two lines.
- Sign-in and sign-up screens use the page surface colour behind the form.
- Dark theme no longer inverts status colours twice, which left tinted backgrounds, chips and offer cards light.
- Dark-on-dark buttons now invert correctly in dark mode.
- Low-contrast badges on the storefront were darkened.
- Account activity no longer overflows the page on narrow screens.

### Removed
- First-pass placeholder pages and routes that no navigation entry pointed to.
- Unused components, helpers and style rules.

## [0.1.0]

- Initial scaffold.
