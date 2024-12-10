import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import getNameById from "../../logic/getNameById";
import storage from "../../utilities/encryptedStorage";

const Tables = () => {
  const [name, setName] = useState<string>("un desconocido");
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    const tokenResult = await storage.getData("token");

    setToken(tokenResult);
  };

  const handleGetNameById = async () => {
    try {
      const result = await getNameById(token);

      if (result && typeof result === "string") {
        setName(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token !== null) {
      handleGetNameById();
    }
  }, [token]);

  return (
    <View className="flex flex-1">
      <Text>Hola mundo, soy {name}</Text>
    </View>
  );
};

export default Tables;
