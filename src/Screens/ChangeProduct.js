import React, { useEffect, useState } from "react";
import { Input, FormControl, Stack } from "native-base";
import Colors from "../Colors";
import { collection, getDocs, doc, query, where, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import Buttone from "../Components/Buttone";

export default function ChangeProduct({ route, navigation }) {
  const { barcode } = route.params;
  const [product, setProduct] = useState(null);
  const [changeProductName, setChangeProductName] = useState(null);
  const [changeProductPrice, setChangeProductPrice] = useState(null);
  const [changeProductStock, setChangeProductStock] = useState(null);

  useEffect(() => {
    (async () => {
      const doc = (await getDocs(query(collection(db, "products"), where("barcode", "==", barcode)))).docs[0];
      setProduct({
        id: doc.id,
        ...doc.data(),
      });
      setChangeProductName(doc.data().title);
      setChangeProductPrice(doc.data().price);
      setChangeProductStock(doc.data().countInStock);
    })();
    return () => {
      setChangeProductName(null);
      setChangeProductPrice(null);
      setChangeProductStock(null);
      setProduct(null);
    };
  }, []);

  const handleChangeProduct = async () => {
    await setDoc(
      doc(collection(db, "products"), product.id),

      {
        price: changeProductPrice,
        name: changeProductName,
        countInStock: changeProductStock,
      },
      { merge: true }
    );
    navigation.navigate("EditProducts");
  };

  return (
    <Stack flex={1} bg={Colors.white} pt={16} px={8} safeAreaTop>
      <FormControl>
        <FormControl.Label>Ürün Barkodu</FormControl.Label>
        <Input value={barcode} isReadOnly />
      </FormControl>
      <FormControl>
        <FormControl.Label>Ürün İsmi</FormControl.Label>
        <Input value={changeProductName} onChangeText={(text) => setChangeProductName(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Fiyat</FormControl.Label>
        <Input value={changeProductPrice} onChangeText={(text) => setChangeProductPrice(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Stok</FormControl.Label>
        <Input value={String(changeProductStock)} onChangeText={(text) => setChangeProductStock(text)} />
      </FormControl>

      <Buttone bg={Colors.main} my={2} size="sm" color={Colors.white} onPress={() => handleChangeProduct()}>
        Kaydet
      </Buttone>
    </Stack>
  );
}
