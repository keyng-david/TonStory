import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "your-dsn-here",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "https://ton-story.vercel.app", /^\//],
    }) as unknown as Sentry.Integration, // Type Assertion
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});