import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";

export const AuthStorage = {
  /**
   * Guarda el token en almacenamiento local
   * @param token El access_token que se quiere guardar
   */
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error("Error saving access token:", error);
    }
  },

  /**
   * Recupera el token del almacenamiento local
   * @returns El access_token o null si no existe
   */
  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return null;
    }
  },

  /**
   * Elimina el token del almacenamiento local
   */
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error("Error removing access token:", error);
    }
  },
};
