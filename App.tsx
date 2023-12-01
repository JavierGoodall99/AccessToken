import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  { MSALConfiguration, MSALInteractiveParams, MSALResult } from 'react-native-msal';
import PublicClientApplication from 'react-native-msal';
import LeaveRequestApp from './LeaveRequestApp';
import Connect from './Connect';

const Stack = createStackNavigator();

const config: MSALConfiguration = {
  auth: {
    clientId: '5456c000-616d-4817-8667-e566cbc5cfd2',
    authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',
    redirectUri: 'http://localhost:19006/',
  },
};

const scopes = ['openid', 'https://databalk.api.crm4.dynamics.com/.default'];

const pca = new PublicClientApplication(config);

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function authenticateUser() {
    try {
      await pca.init();
    } catch (error) {
      console.error('Error initializing the pca, check your config.', error);
      return;
    }

    const interactiveParams: MSALInteractiveParams = { scopes };
    const acquisitionResult: MSALResult | undefined = await pca.acquireToken(interactiveParams);

    if (acquisitionResult) {
      setAccessToken(acquisitionResult.accessToken);
    }
  }

useEffect(() => {
  authenticateUser();
}, []); 

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LeaveRequest">
      <Stack.Screen name="LeaveRequest" component={LeaveRequestApp} />
      <Stack.Screen
        name="Connect"
        component={Connect}
        initialParams={{ accessToken }}
        options={{ title: 'Connect' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default App;