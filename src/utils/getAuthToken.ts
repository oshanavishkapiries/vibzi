export const getAuthToken = () => {
  try {
    const accessTokenKey = Object.keys(localStorage).find((key) =>
      key.endsWith(".accessToken")
    );

    if (!accessTokenKey) {
      return null;
    }

    const accessToken = localStorage.getItem(accessTokenKey);
    if (!accessToken) {
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
