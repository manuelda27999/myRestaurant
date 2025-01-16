export function validateEmail(email: string) {
  if (typeof email !== "string") throw new Error("el email no es una string");
  if (email === "") throw new Error("el email está vacío");

  const indexOfAt = email.indexOf("@");
  if (indexOfAt < 0) throw new Error("@ no encontrado");
  if (indexOfAt === 0) throw new Error("@ es el primer elemento");
  if (indexOfAt === email.length - 1) throw new Error("el email termina con @");

  const indexOfDot = email.indexOf(".", indexOfAt);
  if (indexOfDot < 0) throw new Error("punto no encontrado");
  if (indexOfDot === 0) throw new Error("el punto es el primer elemento");
  if (indexOfDot === email.length - 1)
    throw new Error("el email termina con punto");
  if (email.length - indexOfDot - 1 < 2)
    throw new Error(
      "el email debe tener al menos 2 caracteres después del punto"
    );

  if (indexOfAt + 1 === indexOfDot)
    throw new Error("el punto es el siguiente elemento después de @");

  const diccionario = "abcdefghijklmnñopqrstuvwxyz0123456789_-.";
  const diccionario2 = "abcdefghijklmnñopqrstuvwxyz";

  for (let i = 0; i < indexOfAt; i++) {
    if (!diccionario.includes(email[i]))
      throw new Error("carácter incorrecto " + email[i]);
  }

  for (let i = indexOfAt + 1; i < indexOfDot; i++) {
    if (!diccionario.includes(email[i]))
      throw new Error("carácter incorrecto " + email[i]);
  }

  for (let i = indexOfDot + 1; i < email.length; i++) {
    if (!diccionario2.includes(email[i]))
      throw new Error("carácter incorrecto " + email[i]);
  }
}

export function validatePassword(password: string) {
  if (typeof password !== "string")
    throw new Error("la contraseña no es una cadena");
  if (password === "") throw new Error("la contraseña está vacía");

  if (password.length < 5)
    throw new Error("la longitud de la contraseña debe ser mayor a 5");
}

export function validateString(string: string) {
  if (typeof string !== "string")
    throw new Error("este string tiene un formato incorrecto");
  if (string === "") throw new Error("el string está vacío");
}

export function validateToken(token: string) {
  if (typeof token !== "string") throw new Error("el token no es un número");
  if (token === null) throw new Error("el token es nulo");
}

export function validateId(id: number) {
  if (typeof id !== "number") throw new Error("el id no es un número");
  if (id < 0) throw new Error("el id es menor a 0");
}
