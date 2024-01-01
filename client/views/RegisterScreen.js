import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { signUp } = useContext(AuthContext);

  const onError = (err) => setError(err);
  const onSignUp = () => signUp({email, password, onError});

  const renderError = () => {
    if (error) {
      return <Text>{error.message}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
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
      <Button title="Sign Up" onPress={onSignUp} style={styles.button} />
      <Button
        title="Do you have an account? Login"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
    </View>
  );
};

export default RegisterScreen;

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
