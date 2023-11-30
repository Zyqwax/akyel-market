import React, { useState } from "react";
import { Input, FormControl, Stack, Button } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function ChangeProduct({ route, navigation }) {
  const { productId } = route.params;
  const { products, updateProduct } = useMyContext();
  const p = products.filter((f) => f.id === productId)[0];
  const [changeProductName, setChangeProductName] = useState(p.title);
  const [changeProductPrice, setChangeProductPrice] = useState(p.price.toString());
  const [changeProductStock, setChangeProductStock] = useState(p.countInStock.toString());

  const handleChangeProduct = async () => {
    const pl = {
      ...p,
      title: changeProductName,
      price: Number(changeProductPrice),
      countInStock: Number(changeProductStock),
    };
    await updateProduct(p.id, pl);
    navigation.navigate("EditProducts");
  };

  return (
    <Layout title="Ürünü Düzenle">
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

      <Button bg={Colors.main} my={2} size="sm" color={Colors.white} onPress={handleChangeProduct}>
        Kaydet
      </Button>
    </Layout>
  );
}
