import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SVGApple, SVGFacebook, SVGGoogle } from "../components/svg";

export const Login = () => {
  const navigation = useNavigation();

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Simulate login delay
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      });
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={{
          uri: "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>🌱 Únete al cambio hoy</Text>
          <Text style={styles.subtitle}>
            Crea una cuenta y comienza a intercambiar productos reciclables.
            Recicla, ahorra y ayuda al planeta con cada trueque. ¡Es fácil y
            rápido! ♻️
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.appleButton]}
            onPress={() => handleSocialLogin("Apple")}
          >
            <SVGApple width={24} height={24} color="#FFFFFF" />
            <Text style={styles.appleButtonText}>Continua con Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={() => handleSocialLogin("Google")}
          >
            <SVGGoogle width={24} height={24} color="#000000" />
            <Text style={styles.buttonText}>Continua con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.facebookButton]}
            onPress={() => handleSocialLogin("Facebook")}
          >
            <SVGFacebook width={24} height={24} color="#FFFFFF" />
            <Text style={styles.facebookButtonText}>Continua con Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 20,
  },
  textContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#4A4A4A",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#1A1A1A",
  },
  appleButton: {
    backgroundColor: "#000000",
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFFFFF",
  },
  googleButton: {
    backgroundColor: "#F5F5F5",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  facebookButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFFFFF",
  },
});
