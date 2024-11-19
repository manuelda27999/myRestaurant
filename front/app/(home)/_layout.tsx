import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HomeTabs = () => {
  return (
    <Tabs
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
        headerRight: () => (
          <View className="mr-4">
            <TouchableOpacity>
              <Ionicons name="settings-sharp" size={28} color="white" />
            </TouchableOpacity>
          </View>
        ),
        tabBarStyle: {
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="tables"
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
    </Tabs>
  );
};

export default HomeTabs;
