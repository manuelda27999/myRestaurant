import { Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";
import storage from "../../../utilities/encryptedStorage";

const Logout = () => {
  const handleCancelLogout = () => {
    router.push("profile", { relativeToDirectory: true });
  };

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4">
      <Text className="font-bold text-2xl text-center ">
        ¿Quieres cambiar tu contraseña?
      </Text>
      <View className="w-full flex flex-row justify-evenly py-8">
        <Pressable
          onPress={() => {}}
          className="bg-red-600 rounded-lg w-1/3 h-12 flex justify-center"
        >
          <Text className="text-white text-3xl text-center">Si</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleCancelLogout();
          }}
          className="bg-red-600 rounded-lg w-1/3 h-12 flex justify-center"
        >
          <Text className="text-white text-3xl text-center">No</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Logout;
