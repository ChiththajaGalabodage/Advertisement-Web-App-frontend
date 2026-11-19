# Advertisement Web App | Marketplace Frontend

**Repository:** [ChiththajaGalabodage/Advertisement-Web-App-frontend](https://github.com/ChiththajaGalabodage/Advertisement-Web-App-frontend)  
**Category:** Advertisement  
**Repository visibility at inspection:** Public  
**Code status:** Implementation present

## Overview

React frontend for a classified-advertisement marketplace with user accounts, ad creation, category browsing, listing details and administration interfaces.

## Technologies / tools

`React 19` · `Vite 6` · `React Router` · `Tailwind CSS 4` · `Material UI` · `Axios` · `Recharts` · `Google OAuth` · `Supabase JS`

## What is in this repository

- Registration, login, password recovery and Google OAuth client UI
- Create listings and browse listing details
- Search and category routes including vehicles, property, education and more
- User and admin pages, including dashboard components
- Charts, notifications and image-related integrations represented in dependencies

## Project structure

```text
Advertisement-Web-App-frontend/
├── src/
│   ├── App.jsx          # Top-level routes
│   ├── pages/           # Marketplace and admin screens
│   ├── components/      # Shared UI
│   ├── utils/           # Helpers
│   └── supabaseClient.js
├── package.json
└── vite.config.js
```

## Getting started

```bash
git clone https://github.com/ChiththajaGalabodage/Advertisement-Web-App-frontend.git
cd Advertisement-Web-App-frontend
npm install
npm run dev
```

Build with `npm run build`. Note that this repository's default branch is **`master`**, not `main`.

## Configuration and security

The frontend depends on external API/OAuth/storage configuration. Inspect its own API client and Supabase usage to set your local values. Do not put private keys in Vite frontend variables or commit real secrets. Google OAuth browser client IDs are public identifiers; OAuth client **secrets** must remain server-side.

## Additional notes

### Connected project
[Advertisement-Web-App-backend](https://github.com/ChiththajaGalabodage/Advertisement-Web-App-backend) provides the Express/MongoDB API. A separate [landing UI](https://github.com/ChiththajaGalabodage/Advertisement-Web-App--frontend) is also maintained as another repository.

---

**Maintained in:** [ChiththajaGalabodage on GitHub](https://github.com/ChiththajaGalabodage)  
*Documentation describes the inspected repository snapshot; runtime and deployment were not independently verified.*
