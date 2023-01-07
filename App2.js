import { registerRootComponent } from 'expo'; // import it explicitly

import { Provider } from 'react-redux';
import { store } from './store';


import { StyleSheet, Text, View } from "react-native";
import Home from "../Screens/Home";

const Greeting = (props) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <View >
        <Home />
        {/* <Text>Open up App.js -- King of the Bahrain</Text>
        <Text>Titan of Titaniaaaaaaaaaaaa</Text>

        <Greeting name="Rexxar" />
        <Greeting name="Jaina" />
        <Greeting name="Valeera" /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column-reverse",
  },
  center: {
    alignItems: "center",
  },
});


export default registerRootComponent(App); // this is how I register the App component
