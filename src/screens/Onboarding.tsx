import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SVGArrowLeft } from "../components/svg";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../hooks/useAuth";

const { width } = Dimensions.get("window");

export const Onboarding = () => {
  const navigation = useNavigation();
  const { isLoading, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      });
    }
  }, [isAuthenticated]);

  return (
    <ImageBackground
      source={require("../assets/backgrounds/mesh-gradient.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>EcoIntercambio</Text>

          <View style={styles.imagesContainer}>
            {/* Image placeholders */}
            <View style={styles.leftImageContainer}>
              <LinearGradient
                colors={["#FFC0CB", "#f75d84"]}
                style={styles.imagePlaceholder}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Image
                  source={require("../assets/img/women_01.png")}
                  style={{ width: "90%", height: "90%" }}
                />
              </LinearGradient>

              <View style={styles.tag}>
                <Text style={styles.tagText}>🌱 Recicla</Text>
              </View>

              <View style={styles.tag_2}>
                <Text style={styles.tagText}>🌿 Reutiliza</Text>
              </View>
            </View>

            <View style={styles.rightImageContainer}>
              <LinearGradient
                colors={["#dee2ff", "#7181fe"]}
                style={styles.imagePlaceholder}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Image
                  source={require("../assets/img/women_02.png")}
                  style={{ width: "100%", height: "100%" }}
                />
              </LinearGradient>

              <View style={styles.tag}>
                <Text style={styles.tagText}>💬 Chats</Text>
              </View>

              <View style={styles.tag_3}>
                <Text style={styles.tagText}>😀 Comunidad</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.textContainer}>
              <Text style={styles.mainText}>
                🌱 Intercambia, Reutiliza y transforma el mundo
              </Text>
              <Text style={styles.subText}>
                Crea un nuevo hábito para cuidar el planeta. Intercambia lo que
                ya no usas y dale una segunda vida a tus productos 🌿
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Únete ahora</Text>
              <SVGArrowLeft color="#000010" width={15} height={15} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white overlay
  },
  content: {
    flex: 1,
    // padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#271136",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  imagesContainer: {
    flex: 1,
    position: "relative",
    marginBottom: 40,
  },
  leftImageContainer: {
    position: "absolute",
    left: 20,
    top: 20,
    width: width * 0.45,
    aspectRatio: 0.8,
    transform: [{ translateX: 10 }],
  },
  rightImageContainer: {
    position: "absolute",
    right: 20,
    top: 100,
    width: width * 0.45,
    aspectRatio: 0.8,
    transform: [{ translateX: -10 }],
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    backgroundColor: "#FFC0CB", // Pink placeholder
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tag: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    top: -10,
    right: -10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tag_2: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    bottom: -12,
    left: -18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tag_3: {
    position: "absolute",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    bottom: -28,
    right: -18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  communityTag: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -15 }],
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  bottomContent: {
    marginTop: "auto",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textContainer: {
    marginBottom: 30,
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000010",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 32,
  },
  subText: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
    // lineHeight: 20,
  },
  button: {
    backgroundColor: "#FFE082",
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    gap: 10,
  },
  buttonText: {
    color: "#000010",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
