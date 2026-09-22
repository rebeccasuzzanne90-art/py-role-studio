# Google Analytics

- Property: The Payroll Studio (Rebecca's Google account)
- Web stream: Payroll Studio website, https://www.thepayrollstudio.com.au
- Public measurement ID: G-T23JJH27FJ
- Reporting: Australia/Brisbane, AUD

The root layout uses Next.js's GoogleAnalytics component, loaded after hydration in production builds only. GA4 enhanced measurement handles page views including client-side navigation; do not add a second manual page-view listener.

The contact form sends `generate_lead` with `form_name: contact_enquiry` only after `/api/contact` returns success. No form field values are sent with that event. Automatic form interaction and site-search measurement are disabled in the web stream. Local development does not load Analytics.

The footer links to `/privacy`, which explains enquiry delivery and Analytics. To verify installation, open the live website and check this property's Realtime report. Standard reports can take 24–48 hours to populate.
