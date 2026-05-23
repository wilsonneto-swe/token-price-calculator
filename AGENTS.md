# Agent guidelines

## Design

All UI work in this project MUST follow the design system documented in
[@DESIGN.md](./DESIGN.md). Read it before writing or changing any UI.

Key rules from that file:

- **Canvas is warm cream** (`#f7f7f4`), never pure white. Ink is warm near-black (`#26251e`).
- **Cursor Orange** (`#f54e00`) is the *only* brand action color - reserved for primary CTAs
  and the wordmark, used scarcely. Do not introduce a second accent color.
- **Display type stays at weight 400** with negative letter-spacing (magazine voice, never bold).
  Substitute font for the licensed CursorGothic is **Inter**.
- **JetBrains Mono on every code/numeric surface.**
- **Hairline-only depth** - 1px borders (`#e6e5e0`), no drop shadows.
- Buttons/inputs use `8px` radius; cards use `12px`; badges/pills are fully rounded.
- Generous spacing; base unit 4px.

Use the tokens in `DESIGN.md` rather than inventing new values.

## Pricing data

`src/pricing.js` is the single source of truth for models and prices. To add or change a
model, edit only that file.
