import { View, Text, Stack, ScrollView, HStack, VStack } from "native-base";
import { useMyContext } from "../MyProvider";
import Layout from "../Components/Layout";
import Colors from "../Colors";

export default function CreditBook({ navigation }) {
  const { customers, history, payedCredits } = useMyContext();
  const credits = history.filter((h) => h.method === "debt");
  const cus = customers.map((c) => {
    return {
      ...c,
      total: credits.filter((a) => a.user.id === c.id).reduce((acc, arr) => acc + arr.product.price, 0),
      payedTotal: payedCredits.filter((p) => p?.user?.id === c.id).reduce((acc, arr) => acc + arr.amount, 0),
    };
  });
  return (
    <Layout title="Veresiye Defteri">
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        {cus.map((c) => (
          <Stack
            key={c.id}
            mx={6}
            my={2}
            p={2}
            bg={Colors.white}
            rounded="md"
            shadow={6}
            overflow="hidden"
            borderColor={Colors.gray}
            borderWidth={2}
          >
            <Stack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize={16} m={2} bold color={Colors.darkestGray}>
                  {c.name}
                </Text>
              </HStack>
              <VStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontSize={12} m={1} bold color={Colors.darkestGray}>
                    Toplam Satın-Alım
                  </Text>
                  <Text fontSize={12} m={1} bold color={Colors.darkestGray}>
                    ₺{c.total}
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontSize={12} m={1} bold color={Colors.darkestGray}>
                    Ödenen Borç
                  </Text>
                  <Text fontSize={12} m={1} bold color={Colors.darkestGray}>
                    ₺{c.payedTotal}
                  </Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontSize={15} m={1} bold color={Colors.darkestGray}>
                    Kalan Borç
                  </Text>
                  <Text fontSize={15} m={1} bold color={Colors.darkestGray}>
                    ₺{c.total - c.payedTotal}
                  </Text>
                </HStack>
              </VStack>
            </Stack>
          </Stack>
        ))}
      </ScrollView>
    </Layout>
  );
}
