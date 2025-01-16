import { Pressable, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getData } from "../../utilities/encryptedStorage";
import getNameById from "../../logic/users/getNameById";
import { router, Link } from "expo-router";

const Profile = (props) => {
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetNameById = async () => {
    try {
      const result = await getNameById(token);

      if (result && typeof result === "string") {
        setName(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token !== null) {
      handleGetNameById();
    }
  }, [token]);

  return (
    <View className="w-full h-full flex flex-col justify-between items-center py-4">
      <Text className="font-bold text-lg text-center px-10">
        Hola {name}, bienvenido a tu perfil, aquí podrás editar tu nombre y tu
        contraseña.
      </Text>
      <View className="flex-1 flex-col py-4 ">
        <Pressable
          onPress={() => {
            router.push("./change-name-modal");
          }}
          className="border-red-700 border-4 px-8 py-3 rounded-xl"
        >
          <Text className="text-xl font-semibold text-center">
            Cambiar nombre
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("./change-password-modal");
          }}
          className="border-red-700 border-4 px-8 py-3 rounded-xl mt-4"
        >
          <Text className="text-xl font-semibold text-center">
            Cambiar contraseña
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          router.push("./log-out-modal");
        }}
        className="border-y-2 border-red-700 py-2 w-full"
      >
        <Text className="text-red-700 text-xl text-center font-extrabold">
          Cerrar sesión
        </Text>
      </Pressable>
      <Pressable className="mb-4 mt-8" onPress={() => router.back()}>
        <Text className="text-red-800 font-bold underline text-lg">
          Volver atrás
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
