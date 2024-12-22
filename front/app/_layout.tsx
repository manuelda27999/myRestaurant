import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import "./../global.css";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { getData } from "../utilities/encryptedStorage";

const RootRender = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialRouteName, setInitialRouteName] = useState<string>("index");

  const handleGetId = async () => {
    try {
      const resultToken = await getData("token");
      setToken(resultToken);
      setInitialRouteName(setToken ? "(home)" : "index");
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetId();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.replace("(home)/tables");
      } else {
        router.replace("/");
      }
    }
  }, [isLoading, token]);

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
