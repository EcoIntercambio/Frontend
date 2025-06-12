import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SVGStar } from "../svg";

interface CardProductProps {
  id: number;
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
}

export function CardProduct({
  id,
  image,
  name,
  rating,
  distance,
  userId,
  description,
  location,
  tags,
  type,
  price,
  metadata,
  created_at,
}: CardProductProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDetails", {
      product: {
        id,
        image,
        name,
        rating,
        distance,
        userId,
        description,
        location,
        tags,
        type,
        price,
        metadata,
        created_at,
      },
    });
  };

  console.log("Imagen que llega", image);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri:
            image ||
            "https://images.pexels.com/photos/8984847/pexels-photo-8984847.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        }}
        height={240}
        style={styles.image}
        // resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <View style={styles.productNameContainer}>
          <Text style={styles.productName}>{name}</Text>
          <View style={styles.productRatingContainer}>
            <SVGStar width={13} height={13} />
            <Text style={styles.productRating}>{rating}</Text>
          </View>
        </View>
        <Text style={styles.productDistance}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },

  image: {
    // width: "100%",
    // height: 230,
    borderRadius: 10,
    objectFit: "cover",
  },

  productInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },

  productNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  productRating: {
    fontSize: 14,
    color: "#666",
  },

  productDistance: {
    fontSize: 14,
    color: "#666",
  },

  productRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
