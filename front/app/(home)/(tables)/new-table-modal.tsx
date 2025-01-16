import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { getData } from "../../../utilities/encryptedStorage";
import createTable from "../../../logic/tables/createTable";
import createToastClass from "../../../utilities/toastClass";
import customAlert from "../../../utilities/customAlert";

const NewTableModal = () => {
  const [tableName, setTableName] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleCreateTable = async () => {
    try {
      const result = await createTable(tableName, available, token);

      if (result) {
        createToastClass("Mesa creada");

        router.push("tables");
      }
    } catch (error) {
      customAlert(error.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <Text className="font-bold text-2xl text-center ">
        Introuduce el nombre de la mesa
      </Text>
      <TextInput
        placeholder="Nombre de la mesa"
        placeholderTextColor="rgb(248, 113, 113)"
        value={tableName}
        onChangeText={setTableName}
        autoCapitalize="sentences"
        className="w-full my-4 p-4 border-2 border-red-700 rounded-lg bg-white shadow-sm focus:outline-none focus:border-red-800"
      />
      <Pressable
        onPress={() => {
          setAvailable(!available);
        }}
        className="w-full mb-4 p-3 border-2 border-red-700 rounded-lg bg-white shadow-sm "
      >
        <Text className="text-red-700 font-semibold text-xl text-center">
          {available ? "Libre" : "Ocupada"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          handleCreateTable();
        }}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Crear
        </Text>
      </Pressable>
      <Link
        className="text-red-800 font-bold underline mt-4 text-lg"
        href={"tables"}
      >
        Cancelar
      </Link>
    </View>
  );
};

export default NewTableModal;
