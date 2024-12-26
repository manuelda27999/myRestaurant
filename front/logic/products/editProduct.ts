import { validateId } from "../../utilities/validators";

type Product = {
  product_name: string;
  description: string;
  ingredients: string;
  allergens: string;
  price: number;
};

export default async function editProduct(
  token: string,
  product_id: number,
  product: Product
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);

  return fetch(`${apiUrl}/products/${product_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
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
