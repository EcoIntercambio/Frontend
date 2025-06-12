import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthStorage } from "../../util/storage";
import { updateUserProfile } from "../../api/backend/auth";
import { isNotEmptyString } from "../../util/validation";

export const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [careerStatus, setCareerStatus] = useState("");
  const [university, setUniversity] = useState("");
  const [profileDescription, setProfileDescription] = useState("");

  const handleUpdateProfile = async () => {
    console.log("Updating profile with:", {
      firstName,
      lastName,
      careerStatus,
      university,
      profileDescription,
    });
    const validation =
      isNotEmptyString(firstName) &&
      isNotEmptyString(lastName) &&
      isNotEmptyString(careerStatus) &&
      isNotEmptyString(university);

    if (validation) {
      const token = await AuthStorage.getToken();
      if (token) {
        const updatedData = {
          first_name: firstName,
          last_name: lastName,
          profile: {
            degree: careerStatus,
            university: university,
            profile_description: profileDescription,
          },
        };
        await updateUserProfile(token, updatedData);
      }

      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Imagen de fondo */}
      <Image
        source={{
          uri: "https://images.pexels.com/photos/3737675/pexels-photo-3737675.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
        style={styles.backgroundImage}
      />

      {/* Overlay para oscurecer un poco la imagen */}
      <View style={styles.overlay} />

      {/* Contenido */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ayúdanos agregando tus datos</Text>
          <Text style={styles.subtitle}>
            Personaliza tu app para tener una experiencia personalizada
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre (s)"
            placeholderTextColor="#9E9E9E"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido (s)"
            placeholderTextColor="#9E9E9E"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Estado de carrera (ej: Estudiante, Egresado, etc.)"
            placeholderTextColor="#9E9E9E"
            value={careerStatus}
            onChangeText={setCareerStatus}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Universidad"
            placeholderTextColor="#9E9E9E"
            value={university}
            onChangeText={setUniversity}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Cuéntanos un poco sobre ti..."
            placeholderTextColor="#9E9E9E"
            value={profileDescription}
            onChangeText={setProfileDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateProfile}
            disabled={!firstName || !lastName || !careerStatus || !university}
          >
            <Text style={styles.updateButtonText}>Continuar</Text>
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
    paddingVertical: 30,
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
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  updateButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
