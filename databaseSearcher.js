var stores = [];
var attributes = [];
var scores = [];
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
  scores =[];
  var db = data.val();
  console.log(db);
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

function eliminateStores(attribs) {
  if (attribs.includes("Male")) {
    for (var i = stores.length-1; i > 0; i--) {
      if (attributes[i].includes("Female") && !attributes[i].includes("Male")) {
        stores.splice(i, 1);
        attributes.splice(i, 1);
        links.splice(i, 1);
      }
    }
  } else if (attribs.includes("Female")) {
    for (var i = stores.length-1; i > 0; i--) {
      if (attributes[i].includes("Male") && !attributes[i].includes("Female")) {
        stores.splice(i, 1);
        attributes.splice(i, 1);
        links.splice(i, 1);
      }
    }
  }
}

function getScores(attribs) {
  for (var i = 0; i < stores.length; ++i) {
    scores[i] = 0;
  }
  for (var i = 0; i < attribs.length; i++) {
    for (var j = 0; j < stores.length; j++) { 
      if (attributes[j].includes(attribs[i])) {
        scores[j]++;
      }
    }
  }
}

function showResults() {
    var attribs = attribGoals;
    eliminateStores(attribs);
    getScores(attribs);
    var newStores = [];
    var newLinks = [];
    for (var i = 0; i < 6; i++) {
      var maxScore = 0;
      var maxStore = null;
      var maxUrl = null;
      for (var j = stores.length-1; j >= 0; j--) {
        if (scores[j] > maxScore) {
          if (maxStore != null) {
            stores.push(maxStore);
            scores.push(maxScore);
            links.push(maxUrl);
          }
          maxScore = scores[j];
          maxStore = stores[j];
          maxUrl = links[j];
          scores.splice(j, 1);
          stores.splice(j, 1);
          links.splice(j, 1);
        }
      }
      newStores.push(maxStore);
      newLinks.push(maxUrl);
    }
    stores = newStores;
    links = newLinks;
    console.log(links);
    for (var i = 1; i <= stores.length; i++) {
      var div = document.getElementById("theDiv");
      var a = document.createElement("a");
      a.id = "l"+i;
      a.href = "http://www." + links[i-1];
      //a.href = links[i-1];
      var b =document.createElement("button");
      b.setAttribute( 'class', 'block' );
      b.innerHTML = stores[i-1];
      //b.Value = stores[i-1];
      a.appendChild(b);
      div.appendChild(a);
    }
    return false;
}