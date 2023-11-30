import React, { useState } from "react";
import { Input, FormControl, Button } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function NewCustomer({ navigation }) {
  const { addCustomer } = useMyContext();
  const [newCustomerName, setNewCustomerName] = useState(null);

  const handleNewCustomer = async () => {
    navigation.navigate("EditCustomers");
    await addCustomer(newCustomerName);
  };

  return (
    <Layout title="Yeni Kullanıcı Ekle" px={4}>
      <FormControl>
        <FormControl.Label>Kullanıcı İsmi</FormControl.Label>
        <Input value={newCustomerName} onChangeText={(text) => setNewCustomerName(text)} />
      </FormControl>
      <Button bg={Colors.main} rounded="full" mt={8} size="sm" color={Colors.white} onPress={handleNewCustomer}>
        Kaydet
      </Button>
    </Layout>
  );
}
