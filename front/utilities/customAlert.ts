import { Alert } from "react-native";

const customAlert = function (message: string) {
  Alert.alert("Error", message);
};

export default customAlert;
