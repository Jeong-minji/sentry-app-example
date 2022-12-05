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
  let errorMsg = "Sentry error hook";
  console.log(event);
  console.log(hint);

  const hintMsg = hint.originalException || hint.syntheticException;
  errorMsg = `[Error]: \n
  >>> Message: ${hintMsg.message}\n`;

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
  }).then(() => {
    console.log(
      "Error logged!",
      hint.originalException || hint.syntheticException
    );
  });

  return event;
};
