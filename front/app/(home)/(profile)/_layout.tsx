import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="log-out"
        options={{ presentation: "modal", title: "Cerrar sesión" }}
      />
    </Stack>
  );
};

export default Layout;
