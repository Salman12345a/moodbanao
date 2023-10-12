import React, { useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert } from 'react-native';
import COLORS from '../regcomp/colors';
import Button from '../regcomp/buttons';
import Input from '../regcomp/input';
import Loader from '../regcomp/loader';
import firebase from 'firebase/app'; // Import the necessary Firebase modules
import 'firebase/auth';

// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdkFqtvo8m41gKG-t8Q6ig1UNiy1_RM88",
  authDomain: "moodbanao.firebaseapp.com",
  databaseURL: "https://moodbanao-default-rtdb.firebaseio.com",
  projectId: "moodbanao",
  storageBucket: "moodbanao.appspot.com",
  messagingSenderId: "847722161738",
  appId: "1:847722161738:web:98a42472c525ad198628b3",
  measurementId: "G-LLCNZY7NNW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleValidation = (field, value) => {
    // Implement your validation logic for each field here.
    switch (field) {
      case 'email':
        if (!value) return 'Please input email';
        if (!value.match(/\S+@\S+\.\S+/)) return 'Please input a valid email';
        break;
      case 'fullname':
        if (!value) return 'Please input fullname';
        break;
      case 'phone':
        if (!value) return 'Please input phone number';
        break;
      case 'password':
        if (!value) return 'Please input password';
        if (value.length < 5) return 'Minimum password length is 5';
        break;
      default:
        break;
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    const error = handleValidation(field, value);
    setErrors({ ...errors, [field]: error });
    setInputs({ ...inputs, [field]: value });
  };

  const handleRegistration = async () => {
    Keyboard.dismiss();

    // Check for errors before registration
    for (const field in inputs) {
      const error = handleValidation(field, inputs[field]);
      if (error) {
        setErrors({ ...errors, [field]: error });
        return;
      }
    }

    setLoading(true);

    const { email, password } = inputs;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);

      // You can optionally send a verification email here
      // firebase.auth().currentUser.sendEmailVerification();

      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', 'Registration failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Register</Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter Your Details to Register</Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleInputChange('email', text)}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleInputChange('fullname', text)}
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('phone', text)}
            iconName="phone-outline"
            label="Phone Number"
            placeholder="Enter your phone no"
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleInputChange('password', text)}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Button title="Register" onPress={handleRegistration} />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
