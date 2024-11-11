interface RegisterUserResponse {
  error?: string;
}

export default async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<boolean | RegisterUserResponse> {
  return fetch("http://192.168.1.133:8080/hosteleria-proyect/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => {
    if (response.status === 200) {
      return true;
    } else {
      return response.json().then((body) => {
        throw new Error(body.message);
      });
    }
  });
}
