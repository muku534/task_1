import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity, StatusBar, TextInput, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../Components/Pixel/Index'; // Assuming you use these for responsive design
import { COLORS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [userData, setUserData] = useState(null); // State to store user data

    // Function to retrieve user data from AsyncStorage
    const getUserData = async () => {
        try {
            const data = await AsyncStorage.getItem('userData');
            if (data) {
                const parsedData = JSON.parse(data);
                setUserData(parsedData); // Set the user data to state
                console.log(parsedData); // Use or display the user data as needed
            }
        } catch (error) {
            console.error("Error retrieving user data:", error);
            ToastAndroid.show('Failed to load user data', ToastAndroid.SHORT);
        }
    };

    // useEffect to run the data retrieval on component mount
    useEffect(() => {
        getUserData();
    }, []);

    const handleLogout = async () => {
        try {
            // Clear user data from AsyncStorage
            await AsyncStorage.removeItem('userData');
            // Navigate to the Welcome screen
            navigation.replace('Welcome');
            ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
        } catch (error) {
            console.error("Error logging out:", error);
            ToastAndroid.show('Error logging out', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#f2f5f5"} barStyle="dark-content" />
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode='cover'
                />
                <View style={styles.contentContainer}>
                    {userData ? (
                        <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text> // Access the user's name or other properties
                    ) : (
                        <Text style={styles.loadingText}>Loading user data...</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.startButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Keeps the logo at the top
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        marginTop: hp(2),
        width: wp(55),
        height: hp(21),
    },
    contentContainer: {
        marginTop: hp(20),
        justifyContent: 'center', // Center the user data text
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: hp(3.5),
        fontWeight: '700',
        color: 'black',
    },
    startButton: {
        marginVertical: hp(14),
        backgroundColor: '#A3CFFF',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(30),
        borderRadius: 25,
    },
    buttonText: {
        fontSize: hp(2.5),
        color: 'black',
        textAlign: 'center',
        fontWeight: '700'
    },
});
