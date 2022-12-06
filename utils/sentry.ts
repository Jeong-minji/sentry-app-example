import axios from "axios";

export const sendErrorMessage = (event: { request: { url: string } }) => {
  const errorUrl = event.request.url;
  const errorMsg = `📍 URL: ${errorUrl} \n 🧷 https://sentry.io/organizations/pixel-bf/issues/?project=4504256997031936&referrer=sidebar`;

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
