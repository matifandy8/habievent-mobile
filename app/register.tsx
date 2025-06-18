import { useAuth } from "@/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
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
            style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join HabiEvent to manage your events</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Enter your username"
                                style={styles.input}
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
                            <TextInput
                                placeholder="Enter your email"
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="#9ca3af"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Feather name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    <Pressable
                        style={[
                            styles.button, 
                            (!username || !email || !password) && styles.buttonDisabled
                        ]}
                        onPress={handleSubmit}
                        disabled={loading || !username || !email || !password}
                        android_ripple={{ color: 'rgba(255,255,255,0.3)', borderless: false }}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Create Account</Text>
                        )}
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Pressable
                            onPress={() => {
                                router.push("/signin");
                            }}
                        >
                            <Text style={styles.linkText}>Sign In</Text>
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
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    form: {
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        backgroundColor: '#f9fafb',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        paddingVertical: 16,
    },
    button: {
        backgroundColor: '#111827',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonDisabled: {
        backgroundColor: '#9ca3af',
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    linkText: {
        color: '#2563eb',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default Register;
