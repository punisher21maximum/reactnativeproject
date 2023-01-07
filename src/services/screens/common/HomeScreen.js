import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  // Button,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FAB, Button } from "react-native-paper";
import { styles, toastConfig } from "../../../style";

import { storeToken, getToken, getTokenData } from "../../AsyncStorageService";
import { useArticlesListQuery, useArticleCreateQuery } from "../../userAuthAPI";

import Update from "../posts/UpdatePostScreen";


const Title = (props) => {
  return <Text style={{ fontSize: 30 }}>{props.title}</Text>;
};

const Desc = (props) => {
  return <Text style={{ fontSize: 20 }}>{props.description}</Text>;
};

const Article = (props) => {
  const navigation = useNavigation();
  const item = props.item;

  return (
    <View style={{ margin: 10 }}>
      <Title title={props.item.title} />
      <Desc description={props.item.description} />
      {/* <Update item={props.item} /> */}
      <Button
        style={{ margin: 10 }}
        icon="pencil"
        mode="contained"
        onPress={() => {
          navigation.navigate("UpdatePost", props);
        }}
      >
        Edit Article
      </Button>
    </View>
  );
};

const renderData = (item) => {
  return <Article item={item} />;
};

const HomeScreen = () => {
  const [token, setToken] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setToken({
          access: access,
          refresh: refresh,
        });
      }
    })();
  }, []);

  const articleListQueryResp = useArticlesListQuery(token["access"]);
  const data = articleListQueryResp.data;
  console.log(data, articleListQueryResp);
  console.log(token);

  return (
    <View>

      <FlatList
        style={{ padding: 20 }}
        data={data}
        renderItem={({ item }) => {
          return renderData(item);
        }}
        keyExtractor={(item) => `${item.id}`}
      />

      <FAB 
        style={styles.fab} 
        small={false} 
        icon="plus" 
        onPress={() => {
          navigation.navigate("CreatePost");
        }}
      />

      <View style={{ fontSize: 30, fontWeight: "bold" }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("ChangePassword");
          }}
        >
          <Text style={{ fontWeight: "bold", padding: 20 }}>
            Change Password???
          </Text>
        </TouchableWithoutFeedback>
      </View>
      
    </View>
  );
};

export default HomeScreen;
