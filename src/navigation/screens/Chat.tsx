import React, { useState, useRef } from "react";
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
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserProfile } from "../../components/common/user-profile";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatRouteParams = {
  userId: string;
  userName: string;
  productId?: number;
  productName?: string;
  productImage?: string;
  productDescription?: string;
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  imageUrl?: string;
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedImage) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        senderId: "currentUser",
        timestamp: new Date(),
        imageUrl: selectedImage || undefined,
      };

      setMessages([...messages, message]);
      setNewMessage("");
      setSelectedImage(null);

      // Scroll to the new message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleImagePick = () => {
    // TODO: Implement image picker functionality
    // This is a placeholder for the actual image picker implementation
    console.log("Image picker would be implemented here");
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === "currentUser"
          ? styles.sentMessage
          : styles.receivedMessage,
      ]}
    >
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />
      )}
      {item.text && <Text style={styles.messageText}>{item.text}</Text>}
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <UserProfile />
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
          keyExtractor={(item) => item.id}
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
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButton}
            >
              <Ionicons name="send" size={24} color="#000" />
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },

  // message
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
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  // input message

  inputSection: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 16,
    // borderTopWidth: 1,
    // borderTopColor: "#e0e0e0",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    backgroundColor: "#fff",
  },
  imageButton: {
    // padding: 8,
  },
  sendButton: {
    // padding: 8,
  },

  // product card

  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    padding: 12,
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
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
