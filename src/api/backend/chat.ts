import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = `${Constants.expoConfig?.extra?.API_URL}/api/chat`;

const chatApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ChatMessage {
  id: number;
  message: string;
  sent_at: string;
  sender_id: number;
  is_own_message: boolean;
}

export interface Chat {
  id: number;
  other_user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  last_message: {
    message: string;
    sent_at: string;
    sender_id: number;
  } | null;
}

/**
 * Obtiene todos los chats del usuario autenticado
 * @param token Token JWT del usuario
 */
export const getUserChats = async (token: string): Promise<Chat[]> => {
  try {
    const response = await chatApi.get("/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.chats;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener los chats"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Crea un nuevo chat con otro usuario
 * @param token Token JWT del usuario
 * @param userId ID del usuario con el que se quiere chatear (UUID)
 */
export const createChat = async (
  token: string,
  userId: string
): Promise<{ message: string; chat_id: string }> => {
  try {
    const response = await chatApi.post(
      `/${userId}`,
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
        error.response.data.error || "Error al crear el chat"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Obtiene los mensajes de un chat específico
 * @param token Token JWT del usuario
 * @param chatId ID del chat
 * @param page Número de página (opcional)
 * @param perPage Mensajes por página (opcional)
 */
export const getChatMessages = async (
  token: string,
  chatId: string,
  page: number = 1,
  perPage: number = 50
): Promise<{
  messages: ChatMessage[];
  total: number;
  pages: number;
  current_page: number;
}> => {
  try {
    const response = await chatApi.get(`/${chatId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener los mensajes"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

/**
 * Envía un mensaje en un chat específico
 * @param token Token JWT del usuario
 * @param chatId ID del chat
 * @param message Contenido del mensaje
 */
export const sendMessage = async (
  token: string,
  chatId: string,
  message: string
): Promise<{ message: string; message_id: number }> => {
  try {
    const response = await chatApi.post(
      `/${chatId}/messages`,
      { message },
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
        error.response.data.error || "Error al enviar el mensaje"
      );
    }
    throw new Error("Error de red o desconocido");
  }
}; 