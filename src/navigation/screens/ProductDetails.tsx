import { Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  SVGPlant,
  SVGEco,
  SVGDecoration,
  SVGRecycle,
  SVGLocation,
  SVGStar,
  SVGStarMiddle,
} from "../../components/svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfile } from "../../components/common/user-profile";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { getUserByUid } from "../../api/backend/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Chat: {
    userId: string;
    userName: string;
    productId: number;
    productName: string;
    productImage: string;
    productDescription: string;
  };
  ProductCamera: {
    productId: number;
    existingImages: string[];
    productData: {
      name: string;
      description: string;
      location: string;
      categories: string[];
      tradeType: string;
    };
  };
};

type Props = StaticScreenProps<{
  product: {
    id: number;
    images?: string[];
    image?: string;
    name: string;
    rating: number;
    distance: string;
    userId: string;
    description?: string;
    location?: string;
    tags?: string[];
    type?: string;
    price?: number | null;
    metadata?: any;
    created_at?: string;
  };
  isOwner?: boolean;
}>;

export function ProductDetails({ route }: Props) {
  const { product, isOwner } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    React.useState(false);
  const [ownerInfo, setOwnerInfo] = React.useState<any>(null);

  console.log("Product details", product);
  console.log("isOwner", isOwner);

  React.useEffect(() => {
    const fetchOwnerInfo = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const ownerData = await getUserByUid(product.userId, token || undefined);
      setOwnerInfo(ownerData);

      console.log("ownerData", ownerData);
    };
    fetchOwnerInfo();
  }, [product.userId]);

  const calculateNumberOfStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return <SVGStar key={index} width={13} height={13} />;
      } else if (index === fullStars && hasHalfStar) {
        return <SVGStarMiddle key={index} width={13} height={13} />;
      } else {
        return <SVGStar key={index} width={13} height={13} color="#ccc" />;
      }
    });
  };

  const handleOfferPress = () => {
    navigation.navigate("Chat", {
      userId: product.userId,
      userName: ownerInfo?.first_name || "Usuario",
      productId: product.id,
      productName: product.name,
      productImage: product.image || "",
      productDescription: product.description || "",
    });
  };

  const handleEditPress = () => {
    navigation.navigate("ProductCamera", {
      productId: product.id,
      existingImages: [product.image || ""],
      productData: {
        name: product.name,
        description: product.description || "",
        location: product.location || "",
        categories: product.tags || [],
        tradeType: product.type || "trade",
      },
    });
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Eliminar producto",
      "¿Estás seguro de que quieres eliminar este producto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            console.log("Delete product:", product.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                product.images?.[0] ||
                product.image ||
                "https://i.pinimg.com/564x/6d/c8/ec/6dc8ecaac9d85063dee7d571a6b90984.jpg",
            }}
            style={styles.image}
          />
          <View style={styles.overlay} />
          {isOwner && (
            <View style={styles.ownerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEditPress}
              >
                <Ionicons name="create-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeletePress}
              >
                <Ionicons name="trash-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingContainer}>
            {calculateNumberOfStars(product.rating)}
            <Text style={styles.rating}>{product.rating}</Text>
          </View>

          <View style={styles.userProfileContainer}>
            {isOwner ? (
              <></>
            ) : (
              <UserProfile
                avatar={ownerInfo?.profile?.avatar}
                name={`${ownerInfo?.first_name} ${ownerInfo?.last_name}`}
                degree={ownerInfo?.profile?.degree}
                university={ownerInfo?.profile?.university}
              />
            )}
          </View>

          <View style={styles.locationContainer}>
            <SVGLocation color="#666" />
            <Text style={styles.location}>
              {product.location || "Ubicación no especificada"}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {product.description || "No hay descripción disponible"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {!isOwner && (
        <TouchableOpacity style={styles.offerButton} onPress={handleOfferPress}>
          <Text style={styles.offerButtonText}>Ofrecer</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  ownerActions: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    marginTop: -20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  rating: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  location: {
    fontSize: 16,
    color: "#666",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  categoryItem: {
    alignItems: "center",
    gap: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 10,
  },
  readMoreText: {
    color: "#666",
    fontSize: 14,
  },
  offerButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    margin: 20,
  },
  offerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  userProfileContainer: {
    marginVertical: 10,
  },
});
