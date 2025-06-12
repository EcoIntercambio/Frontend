// api/contacts.ts
import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = `${Constants.expoConfig?.extra?.API_URL}/api/contacts`;

const contactsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface BlockedContact {
  id: string;
  first_name: string;
  last_name: string;
  blocked_at: string;
}

/**
 * Obtiene todos los contactos no bloqueados del usuario autenticado
 * @param token Token JWT del usuario
 */
export const getUserContacts = async (token: string): Promise<Contact[]> => {
  try {
    const response = await contactsApi.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.contacts;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener los contactos"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Obtiene todos los contactos bloqueados del usuario autenticado
 * @param token Token JWT del usuario
 */
export const getBlockedContacts = async (
  token: string
): Promise<BlockedContact[]> => {
  try {
    const response = await contactsApi.get("/blocked", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.blocked_contacts;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener los contactos bloqueados"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Bloquea a un contacto
 * @param token Token JWT del usuario
 * @param contactId ID del contacto a bloquear
 */
export const blockContact = async (
  token: string,
  contactId: string
): Promise<{ message: string }> => {
  try {
    const response = await contactsApi.post(
      `/${contactId}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al bloquear el contacto"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Desbloquea a un contacto
 * @param token Token JWT del usuario
 * @param contactId ID del contacto a desbloquear
 */
export const unblockContact = async (
  token: string,
  contactId: string
): Promise<{ message: string }> => {
  try {
    const response = await contactsApi.post(
      `/${contactId}/unblock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al desbloquear el contacto"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Elimina un contacto
 * @param token Token JWT del usuario
 * @param contactId ID del contacto a eliminar
 */
export const removeContact = async (
  token: string,
  contactId: string
): Promise<{ message: string }> => {
  try {
    const response = await contactsApi.delete(`/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al eliminar el contacto"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};
