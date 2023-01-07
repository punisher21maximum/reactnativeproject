import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Alert,
  Button,
} from "react-native";

// LOGIN w/ Fetch

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// // myHeaders.append("Cookie", "csrftoken=obCceeQc5vCIVojE6srUrW8XucoQfHMC; sessionid=dgy7clyjthuxa7ou7un7cugin9jpjv9u");

// var raw = JSON.stringify({
//   "username": "vs",
//   "password": "vs"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://raezungton.pythonanywhere.com/user/users/login/", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Login w/ Fetch END

// Login w/ Axios

// var axios = require('axios');
// var data = JSON.stringify({
//   "username": "vs",
//   "password": "vs"
// });

// var config = {
//   method: 'post',
//   url: 'https://raezungton.pythonanywhere.com/user/users/login/',
//   headers: { 
//     // 'X-CSRFToken': '45Mo2fNGeq1acz7uwEv6GOCqrZaabR7V', 
//     'Content-Type': 'application/json', 
//     // 'Cookie': 'csrftoken=aKC98G7kToWD73eyxLnTQbv23arGV3ox; sessionid=s6lret1kwwhdxn9has95q3xaoojltn9z'
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// Login w/ Axios END

// ARTILCES
const Title = (props) => {
  return <Text style={{ fontSize: 30 }}>{props.title}</Text>;
};

const Desc = (props) => {
  return <Text style={{ fontSize: 20 }}>{props.description}</Text>;
};

const Article = (props) => {
  return (
    <View style={{ margin: 10 }}>
      <Title title={props.item.title} />
      <Desc description={props.item.description} />
    </View>
  );
};

const renderData = (item) => {
  return <Article item={item} />;
};

const Home = () => {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetch("https://raezungton.pythonanywhere.com/polls/articles/", { method: "GET" })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setData(data);
      })
      .catch((error) => Alert.alert("error", error));
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, textTransform: "uppercase" }}>
          Artciles {likes}
        </Text>

        <Button
          onPress={() => {
            setLikes(likes + 1);
          }}
          title="Press to Like"
        >
        </Button>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderData(item);
          }}
          keyExtractor={(item) => `${item.id}`}
        />

        <Text style={{ fontSize: 20, textTransform: "uppercase" }}>
          There are ({data.length}) articles
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 30,
    paddingVertical: 50,
    paddingBottom: 130,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default Home;
