export default async function editInvoice(
  token: string,
  invoiceId: number,
  tableId: number
) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  return fetch(`${apiUrl}/invoices/${invoiceId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ table_id: tableId }),
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
