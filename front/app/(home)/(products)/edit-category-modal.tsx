import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import getCategory from "../../../logic/categories/getCategory";
import editCategory from "../../../logic/categories/editCategory";
import { router } from "expo-router";
import deleteCategory from "../../../logic/categories/deleteCategory";
import { getData } from "../../../utilities/encryptedStorage";
import createToastClass from "../../../utilities/toastClass";
import customAlert from "../../../utilities/customAlert";
import RNPickerSelect from "react-native-picker-select";

type Color = {
  label: string;
  value: string;
  hexadecimal: string;
};

const colors: Array<Color> = [
  { label: "Rojo", value: "RED", hexadecimal: "#FCA5A5" },
  { label: "Verde", value: "GREEN", hexadecimal: "#A7F3D0" },
  { label: "Azul", value: "BLUE", hexadecimal: "#BFDBFE" },
  { label: "Amarillo", value: "YELLOW", hexadecimal: "#FDE68A" },
  { label: "Rosa", value: "PINK", hexadecimal: "#F9A8D4" },
  { label: "Naranja", value: "ORANGE", hexadecimal: "#FED7AA" },
  { label: "Gris", value: "GRAY", hexadecimal: "#E5E7EB" },
  { label: "Morado", value: "PURPLE", hexadecimal: "#E9D5FF" },
  { label: "Marrón", value: "BROWN", hexadecimal: "#B45309" },
  { label: "Blanco", value: "WHITE", hexadecimal: "#FFFFFF" },
];

const EditCategoryModal = () => {
  const [token, setToken] = useState<string | null>(null);
  const [color, setColor] = useState<Color>(colors[0]);
  const { categoryIdProp } = useLocalSearchParams<{ categoryIdProp: string }>();
  const [categoryName, setCategoryName] = useState<string>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetCategory = async () => {
    try {
      const result = await getCategory(token, Number(categoryIdProp));
      setCategoryName(result.category_name);

      const colorFound = colors.find((color) => color.value === result.color);
      if (colorFound) setColor(colorFound);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleEditCategory = async () => {
    try {
      const result: boolean = await editCategory(
        token,
        Number(categoryIdProp),
        categoryName,
        color.value
      );

      if (result) {
        createToastClass("Categoría editada");
        router.push("categories");
      }
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result: boolean = await deleteCategory(
        Number(categoryIdProp),
        token
      );
      if (result) {
        createToastClass("Categoría eliminada");
        router.push("categories");
      }
    } catch (error) {
      customAlert(error.message);
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
        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value) => {
            const colorFound = colors.find((color) => color.value === value);
            if (colorFound) setColor(colorFound);
          }}
          items={colors.map((color) => {
            return {
              label: color.label,
              value: color.value,
            };
          })}
          value={color.value}
          style={{
            inputAndroid: {
              borderColor: "red",
              borderRadius: 4,
              borderWidth: 1,
              color: "black",
              backgroundColor: color.hexadecimal,
              marginTop: 10,
              marginBottom: 10,
            },
            inputIOS: {
              borderColor: "red",
              borderRadius: 4,
              borderWidth: 1,
              color: "black",
              backgroundColor: color.hexadecimal,
              marginTop: 10,
              marginBottom: 10,
            },
          }}
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
