var attributes = [];
var validStores = [];
var attr = "";

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

var database = firebase.database();

function gotData(data) {
	var db = data.val();
	var sto = Object.keys(db);
	for (var i = 0; i < sto.length; i++) { 
		var store = sto[i];
		var att = db[store].attributes;
		if (att.includes(attr)) {
			validStores.push(store);
			attributes.push(att);
		}
	}
	console.log("The following stores have the \"" + attr + "\" attribute: " + validStores);
}

function errData(data) {
		console.log("Cannot find stores in database.");
}

function getStores(attrib) {
  	attr = attrib;
  	var ref = database.ref('stores');
		ref.on('value', gotData, errData);
}