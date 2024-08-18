import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Replay } from "@sentry/react";

// Initialize Sentry
Sentry.init({
  dsn: "https://91e7602d4c27ea52a97e6b1d9bb9bbd4@o4507794807717888.ingest.us.sentry.io/4507794931777536",
  integrations: [
    new BrowserTracing(),
    new Replay(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  profilesSampleRate: 1.0, // Profile every transaction (relative to tracesSampleRate)
  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample rate at 10%
  replaysOnErrorSampleRate: 1.0, // 100% sample rate on errors
});