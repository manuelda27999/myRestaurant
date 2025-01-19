import { validateId, validateToken } from "../../utilities/validators";

export default async function deleteCategory(
  category_id: number,
  token: string
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateId(category_id);

  return fetch(`${apiUrl}/categoryProduct/${category_id}`, {
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
