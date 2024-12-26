import { validateId } from "../../utilities/validators";

export default async function deleteProduct(
  token: string,
  product_id: number
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);

  return fetch(`${apiUrl}/products/${product_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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
