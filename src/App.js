// src/App.js
import React from 'react';
import { Provider } from 'react-redux';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';  
import Splash from './screens/Splash';  
import Landing from './screens/Landing';  
import Login from './screens/Login';  
import Signup from './screens/Signup';  
import HomeScreen from './screens/HomeScreen';  
import ProductDetail from './screens/ProductDetail';  

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}  
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }} 
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Sign Up' }}  
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}  
          />

          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ title: 'Product Details' }}  
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;