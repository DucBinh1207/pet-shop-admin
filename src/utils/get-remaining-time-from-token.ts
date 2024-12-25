// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRemainingTimeFromToken(token: any) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  const payLoad = JSON.parse(jsonPayload);

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expiresTimestamp = payLoad.exp;
  const remainingTime = expiresTimestamp - currentTimestamp;
  return remainingTime;
}
