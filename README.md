# Fizzora - Carbonated Drinks Store

A self-contained full-stack ecommerce demo: public catalogue, stock-aware cart, server-validated checkout, persistent orders, and secure admin tools. It uses Node.js built-ins so it runs without an install step. Data persists in data/store.json; production can replace the repository layer with PostgreSQL.

## Run

1. Copy .env.example to .env and change the session secret and admin password.
2. Run node server.js (or npm start if npm is installed).
3. Open http://localhost:3000.
4. Sign in at /admin using the configured administrator credentials (the defaults are for local demo only).

The server creates the persistent database and clearly-labelled demo data on first run.

## Security and production

Admin passwords use PBKDF2 hashes; sessions use unpredictable HTTP-only cookies. Protected admin routes and APIs verify the server session. Checkout recalculates prices and stock on the server, rejects duplicates with an idempotency key, and writes an order transaction before reducing stock. Contact/newsletter entries are persisted locally in this demo.

Image uploads are validated and stored in uploads/; mount persistent object storage or replace the storage function with S3/Cloudinary for a deployment. Cash on delivery is enabled. Add a server-verified payment-provider webhook before enabling online payments. Replace the JSON demo repository with PostgreSQL for multi-instance production; no credentials are shipped in this repository.


## Vercel deployment

This repository includes a Vercel serverless entrypoint in `api/index.js`, a `vercel.json` rewrite, and `package.json` with `main: "server.js"`. Upload/push the **contents of this project folder** (not its parent folder) to the GitHub repository connected to Vercel.

In Vercel+�u���R Project �w^~)�v Settings+�u���R Environment Variables, create:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET` (a long random value)
- `CURRENCY` (for example `USD`)

Then deploy with Root Directory set to the repository root; do not point it to an empty directory.

Vercel has a read-only, ephemeral filesystem. The catalogue works using in-memory demo data if no database is connected, but orders and admin edits will reset after a serverless restart. Connect Postgres/Supabase/Neon before treating the hosted version as a production store.
