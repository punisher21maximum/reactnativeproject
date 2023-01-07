import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import { useLoginUserMutation, useArticlesListQuery } from "../../userAuthAPI";
import { storeToken, getToken, getTokenData } from "../../AsyncStorageService";

const UserLoginScreen = () => {
  const [token, setToken] = useState({});

  const navigation = useNavigation();
  const [username, setUserName] = useState("vs");
  const [password, setPassword] = useState("vs");

  const clearTextInput = () => {
    setUserName("vs");
    setPassword("vs");
  };

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async () => {
    const formData = { username, password };
    const res = await loginUser(formData);
    // const res2 = await articlesList()
    console.log(res)

    if (res.data) {
      await storeToken(res.data.token); // Store Token in Storage
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        console.log("Response Data", JSON.parse(token));
        setToken({
          access: access,
          refresh: refresh,
        });
      }
      clearTextInput();
      // navigation.navigate('UserPanelTab')
      // navigation.navigate("ChangePassword");
      navigation.navigate("Home");
    }
    if (res.error) {
      console.log("Response Error", res.error.data.errors);
      // Toast.show({
      //   type: 'warning',
      //   position: 'top',
      //   topOffset: 0,
      //   ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
      //   ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
      //   ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : '')
      // })
    }

    // const { articlesList } = useArticlesListQuery(access);
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <View style={{ alignSelf: "center", marginBottom: 10 }}>
            <MaterialIcon name="shopping-bag" color="purple" size={100} />
          </View>
          {/* <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Write Your Email" keyboardType='email-address' />
          </View> */}
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUserName}
              placeholder="Write Your Username"
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Write Your Password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
            <Button title="Login" onPress={handleFormSubmit} color="purple" />
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('SendPasswordResetEmail') }} >
                <Text style={{ fontWeight: 'bold' }}>Forgot Password?</Text>
              </TouchableWithoutFeedback>
            </View> */}
            {/* <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('ChangePassword') }} >
                <Text style={{ fontWeight: 'bold' }}>Change Password?</Text>
              </TouchableWithoutFeedback>
            </View> */}
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  New User? Registration
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
