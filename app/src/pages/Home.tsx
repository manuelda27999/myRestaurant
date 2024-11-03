import { View, Text, StyleSheet, Image } from "react-native";

const Home: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Bar Francisco</Text>
                <Text style={styles.subtitle}>Comienza registrando tu carta</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe4b5', // Color suave
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
        opacity: 0.3, // Para un efecto de fondo sutil
    },
    overlay: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semi-transparente
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8b4513', // Color marrón
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
});

export default Home;
