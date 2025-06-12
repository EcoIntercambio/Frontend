// api.ts
import axios from "axios";
import Constants from "expo-constants";

// Asegúrate de cambiar esta URL por la URL de tu backend Flask
const API_BASE_URL = `${Constants.expoConfig?.extra?.API_URL}/api/auth`;
console.log("API_BASE_URL", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserProfile {
  id: string;
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  profile?: {
    avatar?: string;
    degree?: string;
    university?: string;
    profile_description?: string;
  };
}

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al registrar el usuario"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al iniciar sesión");
    }
    throw new Error("Error de red o desconocido");
  }
};

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  try {
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener el perfil"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

export const updateUserProfile = async (
  token: string,
  updatedData: {
    first_name?: string;
    last_name?: string;
    email?: string;
    region?: string;
    profile?: {
      avatar?: string;
      degree?: string;
      university?: string;
      profile_description?: string;
      language?: string;
      currency?: string;
    };
  }
) => {
  try {
    const response = await api.patch("/profile", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al actualizar el perfil"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

export const getUserByUid = async (uid: string, token?: string) => {
  try {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await api.get(`/profile/${uid}`, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error("Usuario no encontrado");
      }
      throw new Error(
        error.response.data.error || "Error al obtener el usuario"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};
