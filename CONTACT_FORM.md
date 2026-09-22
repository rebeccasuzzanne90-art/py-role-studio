# Contact form delivery

`/contact` uses the custom form in `components/contact-form.tsx` and posts to
`/api/contact`. All existing enquiry fields are retained. Phone country defaults
to Australia (+61). News signup is optional; the preference is included in the
notification email for the recipient to action, not automatically added to a
mailing list.

Notifications go to **rebeccasuzzanne90@gmail.com**. Reply-To is the visitor's
email. No HubSpot submission occurs from this page.

Set these server-only environment variables locally and on the hosting service:

- `RESEND_API_KEY`: valid Resend API key with sending permission.
- `CONTACT_FROM_EMAIL`: a sender on a verified Resend domain, e.g.
  `The Payroll Studio <enquiries@your-verified-domain>`.

Restart the server after configuration. Never put API keys in browser code.
A sending-only Resend key is configured locally. `CONTACT_FROM_EMAIL` is set to
The Payroll Studio <rebecca@thepayrollstudio.com>. On 22 September 2026, a labelled
test enquiry was submitted through the local browser form. The form displayed
success and Resend reported Delivered to rebeccasuzzanne90@gmail.com (email ID:
01a0c8c1-58a0-7776-a63b-1e6bbe732f7c). Hosting environment configuration and deployment
are separate from this local test.

Validation checks: `node --test tests/contact.test.mjs` (Node 22.18+), TypeScript,
production build, invalid API input, missing-configuration response, mobile
layout, browser required fields and mocked success UI. Real delivery was confirmed in Resend after domain verification.
