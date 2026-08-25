# Morning Edition subscriptions

Morning Edition now has a website subscription system backed by Supabase.

## Architecture

- `assets/subscribe-widget.js` adds the **Subscribe** button and consent modal to the GitHub Pages footer.
- The public form posts to the Supabase Edge Function `morning-edition-subscribe`.
- Subscriber records live in `public.morning_edition_subscribers` with row-level security enabled and no public table access.
- Consent time/version, subscription status, and a unique unsubscribe token are stored for each address.
- Unsubscribe links are handled by the same Edge Function and set a subscriber's status to `unsubscribed` rather than deleting the consent history.
- The existing Morning Edition SMTP credentials remain GitHub Actions secrets and are not exposed to the website or Supabase.

## Email delivery

The existing email workflow remains in `BigCatMellow/Notes`.

- `scripts/send_morning_edition.py` remains the base renderer/sender.
- `scripts/send_morning_edition_newsletter.py` wraps it, sends the existing configured recipient(s), then loads active website subscribers from Supabase and sends each subscriber an individual copy with a personalized unsubscribe link.
- `.github/workflows/daily-morning-edition.yml` now runs the newsletter wrapper.

## Required GitHub secret

The `BigCatMellow/Notes` repository must contain one additional Actions secret:

`SUPABASE_SERVICE_ROLE_KEY`

Set it to the **service-role/secret key for the Supabase project `wesrdkorcqheijqkcqfv`**.

This key must never be committed to either repository or exposed in website JavaScript. GitHub intentionally does not display a secret again after it is saved; that does not mean the secret has been erased.

Until this secret is present, the wrapper safely falls back to sending only the existing `REPORT_EMAIL_TO` recipient(s). Website subscriptions can still be recorded, but they will not receive the daily email until the secret is configured.

## Privacy/security notes

- The public browser never receives SMTP credentials or the Supabase service-role key.
- Subscriber email addresses are not stored in the public GitHub repository.
- The public form requires an explicit consent checkbox and records when consent was given.
- A hidden honeypot field is included to reduce simple bot submissions.
- Each subscriber receives mail individually, rather than exposing the mailing list in To/CC headers.
