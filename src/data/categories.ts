import { Ionicons } from "@expo/vector-icons";

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const CATEGORIES: Category[] = [
  { id: "plant", name: "Planta", icon: "leaf" },
  { id: "electronic", name: "Electrónico", icon: "phone-portrait" },
  { id: "clothing", name: "Ropa", icon: "shirt" },
  { id: "book", name: "Libro", icon: "book" },
  { id: "furniture", name: "Mueble", icon: "bed" },
  { id: "tool", name: "Herramienta", icon: "hammer" },
  { id: "art", name: "Arte", icon: "color-palette" },
  { id: "recycled", name: "Reciclado", icon: "refresh" },
  { id: "handmade", name: "Artesanal", icon: "construct" },
  { id: "kitchen", name: "Cocina", icon: "restaurant" },
  { id: "garden", name: "Jardín", icon: "flower" },
  { id: "sport", name: "Deportes", icon: "basketball" },
  { id: "music", name: "Música", icon: "musical-notes" },
  { id: "pet", name: "Mascotas", icon: "paw" },
  { id: "other", name: "Otro", icon: "apps" },
]; 