import React from "react";
import { Text, HStack, ScrollView, Stack, Heading, Button } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function OrderHistory() {
  const { history, removeHistory } = useMyContext();
  const handleRemove = async (date) => {
    await removeHistory(date);
  };
  return (
    <Layout title="Satın-Alım Geçmişi">
      <ScrollView showsVerticalScrollIndicator={false}>
        {history.map((h) => (
          <Stack
            key={h.date}
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
            <Stack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize={16} m={2} bold color={Colors.darkestGray}>
                  {h.user.name}
                </Text>
                <Text>{h.method == "cash" ? "Nakit" : "Borç"}</Text>
              </HStack>
              <Text fontSize={12} m={2} bold color={Colors.darkestGray}>
                Ürün : {h.product.title}
              </Text>
              <HStack alignItems="center" justifyContent="space-between">
                <Heading fontSize={18} px={2} size="sm" bold my={2} color={Colors.darkestGray}>
                  ₺{h.product.price}
                </Heading>
                <Text fontSize={10} px={4}>
                  {new Date(h.date).toLocaleString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
              </HStack>
              <Button
                bg={Colors.error}
                size="sm"
                rounded="full"
                my={2}
                color={Colors.white}
                onPress={() => handleRemove(h.date)}
              >
                Sil
              </Button>
            </Stack>
          </Stack>
        ))}
      </ScrollView>
    </Layout>
  );
}
