import { Image, StyleSheet, Text, View } from "react-native";


export function UserProfile() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
        }}
      />
      <View>
        <Text>Ana García</Text>
        <Text>🎓 Licenciada en Nutrición</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
            },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    profession: {
        fontSize: 14,
    },
});

