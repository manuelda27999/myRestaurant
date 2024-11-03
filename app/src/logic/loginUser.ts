import { Alert } from "react-native"

type User = {
    user_id: number,
    name: string,
    email: string,
    password: string
}

interface LoginUserResponse {
    user?: User,
    error?: string
}

export default async function loginUser(email: string, password: string): Promise<void | LoginUserResponse> {
    try {
        const response = await fetch("http://192.168.1.129:8080/hosteleria-proyect/users/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            const user: User = await response.json()
            Alert.alert("User authenticated succesfully")
            return { user }
        } else {
            const errorBody = await response.json()
            const errorMessage = errorBody.error || "Error to authenticate the user"
            return { error: errorMessage }
        }
    } catch (error) {
        return { error: "An unecpected error ocurred" }
    }

}