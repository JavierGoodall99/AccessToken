import axios from "axios";

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMyPhotoEndpoint: "https://graph.microsoft.com/v1.0/me/photo/$value",
    scopes: {
      scopes: [
        "User.Read",
        "User.ReadBasic.All",
      ],
    },
  };

export const fetchUserPhoto = async (accessToken: string) => {
    try {
      const response = await axios.get(
        "https://graph.microsoft.com/v1.0/me/photo/$value",
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const imageUrl = URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      return imageUrl;
    } catch (error) {
      console.error("Error fetching user photo:", error);
      throw error;
    }
  };
  