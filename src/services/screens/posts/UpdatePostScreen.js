import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  // Button,
  // TextInput,
  ScrollView,
} from "react-native";
import { useNavigationParam, useRoute } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import { useArticleUpdateMutation } from "../../userAuthAPI";
import { getToken } from "../../AsyncStorageService";

function Update({ route, navigation }) {

  const [title, setTitle] = useState(route.params.item.title); 
  const [description, setDescription] = useState(route.params.item.description);
  const [usertoken, setUserToken] = useState();

  const [ updateArticle ] = useArticleUpdateMutation();

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
    const pk = route.params.item.id;
    const res = await updateArticle({ access, formdata, pk });
    // const res = await changeUserPassword({ formdata })
    console.log("Response", usertoken, access);

    if (res.data) {
      console.log("Response Success Article Update", res.data);

    //   clearTextInput();

      Toast.show({
        type: "done",
        position: "top",
        topOffset: 0,
        text1: "Article updated",
      });
    }
    else {
        console.log("No response")
    }

    if (res.error) {
      console.log("Response Error", res.error);
    }

  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <View>
              <Text>"hello" {route.params.item.title} {route.params.item.id}</Text>
            <TextInput
              style={styles.inputStyle}
              label="Title"
              value={title}
              mode="outlined"
              onChangeText={(text) => setTitle(text)}
            ></TextInput>
          </View>

          <View>
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
              Update Article
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Update;
