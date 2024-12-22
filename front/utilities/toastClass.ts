import Toast from "react-native-root-toast";

export default function createToastClass(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    backgroundColor: "red",
    textColor: "white",
    shadow: true,
    animation: true,
  });
}
