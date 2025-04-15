import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Chat: { userId: string; productId: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

type ChatMessage = {
  id: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
};

const mockChats: ChatMessage[] = [
  {
    id: '1',
    userName: 'Sofía Ramírez',
    userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: 'Último mensaje enviado',
    timestamp: '6:31 pm 22 de Marzo del 2025'
  },
  {
    id: '2',
    userName: 'Daniel Muñoz',
    userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastMessage: 'Último mensaje enviado',
    timestamp: '6:31 pm 22 de Marzo del 2025'
  },
  // Add more mock data as needed
];

export function Chats() {
  const navigation = useNavigation<NavigationProp>();

  const renderChatItem = ({ item }: { item: ChatMessage }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { userId: item.id, productId: 1 })}
    >
      <Image source={{ uri: item.userImage }} style={styles.profileImage} />
      <View style={styles.messageContent}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
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
      <FlatList
        data={mockChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
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
    backgroundColor: '#000',
  },
  tabText: {
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
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
    fontWeight: '500',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
}); 