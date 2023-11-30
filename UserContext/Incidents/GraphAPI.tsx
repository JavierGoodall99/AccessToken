import React, { useState, useEffect } from "react";
import { getAccessToken } from "./authUtils";

const Cases: React.FC = () => {
  const [apiData, setApiData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
          console.error("Access token not available.");
          setIsLoading(false);
          return;
        }

        const apiUrl =
          "https://databalk.api.crm4.dynamics.com/api/data/v9.2/incidents/";

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApiData(data);
          setIsLoading(false);
        } else {
          console.error("API Error:", response.status, response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("API Error:", error);
        setIsLoading(false);
      }
    };

    // Check if data has already been fetched
    if (!apiData) {
      fetchData();
    }
  }, [apiData]);

  return (
    <div>
      {isLoading ? (
        <p>Loading Incidents data...</p>
      ) : (
        apiData && (
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        )
      )}
    </div>
  );
};

export default Cases;
