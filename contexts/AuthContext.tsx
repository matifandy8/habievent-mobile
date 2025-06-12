import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type User = {
  username: string;
  name: string;
  email: string;
};

type AuthContextType = {
  session: boolean;
  user: User | false;
  signin: (email: string, password: string) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState<User | false>(false);
  const insets = useSafeAreaInsets();

  const API_URL = "http://localhost:3001"; 

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setSession(true);
        setUser({ username: "authed", name: "Auto Login", email: "saved@example.com" });
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const register = async (username: string, email: string, password: string) => {
    register(username, email, password)
  };

  const signin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await response.json();
      const token = data.token;

      await AsyncStorage.setItem("token", token);

      setSession(true);
      setUser({ username: email.split("@")[0], name: "Logged User", email });
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong during login");
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    await AsyncStorage.removeItem("token");
    setUser(false);
    setSession(false);
    setLoading(false);
  };

  const contextData = { session, user, signin, signout, register };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };

