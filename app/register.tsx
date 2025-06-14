import { useAuth } from "@/contexts/AuthContext";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Register = () => {
    const {session, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const insets = useSafeAreaInsets();

   const handleSubmit = async () => {

        if (!username || !email || !password) {
            Alert.alert("Missing fields", "Please fill out all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
        await register(username, email, password);
        } catch (err) {
            Alert.alert('Error', 'Registro fallido. Verificá los datos');
        } finally {
            setLoading(false);
        }
    };

    if (session) return <Redirect href="/" />;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View style={{ flex: 1, padding: 20, paddingTop: insets.top, paddingBlock: insets.bottom }}>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                        Register
                    </Text>
                    <Text>
                        Username
                    </Text>
                    <TextInput
                        placeholder="Enter your Username..."
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <Text>
                        Email
                    </Text>
                    <TextInput
                        placeholder="Enter your email..."
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Text>
                        Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <Pressable
                        style={[styles.button, (!username || !email || !password) && { opacity: 0.5 }]}
                        onPress={handleSubmit}
                        disabled={loading || !username || !email || !password}
                    >
                        <Text style={styles.buttonText}>{loading ? "Loading..." : "Register"}</Text>
                    </Pressable>
                    <Text
                        style={{
                            marginTop: 20,
                            textAlign: "center",
                            color: "grey",
                        }}
                    >
                        Already have an account?{" "}
                        <Pressable
                            onPress={() => {
                                router.push("/signin");
                            }}
                        >
                            <Text style={styles.linkText}>Login</Text>
                        </Pressable>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "grey",
    },
    button: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    linkText: {
        color: "blue",
        textDecorationLine: "underline",
    },
});

export default Register;
