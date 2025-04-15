import { Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "../../components/common/user-profile";
import { useState } from "react";
import mockProducts from "../../data/example-products.json";

type RootStackParamList = {
  ProductCamera: undefined;
  ProductDetails: {
    product: {
      id: number;
      image: string;
      name: string;
      rating: number;
      distance: number;
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
};

type Props = StaticScreenProps<{
  user?: string;
}>;

export function Profile({ route }: Props) {
  const navigation = useNavigation<{ navigate: (name: keyof RootStackParamList, params?: any) => void }>();
  const userName = route.params?.user || "Mi";
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description =
    "Soy una apasionada de la nutrición y el bienestar. Me especializo en crear planes alimenticios personalizados que se adaptan a las necesidades específicas de cada persona. Con más de 5 años de experiencia, he ayudado a cientos de personas a alcanzar sus objetivos de salud y bienestar. Mi enfoque se basa en la educación nutricional y la creación de hábitos saludables sostenibles.";

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          product: item,
          isOwner: true,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
    </TouchableOpacity>
  );

  const handleAddProduct = () => {
    navigation.navigate("ProductCamera");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Ana García</Text>
            <Text style={styles.userEducation}>
              🎓 Licenciatura en Nutrición
            </Text>
            <Text style={styles.userUniversity}>
              Universidad Nacional Autónoma de México
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text
            style={styles.description}
            numberOfLines={showFullDescription ? undefined : 3}
          >
            {description}
          </Text>
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}
            style={styles.readMoreButton}
          >
            <Text style={styles.readMoreText}>
              {showFullDescription ? "Leer menos" : "Leer más"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Mi Inventario</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Ionicons name="add-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.productsGrid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  descriptionContainer: {
    // padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "#f0f0f0",
  },
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
});
