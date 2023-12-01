import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Connect = ({ accessToken }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (accessToken) {
      // Define the API endpoint
      const apiUrl = 'https://databalk.api.crm4.dynamics.com/api/data/v9.2/cr44a_aanvragens/';

      // Fetch data using the access token
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          // Set the fetched data in the component state
          setData(responseData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [accessToken]);

  return (
    <View>
      <Text>Data from API:</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default Connect;
