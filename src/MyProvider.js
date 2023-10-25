import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useState, useEffect } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const u = JSON.parse(await AsyncStorage.getItem("user"));
      if (u) setUser(u);
    })();
  }, []);
  useEffect(() => {}, []);
  function login(user) {
    (async () => {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    })();
  }
  function logout() {
    (async () => {
      await AsyncStorage.removeItem("user");
      setUser(null);
    })();
  }
  const [user, setUser] = useState(null);
  return <MyContext.Provider value={{ user, setUser, login, logout }}>{children}</MyContext.Provider>;
};

const useMyContext = () => useContext(MyContext);

export { MyProvider, useMyContext };
