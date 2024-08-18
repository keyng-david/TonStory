import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Replay } from "@sentry/react";

Sentry.init({
  dsn: "https://91e7602d4c27ea52a97e6b1d9bb9bbd4@o4507794807717888.ingest.us.sentry.io/4507794931777536", // Replace with your actual DSN from Sentry project settings
  integrations: [
    new BrowserTracing({
      // Optionally, you can specify the tracePropagationTargets to customize which requests are traced
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Replay({
      // Set the session sample rate to control how many session replays are captured
      sessionSampleRate: 0.1, // Capture 10% of sessions
      // Capture 100% of sessions where errors occur
      errorSampleRate: 1.0,
    }),
  ],
  tracesSampleRate: 1.0, // Capture 100% of the transactions for performance monitoring
  profilesSampleRate: 1.0, // Capture 100% of the profiling data
  
  // Optionally, you can add additional configuration here:
  // Example: sending more or less sensitive data
  // beforeSend(event) {
  //   // Modify or drop event before sending to Sentry
  //   return event;
  // },
  // ignoreErrors: ['CustomErrorType'], // Ignore specific errors
  
  // Debugging (enable for local development)
  debug: process.env.NODE_ENV === 'development', // Disable in production
});

// You can add any custom Sentry setup or error handling here, if needed.