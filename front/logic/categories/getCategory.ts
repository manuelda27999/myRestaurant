import { validateId, validateToken } from "../../utilities/validators";

type Category = {
  category_id: number;
  category_name: string;
  color: string;
  user_id: null;
};

export default async function getCategory(
  token: string,
  categoryId: number
): Promise<Category> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateId(categoryId);

  return fetch(`${apiUrl}/categoryProduct/${categoryId}`, {
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
