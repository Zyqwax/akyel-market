import React, { useEffect, useState } from "react";
import { Modal, FormControl, Button, Input, Center } from "native-base";
import Colors from "../Colors";
import { db } from "../firebase";

import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import AlertQ from "./AlertQ";
import { useMyContext } from "../MyProvider";

export default function LoginModal({ showModal, setShowModal, navigation }) {
  const { login } = useMyContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const doc = (await getDocs(query(collection(db, "users"), where("name", "==", username)))).docs[0];
    if (password !== doc.data().password) {
      return setError("Şifre Yanlış !");
    }
    login({
      id: doc.id,
      ...doc.data(),
    });
  };

  useEffect(() => {
    const unsub = navigation.addListener("tabPress", () => {
      setError("");
      setUsername("");
      setPassword("");
    });
    return unsub;
  }, []);
  return (
    <Center flex={1}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} avoidKeyboard>
        <Modal.Content maxWidth="360">
          <Modal.CloseButton />
          <Modal.Header>Giriş Yap</Modal.Header>
          <Modal.Body>
            {error && <AlertQ title={error} status="error" />}
            <FormControl>
              <FormControl.Label>Kullanıcı Adı</FormControl.Label>
              <Input value={username} keyboardType="default" onChangeText={(text) => setUsername(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Şifre</FormControl.Label>
              <Input type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                disabled={username.length < 1 && password.length < 1}
                bg={Colors.main}
                onPress={() => {
                  handleLogin();
                  setShowModal(false);
                }}
              >
                Giriş Yap
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
