import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UseConnection } from './hooks/useConnection';

export default function App() {
  const { connection } = UseConnection();
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      {connection ? <Text>Connected</Text> : <Text>Not Connected</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
