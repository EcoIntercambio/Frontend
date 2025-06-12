import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { AuthStorage } from '../../util/storage';
import { getUserProfile } from '../../api/backend/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Settings() {
  const navigation = useNavigation();
  const [user, setUser] = useState<any>(null);

  const updateInfoUser = async () => {
    const token = await AuthStorage.getToken();
    if (token) {
      const profile = await getUserProfile(token);
      setUser(profile);
    }
  };

  useEffect(() => {
    updateInfoUser();
  }, []);

  const handleLogout = async () => {
    await AuthStorage.removeToken();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{
              uri: user?.profile?.avatar?.replace('svg', 'png') ||
                'https://i.pinimg.com/564x/6d/c8/ec/6dc8ecaac9d85063dee7d571a6b90984.jpg',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Universidad</Text>
            <Text style={styles.infoValue}>{user?.profile?.university || 'No especificada'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Carrera</Text>
            <Text style={styles.infoValue}>{user?.profile?.degree || 'No especificada'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
