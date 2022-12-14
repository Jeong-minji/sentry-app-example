import * as Sentry from "@sentry/nextjs";
import { sendErrorMessage } from "./utils/sentry";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_KEY,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend: (event) => sendErrorMessage(event),
});
