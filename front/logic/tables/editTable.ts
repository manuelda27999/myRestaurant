import { validateToken, validateName } from "../../utilities/validators";

export default async function editTable(
  table_id: number,
  table_name: string,
  available: boolean,
  token: string
): Promise<boolean | string> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateName(table_name);

  return fetch(`${apiUrl}/tables/${table_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table_name, available }),
  }).then((response) => {
    if (response.status === 204) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
