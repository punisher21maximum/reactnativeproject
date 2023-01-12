import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  // Button,
  // TextInput,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import {
  useArticleCreateMutation,
} from "../../userAuthAPI";
import { getToken } from "../../AsyncStorageService";

function Create({ route, navigation }) {
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

    navigation.navigate("Home");

    if (res.data) {
      console.log("Response Success Article Create", res.data);
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
        <View>
          <View>
            {/* <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            //   secureTextEntry={true}
            /> */}
            <TextInput
              style={styles.inputStyle}
              label="Title"
              value={title}
              mode="outlined"
              onChangeText={(text) => setTitle(text)}
            ></TextInput>
          </View>

          <View>
            {/* <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            //   secureTextEntry={true}
            /> */}
            <TextInput
              style={styles.inputStyle}
              label="Description"
              value={description}
              mode="outlined"
              multiline={true}
              numberOfLines={10}
              onChangeText={(text) => setDescription(text)}
            ></TextInput>
          </View>

          <View>
            <Button
              style={{ margin: 10 }}
              icon="pencil"
              mode="contained"
              onPress={handleFormSubmit}
            >
              Insert Article
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Create;
