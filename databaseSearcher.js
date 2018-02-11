var stores = [];
var attributes = [];
var storeScores = [];
var links = [];

var attribGoals = [];

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCydwhfE15kOy89sfhhKnAwCKLvj_UmzCk",
  authDomain: "shopping-app-2a12d.firebaseapp.com",
  databaseURL: "https://shopping-app-2a12d.firebaseio.com",
  projectId: "shopping-app-2a12d",
  storageBucket: "shopping-app-2a12d.appspot.com",
  messagingSenderId: "722766417281"
};
firebase.initializeApp(config);

function loadData(attribs) {
  attribGoals = attribs;
  var database = firebase.database();
  var ref = database.ref('stores');
  ref.on('value', gotData, errData);
}

function gotData(data) {
  stores = [];
  attributes = [];
  links = [];
  var db = data.val();
  var sto = Object.keys(db);
  for (var i = 0; i < sto.length; i++) {
    var store = sto[i];
    stores.push(store);
    attributes.push(db[store].attributes);
    links.push(db[store].url);
  }
  showResults();
}

function errData(data) {
  console.log("Cannot find stores in database.");
}

function getScores(attribs) {
  for (var i = 0; i < stores.length; ++i) {
    storeScores[i] = 0;
  }
  for (var i = 0; i < attribs.length; i++) {
    for (var j = 0; j < stores.length; j++) { 
      if (attributes[j].includes(attribs[i])) {
        storeScores[j]++;
      }
    }
  }
}

function showResults() {
    var attribs = attribGoals;
    getScores(attribs);
    var newStores = [];
    var newLinks = [];
    for (var i = 0; i < 6; i++) {
      var maxScore = 0;
      var maxStore = null;
      var maxUrl = null;
      for (var j = stores.length-1; j >= 0; j--) {
        if (storeScores[j] > maxScore) {
          if (maxStore != null) {
            stores.push(maxStore);
            scores.push(maxScore);
            links.push(maxUrl);
          }
          maxScore = storeScores[j];
          maxStore = stores[j];
          maxUrl = links[j];
          storeScores.splice(j, 1);
          scores.splice(j, 1);
          links.splice(j, 1);
        }
      }
      newStores.push(maxStore);
      newLinks.push(maxUrl);
    }
    stores = newStores;
    links = newLinks;
    for (var i = 1; i <= stores.length; i++) {
      var element = document.getElementById("l"+i);
      element.href = links[i-1];
      var button = document.getElementById("b"+i);
      element.value = stores[i-1];
    }
}