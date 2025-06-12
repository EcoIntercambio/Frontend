import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SVGArrowRight, SVGEye, SVGEyeOff } from "../../components/svg";
import { loginUser, getUserProfile } from "../../api/backend/auth";
import { AuthStorage } from "../../util/storage";
import { isNotEmptyString } from "../../util/validation";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateProfile = (profile: any) => {
    return (
      isNotEmptyString(profile.first_name) &&
      isNotEmptyString(profile.last_name) &&
      isNotEmptyString(profile.profile?.degree) &&
      isNotEmptyString(profile.profile?.university) &&
      isNotEmptyString(profile.profile?.profile_description)
    );
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginUser({ email, password });
      
      if (data?.access_token) {
        await AuthStorage.saveToken(data.access_token);
        
        // Obtener el perfil del usuario para validar si está completo
        const userProfile = await getUserProfile(data.access_token);
        
        if (validateProfile(userProfile)) {
          // Si el perfil está completo, redirigir al home
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeTabs" }],
          });
        } else {
          // Si el perfil está incompleto, redirigir a la pantalla de actualización
          navigation.navigate("UserName");
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  const handleNavigateToSocialLogin = () => {
    navigation.navigate("SocialLogin");
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>🌱 Bienvenido a EcoIntercambio</Text>
              <Text style={styles.subtitle}>
                Inicia sesión para comenzar a intercambiar productos reciclables
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666666"
                editable={!isLoading}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#666666"
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <SVGEyeOff width={20} height={20} color={["#666666", "#e1eaee"]} />
                  ) : (
                    <SVGEye width={20} height={20} color={["#666666", "#e1eaee"]} />
                  )}
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialLoginButton, isLoading && styles.disabledButton]}
                onPress={handleNavigateToSocialLogin}
                disabled={isLoading}
              >
                <Text style={styles.socialLoginButtonText}>Iniciar sesión con redes sociales</Text>
                <SVGArrowRight width={20} height={20} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={handleNavigateToRegister} disabled={isLoading}>
                  <Text style={styles.registerLink}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
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
  formContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#000000",
  },
  loginButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  socialLoginButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  socialLoginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    color: "#4A4A4A",
    fontSize: 14,
  },
  registerLink: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
  },
  eyeIcon: {
    padding: 8,
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 