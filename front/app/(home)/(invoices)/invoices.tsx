import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getData } from "../../../utilities/encryptedStorage";
import getInvoices from "../../../logic/invoices/getInvoices";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import classNames from "classnames";
import customAlert from "../../../utilities/customAlert";

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

type Invoice = {
  invoice_id: number;
  total: number;
  invoice_date: string;
  paid: boolean;
  table_name: string;
  orders: Array<Order>;
};

const Invoices = () => {
  const isFocused = useIsFocused();

  const [token, setToken] = useState<string>(null);
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetInvoices = async () => {
    try {
      const result = await getInvoices(token);

      if (result && result.length > 0) setInvoices(result);
    } catch (error) {
      customAlert(error.message);
    }
  };

  useEffect(() => {
    getToken();

    if (token) {
      handleGetInvoices();
    }
  }, [token, isFocused]);

  return (
    <View className="flex flex-1 w-full items-center">
      <ScrollView className="flex flex-col w-full">
        {invoices.length ? (
          invoices.map((invoice) => (
            <View
              className="border-solid border-b-2 border-gray-300 w-full py-2 px-2 flex flex-column justify-between"
              key={invoice.invoice_id}
            >
              <View className="flex flex-row w-full justify-between">
                <View className="flex flex-col pb-1 w-2/3 ">
                  <Text className="text-xl font-bold">
                    {invoice.invoice_date}
                  </Text>
                  <Text className="text-lg">{invoice.table_name}</Text>
                  <Text className="text-lg">Comandas</Text>
                </View>
                <Pressable
                  className="w-12 flex items-end "
                  onPress={() => {
                    router.push({
                      pathname: "edit-invoice-modal",
                      params: { invoiceIdProp: invoice.invoice_id },
                    });
                  }}
                >
                  <MaterialIcons name="edit" size={32} color="black" />
                </Pressable>
              </View>
              <View className="flex flex-col w-full border-y-2 border-dashed py-1">
                {invoice.orders.map((order) => (
                  <View
                    key={order.order_id}
                    className="flex flex-row justify-between w-full"
                  >
                    <Text className="">{order.product_name}</Text>
                    <Text className="">
                      {order.price} X {order.quantity} = {order.total}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex flex-col w-full">
                <View className="flex flex-row justify-between w-full">
                  <Text className=" text-lg font-semibold">Total</Text>
                  <Text className=" text-lg font-semibold">
                    {invoice.total}
                  </Text>
                </View>
                <View className="flex flex-row justify-center w-full mt-2">
                  <Pressable
                    className={classNames(" w-1/4 my-1 py-1 rounded-2xl", {
                      "bg-green-600": invoice.paid,
                      "bg-red-600": !invoice.paid,
                    })}
                    onPress={() => {
                      if (!invoice.paid) {
                        router.push({
                          pathname: "pay-invoice-modal",
                          params: { invoiceIdProp: invoice.invoice_id },
                        });
                      }
                    }}
                  >
                    <Text className="text-center text-white text-lg font-extrabold">
                      {invoice.paid ? "Pagado" : "Pagar"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text className="text-xl w-full text-center my-6 px-12 ">
            No se ha encontrado ninguna factura
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Invoices;
