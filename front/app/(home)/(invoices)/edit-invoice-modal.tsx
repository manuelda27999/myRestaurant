import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, TextInput, ScrollView, Pressable } from "react-native";
import { getData } from "../../../utilities/encryptedStorage";
import getInvoice from "../../../logic/invoices/getInvoice";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import editInvoice from "../../../logic/invoices/editInvoice";
import createToastClass from "../../../utilities/toastClass";
import getTables from "../../../logic/tables/getTables";
import RNPickerSelect from "react-native-picker-select";
import { useIsFocused } from "@react-navigation/core";

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

type Table = {
  table_id: number;
  table_name: string;
  available: boolean;
};

const pickerSelectStyles = {
  inputAndroid: {
    borderColor: "red",
    borderRadius: 4,
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  inputIOS: {
    borderColor: "red",
    borderRadius: 4,
    borderWidth: 1,
    color: "black",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
};

const EditInvoiceModal = () => {
  const isFocused = useIsFocused();

  const { invoiceIdProp } = useLocalSearchParams<{ invoiceIdProp: string }>();
  const [token, setToken] = useState<string>(null);
  const [invoice, setInvoice] = useState<Invoice>(null);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [tables, setTables] = useState<Array<Table>>([]);
  const [tableId, setTableId] = useState<number>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleGetInvoice = async () => {
    try {
      const invoiceIdNumber = Number(invoiceIdProp);

      const result: Invoice | string = await getInvoice(token, invoiceIdNumber);

      if (result) {
        setInvoice(result);
        setOrders(result.orders);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleGetTables = async () => {
    try {
      const resultTables = await getTables(token);

      if (resultTables) {
        setTables(resultTables);

        if (invoice) {
          const tableSelected = resultTables.find(
            (table) => table.table_name === invoice.table_name
          );
          setTableId(tableSelected.table_id);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEditInvoice = async () => {
    try {
      const result = await editInvoice(token, invoice.invoice_id, tableId);

      if (result) {
        createToastClass("Factura editada correctamente");
        router.back();
      }

      if (result) {
        router.back();
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
    if (token) {
      handleGetInvoice();
    }
  }, [token, isFocused]);

  useEffect(() => {
    if (invoice) {
      handleGetTables();
    }
  }, [invoice]);

  return (
    <View className="w-full h-full flex items-center justify-start py-4 px-8">
      <Text className="font-bold text-xl">
        Fecha: {invoice ? invoice.invoice_date : ""}
      </Text>
      <Text className="w-full text-lg font-semibold mt-4 pl-2">Mesa:</Text>
      <RNPickerSelect
        onValueChange={(value) => setTableId(value)}
        items={tables.map((table) => {
          return {
            label: table.table_name,
            value: table.table_id,
          };
        })}
        placeholder={{ label: "Seleccione una mesa", value: null }}
        value={tableId}
        style={pickerSelectStyles}
      />
      <ScrollView className="flex flex-col w-full">
        {orders.map((order) => (
          <View
            key={order.order_id}
            className="flex flex-col w-full border-b-2 border-dashed mb-4"
          >
            <View className="w-full flex items-end">
              <Pressable
                className="w-10 flex items-end"
                onPress={() => {
                  router.push({
                    pathname: "edit-order-modal",
                    params: { orderIdProp: order.order_id },
                  });
                }}
              >
                <MaterialIcons name="edit" size={26} color="black" />
              </Pressable>
            </View>
            <View className="flex flex-row w-full">
              <Text className="text-base w-3/5 ">{order.product_name}</Text>
              <Text className="text-base w-2/5  text-right">
                {order.price} X {order.quantity} = {order.total}€
              </Text>
            </View>
            <Text className="text-base">{order.order_date}</Text>
            <Text className="text-base font-semibold">
              {order.status === "PENDING"
                ? "Pendiente"
                : order.status === "PREPARING"
                ? "Preparando"
                : order.status === "READY"
                ? "Listo"
                : "Entregado"}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex flex-row justify-between">
        <Text className="text-lg font-bold">Total: </Text>
        <Text className="text-lg font-bold">
          {invoice ? invoice.total : ""}€
        </Text>
      </View>
      <View className="w-full flex flex-col items-center">
        <Pressable
          className="bg-red-600 w-2/4 my-3 py-3 rounded-2xl"
          onPress={() => {
            handleEditInvoice();
          }}
        >
          <Text className="text-center text-white text-xl font-extrabold">
            Editar factura
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditInvoiceModal;
