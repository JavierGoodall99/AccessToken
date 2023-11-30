import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { View, Text } from 'react-native';

const Connect: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            account: accounts[0],
            scopes: ['openid https://databalk.api.crm4.dynamics.com/.default'],
          });

          const accessToken = response.accessToken;
          console.log('Access Token:', accessToken);

          const apiUrl = 'https://databalk.api.crm4.dynamics.com/api/data/v9.2/cr44a_aanvragens/';
          const apiResponse = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setApiData(apiResponse.data);
        } catch (error) {
          console.error('Error acquiring token or making API request:', error);
        }
      }
    };

    fetchData();
  }, [accounts, instance]);

  return (
    <View>
      <Text>API Data:</Text>
      {apiData && (
        <View>
          <Text>{JSON.stringify(apiData, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default Connect;