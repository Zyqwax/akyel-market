import React, { useState } from "react";
import { Input, FormControl, TextField, Stack, Button, Image } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function NewProduct({ navigation }) {
  const { addProduct } = useMyContext();
  const [newProductName, setNewProductName] = useState(null);
  const [newProductImageURL, setNewProductImageURL] = useState(null);
  const [newProductPrice, setNewProductPrice] = useState(null);
  const [newProductStock, setNewProductStock] = useState(null);

  const handleNewProduct = async () => {
    const url = await saveImage(newProductImageURL);
    const pl = {
      countInStock: Number(newProductStock),
      price: Number(newProductPrice),
      thumbnail: url,
      title: newProductName,
    };
    await addProduct(pl);

    navigation.navigate("EditProducts");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setNewProductImageURL(result.assets[0].uri);
    }
  };

  const saveImage = async (uri) => {
    const fileName = uri.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });
      return newPath;
    } catch (error) {}
  };

  return (
    <Layout title="Yeni Ürün Ekle" px={4}>
      <FormControl>
        <FormControl.Label>Ürün İsmi</FormControl.Label>
        <Input value={newProductName} onChangeText={(text) => setNewProductName(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Fiyat</FormControl.Label>
        <TextField value={newProductPrice} onChangeText={(text) => setNewProductPrice(text)} />
      </FormControl>
      <FormControl>
        <FormControl.Label>Ürün Stoğu</FormControl.Label>
        <Input value={newProductStock} onChangeText={(text) => setNewProductStock(text)} />
      </FormControl>
      <Stack alignItems="center">
        <Button
          bg={Colors.accent}
          rounded="full"
          mt={8}
          my={4}
          size="sm"
          color={Colors.white}
          w={90}
          onPress={pickImage}
        >
          Resim Seç
        </Button>
        {!!newProductImageURL && (
          <Image source={{ uri: newProductImageURL }} w={120} h={120} style={{ objectFit: "cover" }} alt="product0" />
        )}
      </Stack>
      <Button bg={Colors.main} rounded="full" mt={8} size="sm" color={Colors.white} onPress={handleNewProduct}>
        Kaydet
      </Button>
    </Layout>
  );
}
