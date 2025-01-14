import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import getNameById from "../../../logic/users/getNameById";
import { getData } from "../../../utilities/encryptedStorage";
import getTables from "../../../logic/tables/getTables";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

type Table = {
  table_id: number;
  table_name: string;
  available: boolean;
};

const Tables = () => {
  const [name, setName] = useState<string>("un desconocido");
  const [token, setToken] = useState<string | null>(null);
  const [tables, setTables] = useState<Array<Table>>([]);

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
      alert(error);
    }
  };

  const handleGetTables = async () => {
    try {
      const result = await getTables(token);

      if (result && typeof result != "string") setTables(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token !== null) {
      handleGetNameById();
      handleGetTables();
    }
  }, [token]);

  return (
    <View className="flex flex-1 items-center">
      <Text className="text-center text-xl font-bold py-2 border-solid border-b-2 w-full">
        {name}
      </Text>
      <View className="flex flex-1 flex-col border-solid w-full">
        {tables.map((table) => (
          <View
            key={table.table_id}
            className="border-b-2 border-solid px-4 py-1 flex flex-row w-full"
          >
            <View className="flex flex-col w-3/6">
              <Text className="text-lg font-bold">{table.table_name}</Text>
              <Text className="text-lg">
                {table.available ? "Libre" : "Ocupada"}
              </Text>
            </View>
            <View className="flex flex-row flex-1 h-full justify-end items-center gap-8">
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "new-order-modal",
                    params: { tableIdProp: table.table_id },
                  })
                }
              >
                <MaterialCommunityIcons
                  name="file-document-edit-outline"
                  size={34}
                  color="black"
                />
              </Pressable>

              <Pressable>
                <FontAwesome6
                  name="file-invoice-dollar"
                  size={28}
                  color="black"
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "edit-table-modal",
                    params: { tableIdProp: table.table_id },
                  })
                }
              >
                <MaterialIcons name="edit" size={32} color="black" />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      <Pressable
        className="bg-red-600 w-2/4 my-4 py-3 rounded-2xl"
        onPress={() => router.push("(tables)/new-table-modal")}
      >
        <Text className="text-center text-white text-xl font-extrabold">
          Nueva mesa
        </Text>
      </Pressable>
    </View>
  );
};

export default Tables;
