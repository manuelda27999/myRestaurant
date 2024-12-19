import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="product-categories"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create-category-modal"
        options={{ presentation: "modal", title: "Nueva categoría" }}
      />
      {/* <Stack.Screen
        name="edit-table-modal"
        options={{ presentation: "modal", title: "Editar mesa" }}
      /> */}
    </Stack>
  );
};

export default Layout;
