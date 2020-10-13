//profile
import React from "react";
import { View, Text, StyleSheet, Image, Alert, FlatList } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import { susheel } from "./postApi";

export default class ProfileScreen extends React.Component {
  state = {
    text: "",
    email: "",
    displayName: "",
    image: null,
    foodList: [],
    l: false,
  };

  getdata = () => {
    this.setState(() => {
      l: true;
    });
    this.componentDidMount();
    this.setState(() => {
      l: false;
    });
  };

  onFoodsReceived = (foodList) => {
    this.setState((prevState) => ({
      foodList: (prevState.foodList = foodList),
    }));
    return 1;
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({
      email,
      displayName,
    });
    susheel(this.onFoodsReceived);
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  pickDp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      Alert.alert(
        "profile image setting :",
        "click yes to set profile picture or no to discard",
        [
          {
            text: "yes",
            onPress: () => {
              this.setDp();
            },
          },
          {
            text: "no",
          },
        ]
      );
    }
  };
  setDp = () => {
    this.addPost(this.state.displayName, this.state.image)
      .then((ref) => {
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  addPost = async (text, localUri) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      this.firestore
        .collection("dp")
        .doc(this.state.displayName)
        .set({
          name: text,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri) => {
    const path =
      "dp/" + this.state.displayName + "/" + this.state.displayName + ".jpg";

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  renderPost = (post) => {
    if (post.name == this.state.displayName) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              marginTop: 30,
              width: 150,
              height: 40,
              borderRadius: 100,
              backgroundColor: "#E9446A",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={this.signOutUser}
          >
            <Text style={{ color: "#FFF", fontSize: 20, marginTop: -6 }}>
              Sign out
            </Text>
          </TouchableOpacity>

          <View style={styles.img}>
            <Image source={{ uri: post.image }} style={styles.proimg}></Image>
            <TouchableOpacity
              style={{
                marginTop: -25,
                width: 40,
                height: 40,
                borderRadius: 100,
                backgroundColor: "#E9446A",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 250,
              }}
              onPress={this.pickDp}
            >
              <Text style={{ color: "#FFF", fontSize: 20, marginTop: 0 }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 60 }}>
            <Text style={styles.name}> {this.state.displayName} </Text>
            <Text style={styles.email}> {this.state.email} </Text>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
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
    backgroundColor: "black",
  },
  proimg: {
    margin: 50,
    borderRadius: 100,
    width: 200,
    height: 200,
    backgroundColor: "#FFF",
    marginBottom: -20,
    alignSelf: "center",
  },
  proimg1: {
    marginTop: -180,
    borderRadius: 100,
    width: 200,
    height: 200,
    backgroundColor: "#FFF",
    marginBottom: -20,
    alignSelf: "center",
  },
  edit: {
    margin: 100,
    borderRadius: 200,
    width: 200,
    height: 200,
    backgroundColor: "#FFF",
  },
  img: {
    marginTop: 30,
  },
  img1: {
    marginTop: -200,
  },
  name: {
    marginTop: -30,
    color: "#FFF",
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "sans-serif-medium",
  },
  email: {
    color: "#FFF",
    fontSize: 17,
    alignSelf: "center",
    fontFamily: "monospace",
  },
});
