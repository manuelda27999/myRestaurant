import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import storage from "../../../utilities/encryptedStorage";
import Toast from "react-native-root-toast";
import changePassword from "../../../logic/changePassword";

const ChangePasswordModal = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>("");

  const passwordChangeToast = () => {
    Toast.show("Contraseña actualizada correctamente", {
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

  const handleChangePassword = async () => {
    try {
      changePassword(token, currentPassword, newPassword, newPasswordRepeat)
        .then(() => {
          passwordChangeToast();

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
  }, [token]);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4">
      <Text className="font-bold text-2xl text-center ">
        Introduce tu contraseña actual y la nueva contraseña
      </Text>
      <View className="w-full flex flex-column justify-evenly pt-2 px-8">
        <TextInput
          placeholder="Contraseña actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          autoCapitalize="none"
          secureTextEntry
          className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Nueva contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          autoCapitalize="none"
          secureTextEntry
          className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
        <TextInput
          placeholder="Repite la nueva contraseña"
          value={newPasswordRepeat}
          onChangeText={setNewPasswordRepeat}
          autoCapitalize="none"
          secureTextEntry
          className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
        />
      </View>
      <Pressable
        onPress={() => handleChangePassword()}
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

export default ChangePasswordModal;
