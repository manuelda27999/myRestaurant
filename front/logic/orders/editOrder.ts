import { validateToken } from "../../utilities/validators";

export default async function editOrder(
  token: string,
  order_id: number,
  table_id: number,
  product_id: number,
  quantity: number,
  status: string
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);

  return fetch(`${apiUrl}/orders/${order_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table_id, product_id, quantity, status }),
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
