import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import "./../global.css";
import storage from "../utilities/encryptedStorage";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

const RootRender = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("index");

  const handleGetId = async () => {
    try {
      const resultUserId = await storage.getData("user_id");
      setUserId(resultUserId);
      setInitialRouteName(setUserId ? "(home)" : "index");
    } catch (error) {
      console.error("Error retrieving user_id:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetId();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (userId) {
        router.replace("(home)/tables");
      } else {
        router.replace("/");
      }
    }
  }, [isLoading, userId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <RootSiblingParent>
      <Stack initialRouteName={initialRouteName}>
        <Stack.Screen
          name="index"
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "Register", headerShown: false }}
        />
        <Stack.Screen
          name="(home)"
          options={{ title: "Home", headerShown: false }}
        />
      </Stack>
    </RootSiblingParent>
  );
};

export default RootRender;
