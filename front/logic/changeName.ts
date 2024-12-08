interface ChangeNameUserResponse {
  error?: string;
}

export default async function changeNameUser(
  userId: number,
  name: string
): Promise<boolean | ChangeNameUserResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  return fetch(`${apiUrl}:8080/hosteleria-proyect/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).then((response) => {
    if (response.status === 202) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
