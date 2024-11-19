import React from "react";
import { Stack } from "expo-router";
import "./../global.css";

const RootRender = () => {
  return (
    <Stack>
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
  );
};

export default RootRender;
