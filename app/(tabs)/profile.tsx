import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    // here with userid you can make a call to backend to get info about you profile
     const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace('/signin');
    }
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
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