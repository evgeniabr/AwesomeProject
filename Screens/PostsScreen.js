import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import DefoultPostsScreen from "./DefoultPostsScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
  const navigation = useNavigation();
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefoultPostsScreen"
        component={DefoultPostsScreen}
        options={{
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="logout" size={28} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerLeft: () => false,
        }}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Коментарі"
        component={CommentsScreen}
      ></NestedScreen.Screen>
      <NestedScreen.Screen
        name="Локація"
        component={MapScreen}
      ></NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
}
