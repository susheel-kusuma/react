import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  ActionButton,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import * as firebase from "firebase";
import { getFoods, susheel } from "./postApi";

export default class HomeScreen extends React.Component {
  state = {
    foodList: [],
    l: false,
  };

  onFoodsReceived = (foodList) => {
    this.setState((prevState) => ({
      foodList: (prevState.foodList = foodList),
    }));
    return 1;
  };

  componentDidMount() {
    getFoods(this.onFoodsReceived);
  }

  getdata = () => {
    this.setState(() => {
      l: true;
    });
    this.componentDidMount();
    this.setState(() => {
      l: false;
    });
  };

  renderPost = (post) => {
    return post.image != null ? (
      <View style={styles.feedItem}>
        <Image source={require("../assets/dp.png")} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.email}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={25} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      </View>
    ) : (
      <View style={styles.feedItem}>
        <Image source={require("../assets/dp.png")} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.email}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={25} color="#73788B"></Ionicons>
          </View>
          <Text style={styles.post}>{post.text}</Text>
        </View>
      </View>
    );
  };

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return this.state.foodList.length > 0 ? (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOME</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={this.state.foodList}
          renderItem={({ item }) => this.renderPost(item)}
          showVerticalScrollIndicator={false}
          refreshing={this.state.l}
          onRefresh={this.getdata}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOME</Text>
          <Text style={styles.headerTitle} onPress={this.signOutUser}>
            logout
          </Text>
        </View>
        <Text style={{ textAlign: "center" }}>drag the screen to refresh</Text>

        <FlatList
          style={styles.feed}
          data={this.state.foodList}
          renderItem={({ item }) => this.renderPost(item)}
          showVerticalScrollIndicator={false}
          refreshing={this.state.l}
          onRefresh={this.getdata}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 5,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: "#FFF",
    fontFamily: "sans-serif-medium",
  },
  feed: {
    marginHorizontal: 8,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 8,
    flexDirection: "row",
    marginVertical: 7.5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: "lightgray",
  },
  name: {
    marginTop: -5,
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  timestamp: {
    fontSize: 12.5,
    color: "gray",
    marginTop: 3,
  },
  post: {
    marginTop: 5,
    fontSize: 22,
    color: "purple",
  },
  postImage: {
    width: undefined,
    height: 200,
    borderRadius: 5,
    marginVertical: 9,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
    marginTop: -300,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: "italic",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refresh: {
    fontSize: 15,
    textAlign: "center",
  },
  ref: {
    marginTop: 200,
  },
});
