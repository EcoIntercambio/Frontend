import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SearchInput } from "../../components/common/search";
import { CardProduct } from "../../components/common/card-product";
import LottieView from "lottie-react-native";
import { getProducts } from "../../api/backend/products";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

dayjs.extend(relativeTime);

const PRODUCTS_PER_PAGE = 6;

export const Home = () => {
  const { isLoading, isAuthenticated, userProfile, validateToken } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });

  const fetchProducts = async (pageToLoad: number, reset = false) => {
    try {
      const data = await getProducts({
        page: pageToLoad,
        perPage: PRODUCTS_PER_PAGE,
        status: "published",
        type: filters.type !== 'all' ? filters.type : undefined,
        priceRange: filters.priceRange !== 'all' ? filters.priceRange : undefined,
        sortBy: filters.sortBy
      });

      const items = data?.products || [];

      console.log("Products response", data);

      if (reset) {
        setProducts(items);
      } else {
        setProducts((prev) => [...prev, ...items]);
      }

      setHasMore(items.length === PRODUCTS_PER_PAGE);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(1, true).finally(() => setRefreshing(false));
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;

    setLoadingMore(true);
    fetchProducts(nextPage)
      .then(() => setPage(nextPage))
      .finally(() => setLoadingMore(false));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setPage(1);
    setProducts([]); // Clear existing products before fetching new ones
    fetchProducts(1, true);
  };

  // Se ejecuta cuando el componente se monta
  useEffect(() => {
    validateToken();
  }, []);

  // Se ejecuta cada vez que la pantalla recibe el foco
  useFocusEffect(
    React.useCallback(() => {
      console.log("Home screen focused - updating products");
      setPage(1);
      fetchProducts(1, true);
      return () => {
        // Cleanup function
        console.log("Home screen unfocused");
      };
    }, [filters]) // Se ejecuta también cuando cambian los filtros
  );

  const renderProduct = ({ item }: { item: any }) => {
    // Obtener la primera imagen de item.images (puede ser [] o undefined)
    const firstImage = item.images?.[0] || "";

    // Convertir la fecha created_at a lenguaje natural
    const publishedDate = dayjs(item.created_at).fromNow(); // ej: "hace 2 días"

    console.log("Imagen del producto", firstImage);

    return (
      <CardProduct
        key={item.id}
        id={item.id}
        image={firstImage}
        name={item.name}
        rating={0}
        distance={publishedDate}
        userId={item.user?.id}
        description={item.description}
        location={item.location}
        tags={item.tags}
        type={item.type}
        price={item.price}
        metadata={item.metadata}
        created_at={item.created_at}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.headerText}>
                  Hola {userProfile?.first_name?.split(" ")[0] || "👋"}
                </Text>
                <Text>Nuevos productos te esperan!</Text>
              </View>
              <View style={styles.headerImageContainer}>
                <View style={styles.headerImageBadge}>
                  <Text style={styles.headerImageBadgeText}>5</Text>
                </View>
                <Image
                  source={{
                    uri:
                      userProfile?.profile?.avatar?.replace("svg", "png") ||
                      "https://i.pinimg.com/564x/6d/c8/ec/6dc8ecaac9d85063dee7d571a6b90984.jpg",
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
            <View style={styles.filtersContainer}>
              <View style={styles.filterRow}>
                <TouchableOpacity 
                  style={[styles.filterButton, filters.type === 'all' && styles.filterButtonActive]}
                  onPress={() => handleFilterChange('type', 'all')}
                >
                  <Text style={[styles.filterButtonText, filters.type === 'all' && styles.filterButtonTextActive]}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.filterButton, filters.type === 'product' && styles.filterButtonActive]}
                  onPress={() => handleFilterChange('type', 'product')}
                >
                  <Text style={[styles.filterButtonText, filters.type === 'product' && styles.filterButtonTextActive]}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.filterButton, filters.type === 'service' && styles.filterButtonActive]}
                  onPress={() => handleFilterChange('type', 'service')}
                >
                  <Text style={[styles.filterButtonText, filters.type === 'service' && styles.filterButtonTextActive]}>Servicios</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterRow}>
                <TouchableOpacity 
                  style={[styles.filterButton, filters.sortBy === 'newest' && styles.filterButtonActive]}
                  onPress={() => handleFilterChange('sortBy', 'newest')}
                >
                  <Text style={[styles.filterButtonText, filters.sortBy === 'newest' && styles.filterButtonTextActive]}>Más recientes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.filterButton, filters.sortBy === 'oldest' && styles.filterButtonActive]}
                  onPress={() => handleFilterChange('sortBy', 'oldest')}
                >
                  <Text style={[styles.filterButtonText, filters.sortBy === 'oldest' && styles.filterButtonTextActive]}>Más antiguos</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.productsTitle}>Últimos productos</Text>
          </>
        }
        renderItem={renderProduct}
        contentContainerStyle={styles.productsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#68b2f8"]}
            tintColor="#68b2f8"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <LottieView
              autoPlay
              loop
              source={require("../../assets/lotties/Animation - Ciclist.json")}
              style={styles.lottie}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <LottieView
              autoPlay
              loop
              source={require("../../assets/lotties/Animation - Ciclist.json")}
              style={styles.lottie}
            />
            <Text style={styles.productsLoaderLottie}>
              Estamos trabajando para traerte los{" "}
              <Text style={styles.productsLoaderLottieSpecial}>
                mejores productos
              </Text>
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productsTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  productsContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  lottie: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
  },
  productsLoaderLottie: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  productsLoaderLottieSpecial: {
    color: "#05b06c",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#68b2f8',
    borderColor: '#68b2f8',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
});
