import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { router } from "expo-router";
import { getData } from "../../../utilities/encryptedStorage";
import createToastClass from "../../../utilities/toastClass";
import createProduct from "../../../logic/products/createProduct";
import getCategory from "../../../logic/categories/getCategory";
import customAlert from "../../../utilities/customAlert";

const CreateProductModal = () => {
  const { categoryIdProp } = useLocalSearchParams<{ categoryIdProp: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);
  const [ingredients, setIngredients] = useState<string>(null);
  const [allergens, setAllergens] = useState<string>(null);
  const [price, setPrice] = useState<string>(null);
  const [categoryName, setCategoryName] = useState<string>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetCategory = async () => {
    try {
      const result = await getCategory(token, Number(categoryIdProp));
      setCategoryName(result.category_name);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const result: boolean = await createProduct(
        token,
        Number(categoryIdProp),
        {
          product_name: productName,
          description: description,
          ingredients: ingredients,
          allergens: allergens,
          price: Number(price),
        }
      );

      if (result) {
        createToastClass("Producto creado");
        router.push({
          pathname: "one-category",
          params: {
            categoryIdProp: categoryIdProp,
            categoryNameProp: categoryName,
          },
        });
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
          placeholder="Nombre del producto"
          placeholderTextColor="rgb(248, 113, 113)"
          value={productName}
          onChangeText={setProductName}
          autoCapitalize="sentences"
          multiline={true}
          className="w-full my-2 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Descripción"
          placeholderTextColor="rgb(248, 113, 113)"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          multiline={true}
          className="w-full h-min my-2 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Ingredientes"
          placeholderTextColor="rgb(248, 113, 113)"
          value={ingredients}
          onChangeText={setIngredients}
          autoCapitalize="sentences"
          multiline={true}
          className="w-full h-min my-2 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Alérgenos"
          placeholderTextColor="rgb(248, 113, 113)"
          value={allergens}
          onChangeText={setAllergens}
          autoCapitalize="sentences"
          multiline={true}
          className="w-full h-min my-2 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Precio"
          placeholderTextColor="rgb(248, 113, 113)"
          value={price}
          onChangeText={setPrice}
          autoCapitalize="sentences"
          multiline={true}
          keyboardType="decimal-pad"
          className="w-full h-min my-2 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <Pressable
          onPress={() => handleCreateProduct()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Crear
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateProductModal;
