import { validateToken, validateString } from "../../utilities/validators";

export default async function editCategory(
  token: string,
  category_id: number,
  category_name: string,
  color: string
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateString(category_name);

  return fetch(`${apiUrl}/categoryProduct/${category_id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_name, color }),
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
