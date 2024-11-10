import { View, Text, StyleSheet, Image } from "react-native";

const Home: React.FC = () => {
  return (
    <View className="flex flex-1 justify-center items-center bg-white p-6">
      <Text className="text-3xl text-red-500 font-bold p-3">Bienbenido!!</Text>
      <Text className="text-xl font-semibold">
        Comienza registrando tu carta
      </Text>
    </View>
  );
};

export default Home;
