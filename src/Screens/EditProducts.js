import React from "react";
import { Text, ScrollView, Image, Heading, HStack, Icon, Stack, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useMyContext } from "../MyProvider";
import AlertQ from "../Components/AlertQ";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function EditProducts({ navigation }) {
  const { products, removeProduct } = useMyContext();

  const handleDelete = async (id) => {
    removeProduct(id);
  };
  const handleEdit = (id) => {
    navigation.navigate("ChangeProduct", { productId: id });
  };

  return (
    <Layout title="Ürünleri Düzenle">
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        {products.map((p) => (
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
            {p.countInStock === 0 && <AlertQ title="Ürün Stoğu Yok" status="error" my={2} />}
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
            <HStack justifyContent="center" style={{ gap: 20 }}>
              <Button rounded="full" color="white" bg={Colors.main} size="sm" onPress={() => handleEdit(p.id)}>
                Ürünü Düzenle
              </Button>
              <Button rounded="full" color="white" bg={Colors.error} size="sm" onPress={() => handleDelete(p.id)}>
                Ürünü Sil
              </Button>
            </HStack>
          </Stack>
        ))}
      </ScrollView>

      <Pressable
        onPress={() => navigation.navigate("NewProduct")}
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
