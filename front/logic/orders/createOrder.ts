import { validateId } from "../../utilities/validators";

export default async function createOrder(
  token: string,
  table_id: number,
  product_id: number,
  quantity: number
): Promise<boolean | string> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);

  return fetch(`${apiUrl}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table_id, product_id, quantity }),
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
