import { Alert } from "react-native";

interface RegisterUserResponse {
  error?: string;
}

export default async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<void | RegisterUserResponse> {
  const response = await fetch(
    "http://192.168.1.133:8080/hosteleria-proyect/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  if (response.status === 200) {
    return Alert.alert("User created successfully");
  } else {
    return Alert.alert("Error to create the user");
  }
}
