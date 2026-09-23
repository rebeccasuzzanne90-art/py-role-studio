# IndexNow

The production site hosts a root verification key file. Submit canonical URLs
after their content changes have deployed:

```sh
npm run indexnow -- / /services/understand-the-risk
```

Deleted public URLs can also be submitted so participating engines learn about
their removal. The command rejects other hosts, private routes and URL parameters.

For initial setup only, `npm run indexnow -- --sitemap` reads the live sitemap,
excluding the placeholder shop and empty resources listing identified in the SEO
audit. Add `--dry-run` to preview the selected URLs without sending a notification.

This is an explicit submission command, not a scheduled job or automatic CMS hook.
Run it after relevant deployments. HTTP 200 means received; HTTP 202 means received
with key validation pending. Neither response guarantees crawling or indexing.

Protocol: https://www.indexnow.org/documentation
