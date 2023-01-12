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
import { useArticleDeleteMutation } from "../../userAuthAPI";
import { getToken } from "../../AsyncStorageService";

function Update({ route, navigation }) {
  const [usertoken, setUserToken] = useState();

  const [deleteArticle] = useArticleDeleteMutation();

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
    const { access } = usertoken;
    const pk = route.params.item.id;
    const res = await deleteArticle({ access, pk });
    console.log("Response", usertoken, access);

    navigation.navigate("Home");

    if (res.data) {
      console.log("Response Success Article Update", res.data);

      Toast.show({
        type: "done",
        position: "top",
        topOffset: 0,
        text1: "Article updated",
      });
    } else {
      console.log("No response");
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
            <Text style={{ padding: 20, fontSize: 30, fontWeight: "bold" }}>
              {route.params.item.title}
            </Text>
            <Text style={{ padding: 20, fontSize: 15 }}>
              {route.params.item.description} 
            </Text>
          </View>

          <View>
            <Button
              style={{ margin: 10 }}
              icon="pencil"
              mode="contained"
              color="maroon"
              onPress={handleFormSubmit}
            >
              Confirm Delete
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Update;
