import React from 'react';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from '../context/useLogin'
import { NavigateButton } from '../src/components/NavigateButton';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../src/views/LoginScreen';
import RegisterScreen from '../src/views/RegisterScreen';
import { ProfileScreen } from '../src/views/ProfileScreen';
import HomeScreen from '../src/views/HomeScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const { state, authContext } = useLogin();
  const { userToken } = state;

  const renderScreens = () => {
    if (userToken) {
      // only authenticated users can visit these screens
      const headerRight = () => <NavigateButton title="My profile" route="Profile" />;
      return (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome home', headerRight }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Your profile' }}
          />
        </>
      );
    }

    // non authenticated users need to sign in or register
    // and can only switch between the two screens below:
    return (
      <>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Sign in' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
      </>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}
        >
          {renderScreens()}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
