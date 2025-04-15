import { Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { SVGPicture } from "../../components/svg";

type Props = StaticScreenProps<{
  productId?: number;
  existingImages?: string[];
  productData?: {
    name: string;
    description: string;
    location: string;
    categories: string[];
    tradeType: string;
  };
}>;

export function ProductCamera({ route }: Props) {
  const navigation = useNavigation();
  const params = route?.params || {};
  const { productId, existingImages = [], productData } = params;
  const [images, setImages] = useState<string[]>(existingImages);

  useEffect(() => {
    if (productId && existingImages.length > 0) {
      setImages(existingImages);
    }
  }, [productId, existingImages]);

  const handleTakePhoto = async () => {
    if (images.length >= 6) {
      alert("Has alcanzado el límite máximo de 6 imágenes");
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos de cámara para tomar fotos");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handlePickImage = async () => {
    if (images.length >= 6) {
      alert("Has alcanzado el límite máximo de 6 imágenes");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos de galería para seleccionar fotos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const remainingSlots = 6 - images.length;
      const newImages = result.assets.slice(0, remainingSlots).map((asset) => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const handleContinue = () => {
    if (images.length === 0) {
      alert("Por favor, selecciona al menos una foto");
      return;
    }

    if (productId && productData) {
      navigation.navigate("ProductForm", {
        productId,
        images,
        ...productData,
      });
    } else {
      navigation.navigate("ProductForm", { images });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {productId ? "Editar Imágenes" : "Nuevo Producto"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageGrid}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setImages(images.filter((_, i) => i !== index))}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 6 && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handlePickImage}
            >
              <SVGPicture width={24} height={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imageContainer: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
  },
  addButton: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
