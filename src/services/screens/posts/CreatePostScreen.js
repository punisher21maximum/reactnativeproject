import { View, Text, Button, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import { useChangeUserPasswordMutation, useArticleCreateMutation } from "../../userAuthAPI";
import { getToken } from "../../AsyncStorageService";

const Create = () => {
const [title, setTitle] = useState("dd");
const [description, setDescription] = useState("dd");
  const [usertoken, setUserToken] = useState();

  const [createArticle] = useArticleCreateMutation();

//   const clearTextInput = () => {
//     setPassword("");
//     setPassword2("");
//   };

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setUserToken({
          access: access,
          refresh: refresh,
        });
      }
    })();
  }, []);

  const handleFormSubmit = async () => {
    const formdata = { title: title, description: description };
    const { access } = usertoken;
    const res = await createArticle({ access, formdata });
    // const res = await changeUserPassword({ formdata })
    console.log("Response", usertoken, access);
    if (res.data) {
        console.log("Response Success Article Create", res.data);
    //   clearTextInput();
      Toast.show({
        type: "done",
        position: "top",
        topOffset: 0,
        text1: "Article created",
      });
    }
    if (res.error) {
      console.log("Response Error", res.error);
      // Toast.show({
      //   type: 'warning',
      //   position: 'top',
      //   topOffset: 0,
      //   ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
      //   ...(res.error.data.errors.password2 ? { text1: res.error.data.errors.password2[0] } : ''),
      //   ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : ''),
      //   ...(res.error.data.errors.messages ? { text1: res.error.data.errors.messages[0].message } : ''),
      // });
    }
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <View style={[styles.inputWithLabel, { marginBottom: 15 }]}>
            <Text style={styles.labelText}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            //   secureTextEntry={true}
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            //   secureTextEntry={true}
            />
          </View>
          <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
            <Button title="Save" onPress={handleFormSubmit} color="purple" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
