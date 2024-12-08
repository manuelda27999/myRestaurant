interface ChangePasswordResponse {
  error?: string;
}

export default async function changePassword(
  userId: number,
  lastPassword: string,
  newPassword: string,
  newPasswordRepeat: string
): Promise<boolean | ChangePasswordResponse> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  debugger;

  return fetch(
    `${apiUrl}:8080/hosteleria-proyect/users/${userId}/changePassword`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastPassword, newPassword, newPasswordRepeat }),
    }
  ).then((response) => {
    if (response.status === 202) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
