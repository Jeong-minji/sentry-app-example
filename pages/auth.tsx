import { useEffect, useState } from "react";

const Auth = () => {
  const [count, setCount] = useState(0);
  const login = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/auth/login/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountKey: "example_account_key",
        email: "test@example.com",
        password: "test1234!",
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCount((count) => count + 1);
  });

  return (
    <div>
      <button onClick={login}>Login</button>
      <span>{count}개</span>
    </div>
  );
};

export default Auth;
