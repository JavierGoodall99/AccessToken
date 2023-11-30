export const getToken = async (activeAccount, instance) => {
  const storedAccessToken = sessionStorage.getItem("accessToken") || "";
  let accessToken = storedAccessToken;

  if (!storedAccessToken) {
    const accessTokenRequest = {
      scopes: ["User.Read", "User.Read.All", "User.ReadBasic.All", "user_impersonation"],
      account: activeAccount,
    };
    const accessTokenResponse = await instance.acquireTokenSilent(accessTokenRequest);
    accessToken = accessTokenResponse.accessToken;
    sessionStorage.setItem("accessToken", accessToken);
  }

  return accessToken;
};
