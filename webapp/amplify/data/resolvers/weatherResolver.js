export function request(ctx) {
  const { location } = ctx.args;
  const apiKey = "3eba3b19037c07b45d07f6e0fda76e71";

  return {
    resourcePath: `/current?access_key=${apiKey}&units=f&query=${util.urlEncode(
      location
    )}`,
    method: "GET",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function response(ctx) {
  return ctx.result.body;
}
