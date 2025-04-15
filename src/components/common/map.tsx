import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MarketplaceMap = () => {
  const productLocation = {
    latitude: 40.4168, // latitud de ejemplo (Madrid)
    longitude: -3.7038, // longitud de ejemplo
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={productLocation}
        scrollEnabled={false} // para que no se pueda mover
        zoomEnabled={false} // para que no se pueda hacer zoom
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Marker coordinate={productLocation} title="Ubicación del producto" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200, // altura deseada del mapa
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});

export default MarketplaceMap;
