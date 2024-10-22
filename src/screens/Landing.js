import React, { useEffect } from 'react'; 
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { GoogleSignin } from '@react-native-google-signin/google-signin'; 

const Landing = ({ navigation }) => {
  // Google login handler
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '383934127015-o1vudig7ki8beqktlg2bl4qmkq310mb1.apps.googleusercontent.com', 
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error("Google login error: ", error);
    }
  };

  // Facebook login handler
  // const handleFacebookLogin = async () => {
  //   try {
  //     // Start Facebook login process
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Get the Facebook access token
  //     const data = await AccessToken.getCurrentAccessToken();
      
  //     if (!data) {
  //       throw 'Something went wrong obtaining the access token';
  //     }

  //     // Create a Firebase credential with the Facebook access token
  //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  //     // Sign-in the user with the credential
  //     await auth().signInWithCredential(facebookCredential);
  //   } catch (error) {
  //     console.error("Facebook login error: ", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* App Icon */}
      <Image source={require('../assets/app-icon.png')} style={styles.icon} />
      
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>The best app for your needs</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Google Login */}
      <TouchableOpacity style={[styles.button, styles.socialButton]} onPress={handleGoogleLogin}>
        <FontAwesome name="google" size={24} color="#fff" />
        <Text style={styles.socialButtonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Facebook Login */}
      <TouchableOpacity style={[styles.button, styles.socialButton, styles.facebookButton]} onPress={handleGoogleLogin}>
        <FontAwesome name="facebook" size={24} color="#fff" />
        <Text style={styles.socialButtonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButton: {
    backgroundColor: '#db4437',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
});

export default Landing;