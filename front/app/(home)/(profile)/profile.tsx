import { Pressable, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import storage from "../../../utilities/encryptedStorage";
import getNameById from "../../../logic/getNameById";
import { router } from "expo-router";

const Profile = () => {
  const [name, setName] = useState<string>("un desconocido");
  const [userId, setUserId] = useState<number | null>(null);

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
    handleGetNameById();
  }, [userId]);

  return (
    <View className="w-full h-full flex flex-col justify-between items-center py-4">
      <Text className="font-bold text-xl text-center">Hola {name}</Text>
      <View className="h-max"></View>
      <Pressable
        onPress={() => {
          console.log("hola mundo");
          router.push("./log-out");
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
