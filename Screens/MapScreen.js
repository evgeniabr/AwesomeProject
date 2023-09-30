import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  if (route.params.location) {
    const { latitude, longitude } = route.params.location;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title={route.params.name}
          />
        </MapView>
      </View>
    );
  }
}
