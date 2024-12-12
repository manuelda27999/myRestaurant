import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utilities/validators";

interface RegisterUserResponse {
  error?: string;
}

export default async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<boolean | RegisterUserResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateName(name);
  validateEmail(email);
  validatePassword(password);

  return fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
