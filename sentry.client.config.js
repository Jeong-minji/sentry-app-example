import * as Sentry from "@sentry/nextjs";
import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  // dsn: isProduction ? process.env.NEXT_PUBLIC_SENTRY_DSN_KEY : "",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_KEY,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend: (event, hint) => sendErrorMessage(event, hint),
});

const sendErrorMessage = (event, hint) => {
  console.log(event);
  console.log(hint);

  const errorUrl = event.request.url;
  const hintMsg = hint.originalException || hint.syntheticException;
  const errorMsg = `Alert triggered: ${hintMsg.stack}\n at ${errorUrl}`;

  const body = {
    chat_id: "5040460573",
    text: errorMsg,
  };

  axios({
    method: "POST",
    url: `https://api.telegram.org/bot5875353955:AAEo2bzzyOG-mrCky3zjfWLYzoR0XQwoPN8/sendMessage`,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: body,
  });

  return event;
};
