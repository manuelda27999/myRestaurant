import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="tables" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-table-modal"
        options={{ presentation: "modal", title: "Nueva mesa" }}
      />
    </Stack>
  );
};

export default Layout;
