import { Alert, VStack, HStack, Text, Box } from "native-base";

export default function AlertQ({ title, body, status = "info", ...props }) {
  return (
    <Alert maxW="400" status={status} colorScheme="info" {...props}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack flexShrink={1} space={2} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
              {title}
            </Text>
          </HStack>
        </HStack>
        <Box
          pl="6"
          _text={{
            color: "coolGray.600",
          }}
        >
          {body}
        </Box>
      </VStack>
    </Alert>
  );
}
