import React from "react";
import { Select, CheckIcon } from "native-base";
export default function SelectComponent({ value, placeholder, set, children }) {
  return (
    <Select
      selectedValue={value}
      minWidth="200"
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      size="sm"
      onValueChange={(itemValue) => set(itemValue)}
    >
      {children}
    </Select>
  );
}
