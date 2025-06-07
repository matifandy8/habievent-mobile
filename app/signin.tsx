import { useAuth } from "@/contexts/AuthContext";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

const Signin = () => {
    const { session, signin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        // Here you would typically call your signin function from the AuthContext
        // For example: await signin(email, password);
        console.log("Email:", email);
        console.log("Password:", password);
        signin(email, password);
        // Reset fields after submission
        setEmail("");
        setPassword("");

    };

    if (session) return <Redirect href="/" />;
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                    SignIn
                </Text>
                <Text>
                    Please enter your credentials to login.
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

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

                <Text
                    style={{
                        marginTop: 20,
                        textAlign: "center",
                        color: "grey",
                    }}
                >
                    Don&lsquo;t have an account?{" "}
                    <Pressable
                        onPress={() => {
                            router.push("/register");
                        }}
                    >
                        <Text style={styles.linkText}>Register</Text>
                    </Pressable>
                </Text>
            </View>
        </View>
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
        marginTop: 10,
        textAlign: "center",
    },
});

export default Signin;