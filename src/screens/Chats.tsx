import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUserContacts } from "../api/backend/contacts"; // Asegúrate de que la ruta sea correcta
import { AuthStorage } from "../util/storage";
import { getUserByUid } from "../api/backend/auth";

type RootStackParamList = {
  Chat: { userId: string; productId: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Chat">;

type ChatContact = {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
};

export function Chats() {
  const navigation = useNavigation<NavigationProp>();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileImages, setProfileImages] = useState<Record<string, string>>({});

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = await AuthStorage.getToken();
      if (!token) throw new Error("No token found");
      const data = await getUserContacts(token);
      setContacts(data);
      
      // Fetch profile images for each contact
      const images: Record<string, string> = {};
      for (const contact of data) {
        const imageUrl = await getProfileImage(contact);
        images[contact.id] = imageUrl;
      }
      setProfileImages(images);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );

  const getProfileImage = async (contact: ChatContact) => {
    const token = await AuthStorage.getToken();
    if (!token)
      return `https://api.dicebear.com/7.x/initials/png?seed=${contact.first_name}%20${contact.last_name}`;
    const uuid = contact?.id;
    if (uuid) {
      const user = await getUserByUid(uuid, token);
      if (user?.profile?.avatar) {
        // Convert DiceBear SVG URL to PNG by replacing /svg? with /png?
        const imagen = user.profile.avatar.replace('/svg?', '/png?');
        console.log("Imagen: ", imagen);
        return imagen;
      }
      return `https://api.dicebear.com/7.x/initials/png?seed=${contact.first_name}%20${contact.last_name}`;
    }
    return `https://api.dicebear.com/7.x/initials/png?seed=${contact.first_name}%20${contact.last_name}`;
  };

  const renderChatItem = ({ item }: { item: ChatContact }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("Chat", { userId: item.id, productId: 1 })
      }
    >
      <Image
        source={{
          uri: profileImages[item.id] || `https://api.dicebear.com/7.x/initials/png?seed=${item.first_name}%20${item.last_name}`,
        }}
        style={styles.profileImage}
      />
      <View style={styles.messageContent}>
        <Text style={styles.userName}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.timestamp}>
          Contacto desde {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensajes</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Ofertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Solicitudes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : contacts.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
          Aún no hay mensajes
        </Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  tabActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#000",
  },
  tabText: {
    color: "#666",
  },
  tabTextActive: {
    color: "#fff",
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
});
