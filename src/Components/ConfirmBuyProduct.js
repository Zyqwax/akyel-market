import React, { useState, useEffect } from "react";
import { Text, Stack, Image, Box, Heading, Radio } from "native-base";
import { query, collection, onSnapshot, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Colors from "../Colors";
import AlertQ from "./AlertQ";
import Buttone from "./Buttone";
import { useMyContext } from "../MyProvider";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmBuyProduct({ barcode }) {
  const [method, setMethod] = useState("cash");
  const navigation = useNavigation();
  const { user } = useMyContext();
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

  const p = products.find((p) => p.barcode == barcode);

  const handleBuy = async () => {
    const newDoc = await addDoc(collection(db, "orderHistory"), {
      date: new Date(),
      user: user.name,
      product: p,
      method: method,
    });
    await setDoc(
      doc(collection(db, "products"), p.id),
      {
        countInStock: p.countInStock - 1,
      },
      { merge: true }
    );
    navigation.navigate("Products");
  };
  return (
    <Stack my={12}>
      {p ? (
        <>
          <Image source={{ uri: p.thumbnail }} alt={p.title} w="full" h={32} resizeMode="contain" />
          <Box px={4} pt={8}>
            <Text fontSize={12} mt={1} my={2} bold isTruncated numberOfLines={2} w="full" color={Colors.darkestGray}>
              {p.title}
            </Text>
            <Text fontSize={10}>Stok : {p.countInStock}</Text>
            <Heading size="sm" bold my={2} color={Colors.darkestGray}>
              ₺{p.price}
            </Heading>
          </Box>
          {p.countInStock <= 0 ? (
            <AlertQ mt={2} title="Hata !" body="Malesef ürünün stokları tükendiği için bu işlem gerçekleşemiyor." />
          ) : (
            <>
              <Text>Öedeme Şekl i</Text>
              <Radio.Group name="method" value={method} onChange={(val) => setMethod(val)}>
                <Radio value="cash">Nakit</Radio>
                <Radio value="debt">Borç</Radio>
              </Radio.Group>
              <Buttone bg={Colors.main} my={2} color={Colors.white} onPress={handleBuy} disabled={p.countInStock <= 0}>
                Satın Alımı Onayla
              </Buttone>
            </>
          )}
        </>
      ) : (
        <AlertQ title="Hata !" body="Malesef bu ürün kayıtlarımızda bulunmuyor." status="error" />
      )}
    </Stack>
  );
}
