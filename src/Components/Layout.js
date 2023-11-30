import { Stack, Heading } from "native-base";
import Colors from "../Colors";
export default function Layout({ children, title, px = 0 }) {
  return (
    <Stack flex={1} bg={Colors.white}>
      <Stack space={1} w="full" px={6} bg={Colors.main} py={4} alignItems="center" safeAreaTop>
        <Heading color={Colors.white}>{title}</Heading>
      </Stack>
      <Stack flex={1} px={px}>
        {children}
      </Stack>
    </Stack>
  );
}
