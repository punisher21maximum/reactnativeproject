import { registerRootComponent } from "expo"; // import it explicitly
// import { AppRegistry, Platform } from 'react-native';
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLoginScreen from "./services/screens/user/UserLoginScreen";
// import ShopTab from "./app/screen/shop/ShopTab";
import RegistrationScreen from "./services/screens/user/RegistrationScreen";
// import SendPasswordResetEmailScreen from "./app/screen/auth/SendPasswordResetEmailScreen";
import UserPanelTab from "./services/screens/user/UserPanelTab";

import { Provider } from "react-redux";
import { store } from "./store";
import ChangePasswordScreen from "./services/screens/user/ChangePasswordScreen";
import HomeScreen from "./services/screens/common/HomeScreen";
import CreatePostScreen from "./services/screens/posts/CreatePostScreen";
import UpdatePostScreen from "./services/screens/posts/UpdatePostScreen";
import DeletePostScreen from "./services/screens/posts/DeletePostScreen";


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "purple" },
            headerTintColor: "white",
          }}
        >
          {/* <Stack.Screen name="ShopTab" component={ShopTab} options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="UserLogin"
            component={UserLoginScreen}
            options={{ title: "User Login" }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }}/> */}
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: "Registration", headerBackVisible: false }}
          />
          {/* <Stack.Screen name="SendPasswordResetEmail" component={SendPasswordResetEmailScreen} options={{ title: 'Forgot Password' }} /> */}
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ title: "Change Password" }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ title: "Create Post" }}
          />
          <Stack.Screen
            name="UpdatePost" 
            component={UpdatePostScreen}
            options={{ title: "Update Post" }}
          />
          <Stack.Screen
            name="DeletePost" 
            component={DeletePostScreen}
            options={{ title: "Delete Post" }}
          />
          <Stack.Screen
            name="UserPanelTab"
            component={UserPanelTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App); // this is how I register the App component
