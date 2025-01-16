import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import loginUser from "../logic/users/loginUser";
import { setData } from "../utilities/encryptedStorage";
import customAlert from "../utilities/customAlert";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const token = await loginUser(email, password);
      if (token && typeof token === "string") {
        setEmail("");
        setPassword("");

        await setData("token", token);

        router.replace("(home)/tables");
      }
    } catch (error: any) {
      customAlert(error.message);
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl font-bold text-black mb-6">
        ¡Bienvenid@ a myRestaurant!
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="rgb(248, 113, 113)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        className="w-full mb-4 p-4 border-2 border-red-500 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-700"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="rgb(248, 113, 113)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        className="w-full mb-4 p-4 border-2 border-red-500 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-700"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-red-500 py-3 rounded-lg shadow-md active:bg-red-700 hover:scale-105"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      <Text className="mt-4 text-red-600">¿No tienes una cuenta?</Text>
      <Link
        href={"/register"}
        className="mt-2 text-red-800 font-bold underline"
      >
        Regístrate aquí
      </Link>
    </View>
  );
};

export default Login;
