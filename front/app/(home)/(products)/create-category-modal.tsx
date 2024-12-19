import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import createCategory from "../../../logic/categories/createCategory";
import storage from "../../../utilities/encryptedStorage";
import { Link } from "expo-router";
import Toast from "react-native-root-toast";
import { router } from "expo-router";

const CreateCategoryModal = () => {
  const [categoryName, setCategoryName] = useState<string>(null);
  const [token, setToken] = useState<string | null>(null);

  const categoryCreatedToast = () => {
    Toast.show("Categoría creada", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      backgroundColor: "red",
      textColor: "white",
      shadow: true,
      animation: true,
    });
  };

  const getToken = async () => {
    const tokenResult = await storage.getData("token");

    setToken(tokenResult);
  };

  const handleCreateCategory = async () => {
    try {
      const result = await createCategory(categoryName, token);

      if (result) {
        categoryCreatedToast();
        router.push("(products)/product-categories");
      }
    } catch (Error) {
      alert(Error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <Text className="font-bold text-2xl text-center ">
        Introuduce el nombre de la categoría
      </Text>
      <TextInput
        placeholder="Nombre de la categoría"
        placeholderTextColor="rgb(248, 113, 113)"
        value={categoryName}
        onChangeText={setCategoryName}
        autoCapitalize="sentences"
        className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
      />

      <Pressable
        onPress={() => {
          handleCreateCategory();
        }}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Crear
        </Text>
      </Pressable>
      <Link
        className="text-red-800 font-bold underline mt-4 text-lg"
        href={"product-categories"}
      >
        Cancelar
      </Link>
    </View>
  );
};

export default CreateCategoryModal;
