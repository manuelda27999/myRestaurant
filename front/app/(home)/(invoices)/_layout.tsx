import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="invoices" options={{ headerShown: false }} />
      <Stack.Screen
        name="pay-invoice-modal"
        options={{ presentation: "modal", title: "Pagar factura" }}
      />
    </Stack>
  );
};

export default Layout;
