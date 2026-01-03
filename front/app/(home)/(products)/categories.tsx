import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import getCategories from "../../../logic/categories/getCategories";
import { router } from "expo-router";
import { getData } from "../../../utilities/encryptedStorage";
import customAlert from "../../../utilities/customAlert";
import classNames from "classnames";

type Category = {
  category_id: number;
  category_name: string;
  color: string;
  user_id: null;
};

const Categories = () => {
  const [token, setToken] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<Category>>([]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetCategories = async () => {
    try {
      const result = await getCategories(token);
      setCategories(result);
    } catch (error) {
      customAlert(error.message);
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
            className={classNames(
              "w-1/2 h-24 p-3 flex justify-center active:bg-red-200",
              {
                "bg-slate-200 active:bg-slate-300": category.color === null,
                "bg-red-300 active:bg-red-400": category.color === "RED",
                "bg-green-200 active:bg-green-300": category.color === "GREEN",
                "bg-blue-200 active:bg-blue-300": category.color === "BLUE",
                "bg-yellow-200 active:bg-yellow-300":
                  category.color === "YELLOW",
                "bg-pink-300 active:bg-pink-400": category.color === "PINK",
                "bg-orange-200 active:bg-orange-300":
                  category.color === "ORANGE",
                "bg-gray-200 active:bg-gray-300": category.color === "GRAY",
                "bg-purple-200 active:bg-purple-300":
                  category.color === "PURPLE",
                "bg-amber-700 active:bg-amber-800": category.color === "BROWN",
                "bg-white active:bg-gray-200": category.color === "WHITE",
              }
            )}
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
            <Text className="w-full text-center text-lg font-semibold mt-1">
              {category.category_name}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => router.push("(products)/create-category-modal")}
          className="w-1/2 h-24 bg-gray-800 flex justify-center"
        >
          <Text className="text-center font-bold text-xl text-white">
            Nueva categoría
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Categories;
