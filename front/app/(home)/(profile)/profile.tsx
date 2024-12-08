import { Pressable, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import storage from "../../../utilities/encryptedStorage";
import getNameById from "../../../logic/getNameById";
import { router } from "expo-router";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  debugger;
  const getUserId = async () => {
    const userIdResult = await storage.getData("user_id");

    setUserId(Number(userIdResult));
  };

  const handleGetNameById = async () => {
    try {
      const result = await getNameById(userId);

      if (result && typeof result === "string") {
        setName(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserId();
    if (userId !== null) {
      handleGetNameById();
    }
  }, [userId]);

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
    </View>
  );
};

export default Profile;
