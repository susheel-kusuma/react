import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.greeting}>NEXUS</Text>
        <Text style={styles.reg}></Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
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
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "white" }}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "black" }}>
            New to this app ?
            <Text style={{ color: "#E9446A", fontSize: 15 }}> SIGN UP</Text>
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
    marginTop: 30,
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
    marginTop: -50,
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
    marginTop: 30,
    color: "#E9446A",
    marginHorizontal: 30,
    fontSize: 25,
  },
});
