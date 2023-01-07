import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import DashboardScreen from './DashboardScreen';
import SideBar from "./SideBar";
import ChangePasswordScreen from "./ChangePasswordScreen";
import CreatePostScreen from "../posts/CreatePostScreen";
console.log("UPT", "1");
const Drawer = createDrawerNavigator();
const UserPanelTab = () => {
  return (
    // <Drawer.Navigator drawerContent={props => <SideBar {...props} />} screenOptions={{ headerStyle: { backgroundColor: 'purple' }, headerTintColor: 'white' }}>
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: "purple" },
        headerTintColor: "white",
      }}
    >
      {/* <Drawer.Screen name="Dashboard" component={DashboardScreen} /> */}
      {/* <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerTitle: "Change Password" }}
      /> */}
      <Drawer.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{ headerTitle: "Create Post" }}
      />
    </Drawer.Navigator>
  );
};

export default UserPanelTab;
