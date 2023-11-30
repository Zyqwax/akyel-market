import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../Screens/AdminMenu";
import EditProducts from "../Screens/EditProducts";
import NewProduct from "../Screens/NewProduct";
import ChangeProduct from "../Screens/ChangeProduct";
import OrderHistory from "../Screens/OrderHistory";
import CheckAdmin from "../Screens/CheckAdmin";
import NewCustomer from "../Screens/NewCustomer";
import EditCustomers from "../Screens/EditCustomers";
import CreditBook from "../Screens/CreditBook";
import PayCredit from "../Screens/PayCredit";
import PayedCredits from "../Screens/PayedCredits";

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
      <Stack.Screen name="CheckAdmin" component={CheckAdmin} />
      <Stack.Screen name="AdminMenu" component={ProfileScreen} />
      <Stack.Screen name="EditProducts" component={EditProducts} />
      <Stack.Screen name="NewProduct" component={NewProduct} />
      <Stack.Screen name="ChangeProduct" component={ChangeProduct} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="NewCustomer" component={NewCustomer} />
      <Stack.Screen name="EditCustomers" component={EditCustomers} />
      <Stack.Screen name="CreditBook" component={CreditBook} />
      <Stack.Screen name="PayCredit" component={PayCredit} />
      <Stack.Screen name="PayedCredits" component={PayedCredits} />
    </Stack.Navigator>
  );
}
