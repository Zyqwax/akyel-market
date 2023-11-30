import React from "react";
import { Text, ScrollView, HStack, Icon, Stack, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { useMyContext } from "../MyProvider";
import { Pressable } from "react-native";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function PayedCredits({ navigation }) {
  const { payedCredits, removeCredits } = useMyContext();

  const handleDelete = async (date) => {
    await removeCredits(date);
  };

  return (
    <Layout title="Ödenen Borçlar">
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        {payedCredits.map((c) => (
          <Stack
            key={c.date}
            mx={6}
            my={2}
            p={2}
            bg={Colors.white}
            rounded="md"
            shadow={6}
            overflow="hidden"
            borderColor={Colors.gray}
            borderWidth={2}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={14} m={2} bold color={Colors.darkestGray}>
                {c.user.name}
              </Text>
              <Text fontSize={12} m={2} bold color={Colors.darkestGray}>
                ₺{c.amount}
              </Text>
              <Button
                rounded="full"
                color="white"
                bg={Colors.error}
                size="xs"
                w={40}
                onPress={() => handleDelete(c.date)}
              >
                Ödenen Borcu Sil
              </Button>
            </HStack>
          </Stack>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate("PayCredit")}
        style={{
          backgroundColor: Colors.main,
          width: 64,
          height: 64,
          borderRadius: 99,
          justifyContent: "center",
          alignItems: "center",
          bottom: 20,
          right: 20,
          position: "absolute",
        }}
      >
        <Icon as={Feather} name="edit" size="xl" color={Colors.white} />
      </Pressable>
    </Layout>
  );
}
