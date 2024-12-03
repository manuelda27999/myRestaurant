interface GetNameByIdInterface {
  string?: string;
  error?: string;
}

export default async function getNameById(
  userId: number
): Promise<void | GetNameByIdInterface> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  return fetch(`${apiUrl}:8080/hosteleria-proyect/users/name/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((body) => {
        const name = body.name;

        return name;
      });
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
