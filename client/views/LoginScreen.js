import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  console.log("🚀 ~ file: LoginScreen.js:7 ~ LoginScreen ~ email:", email)
  const [password, setPassword] = useState('');
  console.log("🚀 ~ file: LoginScreen.js:9 ~ LoginScreen ~ password:", password)
  const [error, setError] = useState(null);

  const { signIn } = useContext(AuthContext);

  const onError = (err) => setError(err.message);
  const onSignIn = () => signIn({email, password, onError});

  const renderError = () => {
    if (error) {
      return <Text>{error.message}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      {renderError()}
      <Button title="Login" onPress={onSignIn} style={styles.button} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  button: {
    width: 200,
    height: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#000',
    color: '#fff',
  },
});
