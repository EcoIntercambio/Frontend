import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "../../components/common/user-profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserByUid } from "../../api/backend/auth";
import { AuthStorage } from "../../util/storage";
import {
  createChat,
  getChatMessages,
  sendMessage,
  ChatMessage,
} from "../../api/backend/chat";

type ChatRouteParams = {
  userId: string;
  userName: string;
  productId?: number;
  productName?: string;
  productImage?: string;
  productDescription?: string;
};

const ProductCard = ({
  name,
  image,
  description,
}: {
  name: string;
  image: string;
  description: string;
}) => {
  const shortDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  return (
    <View style={styles.productCard}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productDescription}>{shortDescription}</Text>
      </View>
    </View>
  );
};

export const Chat = () => {
  const route = useRoute<RouteProp<{ params: ChatRouteParams }, "params">>();
  const {
    userId,
    userName,
    productId,
    productName,
    productImage,
    productDescription,
  } = route.params;
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const token = await AuthStorage.getToken();
        if (!token) throw new Error("No token found");

        // Get user info
        const userData = await getUserByUid(userId, token);
        setUserInfo(userData);

        console.log("userData", userData);

        // Create or get existing chat
        const chatResponse = await createChat(token, userData?.id);
        setChatId(chatResponse?.chat_id);

        console.log("chatResponse", chatResponse);

        // Get messages
        const messagesResponse = await getChatMessages(
          token,
          chatResponse?.chat_id
        );
        setMessages(messagesResponse.messages.reverse()); // Reverse to show oldest first
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, [userId]);

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !selectedImage) || !chatId) return;

    try {
      setSending(true);
      const token = await AuthStorage.getToken();
      if (!token) throw new Error("No token found");

      // Send message
      await sendMessage(token, chatId, newMessage);

      // Refresh messages
      const messagesResponse = await getChatMessages(token, chatId);
      setMessages(messagesResponse.messages.reverse());

      setNewMessage("");
      setSelectedImage(null);

      // Scroll to the new message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleImagePick = () => {
    // TODO: Implement image picker functionality
    console.log("Image picker would be implemented here");
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.is_own_message ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      {item.message && <Text style={styles.messageText}>{item.message}</Text>}
      <Text style={styles.timestamp}>
        {new Date(item.sent_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <UserProfile
            name={userInfo?.first_name || userName}
            avatar={userInfo?.profile?.avatar}
            degree={userInfo?.profile?.degree}
            university={userInfo?.profile?.university}
          />
        </View>

        <View style={styles.productCardContainer}>
          {productId && productName && productImage && productDescription && (
            <ProductCard
              name={productName}
              image={productImage}
              description={productDescription}
            />
          )}
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messagesList}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.messagesListContent}
          onEndReachedThreshold={0.5}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imageButton}
            >
              <Ionicons name="image-outline" size={24} color="#000" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Escribe un mensaje..."
              multiline
              editable={!sending}
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              style={[styles.sendButton, sending && styles.sendButtonDisabled]}
              disabled={sending}
            >
              <Ionicons
                name="send"
                size={24}
                color={sending ? "#ccc" : "#000"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  messagesList: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesListContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#a1dcff",
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 12,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 12,
    color: "#070d1f",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputSection: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    backgroundColor: "#fff",
  },
  imageButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
  },
  productCardContainer: {
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
});
