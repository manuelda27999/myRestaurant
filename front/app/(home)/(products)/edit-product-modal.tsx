import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { router } from "expo-router";
import { getData } from "../../../utilities/encryptedStorage";
import createToastClass from "../../../utilities/toastClass";
import getProduct from "../../../logic/products/getProduct";
import editProduct from "../../../logic/products/editProduct";
import getCategory from "../../../logic/categories/getCategory";
import deleteProduct from "../../../logic/products/deleteProduct";
import customAlert from "../../../utilities/customAlert";

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

const EditProductModal = () => {
  const [token, setToken] = useState<string | null>(null);
  const { productIdProp } = useLocalSearchParams<{ productIdProp: string }>();
  const [productName, setProductName] = useState<string>(null);
  const [description, setDescription] = useState<string>(null);
  const [ingredients, setIngredients] = useState<string>(null);
  const [allergens, setAllergens] = useState<string>(null);
  const [price, setPrice] = useState<string>(null);
  const [categoryId, setCategoryId] = useState<number>(null);
  const [categoryName, setCategoryName] = useState<string>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetProduct = async () => {
    try {
      const result: Product = await getProduct(token, Number(productIdProp));
      setProductName(result.product_name);
      setDescription(result.description);
      setIngredients(result.ingredients);
      setAllergens(result.allergens);
      setPrice(result.price.toString());
      setCategoryId(result.category_id);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleGetCategory = async () => {
    try {
      const result = await getCategory(token, categoryId);
      setCategoryName(result.category_name);
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleEditProduct = async () => {
    try {
      const result: boolean = await editProduct(token, Number(productIdProp), {
        product_name: productName,
        description: description,
        ingredients: ingredients,
        allergens: allergens,
        price: Number(price),
      });

      if (result) {
        createToastClass("Producto editado");
        router.push({
          pathname: "one-category",
          params: {
            categoryIdProp: categoryId,
            categoryNameProp: categoryName,
          },
        });
      }
    } catch (error) {
      customAlert(error.message);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const result: boolean = await deleteProduct(token, Number(productIdProp));
      if (result) {
        createToastClass("Producto eliminada");
        router.push({
          pathname: "one-category",
          params: {
            categoryIdProp: categoryId,
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
      handleGetProduct();
    }
  }, [token]);

  useEffect(() => {
    if (categoryId) {
      handleGetCategory();
    }
  }, [categoryId]);

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
          onPress={() => handleEditProduct()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Editar
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handleDeleteProduct()}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2 mb-4"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Eliminar
        </Text>
      </Pressable>
    </View>
  );
};

export default EditProductModal;
