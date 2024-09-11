import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../Components/Pixel/Index'; // Assuming you use these for responsive design
import { COLORS } from '../../../constants';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={"#f2f5f5"} barStyle="dark-content" />

            <View style={styles.container}>
                {/* Top Image 1 */}
                <Image
                    source={require('../../../assets/images/image.png')}  // Use your uploaded file path
                    resizeMode='cover'
                    style={styles.topLeftImage}
                />

                {/* Top Image 2 */}
                <Image
                    source={require('../../../assets/images/image3.png')}
                    resizeMode='cover'
                    style={styles.topRightImage}
                />

                {/* Logo */}
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode='cover'
                />

                {/* Tagline Text */}
                <Text style={styles.tagline}>
                    Sparkle & Shine Transform Your Drive with Every Wash!
                </Text>

                {/* Button */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                >
                    <Text style={styles.buttonText}>Let`s Start</Text>
                </TouchableOpacity>

                {/* Footer with Sign In */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{' '}
                        <Text
                            style={styles.signInText}
                            onPress={() => {
                                navigation.navigate("Login")
                            }}
                        >
                            Sign in
                        </Text>
                    </Text>
                </View>

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

export default Welcome;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f5f5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    topLeftImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp(40),
        height: hp(25),
    },
    topRightImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: wp(40),
        height: hp(25),
    },
    logo: {
        marginTop: hp(5),
        width: wp(90),
        height: hp(34),
        marginBottom: hp(3),
    },
    tagline: {
        paddingTop: hp(1.5),
        paddingHorizontal: wp(15),
        fontSize: hp(2.7),  // Adjust size as needed
        textAlign: 'center',
        fontWeight: '600',
        color: '#808080',  // Adjust text color
        lineHeight: hp(4),
    },
    startButton: {
        marginTop: hp(6),
        backgroundColor: '#A3CFFF',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(30),
        borderRadius: 25,
        zIndex: 1,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    buttonText: {
        fontSize: hp(2.5),
        color: 'black',
        textAlign: 'center',
        fontWeight: '700'
    },
    footer: {
        zIndex: 1,
        position: 'absolute',
        bottom: hp(10),
    },
    footerText: {
        fontSize: hp(2),
        color: '#6B6B6B',
        textAlign: 'center',
    },
    signInText: {
        color: COLORS.darkgray,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    image3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(64),
        height: hp(28),
    },
});
