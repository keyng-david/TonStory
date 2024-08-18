import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e0d9617ac079d03d4a9083991d43a71d@o4507794807717888.ingest.us.sentry.io/4507797324562432",
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

// Test Sentry configuration by sending a test message
if (process.env.NODE_ENV === 'production') {
  Sentry.captureMessage("Sentry is successfully set up in production mode!");
}

// Uncomment this block if you want to trigger an intentional error for testing
// This will throw a test error only in production
/*
if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    try {
      // Intentionally trigger an error after a delay
      throw new Error("Test error for Sentry configuration in production mode!");
    } catch (error) {
      Sentry.captureException(error);
    }
  }, 5000); // Delay to ensure other initializations complete
}
*/