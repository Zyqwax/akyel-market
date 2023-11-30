import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "../Screens/ProductsScreen";
import BuyScreen from "../Screens/BuyScreen";

export default function AdminNav() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 1000,
      }}
    >
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="BuyScreen" component={BuyScreen} />
    </Stack.Navigator>
  );
}
