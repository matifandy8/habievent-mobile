import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type User = {
    username: string;
    name: string;
    email: string;
};


type AuthContextType = {
    session: boolean;
    user: User | false;
    signin: (email: string,  password: string) => Promise<void>;
    signout: () => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: false,
    user: false,
    signin: async () => {},
    signout: async () => {},
    register: async () => {},
});

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(false);
    const insets = useSafeAreaInsets();
    

    const register = async (username: string, email: string, password: string) => {
        setLoading(true);
        // Simulate an API call for registration
        setTimeout(() => {
            setSession(true);
            setUser({ username: "johndoe", name: "John Doe", email: "" });
            setLoading(false);
        }, 1000);
        // In a real application, you would replace the above with actual API calls
    }
    type UserType = { username: string; name: string; email: string } | false;
    const [user, setUser] = useState<UserType>(false);
    const signin = async () => {
        setLoading(true);
        // Simulate an API call for signing in
        setTimeout(() => {
            setSession(true);
            setUser({ username: "johndoe", name: "John Doe", email: "johnde@gmail.com" });
            setLoading(false); 
        }
        , 1000);
        // In a real application, you would replace the above with actual API calls
    };
    const signout = async () => {
        setLoading(true);
        // Simulate an API call for signing out
        setTimeout(() => {
            setSession(false);
            setUser(false);
            setLoading(false);
        }, 1000);
        // In a real application, you would replace the above with actual API calls
    };

    const contextData = { session, user, signin, signout, register};
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: insets.top, paddingBottom: insets.bottom }}>
                    <ActivityIndicator size="large" color="#000000"/>
                </View>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };

