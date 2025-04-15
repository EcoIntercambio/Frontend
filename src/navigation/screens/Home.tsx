import { Button, Text } from "@react-navigation/elements";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SVGBurguer, SVGFilter, SVGSearch } from "../../components/svg";
import { SearchInput } from "../../components/common/search";
import { CardProduct } from "../../components/common/card-product";
import React from "react";
import products from "../../data/example-products.json";
import LottieView from "lottie-react-native";

export function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // Aquí implementarás la lógica para hacer la nueva llamada a la API
    // Por ejemplo:
    // fetchNewProducts().then(() => {
    //   setRefreshing(false);
    // });

    // Por ahora solo simulamos el tiempo de carga
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#68b2f8"]}
            tintColor="#68b2f8"
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <SVGBurguer />
          </TouchableOpacity>

          <View style={styles.headerImageContainer}>
            <View style={styles.headerImageBadge}>
              <Text style={styles.headerImageBadgeText}>5</Text>
            </View>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
              }}
              width={50}
              height={50}
              style={styles.headerImage}
            />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <SearchInput />
        </View>

        <View style={styles.productsSection}>
          {!products || products?.length === 0 ? (
            <>
              <LottieView
                autoPlay
                loop
                source={require("../../assets/lotties/Animation - Ciclist.json")}
                style={styles.lottie}
              />
              <View style={styles.productsContainer}>
                <Text style={styles.productsLoaderLottie}>
                  Estamos trabajando para traerte los{" "}
                  <Text style={styles.productsLoaderLottieSpecial}>
                    mejores productos
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.productsTitle}>Ultimos Productos</Text>
              <View style={styles.productsContainer}>
                {products.map((product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    rating={product.rating}
                    distance={product.distance}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: "jane" }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  headerImageContainer: {
    borderRadius: 50,
    // overflow: "hidden",
    backgroundColor: "#68b2f8",
    padding: 2,
    position: "relative",
  },

  headerImageBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#68b2f8",
    borderRadius: 50,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  headerImageBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  headerButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: "#000",
    opacity: 0.5,
  },

  // Section Search
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  // Section Products

  productsSection: {
    paddingVertical: 20,
  },

  productsTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
  },

  productsContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },

  scrollView: {
    flex: 1,
  },

  // Lottie

  lottie: {
    width: 400,
    height: 300,
  },

  productsLoaderLottie: {
    fontSize: 16,
    paddingHorizontal: 20,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
  },

  productsLoaderLottieSpecial: {
    color: "#05b06c",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
});
