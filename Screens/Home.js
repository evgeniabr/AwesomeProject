import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import { View, TouchableOpacity } from "react-native";

const Tabs = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  const getTabBarStyle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    let display = routeName === "Коментарі" ? "none" : "flex";
    return { display };
  };

  return (
    <Tabs.Navigator tabBarOptions={{ showLabel: false }}>
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={({ route }) => ({
          tabBarStyle: getTabBarStyle(route),
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="grid-outline" size={24} color="#212121CC" />
          ),
          headerShown: false,
        })}
      />

      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            >
              <AntDesign name="plus" size={24} color="#FFFFFF" />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          tabBarStyle: [{ display: "none" }],
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate("Публікації")}
            >
              <Ionicons
                name="ios-arrow-back-outline"
                size={28}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="logout" size={28} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={24} color="#212121CC" />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#212121",
        }}
      />
    </Tabs.Navigator>
  );
}
