import React, { useState } from "react";
import { Text, Stack, Image, Box, Heading, Button, Select } from "native-base";
import { useMyContext } from "../MyProvider";
import AlertQ from "../Components/AlertQ";
import Layout from "../Components/Layout";
import SelectComponent from "../Components/SelectComponent";
import Colors from "../Colors";

export default function BuyScreen({ navigation, route }) {
  const [c, setC] = useState("");
  const [method, setMethod] = useState("");
  const { products, customers, addHistory } = useMyContext();
  const { productId } = route.params;
  const p = products.find((p) => p.id == productId);

  const handleBuy = async () => {
    navigation.navigate("Products");
    await addHistory(c, method, p.id);
  };
  return (
    <Layout title="Satın Al">
      <Stack mx={8} borderWidth={4} rounded="md" borderColor={Colors.gray} p={6}>
        {p ? (
          <>
            <Image source={{ uri: p.thumbnail }} alt={p.title} w="full" h={40} resizeMode="contain" />
            <Box>
              <Text fontSize={16} mt={1} my={2} bold isTruncated numberOfLines={2} w="full" color={Colors.darkestGray}>
                {p.title}
              </Text>
              <Text fontSize={12}>Stok : {p.countInStock}</Text>
              <Heading size="sm" bold my={2} color={Colors.darkestGray} fontSize={18}>
                ₺{p.price}
              </Heading>
            </Box>

            {p.countInStock <= 0 ? (
              <AlertQ mt={2} title="Hata !" body="Malesef ürünün stokları tükendiği için bu işlem gerçekleşemiyor." />
            ) : (
              <>
                <SelectComponent value={c} set={setC} placeholder="Kişi Seç">
                  {customers.map((c) => (
                    <Select.Item key={c.id} label={c.name} value={c.id} />
                  ))}
                </SelectComponent>
                <SelectComponent value={method} set={setMethod} placeholder="Ödeme Yöntemi">
                  <Select.Item label="Parayı Bıraktım" value="cash" />
                  <Select.Item label="Sonra Ödeyeceğim" value="debt" />
                </SelectComponent>
                <Button
                  bg={Colors.main}
                  size="sm"
                  rounded="full"
                  my={2}
                  color={Colors.white}
                  onPress={handleBuy}
                  disabled={!(c && method)}
                >
                  Satın Alımı Onayla
                </Button>
              </>
            )}
          </>
        ) : (
          <AlertQ title="Hata !" body="Malesef bu ürün kayıtlarımızda bulunmuyor." status="error" />
        )}
      </Stack>
    </Layout>
  );
}
