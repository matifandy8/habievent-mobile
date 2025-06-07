import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
     const { signout, user  } = useAuth();

    const handleLogout = async () => {
        await signout();
        router.replace('/signin');
    }
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {user ? (
                <View style={styles.info}>
                    <Text>Username: {user.username}</Text>
                    <Text>Name: {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
            ) : (
                <Text>No user data available</Text>
            )}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 14,
    },
    info: {
        fontSize: 18,
        padding: 16,
    },
});

export default ProfileScreen;