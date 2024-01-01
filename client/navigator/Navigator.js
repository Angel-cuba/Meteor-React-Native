import { View, Text } from 'react-native';
import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/RegisterScreen';
import HomeScreen from '../views/HomeScreen';
import { useLogin } from '../context/useLogin';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { state, authContextValue } = useLogin();
  console.log("🚀 ~ file: Navigator.js:15 ~ Navigator ~ state:", state)
  const userToken = null;

  const renderViews = () => {
    if (!state.userToken) {
      return (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: 'Register view',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </>
      );
    }
    return (
      <>
        <Stack.Screen name="Home" component={HomeScreen} />
      </>
    );
  };

  return (
    <AuthContext.Provider value={{
      ...authContextValue,
      state,
    }}>
      <NavigationContainer>
        <Stack.Navigator>{renderViews()}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigator;
