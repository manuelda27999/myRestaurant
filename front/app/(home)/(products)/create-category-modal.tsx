import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import createCategory from "../../../logic/categories/createCategory";
import { getData } from "../../../utilities/encryptedStorage";
import { router } from "expo-router";
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

const CreateCategoryModal = () => {
  const [categoryName, setCategoryName] = useState<string>(null);
  const [token, setToken] = useState<string>(null);
  const [color, setColor] = useState<Color>(colors[0]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleCreateCategory = async () => {
    try {
      const result = await createCategory(token, categoryName, color.value);

      if (result) {
        createToastClass("Categoría creada");
        router.push("categories");
      }
    } catch (error) {
      customAlert(error.message);
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
        onPress={() => {
          handleCreateCategory();
        }}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Crear
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateCategoryModal;
