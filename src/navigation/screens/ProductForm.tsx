import { Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { CATEGORIES } from "../../data/categories";

const TRADE_TYPES = [
  { id: "trade", name: "Trueque" },
  { id: "sell", name: "Venta" },
  { id: "both", name: "Ambos" },
];

type Props = StaticScreenProps<{
  images?: string[];
  productId?: number;
  name?: string;
  description?: string;
  location?: string;
  categories?: string[];
  tradeType?: string;
  price?: string;
}>;

export function ProductForm({ route }: Props) {
  const navigation = useNavigation();
  const { 
    images = [], 
    productId,
    name: initialName = "",
    description: initialDescription = "",
    location: initialLocation = "",
    categories: initialCategories = [],
    tradeType: initialTradeType = "trade",
    price: initialPrice = "",
  } = route.params;
  
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [tradeType, setTradeType] = useState(initialTradeType);
  const [price, setPrice] = useState(initialPrice);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const INITIAL_CATEGORIES_COUNT = 8;

  const displayedCategories = showAllCategories 
    ? CATEGORIES 
    : CATEGORIES.slice(0, INITIAL_CATEGORIES_COUNT);

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 4) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePublish = () => {
    if (!name || !description || !location || selectedCategories.length === 0) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    if ((tradeType === "sell" || tradeType === "both") && !price) {
      alert("Por favor ingresa el precio del producto");
      return;
    }

    // TODO: Implement product publishing/updating logic
    console.log({
      productId,
      name,
      description,
      location,
      categories: selectedCategories,
      tradeType,
      price: tradeType !== "trade" ? price : undefined,
      images,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>
            {productId ? "Editar Producto" : "Nuevo Producto"}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imagePreview}>
            <FlatList
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.previewImage} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre del Producto</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ej: Maceta de cerámica"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe tu producto..."
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ubicación</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Ej: Ciudad de México, CDMX"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Categorías (máx. 4)</Text>
              <View style={styles.categoriesGrid}>
                {displayedCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategories.includes(category.id) && styles.categoryButtonSelected,
                    ]}
                    onPress={() => handleCategoryPress(category.id)}
                  >
                    <Ionicons
                      name={category.icon}
                      size={20}
                      color={selectedCategories.includes(category.id) ? "#fff" : "#666"}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategories.includes(category.id) && styles.categoryTextSelected,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {CATEGORIES.length > INITIAL_CATEGORIES_COUNT && (
                <TouchableOpacity
                  style={styles.showMoreButton}
                  onPress={() => setShowAllCategories(!showAllCategories)}
                >
                  <Text style={styles.showMoreText}>
                    {showAllCategories ? "Ver menos" : "Ver más"} categorías
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Intercambio</Text>
              <View style={styles.tradeTypeContainer}>
                {TRADE_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.tradeTypeButton,
                      tradeType === type.id && styles.tradeTypeButtonSelected,
                    ]}
                    onPress={() => setTradeType(type.id)}
                  >
                    <Text
                      style={[
                        styles.tradeTypeText,
                        tradeType === type.id && styles.tradeTypeTextSelected,
                      ]}
                    >
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {(tradeType === "sell" || tradeType === "both") && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio (MXN)</Text>
                <TextInput
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Ej: 500"
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
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
  },
  imagePreview: {
    height: 100,
    marginVertical: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 5,
  },
  categoryButtonSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  tradeTypeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  tradeTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  tradeTypeButtonSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  tradeTypeText: {
    fontSize: 14,
    color: "#666",
  },
  tradeTypeTextSelected: {
    color: "#fff",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  publishButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  showMoreButton: {
    marginTop: 10,
    padding: 8,
    alignItems: "center",
  },
  showMoreText: {
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline",
  },
}); 