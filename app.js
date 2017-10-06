var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  // var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  // if(allChoice == "all"){
  //   collection.find().toArray(function(err, doc){
  //     console.log(doc);
  //   });
  // } else {
  //   console.log("Aw, you don't want to see the restaurants?");
  // }

//Find restaurant 

function name() {
	var restaurantName = prompt("Type the 'name' of the restaurant you're looking for ");
	collection.find( {name: restaurantName} ).toArray(function(err, doc){
      console.log(doc);
    }); 
}

name()

// add restaurant 

function addRestaurant() {
	var addName = prompt("Enter the 'name' of the restaurant you would like to add ");
    var addAddress = prompt("Enter the address of the restaurant you would like to add ");
    var addYelp = prompt("Enter the yelp website of the restaurant you would like to add ");
    collection.insert({name: addName, address: addAddress, yelp: addYelp});
    collection.find({name: addName}).toArray(function (err,doc) {
    	console.log(doc);
    });
}

addRestaurant();

//Create a prompt for users to edit restaurants.

function editRestaurants() {
  var name = prompt("Would you like to edit a restaurant?");
  var which = prompt("What do you want to update? Please enter name, address, or yelp")
  if(which == 'name') {
    var newName = prompt("Please enter the new name: ");
    collection.update (
      {name: name},
      { $set: {name: newName}
    });
  };
  if(which == 'address'){
    var newAddress = prompt("Please enter the new address: ");
    collection.update(
      {name: name},
      { $set: {address: newAddress}
    });
  };
  if(which == 'yelp'){
    var newYelp = prompt("Please enter the new yelp: ");
    collection.updaye(
      {name: name},
      { $set: {yelp: newYelp}
    });
  };
  collection.find({name: name}).toArray(function(err, doc){
        console.log(doc);
    });
};

editRestaurants();

// delete restaurant

function delete() {
    var deletedName = prompt("Please type the name of the restaurant you want to delete from the database: ");
    collection.remove({name: deletedName});
    collection.find().toArray(function(err, doc){
      console.log(doc);
    });
  };

delete();



});