import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function DefoultPostsScreen({ route }) {
  const [posts, setPosts] = useState([]);
  // console.log("route", route.params);

  useEffect(() => {
    if (route.params) setPosts([...posts, route.params]);
  }, [route.params]);
  // console.log("posts", posts);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const name = item.name;
          const location = item.locationCoords;
          return (
            <View
              style={{
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{ width: 350, height: 200 }}
              />
              {name ? <Text style={styles.text}>{name}</Text> : ""}
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={() => navigation.navigate("Коментарі")}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />

                  <Text
                    style={{ color: "#BDBDBD", marginLeft: 5, fontSize: 16 }}
                  >
                    0
                  </Text>
                </TouchableOpacity>
                {item.location ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate("Локація", { name, location })
                    }
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </TouchableOpacity>
                ) : (
                  ""
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  postContainer: {
    marginTop: 25,
  },
  locationText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#212121",
    marginLeft: 4,
  },
});
