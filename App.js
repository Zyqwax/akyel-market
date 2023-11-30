import React from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { MyProvider } from "./src/MyProvider";
import BottomNav from "./src/Navigators/BottomNav";
import Colors from "./src/Colors";

export default function App() {
  return (
    <MyProvider>
      <NativeBaseProvider>
        <StatusBar backgroundColor={Colors.blue} />
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </NativeBaseProvider>
    </MyProvider>
  );
}
