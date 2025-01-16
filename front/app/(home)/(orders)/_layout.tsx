import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="orders" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-order-modal"
        options={{ presentation: "modal", title: "Editar comanda" }}
      />
      <Stack.Screen
        name="new-order-modal"
        options={{ presentation: "modal", title: "Nueva comanda" }}
      />
    </Stack>
  );
};

export default Layout;
