import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { graphConfig, fetchUserPhoto } from "./fetchphoto";
import { useMsal } from "@azure/msal-react";
import { UserDetails, UserContextType } from "./UserDetails";


const UserContext = createContext<UserContextType>({
  userDetails: null,
  photoUrl: null,
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { instance, accounts } = useMsal();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!accounts.length) return;

      const storedAccessToken = sessionStorage.getItem("accessToken") || "";
      let accessToken = storedAccessToken;

      if (!storedAccessToken) {
        const accessTokenRequest = {
          scopes: ["User.Read"],
          account: accounts[0],
        };
        const accessTokenResponse = await instance.acquireTokenSilent(
          accessTokenRequest
        );
        accessToken = accessTokenResponse.accessToken;
        sessionStorage.setItem("accessToken", accessToken);
      }

      try {
        const response = await axios.get(graphConfig.graphMeEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserDetails(response.data as UserDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
      }

      const imageUrl = await fetchUserPhoto(accessToken);
      setPhotoUrl(imageUrl);
    };

    fetchData();
  }, [instance, accounts]);

  const value = {
    userDetails,
    photoUrl,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
