import React, { useEffect, useState } from "react";
import { Text, ScrollView, Flex, Image, Box, Heading, View, HStack, Input, Fab, Icon, Stack } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import { collection, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Buttone from "../Components/Buttone";
import Colors from "../Colors";
import AlertQ from "../Components/AlertQ";

export default function EditProducts({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filt, setFilt] = useState("");
  const [filtedProducts, setFiltedProducts] = useState([]);

  useEffect(() => {
    const f = products.filter((f) => f.title.includes(filt));
    setFiltedProducts(f);
  }, [products, filt]);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetchedDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedDocs);
    });
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <View flex={1} bg={Colors.white}>
      <HStack space={1} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop></HStack>
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
          {filtedProducts.map((p) => (
            <Stack
              key={p.id}
              flexBasis="48%"
              bg={Colors.white}
              rounded="md"
              shadow={2}
              pt={2}
              my={3}
              overflow="hidden"
              borderColor={Colors.gray}
              borderWidth={1}
            >
              <Image source={{ uri: p.thumbnail }} alt={p.title} w="full" h={24} resizeMode="contain" />
              <Box px={4} pt={2}>
                <Text
                  fontSize={12}
                  mt={1}
                  my={2}
                  bold
                  isTruncated
                  numberOfLines={2}
                  w="full"
                  color={Colors.darkestGray}
                >
                  {p.title}
                </Text>
                <Text fontSize={10}>Stok : {p.countInStock}</Text>
                <Heading size="sm" bold my={2} color={Colors.darkestGray}>
                  ₺{p.price}
                </Heading>
                {p.countInStock < 1 && <AlertQ title="Stok Bitti!" status="error" />}
              </Box>
              <Buttone
                bg={Colors.main}
                my={2}
                size="xs"
                color={Colors.white}
                onPress={() => navigation.navigate("ChangeProduct", { barcode: p.barcode })}
              >
                Ürünü Düzenle
              </Buttone>
              <Buttone bg={Colors.red} my={2} size="xs" color={Colors.white} onPress={() => handleDelete(p.id)}>
                Ürünü Sil
              </Buttone>
            </Stack>
          ))}
        </Flex>
      </ScrollView>
      <Fab
        shadow={2}
        icon={<Icon as={Feather} name="edit" size="xl" />}
        bg={Colors.main}
        bottom={20}
        onPress={() => navigation.navigate("NewProduct")}
      />
    </View>
  );
}
