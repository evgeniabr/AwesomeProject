import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Feather, AntDesign } from "@expo/vector-icons";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  authSignOutUser,
  authUpdateUserAvatar,
  authDeleteUserAvatar,
} from "../redux/auth/authOperations";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { login, avatar, userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      getUserPosts();
    }
  }, [isFocused]);

  const getUserPosts = async () => {
    try {
      const posts = [];

      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));

      setUserPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const pickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      delete result.cancelled;
      return result.assets[0].uri;
    }
  };

  const uploadAvatarToServer = async () => {
    let avatarUrl = await pickAvatar();

    const response = await fetch(avatarUrl);
    const file = await response.blob();
    const uniqueAvatarId = nanoid();

    const storageRef = ref(storage, `avatarImage/${uniqueAvatarId}`);

    await uploadBytes(storageRef, file);
    await getDownloadURL(storageRef).then((url) => {
      avatarUrl = url;
    });

    const snapshotPosts = await getDocs(collection(db, "posts"));

    snapshotPosts.forEach(async (post) => {
      const refPost = doc(db, "posts", post.id);
      const snapshotComments = await getDocs(collection(refPost, "comments"));

      snapshotComments.forEach(async (comment) => {
        const refComment = doc(refPost, "comments", comment.id);

        if (comment.data().userId === userId) {
          await updateDoc(refComment, { avatar: avatarUrl });
        }
      });
    });

    dispatch(authUpdateUserAvatar({ avatarUrl }));
  };

  const clearAvatar = async () => {
    dispatch(authDeleteUserAvatar());

    const snapshotPosts = await getDocs(collection(db, "posts"));

    snapshotPosts.forEach(async (post) => {
      const refPost = doc(db, "posts", post.id);

      const snapshotComments = await getDocs(collection(refPost, "comments"));

      snapshotComments.forEach(async (comment) => {
        const refComment = doc(refPost, "comments", comment.id);

        if (comment.data().userId === userId) {
          await updateDoc(refComment, { avatar: null });
        }
      });
    });
  };
  const onLikePressed = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      const postLikes = postSnapshot.data().likes;
      const updatedLikes = Number(postLikes + 1);

      await updateDoc(postRef, {
        likes: updatedLikes,
      });
      console.log("Document likes updated");
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleLogout = () => {
    dispatch(authSignOutUser());
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("../Images/ImageBg.jpg")}
          style={styles.image}
          resizeMode="cover"
        >
          <StatusBar style="auto" />
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.profileBox}
            keyboardVerticalOffset={32}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.profileLogoutButton}
              onPress={() => handleLogout()}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.profileImg}>
              {avatar && (
                <Image style={styles.avatar} source={{ uri: avatar }} />
              )}
              {avatar ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registerImgButton}
                  onPress={clearAvatar}
                >
                  <AntDesign name="closecircleo" size={25} color="#E8E8E8" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.profileImgButton}
                  onPress={uploadAvatarToServer}
                >
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.profileTittle}>{login}</Text>
            <View>
              <FlatList
                data={userPosts}
                renderItem={({ item }) => (
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
                    {item.name ? (
                      <Text style={styles.text}>{item.name}</Text>
                    ) : (
                      ""
                    )}
                    <View style={styles.btnContainer}>
                      <View style={styles.buttnCont}>
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
                            color={
                              item.comments.length !== 0 ? "#FF6C00" : "#BDBDBD"
                            }
                          />
                          <Text
                            style={{
                              ...styles.commentText,
                              color:
                                item.comments.length !== 0
                                  ? "#212121"
                                  : "#BDBDBD",
                            }}
                          >
                            {item.comments.length || 0}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{ ...styles.button, marginLeft: 24 }}
                          onPress={() => onLikePressed(item.id)}
                        >
                          <AntDesign
                            name="like2"
                            size={22}
                            color={item.likes !== 0 ? "#FF6C00" : "#BDBDBD"}
                          />
                          <Text
                            style={{
                              color: "#BDBDBD",
                              marginLeft: 5,
                              fontSize: 16,
                              color: item.likes !== 0 ? "#212121" : "#BDBDBD",
                            }}
                          >
                            {item.likes}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={() =>
                          navigation.navigate("Локація", {
                            name: item.name,
                            location: item.locationCoords,
                          })
                        }
                      >
                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                        <Text style={styles.locationText}>{item.location}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    // flex: 1,
    // justifyContent: 'flex-end',
    flex: 1,
    paddingTop: 147,
    resizeMode: "cover",
    backgroundColor: "#E8E8E8",
  },

  profileBox: {
    position: "relative",
    flex: 1,
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileLogoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  profileImg: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  registerImgButton: {
    position: "absolute",
    top: 81,
    left: 103,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  profileImgButton: {
    position: "absolute",
    top: 81,
    left: 103,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  profileTittle: {
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
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
  buttnCont: {
    flexDirection: "row",
    alignItems: "center",
  },
});
