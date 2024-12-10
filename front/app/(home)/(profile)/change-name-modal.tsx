import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { router, Link } from "expo-router";
import storage from "../../../utilities/encryptedStorage";
import getNameById from "../../../logic/getNameById";
import { TextInput } from "react-native";
import changeNameUser from "../../../logic/changeName";
import Toast from "react-native-root-toast";

const ChangeNameModal = () => {
  const [newName, setNewName] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const userNameChangeToast = () => {
    Toast.show("Nombre de usuario actualizado con éxito", {
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

  const handleGetNameById = async () => {
    try {
      const result = await getNameById(token);

      if (result && typeof result === "string") {
        setNewName(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeName = () => {
    try {
      changeNameUser(token, newName)
        .then(() => {
          userNameChangeToast();

          router.push("profile", { relativeToDirectory: true });
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (Error) {
      alert(Error);
    }
  };

  useEffect(() => {
    getToken();
    if (token !== null) {
      handleGetNameById();
    }
  }, [token]);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <Text className="font-bold text-2xl text-center ">
        Introuduce tu nuevo nombre de usuario
      </Text>
      <TextInput
        placeholder="Nuevo nombre"
        placeholderTextColor="rgb(248, 113, 113)"
        value={newName}
        onChangeText={setNewName}
        autoCapitalize="none"
        className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
      />
      <Pressable
        onPress={() => {
          handleChangeName();
        }}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Cambiar
        </Text>
      </Pressable>
      <Link
        className="text-red-800 font-bold underline mt-4 text-lg"
        href={"profile"}
      >
        Cancelar
      </Link>
    </View>
  );
};

export default ChangeNameModal;
