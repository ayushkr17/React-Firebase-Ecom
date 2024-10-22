import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/authActions';
import { View, TextInput, Button, Text } from 'react-native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Correctly access the auth state
  const { user, error, loading } = useSelector((state) => state.auth || { user: null, error: null, loading: false });

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View>
      {user ? (
        <View>
          <Text>Welcome, {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Login" onPress={handleLogin} />
          {loading && <Text>Loading...</Text>}
          {error && <Text>{error}</Text>}
        </View>
      )}
    </View>
  );
};

export default AuthScreen;