import { validatePassword, validateToken } from "../../utilities/validators";

interface ChangePasswordResponse {
  error?: string;
}

export default async function changePassword(
  token: string,
  lastPassword: string,
  newPassword: string,
  newPasswordRepeat: string
): Promise<boolean | ChangePasswordResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validatePassword(lastPassword);
  validatePassword(newPassword);
  validatePassword(newPasswordRepeat);

  return fetch(`${apiUrl}/users/changePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ lastPassword, newPassword, newPasswordRepeat }),
  }).then((response) => {
    if (response.status === 202) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
