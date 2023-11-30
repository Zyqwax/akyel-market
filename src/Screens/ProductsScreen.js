import React, { useState } from "react";
import { Text, ScrollView, Image, Heading, Stack, Button, Input } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function ProductsScreen({ navigation }) {
  const { products } = useMyContext();
  const [filter, setFilter] = useState("");

  const filtredProducts = products.filter((p) => p.title.toLowerCase().includes(filter.toLowerCase()));

  const handleBuy = (id) => {
    navigation.navigate("BuyScreen", { productId: id });
  };

  return (
    <Layout title="Akyel Martket">
      <Stack px={2} mx={4} my={2}>
        <Input
          value={filter}
          onChangeText={(text) => setFilter(text)}
          rounded="full"
          p={2}
          borderWidth={2}
          placeholder="Ürün Ara..."
        />
      </Stack>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        {filtredProducts.map((p) => (
          <Stack
            key={p.id}
            mx={6}
            my={2}
            p={5}
            bg={Colors.white}
            rounded="md"
            shadow={6}
            overflow="hidden"
            borderColor={Colors.gray}
            borderWidth={2}
          >
            <Image source={{ uri: p.thumbnail }} alt={p.title} w="full" h={40} resizeMode="contain" />
            <Stack>
              <Text fontSize={16} m={2} bold w="full" color={Colors.darkestGray}>
                {p.title}
              </Text>
              <Text px={2} fontSize={12}>
                Stok : {p.countInStock}
              </Text>
              <Heading fontSize={18} px={2} size="sm" bold my={2} color={Colors.darkestGray}>
                ₺{p.price}
              </Heading>
            </Stack>
            <Button rounded="full" color="white" bg={Colors.main} size="sm" onPress={() => handleBuy(p.id)}>
              Satın Al
            </Button>
          </Stack>
        ))}
      </ScrollView>
    </Layout>
  );
}
