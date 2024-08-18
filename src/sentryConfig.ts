import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://91e7602d4c27ea52a97e6b1d9bb9bbd4@o4507794807717888.ingest.us.sentry.io/4507794931777536",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "yourdomain.com", /^\//],
      // Adjust this to match your needs
    }),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});