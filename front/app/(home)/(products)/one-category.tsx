import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import storage from "../../../utilities/encryptedStorage";

const OneCategory = ({ route }) => {
  const [token, setToken] = useState(null);
  const { categoryIdProp, categoryNameProp } = useLocalSearchParams<{
    categoryIdProp: string;
    categoryNameProp: string;
  }>();

  const getToken = async () => {
    const tokenResult = await storage.getData("token");

    setToken(tokenResult);
  };

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <View>
      <Text>Hola mundo</Text>
    </View>
  );
};

export default OneCategory;
