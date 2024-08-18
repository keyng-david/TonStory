import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://91e7602d4c27ea52a97e6b1d9bb9bbd4@o4507794807717888.ingest.us.sentry.io/4507794931777536",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/ton-story\.vercel\.app\/api/],
  // Set profilesSampleRate to 1.0 to profile every transaction.
  profilesSampleRate: 1.0,
  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample rate at 10%. Adjust for production.
  replaysOnErrorSampleRate: 1.0, // Sample 100% on errors.
});