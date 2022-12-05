const Auth = () => {
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

  return (
    <div>
      <button onClick={login}>Login</button>
      <button
        onClick={() => {
          throw new Error("Provided Error");
        }}
      >
        Provide Error
      </button>
    </div>
  );
};

export default Auth;
