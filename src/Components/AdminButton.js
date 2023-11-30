import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { HStack, Text, Spacer, Pressable } from "native-base";
import Colors from "../Colors";

export default function AdminButton({ onPress, title, icon }) {
  return (
    <Pressable
      android_ripple={{
        borderless: false,
      }}
      p={5}
      onPress={onPress}
    >
      <HStack>
        <Feather name={icon} size={24} color={Colors.darkestGray} />
        <Text px={4}>{title}</Text>
        <Spacer />
        <AntDesign name="right" size={24} color={Colors.darkGray} />
      </HStack>
    </Pressable>
  );
}
