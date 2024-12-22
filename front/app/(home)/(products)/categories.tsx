import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import getCategories from "../../../logic/categories/getCategories";
import storage from "../../../utilities/encryptedStorage";
import { router } from "expo-router";

type Category = {
  category_id: number;
  category_name: string;
  user_id: null;
};

const Categories = () => {
  const [token, setToken] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<Category>>([]);

  const getToken = async () => {
    const tokenResult = await storage.getData("token");

    setToken(tokenResult);
  };

  const handleGetCategories = async () => {
    try {
      const result = await getCategories(token);
      setCategories(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token) {
      handleGetCategories();
    }
  }, [token]);

  return (
    <View className="flex flex-1 w-full">
      <View className="flex flex-1 flex-wrap flex-row justify-between">
        {categories.map((category) => (
          <Pressable
            className="w-1/2 h-24 p-3 bg-red-100 flex justify-center active:bg-red-200"
            key={category.category_id}
            onPress={() =>
              router.push({
                pathname: "one-category",
                params: {
                  categoryIdProp: category.category_id,
                  categoryNameProp: category.category_name,
                },
              })
            }
          >
            {/* <Image
              source={require("../../../images/sabercomprar_carne_Mediano.jpg")}
              className="w-full h-16"
              resizeMode="contain"
            /> */}
            <Text className="w-full text-center text-lg mt-1">
              {category.category_name}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => router.push("(products)/create-category-modal")}
          className="w-1/2 h-24 bg-red-200 flex justify-center"
        >
          <Text className="text-center font-bold text-lg">Nueva categoría</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Categories;
