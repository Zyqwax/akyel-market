import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, createContext, useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [pass] = useState("8383");
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [payedCredits, setPayedCredits] = useState([]);
  const [customers, setCustomers] = useState([]);

  const deleteFileByUrl = async (fileUrl) => {
    try {
      const fileName = fileUrl.split("/").pop();
      const filePath = FileSystem.documentDirectory + fileName;
      await FileSystem.deleteAsync(filePath);
      console("Dosya başarıyla silindi:", filePath);
    } catch (error) {
      console.error("Dosya silinirken hata oluştu:", error);
    }
  };
  const WriteDataBase = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };
  const ReadDataBase = async (key) => {
    return JSON.parse(await AsyncStorage.getItem(key));
  };
  const addProduct = async (product) => {
    const products = (await ReadDataBase("products")) || [];
    products.push({
      id: Date.now(),
      ...product,
    });
    setProducts(products);
    await WriteDataBase("products", products);
  };
  const updateProduct = async (productId, product) => {
    const products = await ReadDataBase("products");
    const p = products.map((p) => {
      if (p.id === productId) {
        return product;
      } else {
        return p;
      }
    });
    setProducts(p);
    await WriteDataBase("products", p);
  };
  const removeProduct = async (productId) => {
    const products = await ReadDataBase("products");
    const p = [];
    products.forEach((el) => {
      if (el.id !== productId) p.push(el);
      if (el.id === productId) {
        deleteFileByUrl(el.thumbnail);
      }
    });
    setProducts(p);
    await WriteDataBase("products", p);
  };
  const addHistory = async (user, method, productId) => {
    const history = (await ReadDataBase("history")) || [];
    const product = products.find((p) => p.id === productId);
    const u = customers.find((c) => c.id === user);
    await updateProduct(product.id, { ...product, countInStock: product.countInStock - 1 });
    history.push({
      user: u,
      method,
      product,
      date: Date.now(),
    });
    setHistory(history);
    await WriteDataBase("history", history);
  };
  const removeHistory = async (date) => {
    const history = (await ReadDataBase("history")) || [];
    const h = [];
    history.forEach((el) => {
      if (el.date !== date) h.push(el);
    });
    setHistory(h);
    await WriteDataBase("history", h);
  };
  const payCredits = async (user, amount) => {
    const payed_credits = (await ReadDataBase("payed_credits")) || [];
    payed_credits.push({
      user,
      amount,
      date: Date.now(),
    });
    setPayedCredits(payed_credits);
    await WriteDataBase("payed_credits", payed_credits);
  };
  const removeCredits = async (date) => {
    const payed_credits = (await ReadDataBase("payed_credits")) || [];
    const p = [];
    payed_credits.forEach((e) => {
      if (e.date !== date) p.push(e);
    });
    setPayedCredits(p);
    await WriteDataBase("payed_credits", p);
  };
  const addCustomer = async (name) => {
    const customers = (await ReadDataBase("customers")) || [];
    customers.push({
      id: Date.now(),
      name,
    });
    setCustomers(customers);
    await WriteDataBase("customers", customers);
  };
  const removeCustomer = async (customerId) => {
    const customers = await ReadDataBase("customers");
    const c = [];
    customers.forEach((el) => {
      if (el.id !== customerId) c.push(el);
    });
    setCustomers(c);
    await WriteDataBase("customers", c);
  };
  const exportDatabase = async () => {
    return JSON.stringify({
      products: (await ReadDataBase("products")) || [],
      history: (await ReadDataBase("history")) || [],
      customers: (await ReadDataBase("customers")) || [],
      payed_credits: (await ReadDataBase("payed_credits")) || [],
    });
  };
  const importDatabase = async (string) => {
    const { products, history, customers, payed_credits } = JSON.parse(string);
    setProducts(products);
    setHistory(history);
    setCustomers(customers);
    setPayedCredits(payed_credits);
    await WriteDataBase("products", products);
    await WriteDataBase("history", history);
    await WriteDataBase("customers", customers);
    await WriteDataBase("payed_credits", payed_credits);
  };
  const clearDatabase = async (string) => {
    setProducts([]);
    setHistory([]);
    setCustomers([]);
    setPayedCredits([]);
    await WriteDataBase("products", []);
    await WriteDataBase("history", []);
    await WriteDataBase("customers", []);
    await WriteDataBase("payed_credits", []);
  };
  useEffect(() => {
    (async () => {
      // await AsyncStorage.clear();
      setProducts((await ReadDataBase("products")) || []);
      setHistory((await ReadDataBase("history")) || []);
      setCustomers((await ReadDataBase("customers")) || []);
      setPayedCredits((await ReadDataBase("payed_credits")) || []);
    })();
  }, []);
  return (
    <MyContext.Provider
      value={{
        products,
        customers,
        pass,
        history,
        payedCredits,
        addProduct,
        updateProduct,
        removeProduct,
        addHistory,
        payCredits,
        addCustomer,
        removeCustomer,
        removeHistory,
        removeCredits,
        exportDatabase,
        importDatabase,
        clearDatabase,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => useContext(MyContext);

export { MyProvider, useMyContext };
