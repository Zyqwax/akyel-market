import React, { useState, useEffect } from "react";
import { Text, Box, Pressable, Spacer, HStack, ScrollView, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import Colors from "../Colors";
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

export default function OrderHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "orderHistory"));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetchedDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(fetchedDocs);
    });
    return unsub;
  }, []);
  return (
    <Box safeAreaTop>
      <Box bg={Colors.main} h={8}></Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          android_ripple={{
            borderless: false,
          }}
          p={4}
        >
          <HStack justifyContent="space-between">
            <Feather name="shield" size={24} color={Colors.darkestGray} />
            <Text>Müşteri</Text>
            <Text>Ürün</Text>
            <Text>Fiyat</Text>
            <Text>Ödeme</Text>
            <Text>Tarih</Text>
          </HStack>
        </Pressable>
        {history.map((h) => (
          <Pressable
            key={h.id}
            android_ripple={{
              borderless: false,
            }}
            mx={2}
            my={2}
            px={2}
          >
            <HStack justifyContent="space-between">
              <Feather name="shopping-cart" size={24} color={Colors.darkestGray} />
              <Text>{h.user}</Text>
              <Text>{h.product.title}</Text>
              <Text>₺{h.product.price}</Text>
              <Text>{h.method == "cash" ? "Nakit" : "Borç"}</Text>
              <VStack>
                <Text fontSize={10} px={4}>
                  {h.date.toDate().toLocaleDateString("tr-TR")}
                </Text>
                <Text fontSize={10} px={4}>
                  {h.date.toDate().toLocaleTimeString("tr-TR")}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
}
