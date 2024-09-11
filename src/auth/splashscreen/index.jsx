import React, { useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, StatusBar } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../Components/Pixel/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    // If user data exists, navigate to the Home screen
                    navigation.replace('home');
                } else {
                    // If no user data, navigate to the Welcome screen
                    navigation.replace('Welcome');
                }
            } catch (error) {
                console.error("Error checking user data:", error);
                // If there's an error, navigate to the Welcome screen as a fallback
                navigation.replace('Welcome');
            }
        };

        // Call the checkUserData function after a short delay
        const timer = setTimeout(() => {
            checkUserData();
        }, 600);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#f2f5f5"} barStyle="dark-content" />
            <View style={styles.container}>
                {/* Top Splash Image */}
                <Image
                    source={require('../../../assets/images/image.png')}
                    resizeMode='cover'
                    style={styles.image1}
                />

                <Image
                    source={require('../../../assets/images/image3.png')}
                    resizeMode='cover'
                    style={styles.image2}
                />

                {/* Middle Logo Image */}
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode='cover'
                />

                {/* Bottom Splash Image */}
                <Image
                    source={require('../../../assets/images/image2.png')}
                    resizeMode='cover'
                    style={styles.image3}
                />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Ensure the background color is white to match your design
    },
    image1: {
        position: 'absolute',
        top: 0,
        left: 1,
        width: wp(40), // Adjust width and height as per your requirement
        height: hp(25),
    },
    image2: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: wp(40),
        height: hp(25),
    },
    image3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(64),
        height: hp(28),
    },
    logo: {
        width: wp(90),
        height: hp(34),
        zIndex: 1, // Ensures the logo stays on top
    },
});
