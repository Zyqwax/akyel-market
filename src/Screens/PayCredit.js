import React, { useState } from "react";
import { Input, FormControl, Stack, Button, Select, CheckIcon, Heading } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import SelectComponent from "../Components/SelectComponent";
import Colors from "../Colors";

export default function PayCredit({ navigation }) {
  const { payCredits, customers } = useMyContext();
  const [amount, setAmount] = useState("");
  const [c, setC] = useState("");

  const handlePayCredit = async () => {
    navigation.navigate("PayedCredits");
    await payCredits(
      customers.find((el) => el.id === c),
      Number(amount)
    );
  };

  return (
    <Layout title="Borç Öde">
      <Stack mx={4} my={2}>
        <SelectComponent value={c} set={setC} placeholder="Kişi Seç">
          {customers.map((c) => (
            <Select.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </SelectComponent>
        <FormControl mt={2}>
          <FormControl.Label>Ödenen Miktar</FormControl.Label>
          <Input value={amount} onChangeText={(text) => setAmount(text)} />
        </FormControl>
        <Button
          bg={Colors.main}
          rounded="full"
          mt={8}
          size="sm"
          color={Colors.white}
          onPress={handlePayCredit}
          disabled={!(c && amount)}
        >
          Kaydet
        </Button>
      </Stack>
    </Layout>
  );
}
