import { View, Text } from 'react-native';
import React from 'react';
import { defaultStyles } from '../styles/defaultStyles';
import { TaskList } from '../tasks/TaskList';

const HomeScreen = () => {
  return (
    <View style={defaultStyles.container}>
      <TaskList />
    </View>
  );
};

export default HomeScreen;
