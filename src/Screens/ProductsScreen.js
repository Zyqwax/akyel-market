import React, { useEffect, useState } from "react";
import { Text, ScrollView, Flex, Image, Box, Heading, View, Stack } from "native-base";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Colors from "../Colors";

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);

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

  return (
    <View flex={1} bg={Colors.white}>
      <Stack space={1} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop></Stack>
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={5}>
          {products.map((p) => (
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
                <Text fontSize={12} m={2} bold isTruncated numberOfLines={2} w="full" color={Colors.darkestGray}>
                  {p.title}
                </Text>
                <Text fontSize={10}>Stok : {p.countInStock}</Text>
                <Heading size="sm" bold my={2} color={Colors.darkestGray}>
                  ₺{p.price}
                </Heading>
              </Box>
            </Stack>
          ))}
        </Flex>
      </ScrollView>
    </View>
  );
}
