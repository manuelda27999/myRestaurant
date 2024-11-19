type User = {
  user_id: number;
  name: string;
  email: string;
  password: string;
};

interface LoginUserResponse {
  user?: User;
  error?: string;
}

export default async function loginUser(
  email: string,
  password: string
): Promise<void | LoginUserResponse> {
  return fetch("http://192.168.1.128:8080/hosteleria-proyect/users/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json().then((body) => {
        const user = body;

        return user;
      });
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
