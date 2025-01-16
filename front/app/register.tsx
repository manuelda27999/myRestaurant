import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import registerUser from "./../logic/users/registerUser";
import customAlert from "./../utilities/customAlert";
import createToastClass from "../utilities/toastClass";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {
    try {
      registerUser(name, email, password)
        .then((result) => {
          if (result) {
            createToastClass("Usuario registrado con éxito");
            setName("");
            setEmail("");
            setPassword("");
            router.replace("/");
          }
        })
        .catch((error) => {
          customAlert(error.message);
        });
    } catch (error) {
      customAlert(error.message);
    }
  };

  return (
    <View className="flex flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl font-bold text-black mb-6">
        ¡Unete y organiza tu negocio!
      </Text>

      <TextInput
        className="w-full mb-4 p-4 border-2 border-red-500 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-600"
        placeholder="Nombre de usuario"
        placeholderTextColor="rgb(248, 113, 113)"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full mb-4 p-4 border-2 border-red-500 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-600"
        placeholder="Correo electrónico"
        placeholderTextColor="rgb(248, 113, 113)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full mb-4 p-4 border-2 border-red-500 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-600"
        placeholder="Contraseña"
        placeholderTextColor="rgb(248, 113, 113)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="w-full bg-red-500 py-3 rounded-lg shadow-md active:bg-red-700 hover:scale-105"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Registrar
        </Text>
      </TouchableOpacity>

      <Text className="mt-4 text-red-600">Ya tengo una cuenta</Text>
      <Link href={"/"} className="mt-2 text-red-800 font-bold underline">
        Iniciar sesión
      </Link>
    </View>
  );
};

export default Register;
