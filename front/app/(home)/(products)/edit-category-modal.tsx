import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import storage from "../../../utilities/encryptedStorage";
import getCategory from "../../../logic/categories/getCategory";
import editCategory from "../../../logic/categories/editCategory";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import deleteCategory from "../../../logic/categories/deleteCategory";

const EditCategoryModal = () => {
  const [token, setToken] = useState<string | null>(null);
  const { categoryIdProp } = useLocalSearchParams<{ categoryIdProp: string }>();
  const [categoryName, setCategoryName] = useState<string>(null);

  const categoryEditToast = () => {
    Toast.show("Categoría actualizada", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      backgroundColor: "red",
      textColor: "white",
      shadow: true,
      animation: true,
    });
  };

  const categoryDeletedToast = () => {
    Toast.show("Categoría eliminada", {
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

  const handleGetCategory = async () => {
    try {
      const result = await getCategory(token, categoryIdProp);
      setCategoryName(result.category_name);
    } catch (error) {
      alert(Error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const result: boolean = await editCategory(
        Number(categoryIdProp),
        categoryName,
        token
      );

      if (result) {
        categoryEditToast();
        router.push("categories");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result: boolean = await deleteCategory(
        Number(categoryIdProp),
        token
      );
      if (result) {
        categoryDeletedToast();
        router.push("categories");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();

    if (token != null) {
      handleGetCategory();
    }
  }, [token]);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <View className="flex flex-col flex-1 w-full items-center">
        <TextInput
          placeholder="Nombre de la categoría"
          placeholderTextColor="rgb(248, 113, 113)"
          value={categoryName}
          onChangeText={setCategoryName}
          autoCapitalize="sentences"
          className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />

        <Pressable
          onPress={() => handleEditCategory()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Editar
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handleDeleteCategory()}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2 mb-4"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Eliminar
        </Text>
      </Pressable>
    </View>
  );
};

export default EditCategoryModal;
