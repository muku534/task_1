import React, { useState } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableOpacity, StatusBar, TextInput, ToastAndroid, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../Components/Pixel/Index'; // Assuming you use these for responsive design
import { COLORS } from '../../../constants';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !phone || !password) {
            ToastAndroid.show('Please fill in all fields.', ToastAndroid.SHORT);
            return;
        }

        setLoading(true); // Show loading indicator
        try {
            // Make API call
            const response = await fetch('https://tor.appdevelopers.mobi/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    password,
                }),
            });

            const result = await response.json();
            console.log(result)
            setLoading(false); // Stop loading indicator

            if (response.ok) {
                // Handle successful signup (e.g., navigate to Home screen)
                ToastAndroid.show('Account created successfully!', ToastAndroid.SHORT);
                navigation.navigate('Home');
            } else {
                // Handle error response
                ToastAndroid.show(result.message || 'Something went wrong!', ToastAndroid.SHORT);
                console.log("Signup error:", result.message || 'Unknown error occurred');
            }
        } catch (error) {
            setLoading(false);
            console.log("error", error)
            ToastAndroid.show('Unable to connect. Please try again.', ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={"#f2f5f5"} barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        {/* Logo */}
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode='cover'
                        />
                        <View style={styles.contentContainer}>
                            <View style={styles.welcomeContainer}>
                                <Text style={styles.welcomeText}>Sign Up</Text>
                                <Text style={styles.welcomeText1}>Fill in the below form and add life to your car!</Text>
                            </View>

                            <View style={{ marginTop: hp(1) }}>
                                <Text style={styles.label}>Name</Text>
                                <View style={styles.inputContainer}>
                                    <Feather name="user" size={hp(3)} color={COLORS.darkgray1} />
                                    <TextInput
                                        placeholder='Enter your Name'
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='default'
                                        style={styles.textInput}
                                        value={name}
                                        onChangeText={text => setName(text)}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>Phone Number</Text>
                                <View style={styles.inputContainer}>
                                    <MaterialCommunityIcons name="email-outline" size={hp(3)} color={COLORS.darkgray1} />
                                    <TextInput
                                        placeholder='phone number'
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='number-pad'
                                        style={styles.textInput}
                                        value={phone}
                                        onChangeText={text => setPhone(text)}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <MaterialCommunityIcons name="lock-outline" size={hp(3)} color={COLORS.darkgray1} />
                                    <TextInput
                                        placeholder='Password'
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType='default'
                                        secureTextEntry
                                        style={styles.textInput}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                    />
                                </View>
                            </View>

                            {/* Button */}
                            <TouchableOpacity
                                style={styles.startButton}
                                onPress={handleSignup}
                            >
                                {loading ? (
                                    <ActivityIndicator color="black" />
                                ) : (
                                    <Text style={styles.buttonText}>Sign up</Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer with Sign In */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>
                                    Don`t have an account?
                                    <Text
                                        style={styles.signInText}
                                        onPress={() => {
                                            navigation.navigate("Login");
                                        }}
                                    > Sign in
                                    </Text>
                                </Text>
                            </View>

                            <View style={{ marginTop: hp(2), zIndex: 1, }}>
                                <Text style={{ color: COLORS.darkgray1, fontSize: hp(2), textAlign: 'center' }}>By login or sign up, you agree to our terms of use and privacy policy</Text>
                            </View>
                        </View>
                        <Image
                            source={require('../../../assets/images/image3.png')}
                            resizeMode='cover'
                            style={styles.image1}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f5f5',
    },
    image1: {
        position: 'absolute',
        bottom: -22,
        right: 10,
        width: wp(45),
        height: hp(25),
        transform: [
            { rotate: '90deg' },
        ],
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        marginTop: hp(3),
        width: wp(52),
        height: hp(19),
    },
    tagline: {
        fontSize: hp(2.4),
        textAlign: 'center',
        color: '#6B6B6B',
        lineHeight: hp(4),
    },
    startButton: {
        zIndex: 1,
        marginVertical: hp(2),
        backgroundColor: '#A3CFFF',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(30),
        borderRadius: 25,
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
        marginTop: hp(2),
        justifyContent: 'center',
        alignItems: 'center'
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
    contentContainer: {
        flex: 1,
        marginHorizontal: wp(6),
    },
    welcomeContainer: {
        marginVertical: hp(1),
    },
    welcomeText: {
        fontSize: hp(3.6),
        fontWeight: '700',
        marginTop: hp(1),
        color: 'black',
    },
    welcomeText1: {
        paddingTop: hp(1.5),
        paddingRight: wp(16),
        fontSize: hp(2.2),
        color: '#808080',
    },
    welcomeText2: {
        fontSize: hp(2.2),
        color: 'black',
    },
    label: {
        color: COLORS.darkgray1,
        fontSize: hp(2.2),
        fontWeight: '400',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1),
        width: '100%',
        height: hp(5.9),
        borderColor: COLORS.gray,
        borderWidth: 0.7,
        borderRadius: wp(2),
        // justifyContent: 'center',
        paddingLeft: wp(2),
    },
    textInput: {
        width: '100%',
        color: 'black',
    },
    lineText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(10),
    },
    line: {
        flex: 1,
        height: 0.5,
        backgroundColor: COLORS.darkgray1,
    },
    text: {
        width: wp(10),
        fontSize: hp(2.4),
        color: COLORS.darkgray1,
        textAlign: 'center',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp(2),
        width: wp(40),
        alignSelf: 'center',
    },
    iconButton: {
        width: hp(6),
        height: hp(6),
        borderRadius: hp(3),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // To give a shadow effect for Android
        shadowColor: '#000', // Shadow properties for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});
