// src/screens/Signup.js
import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';  
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest, signupSuccess, signupFailure } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const signupValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);  
  const navigation = useNavigation();

  const handleSignup = async (email, password) => {
    try {
      dispatch(signupRequest());
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(signupSuccess(auth.currentUser));
      Snackbar.show({
        text: 'Signup successful!',
        backgroundColor: 'green',
      });
      navigation.replace('Home');
    } catch (error) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = 'Signup failed. Please try again.';
      }
      dispatch(signupFailure(errorMessage));
      Snackbar.show({
        text: errorMessage,
        backgroundColor: 'red',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => {
          handleSignup(values.email, values.password);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
            />
            {errors.email && touched.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              style={styles.input}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <TextInput
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              style={styles.input}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            ) : null}

            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <Button title="Sign Up" onPress={handleSubmit} />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Signup;