import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as firebase from "firebase";
//import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    name: "",
    email: "",
    password: "",
    image: null,
    errorMessage: null,
  };

  addPost = async (text, localUri) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("dp")
        .doc(this.state.name)
        .set({
          name: text,
          image: "",
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  handleSignUp = () => {
    this.addPost(this.state.name, this.state.image)
      .then((ref) => {
        //console.log("");
      })
      .catch((error) => {
        alert(error);
      });

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((usercre) => {
        return usercre.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View
          style={{
            positon: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%",
            marginBottom: 100,
          }}
        >
          <Text style={styles.greeting}>NEXUS</Text>
        </View>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={{ marginTop: 50 }}>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
            ></TextInput>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "white" }}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{ color: "black" }}>
            Already a member ?
            <Text style={{ color: "#E9446A", fontSize: 15 }}> LOG IN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: -35,
    fontSize: 45,
    color: "black",
    alignSelf: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 15,
    textAlign: "center",
    marginTop: -200,
  },
  form: {
    marginTop: -100,
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "gray",
    fontSize: 17.5,
  },
  input: {
    marginTop: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    height: 40,
    fontSize: 22,
    color: "black",
    paddingBottom: 10,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  reg: {
    marginTop: 50,
    color: "#E9446A",
    marginHorizontal: 30,
    fontSize: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  proimg: {
    margin: 50,
    borderRadius: 100,
    width: 100,
    height: 100,
    backgroundColor: "#FFF",
    marginBottom: -20,
    alignSelf: "center",
  },
  img: {
    marginTop: -50,
  },
});
