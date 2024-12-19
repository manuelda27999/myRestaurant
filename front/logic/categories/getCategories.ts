import { validateId } from "../../utilities/validators";

type Category = {
  category_id: number;
  category_name: string;
  user_id: null;
};

export default async function getCategories(
  token: string
): Promise<Array<Category> | null> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);

  return fetch(`${apiUrl}/categoryProduct`, {
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
