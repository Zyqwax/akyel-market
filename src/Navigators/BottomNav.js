import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductsScreen from "../Screens/ProductsScreen";
import BuyScreen from "../Screens/BuyScreen";
import UserScreen from "../Screens/ProfileScreen";

import Colors from "../Colors";
import StackNav from "./StackNav";

export default function BottomNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      backBehavior="main"
      screenOptions={{
        tabBarStyle: { ...styles.tab },
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
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="clipboard" size={28} color={color} />,
          title: "Ürünler",
        }}
      />
      <Tab.Screen
        name="Buy"
        component={BuyScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={28} color={color} />,
          title: "Satın Al",
        }}
      />
      <Tab.Screen
        name="Details"
        component={StackNav}
        options={{
          tabBarIcon: ({ color }) => <Feather name="compass" size={28} color={color} />,
          title: "Detaylar",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: Colors.white,
    height: 60,
  },
});
