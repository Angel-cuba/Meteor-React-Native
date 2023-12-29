import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Meteor from '@meteorrn/core';

Meteor.isVerbose = true;
Meteor.connect('ws://localhost:3000/websocket');
const Data = Meteor.getData();

export const UseConnection = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    Data.ddp.on('connected', () => {
      setConnection(true);
    });
    Data.ddp.on('disconnected', () => {
      setConnection(false);
      Meteor.reconnect();
    });
  }, []);

  return { connection };
};
