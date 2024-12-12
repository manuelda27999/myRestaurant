import { validateId, validateName } from "../../utilities/validators";

interface ChangeNameUserResponse {
  error?: string;
}

export default async function changeNameUser(
  token: string,
  name: string
): Promise<boolean | ChangeNameUserResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);
  validateName(name);

  return fetch(`${apiUrl}/users/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
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
