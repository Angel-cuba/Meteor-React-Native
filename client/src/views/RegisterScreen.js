import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { defaultColors, defaultStyles } from '../styles/defaultStyles';
import { ErrorMessage } from '../components/ErrorMessage';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { signUp } = useContext(AuthContext);

  const onError = (err) => setError(err);
  const onSignUp = () => signUp({ email, password, firstName, lastName, onError });
  const onSignIn = () => navigation.navigate('Login');

  const renderError = () => {
    if (error) {
      return <Text>{error.message}</Text>;
    }
    return null;
  };

  return (
    <View style={defaultStyles.container}>
      <TextInput
        placeholder="Your Email"
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Your password"
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Your first name (optional)"
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Your last name (optional)"
        placeholderTextColor={defaultColors.placeholder}
        style={defaultStyles.text}
        value={lastName}
        onChangeText={setLastName}
      />
      <ErrorMessage error={error} />
      <Button title="Create new account" onPress={onSignUp} />
      <View style={defaultStyles.panel}>
        <Text>or</Text>
      </View>
      <Button title="Sign in" onPress={onSignIn} />
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
