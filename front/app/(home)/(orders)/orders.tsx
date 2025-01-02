import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utilities/encryptedStorage";
import getOrders from "../../../logic/orders/getOrders";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import classNames from "classnames";

type Order = {
  order_id: number;
  table_id: number;
  table_name: string;
  product_id: number;
  product_name: string;
  quantity: number;
  price: null;
  total: null;
  order_date: string;
  status: string;
  invoice_id: number;
};

const Orders = () => {
  const [token, setToken] = useState<string | null>(null);
  const [orders, setOrders] = useState<Array<Order>>([]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetOrders = async () => {
    try {
      const result = await getOrders(token);

      console.log(result);
      setOrders(result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token !== null) {
      handleGetOrders();
    }
  }, [token]);

  return (
    <View className="flex flex-1 items-center w-full">
      <ScrollView className="flex flex-col w-full">
        {orders.map((order) => (
          <View key={order.order_id} className="flex flex-col border-b-4">
            <View className="px-2 border-b-2">
              <Text className="text-xl">{order.table_name}</Text>
              <Text>
                {order.product_name} X {order.quantity}
              </Text>
              <Text className="">Fecha: {order.order_date}</Text>
            </View>
            <View
              className={classNames(
                "px-2 flex flex-row items-center justify-between w-full",
                {
                  "bg-red-100": order.status === "PENDING",
                  "bg-yellow-100": order.status === "PREPARING",
                  "bg-green-100": order.status === "READY",
                  "bg-green-300": order.status === "DELIVERED",
                }
              )}
            >
              <Text className="w-2/5 font-semibold text-lg">
                {order.status === "PENDING"
                  ? "Pendiente"
                  : order.status === "PREPARING"
                  ? "Preparando"
                  : order.status === "READY"
                  ? "Listo"
                  : "Entregado"}
              </Text>
              <View className="flex flex-row-reverse w-2/5 gap-6 py-1 pr-1">
                <FontAwesome6
                  name="file-invoice-dollar"
                  size={28}
                  color="black"
                />
                <MaterialIcons name="edit" size={32} color="black" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable
        className="bg-red-600 w-2/4 my-3 py-3 rounded-2xl"
        /*               onPress={() => router.push("(tables)/new-table-modal")}
         */
      >
        <Text className="text-center text-white text-xl font-extrabold">
          Nueva orden
        </Text>
      </Pressable>
    </View>
  );
};

export default Orders;
