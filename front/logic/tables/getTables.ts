import { validateId } from "../../utilities/validators";

type Table = {
  table_id: number;
  table_name: string;
  available: boolean;
};

interface GetTables {
  tables: Array<Table>;
  error?: string;
}

export default async function getTables(
  token: string
): Promise<Array<Table> | null> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);

  return fetch(`${apiUrl}/tables`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((body) => {
        return body;
      });
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
