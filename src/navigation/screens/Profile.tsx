import { Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { AuthStorage } from "../../util/storage";
import { getUserProfile } from "../../api/backend/auth";
import { getUserProducts } from "../../api/backend/products"; // <-- importa la función que definimos antes
import React from "react";

type RootStackParamList = {
  ProductCamera: undefined;
  ProductDetails: {
    product: {
      id: number;
      image: string;
      name: string;
      rating: number;
      distance: number;
      description: string;
      created_at: string;
      user: {
        id: string;
        first_name: string;
        last_name: string;
      };
    };
    isOwner?: boolean;
  };
};

type Product = {
  id: number;
  image: string;
  name: string;
  rating: number;
  distance: number;
  description: string;
  created_at: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    uid: string;
  };
};

type Props = StaticScreenProps<{
  user?: string;
}>;

export function Profile({ route }: Props) {
  const navigation = useNavigation<{
    navigate: (name: keyof RootStackParamList, params?: any) => void;
  }>();

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const updateInfoUser = async () => {
    setLoadingProducts(true); // Aseguramos que se muestre el estado de carga
    const token = await AuthStorage.getToken();
    if (token) {
      try {
        const profile = await getUserProfile(token);
        setUser(profile);

        // Cargar productos del usuario usando su ID
        const productsResponse = await getUserProducts({
          userId: profile.id,
          page: 1,
          perPage: 50,
          status: "published",
        });

        console.log("Products response:", JSON.stringify(productsResponse, null, 2));

        // Mapea los productos al tipo Product para FlatList
        const mappedProducts = productsResponse.products.map((p: any) => {
          console.log("Product data:", JSON.stringify(p, null, 2));
          console.log("Product user data:", JSON.stringify(p.user, null, 2));
          return {
            id: p.id,
            image: p.images[0] || "",
            name: p.name,
            rating: 0,
            distance: 0,
            description: p.description || "",
            created_at: p.created_at || p.createdAt || new Date().toISOString(),
            user: {
              id: p.user?.id || profile.id,
              first_name: p.user?.first_name || profile.first_name,
              last_name: p.user?.last_name || profile.last_name,
              uid: p.user?.uid || p.user?.id || profile.id
            }
          };
        });

        console.log("Mapped products:", JSON.stringify(mappedProducts, null, 2));

        setProducts(mappedProducts);
      } catch (error) {
        console.warn("Error cargando datos del usuario", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    updateInfoUser();
  }, []);

  // Se ejecuta cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused - updating products");
      updateInfoUser();
      return () => {
        // Cleanup function
        console.log("Screen unfocused");
      };
    }, [])
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          product: item,
          isOwner: true,
          userId: item?.user
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
    </TouchableOpacity>
  );

  const handleAddProduct = () => {
    navigation.navigate("ProductCamera");
  };

  if (loadingProducts) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Cargando productos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                user?.profile?.avatar?.replace("svg", "png") ||
                "https://i.pinimg.com/564x/6d/c8/ec/6dc8ecaac9d85063dee7d571a6b90984.jpg",
            }}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.first_name}</Text>
            <Text style={styles.userEducation}>
              🎓 {user?.profile?.degree || "Sin definir"}
            </Text>
            <Text style={styles.userUniversity}>
              {user?.profile.university || "Sin definir"}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text
            style={styles.description}
            numberOfLines={showFullDescription ? undefined : 3}
          >
            {user?.profile?.profile_description ||
              "Agrega tu biografía y completa tu perfil para que los demás puedan conocerte mejor."}
          </Text>
          {user?.profile?.profile_description && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? "Leer menos" : "Leer más"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Mi Inventario</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Ionicons name="add-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {products.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>
            Empieza subiendo tu primer producto 🎉
          </Text>
          <TouchableOpacity
            style={styles.bigAddButton}
            onPress={handleAddProduct}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={80} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.productsGrid}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEducation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  userUniversity: {
    fontSize: 14,
    color: "#666",
  },
  descriptionContainer: {},
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
  },
  productsGrid: {
    padding: 10,
  },
  productItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noProductsText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  bigAddButton: {
    // para que el botón tenga tamaño grande y sea tocable
    // fill: "#000",
  },
});
