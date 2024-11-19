import { Tabs } from "expo-router";
import React from "react";

const HomeTabs = () => {
  return (
    <Tabs>
      <Tabs.Screen name="tables" options={{ headerShown: false }} />
      <Tabs.Screen name="orders" options={{ headerShown: false }} />
      <Tabs.Screen name="products" options={{ headerShown: false }} />
      <Tabs.Screen name="invoices" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default HomeTabs;
