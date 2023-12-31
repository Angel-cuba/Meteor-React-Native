import { useEffect, useState } from 'react';
import Meteor from '@meteorrn/core';
import * as SecureStore from 'expo-secure-store';
import config from '../config.json';

Meteor.isVerbose = true;
Meteor.connect(config.backend.url, {
  AsynsStorage: {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
  },
});

export const useConnection = () => {
  const [connected, setConnected] = useState(null);
  const [connectionError, setConnectionError] = useState(null);

  // we use separate functions as the handlers, so they get removed
  // on unmount, which happens on auto-reload and would cause errors
  // if not handled
  useEffect(() => {
    const onError = (e) => setConnectionError(e);
    Meteor.ddp.on('error', onError);

    const onConnected = () => connected !== true && setConnected(true);
    Meteor.ddp.on('connected', onConnected);

    // if the connection is lost, we not only switch the state
    // but also force to reconnect to the server
    const onDisconnected = () => {
      Meteor.ddp.autoConnect = true;
      if (connected !== false) {
        setConnected(false);
      }
      Meteor.reconnect();
    };
    Meteor.ddp.on('disconnected', onDisconnected);

    // remove all of these listeners on unmount
    return () => {
      Meteor.ddp.off('error', onError);
      Meteor.ddp.off('connected', onConnected);
      Meteor.ddp.off('disconnected', onDisconnected);
    };
  }, []);

  return { connected, connectionError };
};
