import React, { useEffect, useState } from "react";
import { Input, FormControl, TextField, Stack } from "native-base";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";
import Buttone from "../Components/Buttone";
import Colors from "../Colors";

export default function NewProduct({ navigation }) {
  const [scanned, setScanned] = useState(false);

  const [newProductBarcode, setNewProductBarcode] = useState(null);
  const [newProductName, setNewProductName] = useState(null);
  const [newProductImageURL, setNewProductImageURL] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);

  const handleNewProduct = async () => {
    const product = {
      barcode: newProductBarcode,
      countInStock: 0,
      price: newProductPrice,
      thumbnail: newProductImageURL,
      title: newProductName,
    };

    const newDoc = await addDoc(collection(db, "products"), product);
    navigation.navigate("EditProducts");
  };

  const handleBarcode = ({ data }) => {
    setScanned(true);
    setNewProductBarcode(data);
  };

  useEffect(() => {
    return () => {
      setNewProductBarcode(null);
      setNewProductName(null);
      setNewProductImageURL(null);
      setNewProductPrice(null);
      setScanned(false);
    };
  }, []);
  return (
    <Stack flex={1} bg={Colors.white} pt={16} px={8} safeAreaTop>
      <FormControl>
        <FormControl.Label>Ürün İsmi</FormControl.Label>
        <Input value={newProductName} onChangeText={(text) => setNewProductName(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Ürün Barkodu</FormControl.Label>
        <TextField value={newProductBarcode} onChangeText={(text) => setNewProductBarcode(text)} />
        {scanned && (
          <Buttone bg={Colors.red} my={2} size="xs" color={Colors.white} onPress={() => setScanned(false)}>
            Tekrar Tara
          </Buttone>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label>Ürün Resmi</FormControl.Label>
        <TextField value={newProductImageURL} onChangeText={(text) => setNewProductImageURL(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Fiyat</FormControl.Label>
        <TextField value={newProductPrice} onChangeText={(text) => setNewProductPrice(text)} />
      </FormControl>
      <Buttone bg={Colors.main} my={2} size="sm" color={Colors.white} onPress={() => handleNewProduct()}>
        Kaydet
      </Buttone>

      {!scanned && (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarcode} style={StyleSheet.absoluteFill} />
      )}
    </Stack>
  );
}
