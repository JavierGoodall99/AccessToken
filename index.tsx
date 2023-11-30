import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const startup = async () => {

  const render = (Component) => {
    const RootComponent = () => (
      <MsalProvider instance={msalInstance}>
        <Component />
      </MsalProvider>
    );

    AppRegistry.registerComponent('YourAppName', () => RootComponent);
    AppRegistry.runApplication('YourAppName', { rootTag: document.getElementById('root') });
  };

  render(App);
};

startup();