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
import { db } from "../firebase/config";
import { collection, getDocs, doc } from "firebase/firestore";

export default function DefoultPostsScreen() {
  const [posts, setPosts] = useState([]);
  // console.log("route", route.params);

  const getAllPosts = async () => {
    try {
      const allPosts = [];

      const snapshot = await getDocs(collection(db, "posts"));

      snapshot.forEach((doc) => allPosts.push({ ...doc.data(), id: doc.id }));

      setPosts(allPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
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
          const numberOfComments = item.comments.length;

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
                  onPress={() =>
                    navigation.navigate("Коментарі", {
                      postId: item.id,
                      photo: item.photo,
                      comments: item.comments,
                    })
                  }
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={numberOfComments !== 0 ? "#FF6C00" : "#BDBDBD"}
                  />
                  <Text
                    style={{
                      ...styles.commentText,
                      color: numberOfComments !== 0 ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {numberOfComments || 0}
                  </Text>
                </TouchableOpacity>

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
  itemInfoButtonText: {
    fontSize: 16,
  },
});
