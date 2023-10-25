import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../Screens/ProfileScreen";
import EditProducts from "../Screens/EditProducts";
import NewProduct from "../Screens/NewProduct";
import ChangeProduct from "../Screens/ChangeProduct";
import OrderHistory from "../Screens/OrderHistory";

export default function StackNav() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        animationDuration: 1000,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProducts" component={EditProducts} />
      <Stack.Screen name="NewProduct" component={NewProduct} />
      <Stack.Screen name="ChangeProduct" component={ChangeProduct} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
}
