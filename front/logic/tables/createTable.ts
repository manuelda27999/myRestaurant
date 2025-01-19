import { validateToken, validateString } from "../../utilities/validators";

export default async function createTable(
  table_name: string,
  available: boolean,
  token: string
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateString(table_name);

  return fetch(`${apiUrl}/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ table_name, available }),
  }).then((response) => {
    if (response.status === 201) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
