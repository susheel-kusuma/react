import React, {
    useState
} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    FlatList,
} from "react-native";
import {
    Ionicons
} from "@expo/vector-icons";
import {
    TouchableOpacity
} from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import {
    susheel
} from "./postApi";

require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component {
    state = {
        text: "",
        image: null,
        email: "",
        counter: "n",
        foodList: [],
        l: false,
        pp: "",
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
        const {
            email,
            displayName
        } = firebase.auth().currentUser;
        this.setState({
            email,
            displayName
        });
        susheel(this.onFoodsReceived);
    }

    addPost = async(text, localUri) => {
        if (this.state.counter == "y") {
            const remoteUri = await this.uploadPhotoAsync(localUri);
            return new Promise((res, rej) => {
                this.firestore
                    .collection("posts")
                    .add({
                        text,
                        uid: this.uid,
                        timestamp: this.timestamp,
                        image: remoteUri,
                        email: this.state.email,
                        propic: this.state.pp,
                    })
                    .then((ref) => {
                        res(ref);
                    })
                    .catch((error) => {
                        rej(error);
                    });
            });
        } else {
            return new Promise((res, rej) => {
                this.firestore
                    .collection("posts")
                    .add({
                        text,
                        uid: this.uid,
                        timestamp: this.timestamp,
                        image: null,
                        email: this.state.email,
                        propic: this.state.pp,
                    })
                    .then((ref) => {
                        res(ref);
                    })
                    .catch((error) => {
                        rej(error);
                    });
            });
        }
    };

    uploadPhotoAsync = async(uri) => {
        const path =
            "photos/" +
            (firebase.auth().currentUser || {}).uid +
            "/" +
            Date.now() +
            ".jpg";

        return new Promise(async(res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();
            let upload = firebase.storage().ref(path).put(file);
            upload.on(
                "state_changed",
                (snapshot) => {},
                (err) => {
                    rej(err);
                },
                async() => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    pickImage = async() => {
        this.setState({
            counter: "y",
        });
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({
                image: result.uri
            });
        }
    };

    get firestore() {
        return firebase.firestore();
    }
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    get timestamp() {
        return Date.now();
    }

    handlePost = () => {
        this.addPost(this.state.text.trim(), this.state.image)
            .then((ref) => {
                this.setState({
                    text: "",
                    image: null
                });
                this.props.navigation.goBack();
            })
            .catch((error) => {
                alert(error);
            });
    };

    renderPost = (post) => {
        if (post.name == this.state.displayName) {
            this.setState({
                pp: post.image
            });
            return ( <
                SafeAreaView style = {
                    styles.container
                } >
                <
                View style = {
                    styles.header
                } >
                <
                TouchableOpacity onPress = {
                    () => {
                        this.props.navigation.goBack();
                    }
                } >
                <
                Ionicons name = "md-arrow-back"
                size = {
                    30
                }
                color = "black" > < /Ionicons> < /
                TouchableOpacity > <
                TouchableOpacity onPress = {
                    this.handlePost
                } >
                <
                Text style = {
                    {
                        fontSize: 20,
                        color: "#FFF"
                    }
                } > POST < /Text> < /
                TouchableOpacity > <
                /View> <
                View style = {
                    styles.inputContainer
                } >
                <
                Image style = {
                    styles.avatar
                }
                source = {
                    {
                        uri: post.image
                    }
                } > < /Image> <
                TextInput autoFocus = {
                    true
                }
                multiline = {
                    true
                }
                numberOfLines = {
                    3
                }
                style = {
                    {
                        flex: 1,
                        fontSize: 20,
                        color: "#FFF",
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                    }
                }
                placeholder = "Want to share something"
                onChangeText = {
                    (text) => this.setState({
                        text
                    })
                }
                value = {
                    this.state.text
                } >
                <
                /TextInput> < /
                View > <
                TouchableOpacity style = {
                    styles.photo
                }
                onPress = {
                    this.pickImage
                } >
                <
                Ionicons name = "md-camera"
                size = {
                    30
                }
                color = "#E9446A" > < /Ionicons> < /
                TouchableOpacity > <
                View style = {
                    {
                        marginHorizontal: 32,
                        marginTop: 32,
                        height: 250
                    }
                } >
                <
                Image source = {
                    {
                        uri: this.state.image
                    }
                }
                style = {
                    {
                        width: "100%",
                        height: "100%"
                    }
                } >
                <
                /Image> < /
                View > <
                /SafeAreaView>
            );
        }
    };

    render() {
        return ( <
            SafeAreaView style = {
                styles.container
            } >
            <
            FlatList data = {
                this.state.foodList
            }
            renderItem = {
                ({
                    item
                }) => this.renderPost(item)
            }
            showVerticalScrollIndicator = {
                false
            }
            refreshing = {
                this.state.l
            }
            onRefresh = {
                this.getdata
            }
            /> < /
            SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        marginTop: 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
    inputContainer: {
        marginLeft: 30,
        flexDirection: "row",
    },
    avatar: {
        marginTop: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 16,
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32,
        marginTop: 40,
    },
});