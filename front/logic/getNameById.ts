import { validateId } from "../utilities/validators";

interface GetNameByIdInterface {
  string?: string;
  error?: string;
}

export default async function getNameById(
  token: string
): Promise<void | GetNameByIdInterface> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  validateId(token);
  console.log(token);

  return fetch(`${apiUrl}:8080/hosteleria-proyect/users/name/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
