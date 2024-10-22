import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';  // Import from Firebase Web SDK
import { auth } from '../../config/firebaseConfig';  // Import the initialized Firebase auth instance

// Login Action
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: userCredential.user });
    } catch (error) {
      console.error("Login Error: ", error); 
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = 'Login failed. Please try again';
      }
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
  };
};

// Signup Action
export const signup = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      // Attempt to create a new user with Firebase Web SDK
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: userCredential.user });
    } catch (error) {
      console.error("Signup Error: ", error);  // Log the full error for debugging
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
          errorMessage = 'Signup failed. Please try again';
      }
      dispatch({ type: 'SIGNUP_FAILURE', payload: errorMessage });
    }
  };
};