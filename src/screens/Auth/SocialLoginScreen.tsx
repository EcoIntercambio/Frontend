import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SVGApple, SVGFacebook, SVGGoogle } from "../../components/svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthStorage } from "../../util/storage";
import { getUserProfile } from "../../api/backend/auth";

export const SocialLoginScreen = () => {
  const navigation = useNavigation();
  const shakeAnimation = new Animated.Value(0);

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    startShakeAnimation();
  }, []);

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login with backend
    console.log(`Login with ${provider}`);
    // Simulate successful login
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTabs" }],
    });
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
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
          {/* <Text style={styles.title}>🌱 Inicia sesión con redes sociales</Text> */}
          {/* <Text style={styles.subtitle}>
            Elige tu método preferido para iniciar sesión
          </Text> */}
          <Animated.View
            style={[
              styles.warningCard,
              {
                transform: [
                  {
                    translateX: shakeAnimation,
                  },
                ],
              },
            ]}
          >
            <Ionicons
              name="warning-outline"
              size={20}
              color="#FFA726"
              style={styles.warningIcon}
            />
            <Text style={styles.warningCardText}>
              ¡Pronto podrás registrarte con tus redes sociales! 😊
            </Text>
          </Animated.View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.appleButton, styles.disabledButton]}
            disabled={true}
            onPress={() => handleSocialLogin("Apple")}
          >
            <SVGApple width={24} height={24} color="#FFFFFF" />
            <Text style={styles.appleButtonText}>Continua con Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.googleButton, styles.disabledButton]}
            disabled={true}
            onPress={() => handleSocialLogin("Google")}
          >
            <SVGGoogle width={24} height={24} color="#000000" />
            <Text style={styles.buttonText}>Continua con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.facebookButton,
              styles.disabledButton,
            ]}
            disabled={true}
            onPress={() => handleSocialLogin("Facebook")}
          >
            <SVGFacebook width={24} height={24} color="#FFFFFF" />
            <Text style={styles.facebookButtonText}>Continua con Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleNavigateToLogin}
          >
            <Text style={styles.backButtonText}>
              Volver al inicio de sesión
            </Text>
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
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 20,
  },
  textContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
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
  backButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  underDevelopmentText: {
    fontSize: 12,
    color: "#FF9800",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
  warningCard: {
    backgroundColor: "rgba(255, 167, 38, 0.15)",
    padding: 16,
    borderRadius: 15,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 167, 38, 0.3)",
  },
  warningIcon: {
    marginRight: 12,
  },
  warningCardText: {
    fontSize: 14,
    color: "#FF9800",
    flex: 1,
    textAlign: "left",
    fontWeight: "600",
  },
});
