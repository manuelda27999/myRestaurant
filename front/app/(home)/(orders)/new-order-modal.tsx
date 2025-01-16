import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utilities/encryptedStorage";
import { useLocalSearchParams } from "expo-router";
import getCategories from "../../../logic/categories/getCategories";
import getProducts from "../../../logic/products/getProducts";
import RNPickerSelect from "react-native-picker-select";
import getTables from "../../../logic/tables/getTables";
import createToastClass from "../../../utilities/toastClass";
import { router } from "expo-router";
import createOrder from "../../../logic/orders/createOrder";
import customAlert from "../../../utilities/customAlert";

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

const NewOrderModal = () => {
  const { tableIdProp } = useLocalSearchParams<{ tableIdProp: string }>();
  const { productIdProp } = useLocalSearchParams<{ productIdProp: string }>();
  const { categoryIdProp } = useLocalSearchParams<{ categoryIdProp: string }>();

  const [token, setToken] = useState<string | null>(null);

  const [tableId, setTableId] = useState<number>(null);
  const [product_id, setProduct_id] = useState<number>(null);
  const [quantity, setQuantity] = useState<number>(null);

  const [tables, setTables] = useState<Array<Table>>([]);

  const [categories, setCategories] = useState<Array<Category>>([]);
  const [category_id, setCategory_id] = useState<number>(null);

  const [products, setProducts] = useState<Array<Product>>([]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetTables = async () => {
    try {
      const result = await getTables(token);
      setTables(result);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleGetCategories = async () => {
    try {
      const result = await getCategories(token);
      setCategories(result);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleGetProducts = async () => {
    try {
      const result = await getProducts(token, category_id);
      setProducts(result);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleNewOrder = async () => {
    try {
      const result = await createOrder(token, tableId, product_id, quantity);

      if (result && typeof result === "boolean") {
        createToastClass("Comanda creada");
        router.push("orders");
      }
    } catch (error) {
      customAlert(error.message);
    }
  };

  useEffect(() => {
    getToken();
    setTableId(Number(tableIdProp));

    if (token != null) {
      handleGetTables();
      handleGetCategories();
    }
  }, [token]);

  useEffect(() => {
    if (category_id && token) handleGetProducts();
  }, [token, category_id]);

  useEffect(() => {
    if (tableIdProp) setTableId(Number(tableIdProp));
    if (productIdProp) setProduct_id(Number(productIdProp));
    if (categoryIdProp) setCategory_id(Number(categoryIdProp));
  }, [tableIdProp, productIdProp, categoryIdProp]);

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
          value={category_id}
          style={pickerSelectStyles}
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
          value={product_id}
          placeholder={{ label: "Seleccione un producto", value: null }}
          style={pickerSelectStyles}
        />
        <TextInput
          placeholder="Cantidad del producto"
          placeholderTextColor="rgb(248, 113, 113)"
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
          onPress={() => handleNewOrder()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2 mb-4"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Crear
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          setTableId(null);
          setCategory_id(null);
          setProduct_id(null);
          setQuantity(null);
          router.push("orders");
        }}
        className=" w-1/2 h-12 flex justify-center mt-2 mb-4"
      >
        <Text className="text-red-800 font-bold text-center underline mt-4 text-lg">
          Cancelar
        </Text>
      </Pressable>
    </View>
  );
};

export default NewOrderModal;
