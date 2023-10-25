import React, { useState, useEffect } from "react";
import { View, Button, Stack } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";
import ConfirmBuyProduct from "../Components/ConfirmBuyProduct";
import Colors from "../Colors";
import AlertQ from "../Components/AlertQ";

export default function BuyScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    const unsub = navigation.addListener("tabPress", () => {
      setScanned(false);
    });
    return unsub;
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
  };
  const startScanning = () => {
    setScanned(false);
    setBarcode("");
  };
  if (hasPermission === null) {
    return <AlertQ title="Kamera İzni" body="İzin bekleniyor ..." />;
  }
  if (hasPermission === false) {
    return <AlertQ title="Hata !" body="QR kod tarayıcı için izin verilmedi." status="error" />;
  }

  return (
    <View flex={1} bg={Colors.white} justifyContent="center">
      {scanned ? (
        <Stack my={8} mx={2}>
          <Button onPress={startScanning}>Tekrar Tara</Button>
          {barcode ? (
            <ConfirmBuyProduct barcode={barcode} />
          ) : (
            <AlertQ title="Hata !" body="Barkod Okunamadı." status="error" />
          )}
        </Stack>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}
