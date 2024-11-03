import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../App";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import registerUser from "../logic/registerUser";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">

const Register: React.FC = () => {

    const navigation = useNavigation<RegisterScreenNavigationProp>()

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleRegister = () => {
        try {
            registerUser(name, email, password)
                .then(() => {
                    navigation.navigate("Login")
                })
                .catch((error) => {
                    alert(error.message)
                })
        } catch (Error) {
            alert(Error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Screen</Text>

            <TextInput
                style={styles.input}
                placeholder="User name"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <Text>I have an account</Text>
            <TouchableOpacity style={styles.registerText} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.registerLink}>Login</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF3E0', // Fondo cálido y acogedor
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4E342E', // Marrón oscuro, evocando madera
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#BDBDBD', // Gris suave para los bordes
        borderRadius: 8, // Bordes redondeados para un aspecto moderno y acogedor
        backgroundColor: '#FFF', // Fondo blanco para entradas de texto
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        backgroundColor: '#8BC34A', // Verde fresco, evocando ingredientes frescos
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        marginTop: 20,
        color: '#795548', // Color vino, evocando un ambiente de bar o restaurante
    },
    registerLink: {
        color: '#D32F2F', // Rojo oscuro para resaltar el enlace de registro
        fontWeight: 'bold',
        marginTop: 5,
    }
});

export default Register