import { Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import getTable from "../../../logic/tables/getTable";
import { getData } from "../../../utilities/encryptedStorage";
import { useSearchParams } from "expo-router/build/hooks";
import deleteTable from "../../../logic/tables/deleteTable";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import editTable from "../../../logic/tables/editTable";
import createToastClass from "../../../utilities/toastClass";

type Table = {
  available: boolean;
  table_id: number;
  table_name: string;
  user_id: null;
};

const EditTableModal = () => {
  const [tableIdProp] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [tableName, setTableName] = useState<string>("");
  const [available, setAvailable] = useState<boolean>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetTable = async () => {
    try {
      const tableIdNumber = Number(tableIdProp[1]);

      const result: Table | string = await getTable(tableIdNumber, token);

      if (typeof result === "object") {
        setTableName(result.table_name);
        setAvailable(result.available);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEditTable = async () => {
    try {
      const tableIdNumber = Number(tableIdProp[1]);

      const result: boolean | string = await editTable(
        tableIdNumber,
        tableName,
        available,
        token
      );
      if (result && typeof result === "boolean") {
        createToastClass("Mesa editada");
        router.push("tables");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTable = async () => {
    try {
      const tableIdNumber = Number(tableIdProp[1]);

      const result: boolean | string = await deleteTable(tableIdNumber, token);
      if (result && typeof result === "boolean") {
        createToastClass("Mesa eliminada");
        router.push("tables");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();

    if (token != null) {
      handleGetTable();
    }
  }, [token]);

  return (
    <View className="w-full h-full flex flex-col justify-start items-center py-4 px-8">
      <View className="flex flex-col flex-1 w-full items-center">
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
          onPress={() => handleEditTable()}
          className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2"
        >
          <Text className="text-white font-semibold text-3xl text-center">
            Editar
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handleDeleteTable()}
        className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center mt-2 mb-4"
      >
        <Text className="text-white font-semibold text-3xl text-center">
          Eliminar
        </Text>
      </Pressable>
    </View>
  );
};

export default EditTableModal;
