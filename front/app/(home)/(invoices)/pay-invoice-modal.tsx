import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Link } from "expo-router";
import changePayment from "../../../logic/invoices/changePayment";
import { useState } from "react";
import { getData } from "../../../utilities/encryptedStorage";
import createToastClass from "../../../utilities/toastClass";
import { router } from "expo-router";

const PayModal = () => {
  const { invoiceIdProp } = useLocalSearchParams();
  const [token, setToken] = useState<string>(null);

  const getToken = async () => {
    const tokenResult = await getData("token");

    setToken(tokenResult);
  };

  const handleChangePaid = async () => {
    try {
      const result = await changePayment(token, Number(invoiceIdProp));

      if (result) {
        createToastClass("Factura pagada");
        router.push("invoices");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View className="w-full h-full flex flex-col justify-center items-center py-6">
      <View className="w-full flex flex-1">
        <Text className="font-bold text-2xl text-center ">
          Confirma que quieres pagar la factura
        </Text>
        <View className="w-full flex flex-col items-center py-8">
          <Pressable
            onPress={() => {
              handleChangePaid();
            }}
            className="bg-red-600 rounded-lg w-1/2 h-12 flex justify-center"
          >
            <Text className="text-white text-3xl text-center">Confirmar</Text>
          </Pressable>
        </View>
      </View>
      <Link
        className="text-red-800 font-bold underline mt-4 text-lg"
        href={"invoices"}
      >
        Cancelar
      </Link>
    </View>
  );
};

export default PayModal;
