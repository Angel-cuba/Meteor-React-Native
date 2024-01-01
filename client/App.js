import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Navigator } from './navigator/Navigator';
import { ErrorMessage } from './src/components/ErrorMessage';
import { useConnection } from './hooks/useConnection';

export default function App() {
  const { connected, connectionError } = useConnection();

  if (!connected) {
    return (
      <View style={styles.container}>
        <Text>Connecting to server...</Text>
      </View>
    );
  }

  if (connectionError) {
    return <ErrorMessage error={connectionError} />;
  }

  return <Navigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
