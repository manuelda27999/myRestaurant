import { validateToken } from "../../utilities/validators";

type Product = {
  product_id: number;
  product_name: string;
  description: string;
  ingredients: string;
  allergens: string;
  price: number;
  user_id: null;
  category_id: number;
};

export default async function getProduct(
  token: string,
  product_id: number
): Promise<Product> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);

  return fetch(`${apiUrl}/products/${product_id}/one`, {
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
