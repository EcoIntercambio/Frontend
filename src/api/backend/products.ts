import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = `${Constants.expoConfig?.extra?.API_URL}/api/products`;

const productsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todos los productos (con paginación y filtros opcionales)
export const getProducts = async ({
  page = 1,
  perPage = 10,
  type,
  status = "published",
  priceRange,
  sortBy,
}: {
  page?: number;
  perPage?: number;
  type?: string;
  status?: string;
  priceRange?: string;
  sortBy?: string;
}) => {
  try {
    const response = await productsApi.get("", {
      params: {
        page,
        per_page: perPage,
        type,
        status,
        price_range: priceRange,
        sort_by: sortBy,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener los productos"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

// Obtener un producto específico por ID
export const getProductById = async (productId: number) => {
  try {
    const response = await productsApi.get(`/${productId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al obtener el producto"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

// Obtener productos de un usuario específico con paginación y filtro por estado
export const getUserProducts = async ({
  userId,
  page = 1,
  perPage = 10,
  status = "published",
}: {
  userId: string;
  page?: number;
  perPage?: number;
  status?: string;
}) => {
  try {
    const response = await productsApi.get(`/user/${userId}`, {
      params: {
        page,
        per_page: perPage,
        status,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error ||
          "Error al obtener los productos del usuario"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};

export const createProduct = async (
  productData: {
    name: string;
    description: string;
    location: string;
    type: string;
    price?: number | string;
    tags?: string[];
    images: any[]; // Cambiar a array de objetos de imagen
  },
  token: string
) => {
  try {
    const formData = new FormData();

    // Agregar campos de texto
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("location", productData.location);
    formData.append("type", productData.type);
    
    if (productData.price !== undefined) {
      formData.append("price", String(productData.price));
    }
    
    if (productData.tags) {
      formData.append("tags", productData.tags.join(","));
    }

    // Agregar imágenes como archivos
    productData.images.forEach((image, index) => {
      formData.append("images", {
        uri: image.uri || image, // Compatibilidad con URIs directas
        type: image.type || "image/jpeg", // Tipo MIME
        name: image.name || `image_${Date.now()}_${index}.jpg` // Nombre único
      } as any);
    });

    const response = await productsApi.post("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Manejo de errores...
  }
};

// Actualizar un producto (PUT)
export const updateProduct = async (
  productId: number,
  productData: {
    name?: string;
    description?: string;
    location?: string;
    type?: string;
    price?: number | string;
    status?: string;
    tags?: string[];
    images?: File[];
  }
) => {
  try {
    const formData = new FormData();

    if (productData.name !== undefined)
      formData.append("name", productData.name);
    if (productData.description !== undefined)
      formData.append("description", productData.description);
    if (productData.location !== undefined)
      formData.append("location", productData.location);
    if (productData.type !== undefined)
      formData.append("type", productData.type);
    if (productData.price !== undefined)
      formData.append("price", String(productData.price));
    if (productData.status !== undefined)
      formData.append("status", productData.status);
    if (productData.tags) formData.append("tags", productData.tags.join(","));

    productData.images?.forEach((file) => {
      formData.append("images", file as any);
    });

    const response = await productsApi.put(`/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Error al actualizar el producto"
      );
    }
    throw new Error("Error de red o desconocido");
  }
};
