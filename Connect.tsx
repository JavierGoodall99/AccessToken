import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Platform } from 'react-native';

const Connect = ({ token }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://databalk.api.crm4.dynamics.com/api/data/v9.2/incidents/';
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Response Status:', response.status);
        console.log('Response OK:', response.ok);

        if (!response.ok) {
          console.error('Network response was not ok');
          return;
        }

        const result = await response.json();
        console.log('Fetched Data:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <View>
      <Text>Data: {data ? JSON.stringify(data) : 'Loading...'}</Text>
    </View>
  );
};

export default Connect;
