import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { getData } from "../../../utilities/encryptedStorage";
import getProducts from "../../../logic/products/getProducts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { ScrollView } from "react-native";

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

const OneCategory = () => {
  const [token, setToken] = useState<string>(null);
  const [products, setProducts] = useState<Array<Product>>([]);
  const { categoryIdProp } = useLocalSearchParams<{
    categoryIdProp: string;
    categoryNameProp: string;
  }>();

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetProducts = async () => {
    try {
      const result = await getProducts(token, Number(categoryIdProp));
      setProducts(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();

    if (token) {
      handleGetProducts();
    }
  }, [token]);

  return (
    <View className="flex flex-1 items-center">
      <ScrollView className="flex flex-col w-full">
        {products.map((product) => (
          <View
            className="border-solid border-b-2 w-full py-2 px-2 flex flex-row justify-between"
            key={product.product_id}
          >
            <View className="flex flex-col w-4/5">
              <Text className="text-xl font-bold">{product.product_name}</Text>
              <Text className="font-semibold">
                Descripción:{" "}
                <Text className="font-normal">{product.description}</Text>
              </Text>
              <Text className="font-semibold">
                Ingredientes:{" "}
                <Text className="font-normal">{product.ingredients}</Text>
              </Text>
              <Text className="font-semibold">
                Alérgenos:{" "}
                <Text className="font-normal">{product.allergens}</Text>
              </Text>
              <Text className="font-semibold">
                Precio: <Text className="font-normal">{product.price}€ </Text>
              </Text>
            </View>
            <View className="flex flex-col justify-between items-center min-h-36 w-10 pb-1">
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "edit-product-modal",
                    params: { productIdProp: product.product_id },
                  })
                }
              >
                <MaterialIcons name="edit" size={32} color="black" />
              </Pressable>
              <Pressable>
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={32}
                  color="black"
                />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable
        className="bg-red-600 w-2/4 my-3 py-3 rounded-2xl"
        onPress={() =>
          router.push({
            pathname: "create-product-modal",
            params: { categoryIdProp: categoryIdProp },
          })
        }
      >
        <Text className="text-center text-white text-xl font-extrabold">
          Crear producto
        </Text>
      </Pressable>
    </View>
  );
};

export default OneCategory;
