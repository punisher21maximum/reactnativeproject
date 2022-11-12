import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home'

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <Text>Open up App.js -- King of the Bahrain</Text>
      <Text>Titan of Titania</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse'
  },
});
