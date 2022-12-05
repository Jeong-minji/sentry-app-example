import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: isProduction ? process.env.NEXT_PUBLIC_SENTRY_DSN_KEY : "",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
