import { Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const Layout = () => {
  type OneCategoryParams = {
    categoryNameProp?: string;
    categoryIdProp?: string;
  };

  return (
    <Stack>
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-category-modal"
        options={{ presentation: "modal", title: "Nueva categoría" }}
      />
      <Stack.Screen
        name="edit-category-modal"
        options={{ presentation: "modal", title: "Editar categoría" }}
      />
      <Stack.Screen
        name="one-category"
        options={({ route }: { route: { params?: OneCategoryParams } }) => ({
          presentation: "card",
          title: route.params.categoryNameProp || "Categoría",
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "edit-category-modal",
                  params: {
                    categoryIdProp: route.params.categoryIdProp,
                  },
                });
              }}
            >
              <MaterialIcons name="edit" size={28} color="black" />
            </Pressable>
          ),
        })}
      />
    </Stack>
  );
};

export default Layout;
