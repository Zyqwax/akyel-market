import React from "react";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminNav from "./AdminNav";
import StackNav from "./StackNav";
import Colors from "../Colors";

export default function BottomNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      backBehavior="main"
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          backgroundColor: Colors.white,
          height: 60,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          color: Colors.darkestGray,
          marginBottom: 5,
          fontWeight: "500",
        },
        tabBarActiveTintColor: Colors.main,
        tabBarInactiveTintColor: Colors.darkestGray,
      }}
    >
      <Tab.Screen
        name="Main"
        component={StackNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="clipboard" size={28} color={color} />,
          title: "Ürünler",
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="compass" size={28} color={color} />,
          title: "Admin",
        }}
      />
    </Tab.Navigator>
  );
}
