import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import getNameById from "../../logic/getNameById";
import storage from "../../utilities/encryptedStorage";

const Tables = () => {
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
    if (userId !== null) {
      handleGetNameById();
    }
  }, [userId]);

  return (
    <View className="flex flex-1">
      <Text>Hola mundo, soy {name}</Text>
    </View>
  );
};

export default Tables;
