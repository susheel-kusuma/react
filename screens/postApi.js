import firebase from "firebase";

export async function getFoods(foodsRetreived) {
  var foodList = [];

  var snapshot = await firebase.firestore().collection("posts").get();

  snapshot.forEach((doc) => {
    const foodItem = doc.data();
    foodList.push(foodItem);
  });

  foodsRetreived(foodList);
}

export async function susheel(foodsRetreived) {
  var foodList = [];

  var snapshot = await firebase.firestore().collection("dp").get();

  snapshot.forEach((doc) => {
    const foodItem = doc.data();
    foodList.push(foodItem);
  });

  foodsRetreived(foodList);
}
