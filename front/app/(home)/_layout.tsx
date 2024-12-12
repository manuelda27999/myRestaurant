import { Tabs, Stack } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const HomeTabs = () => {
  return (
    <Tabs
      initialRouteName="(tables)"
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
        },
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="(tables)"
        options={{
          title: "Mesas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="table-restaurant" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-ul" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          title: "Facturas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="file-invoice-dollar" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default HomeTabs;
