import { validateToken, validateString } from "../../utilities/validators";

export default async function createCategory(
  category_name: string,
  token: string
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateString(category_name);

  return fetch(`${apiUrl}/categoryProduct/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category_name }),
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
