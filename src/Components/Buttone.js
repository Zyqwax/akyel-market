import { Button } from "native-base";
import React from "react";
import Colors from "../Colors";

export default function Buttone({ my, bg, color, children, onPress, variant = "solid", ...props }) {
  return (
    <Button
      mx={2}
      my={my}
      rounded="full"
      variant={variant}
      bg={bg}
      _text={{
        color,
        fontWeight: "bold",
      }}
      _pressed={{
        bg,
      }}
      onPress={onPress}
      {...props}
    >
      {children}
    </Button>
  );
}
