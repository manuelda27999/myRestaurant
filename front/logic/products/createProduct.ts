import { validateToken } from "../../utilities/validators";

type Product = {
  product_name: string;
  description: string;
  ingredients: string;
  allergens: string;
  price: number;
};

export default async function createProduct(
  token: string,
  category_id: number,
  product: Product
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);

  return fetch(`${apiUrl}/products/${category_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
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
