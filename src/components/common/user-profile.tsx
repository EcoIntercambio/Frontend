import { Image, StyleSheet, Text, View } from "react-native";

export function UserProfile({
  avatar,
  name,
  degree,
  university,
}: {
  avatar?: string;
  name: string;
  degree?: string;
  university?: string;
}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: avatar?.replace("svg", "png") || "https://i.pinimg.com/564x/6d/c8/ec/6dc8ecaac9d85063dee7d571a6b90984.jpg",
        }}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        {degree && <Text style={styles.profession}>{degree}</Text>}
        {university && <Text style={styles.profession}>{university}</Text>}
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
    color: "#666",
  },
});
