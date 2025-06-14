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

const Signin = () => {
    const { session, signin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
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
            await signin(email, password);
            router.push('/');
        } catch (err) {
            Alert.alert('Error', 'Invalid credentials or server error.');
        } finally {
            setLoading(false);
        }
    };

    if (session) return <Redirect href="/" />;
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <View>
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
                         onChangeText={setEmail}
                         autoCapitalize="none"
                         keyboardType="email-address"
                         textContentType="emailAddress"
                    />

                    <Text>
                        Password
                    </Text>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        textContentType="password"
                    />

                    <Pressable
                        style={[styles.button, (!email || !password) && { opacity: 0.5 }]}
                        onPress={handleSubmit}
                        disabled={loading || !email || !password}
                    >
                        <Text style={styles.buttonText}>{loading ? "Loading..." : "Login"}</Text>
                    </Pressable>    

                    <Text
                        style={{
                            marginTop: 20,
                            textAlign: "center",
                            color: "grey",
                        }}
                    >
                        Don’t have an account?{" "}
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
        marginTop: 10,
        textAlign: "center",
    },
});

export default Signin;