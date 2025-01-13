import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utilities/encryptedStorage";
import { useLocalSearchParams } from "expo-router";
import getOrder from "../../../logic/orders/getOrder";
import getCategories from "../../../logic/categories/getCategories";
import getProducts from "../../../logic/products/getProducts";
import RNPickerSelect from "react-native-picker-select";
import getTables from "../../../logic/tables/getTables";
import getProduct from "../../../logic/products/getProduct";
import classNames from "classnames";
import editOrder from "../../../logic/orders/editOrder";
import createToastClass from "../../../utilities/toastClass";
import { router } from "expo-router";
import deleteOrder from "../../../logic/orders/deleteOrder";

type Order = {
  order_id: number;
  table_id: number;
  table_name: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: null;
  total: null;
  order_date: string;
  status: string;
  invoice_id: number;
};

type Table = {
  table_id: number;
  table_name: string;
  available: boolean;
};

type Category = {
  category_id: number;
  category_name: string;
  user_id: null;
};

type Product = {
  product_id: number;
  product_name: string;
  description: string;
  ingredients: string;
  allergens: string;
  price: number;
  user_id: null;
  category_id: number;
};

const pickerSelectStyles = {
  inputAndroid: {
    borderColor: "red",
    borderRadius: 4,
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  inputIOS: {
    borderColor: "red",
    borderRadius: 4,
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
};

const EditOrderModal = () => {
  const [token, setToken] = useState<string | null>(null);

  const { orderIdProp } = useLocalSearchParams<{ orderIdProp: string }>();
  const [tableId, setTableId] = useState<number>(null);
  const [product_id, setProduct_id] = useState<number>(null);
  const [quantity, setQuantity] = useState<number>(null);
  const [status, setStatus] = useState<string>(null);

  const [tables, setTables] = useState<Array<Table>>([]);

  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category_id, setCategory_id] = useState<number>(null);

  const [products, setProducts] = useState<Array<Product>>([]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetOrder = async () => {
    try {
      const result: Order = await getOrder(Number(orderIdProp), token);
      setTableId(result.table_id);
      setQuantity(result.quantity);
      setProduct_id(result.product_id);
      setStatus(result.status);
    } catch (error) {
      alert(error);
    }
  };

  const handleGetTables = async () => {
    try {
      const result = await getTables(token);
      setTables(result);
    } catch (error) {
      alert(error);
    }
  };

  const handleGetCategories = async () => {
    try {
      const result = await getCategories(token);
      setCategories(result);
    } catch (error) {
      alert(error);
    }
  };

  const handleGetProducts = async () => {
    try {
      const result = await getProducts(token, category_id);
      setProducts(result);
    } catch (error) {
      alert(error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const result = await getProduct(token, Number(product_id));
      setCategory_id(result.category_id);
    } catch (error) {
      alert(error);
    }
  };

  const handleChangeStatus = () => {
    switch (status) {
      case "PENDING":
        setStatus("PREPARING");
        break;
      case "PREPARING":
        setStatus("READY");
        break;
      case "READY":
        setStatus("DELIVERED");
        break;
      case "DELIVERED":
        setStatus("PENDING");
        break;
    }
  };

  const handleEditOrder = async () => {
    try {
      const result = await editOrder(
        token,
        Number(orderIdProp),
        tableId,
        product_id,
        quantity,
        status
      );

      if (result && typeof result === "boolean") {
        createToastClass("Orden editada");
        router.push("orders");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const result: boolean = await deleteOrder(token, Number(orderIdProp));
      if (result && typeof result === "boolean") {
        createToastClass("Orden eliminada");
        router.push("orders");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();

    if (token != null) {
      handleGetOrder();
      handleGetTables();
      handleGetCategories();
    }
  }, [token]);

  useEffect(() => {
    if (product_id) handleGetProduct();
  }, [product_id]);

  useEffect(() => {
    if (category_id) handleGetProducts();
  }, [category_id]);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <View className="flex flex-col flex-1 w-full items-center">
        <RNPickerSelect
          onValueChange={(value) => setTableId(value)}
          items={tables.map((table) => {
            return {
              label: table.table_name,
              value: table.table_id,
            };
          })}
          placeholder={{ label: "Seleccione una mesa", value: null }}
          value={tableId}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          onValueChange={(value) => setCategory_id(value)}
          items={categories.map((category) => {
            return {
              label: category.category_name,
              value: category.category_id,
            };
          })}
          style={pickerSelectStyles}
          value={category_id}
          placeholder={{ label: "Selecciones una categoría", value: null }}
        />
        <RNPickerSelect
          onValueChange={(value) => setProduct_id(value)}
          items={products.map((product) => {
            return {
              label: product.product_name,
              value: product.product_id,
            };
          })}
          value={
            products.some((product) => product.product_id === product_id)
              ? product_id
              : "Seleccione un producto"
          }
          placeholder={{ label: "Seleccione un producto", value: null }}
          style={pickerSelectStyles}
        />
        <TextInput
          placeholder="Cantidad del producto"
          placeholderTextColor="rgb(248, 113, 113)"
          value={String(quantity)}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, "");
            setQuantity(Number(numericValue));
          }}
          maxLength={2}
          keyboardType="numeric"
          autoCapitalize="none"
          className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <Pressable
          className={classNames(
            "w-full mb-4 p-3 border-2 border-black rounded-lg shadow-sm",
            {
              "bg-red-100": status === "PENDING",
              "bg-yellow-100": status === "PREPARING",
              "bg-green-100": status === "READY",
              "bg-green-300": status === "DELIVERED",
            }
          )}
          onPress={() => handleChangeStatus()}
        >
          <Text className="text-black font-semibold text-xl text-center">
            {status === "PENDING"
              ? "Pendiente"
              : status === "PREPARING"
              ? "Preparando"
              : status === "READY"
              ? "Listo"
              : "Entregado"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleEditOrder()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Editar
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handleDeleteOrder()}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2 mb-4"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Eliminar
        </Text>
      </Pressable>
    </View>
  );
};

export default EditOrderModal;
