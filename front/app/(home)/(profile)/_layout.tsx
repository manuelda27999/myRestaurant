import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen
        name="log-out-modal"
        options={{ presentation: "modal", title: "Cerrar sesión" }}
      />
      <Stack.Screen
        name="change-name-modal"
        options={{ presentation: "modal", title: "Cambiar nombre" }}
      />
      <Stack.Screen
        name="change-password-modal"
        options={{ presentation: "modal", title: "Cambiar contraseña" }}
      />
    </Stack>
  );
};

export default Layout;
