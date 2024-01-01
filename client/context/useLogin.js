import { View, Text } from 'react-native';
import React from 'react';
import Meteor from '@meteorrn/core';
import { Accounts } from '@meteorrn/core';

export const useLogin = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  const authContextValue = React.useMemo(
    () => ({
      signIn: ({ email, password, onError }) => {
        console.log('🚀 ~ file: useLogin.js:36 ~ useLogin ~ password:', password);
        console.log('🚀 ~ file: useLogin.js:36 ~ useLogin ~ email:', email);
        Meteor.loginWithPassword(email, password, (err, result) => {
          if (err) {
            return onError(err);
          }

          Meteor._handleLoginCallback(err, result);

          const token = Accounts._storedLoginToken();
          dispatch({ type: 'SIGN_IN', token });
        }); 
      },
      signUp: ({ email, password, onError }) => {
        console.log('🚀 ~ file: useLogin.js:49 ~ useLogin ~ password:', password);
        console.log('🚀 ~ file: useLogin.js:49 ~ useLogin ~ email:', email);
        Meteor.call('register', { email, password }, (err, result) => {
          if (err) {
            return onError(err);
          } else {
            // Meteor.loginWithPassword(email, password, (err) => {
            //   if (err) {
            //     return onError(err);
            //   }
            Meteor._handleLoginCallback(err, result);

            const token = Meteor.getAuthToken();
            console.log('🚀 ~ file: useLogin.js:56 ~ //Meteor.loginWithPassword ~ token:', token);
            dispatch({ type: 'SIGN_IN', token });
            // });
          }
        });
      },
    }),
    []
  );

  return { state, authContextValue };
};
