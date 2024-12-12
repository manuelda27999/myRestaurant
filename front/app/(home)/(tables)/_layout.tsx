import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="tables" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
