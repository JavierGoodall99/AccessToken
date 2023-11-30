import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const config: Configuration = {
  auth: {
    clientId: '5456c000-616d-4817-8667-e566cbc5cfd2',
    authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',
    redirectUri: 'http://localhost:19006/'
  }
};

const pca = new PublicClientApplication(config);

export const authenticate = async (): Promise<string | undefined> => {
  const loginRequest = {
    scopes: ['openid', 'https://databalk.api.crm4.dynamics.com/.default'],
  };

  try {
    const authResponse = await pca.loginPopup(loginRequest);
    if (authResponse.idToken) {
      return authResponse.idToken;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = async (): Promise<string | undefined> => {
  const request = {
    scopes: ['https://databalk.api.crm4.dynamics.com/.default'],
  };

  try {
    const response = await pca.acquireTokenSilent(request);
    if (response.accessToken) {
      return response.accessToken;
    }
  } catch (error) {
    console.error(error);
  }
};