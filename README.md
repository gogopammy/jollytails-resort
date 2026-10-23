# Jollytails Resort website

Independent static website project for Jollytails Resort.

## Architecture

- Plain HTML
- Shared CSS
- Vanilla JavaScript
- Static assets
- No package manager, framework, server-side rendering, database, or CMS

## Website scope

This repository contains the Resort homepage and interior website. Reservations use one central hub with separate new-client and returning-client routes for daycare, boarding, and grooming. The five verified Resort Wufoo forms are embedded on their matching destination pages without modifying the forms or their Wufoo configuration.

## Local preview

From the repository root, run a static web server. Clean production-style URLs are handled by Vercel; locally, add `.html` when opening an interior page with a basic file server.

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Safety boundaries

- This repository is independent from `jollytails.ca`.
- Do not copy credentials, analytics IDs, form IDs, newsletter configuration, client portals, business content, photographs, or other site-specific configuration from the corporate project.
- The current `robots.txt`, page-level robots metadata, and Vercel `X-Robots-Tag` intentionally block indexing during development.
- Do not remove preview indexing protection or connect production domains without explicit launch approval.
- Do not modify Wufoo forms or account configuration without separate approval. Website-side embed maintenance is permitted using the verified form mapping in `expectedWufooForms` in `scripts/validate-site.mjs`.

## Maintenance

Interior pages are committed as static HTML. Their shared source is `scripts/build-interior-pages.mjs`; rerun it with Node after updating page content, then run `scripts/validate-site.mjs` before committing.

See [Kevin's website editor setup](docs/KEVIN-WEBSITE-EDITOR-SETUP.md) for the editing and publishing workflow. Prelaunch review documents and unused image sources are kept outside this repository; Pamela retains the outstanding launch checklist.

## Design provenance

The visual system recreates approved corporate conventions: colour tokens, Trebuchet/Arial typography, pill buttons, rounded cards, generous spacing, responsive grids, accessible focus states, skip navigation, mobile navigation, and reduced-motion behaviour. Reservation buttons for existing clients use red; new-client, assessment, and request-to-join buttons use blue.

The current logo and all photographs are Resort-owned material sourced from the existing public Jollytails Resort website or supplied directly by the Resort owner. No corporate Jollytails photographs, mascots, offers, locations, analytics, secrets, or credentials are included.
