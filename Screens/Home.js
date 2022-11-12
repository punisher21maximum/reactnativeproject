import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import { Card, DefaultTheme, FAB } from "react-native-paper";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.4:8000/polls/articles/", { method: "GET" })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        setData(data)
        setLoading(false)
      })
      .catch((error) => Alert.alert('error', error));
  }, []);

  const renderData = (item) => {
    return (
      <Card style={styles.cardStyle}>
        <Text style={{ fontSize: 15 }}>{item.title}</Text>
        <Text style={{ fontSize: 10 }}>{item.description}</Text>
      </Card>
    );
  };

  return (
    <View >
        {/* first way  */}
{/* 
      <View>
        {data.map((datum) => {
          const { id, title, description } = datum;
          return (
            <Text>
              {id}
              {title}
              {description}
            </Text>
          );
        })}
      </View> */}

      {/* second way */}

      <View style={styles.cardStyle}>
          <FlatList
          data = {data}
          renderItem = {({item}) => {
              return renderData(item)
          }}
          onRefresh = {() => loadData()}
          refreshing = {loading}

          keyExtractor = {item => `${item.id}`}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    padding: 1,
    margin: 1,
    justifyContent: "center",
        alignItems: "center"
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "blue",
  },

  task: {
    color: "#fff",
    width: "40%",
    fontSize: 16,
  },

  taskContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 1,
    paddingVertical: 5,
    minHeight: 50,
  },
  indexContainer: {
    backgroundColor: "#3E3364",
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 2,
    height: 50,
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Home;
