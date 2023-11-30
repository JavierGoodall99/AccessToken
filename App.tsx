import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import LeaveRequestApp from './LeaveRequestApp';
import Connect from './Connect';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeMsal = async () => {
      const config = {
        auth: {
          clientId: '5456c000-616d-4817-8667-e566cbc5cfd2',
          authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',
          redirectUri: 'http://localhost:19006/',
        },
      };
      const instance = new PublicClientApplication(config);
      setMsalInstance(instance);
    };

    initializeMsal();
  }, []);

  const { accounts, instance } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      console.log("Setting active account:", accounts[0]);
      instance.setActiveAccount(accounts[0]);
      
      instance.acquireTokenSilent({
        account: accounts[0],
        scopes: ['openid https://databalk.api.crm4.dynamics.com/.default'], 
      })
      .then((response) => {
        const token = response.accessToken;
        setAccessToken(token);

        // Store the access token in sessionStorage
        sessionStorage.setItem('accessToken', token);

        console.log("Access Token:", token);
      })
      .catch((error) => {
        console.error('Error acquiring token silently:', error);
      });
    } else {
      setAccessToken(null);
      // Remove the access token from sessionStorage if user is not authenticated
      sessionStorage.removeItem('accessToken');
    }
  }, [accounts.length, accounts, instance]);

  if (!msalInstance) {
    return null;
  }

  return (
    <MsalProvider instance={msalInstance}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LeaveRequest">
          <Stack.Screen name="LeaveRequest" component={LeaveRequestApp} />
          <Stack.Screen
            name="Connect"
            component={Connect}
            options={{ title: 'Connect' }}
          />
        </Stack.Navigator>
        <button onClick={() => msalInstance.loginPopup()}>Authorize</button>

        {/* Display the accessToken */}
        {accessToken && <p>Access Token: {accessToken}</p>}
      </NavigationContainer>
    </MsalProvider>
  );
};

export default App;