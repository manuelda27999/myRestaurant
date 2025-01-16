import { validateId, validateToken } from "../../utilities/validators";

export default async function changePayment(
  token: string,
  invoiceId: number
): Promise<boolean> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateToken(token);
  validateId(invoiceId);

  return fetch(`${apiUrl}/invoices/${invoiceId}/paid`, {
    method: "PATCH",
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
