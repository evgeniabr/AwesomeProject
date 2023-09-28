import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function CreatePostsScreen() {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isKeyboardShown, setisKeyboardShown] = useState(false);
  const [locationCoords, setLocationCoords] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const navigation = useNavigation();
  const keyBoardHide = () => {
    Keyboard.dismiss();
    setisKeyboardShown(false);
  };
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);

    let location = await Location.getCurrentPositionAsync({});
    console.log("latitude", location.coords.latitude);
    console.log("longitude", location.coords.longitude);
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocationCoords(coords);
  };

  const onSubmit = () => {
    keyBoardHide();
    if (photo) {
      navigation.navigate("DefoultPostsScreen", {
        photo,
        name,
        location,
        locationCoords,
      });
      setPhoto("");
      setName("");
      setLocation("");
    }
  };

  const deletePost = () => {
    setPhoto("");
    setName("");
    setLocation("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? -103 : -103}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Camera style={styles.camera} ref={setCamera}>
              {photo && (
                <View style={styles.photo}>
                  <Image
                    style={{ width: 343, height: 240, borderRadius: 8 }}
                    source={{ uri: photo }}
                  />
                </View>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  ...styles.snapContainer,
                  backgroundColor: photo ? "#FFFfff4D" : "#FFF",
                }}
                onPress={takePhoto}
              >
                <FontAwesome
                  name="camera"
                  size={24}
                  color={photo ? "#FFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </Camera>
          </View>
          {photo ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <Text style={styles.text}>Завантажте фото</Text>
          )}
          <TextInput
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            style={{ ...styles.textInput, paddingLeft: 16 }}
            onFocus={() => setisKeyboardShown(true)}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Місцевість..."
            style={{ ...styles.textInput, paddingLeft: 36 }}
            placeholderTextColor="#BDBDBD"
            onFocus={() => setisKeyboardShown(true)}
            value={location}
            onChangeText={setLocation}
          />
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={styles.mapIcon}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              ...styles.btn,
              backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
            }}
            onPress={onSubmit}
          >
            <Text
              style={{ ...styles.btnText, color: photo ? "#FFF" : "#BDBDBD" }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.deleteBtn}
            onPress={deletePost}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
  },
  camera: {
    position: "relative",
    width: 343,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 8,
  },
  snapContainer: {
    position: "absolute",
    left: 142,
    top: 90,
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  textInput: {
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  mapIcon: {
    position: "absolute",
    top: 409,
    left: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  btn: {
    height: 51,
    marginTop: 16,

    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 152,
  },
});
