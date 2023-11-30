import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
      clientId: '5456c000-616d-4817-8667-e566cbc5cfd2',
      authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',
      scopes: 'openid https://databalk.api.crm4.dynamics.com/.default',
      redirectUri: 'http://localhost:19006/'
  }
};

const msalInstance = new PublicClientApplication(msalConfig);