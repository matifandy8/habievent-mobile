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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Register = () => {
    const { session, register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const insets = useSafeAreaInsets();

    const handleSubmit = async () => {
        // Call your signup function from the AuthContext
        console.log("Email:", email);
        console.log("Password:", password);
        register(username, email, password);
        setEmail("");
        setPassword("");
    };

    if (session) return <Redirect href="/" />;
    return (
        <View style={{ flex: 1, padding: 20, paddingTop: insets.top, paddingBlock: insets.bottom }}>
            <View>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
                    Register
                </Text>
                <Text>
                    Username
                </Text>
                <TextInput
                    placeholder="Enter your email..."
                    style={styles.input}
                    value={email}
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
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
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
    );
};

const styles = StyleSheet.create({
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
