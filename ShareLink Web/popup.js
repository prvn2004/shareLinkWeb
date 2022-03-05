const config = {
    apiKey: "AIzaSyDYUUCs2W5PQyvGgIzb2zlmYLN6VmP5pZw",
  authDomain: "sharelink-3c0d5.firebaseapp.com",
  databaseURL: "https://sharelink-3c0d5-default-rtdb.firebaseio.com",
  projectId: "sharelink-3c0d5",
  storageBucket: "sharelink-3c0d5.appspot.com",
  messagingSenderId: "930922135183",
  appId: "1:930922135183:web:ea7b80e4db655dc53bfafa",
  measurementId: "G-RW0BB227KX"
  };
  firebase.initializeApp(config);
 

var user_icon = "<i class='material-icons' style='font-size: 33;vertical-align:bottom;'>person</i>&nbsp;";
/*
document.getElementById("password").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn_login").click();
    }
});
*/

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btn_login").addEventListener('click', function(){
    	login();
    });

    document.getElementById("btn_logout").addEventListener('click', function(){
    	logout();
    });

 });

function logout()
{
	firebase.auth().signOut().then(function() {
  alert("Logged out successfully!");
	}).catch(function(error) {
  alert("Error Logging out!");
});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var currUser = firebase.auth().currentUser;
    if(currUser.emailVerified == true)
    {
    document.getElementById("div_login").style.display = "none";
    document.getElementById("div_user").style.display = "block";
    // document.getElementById("username").innerHTML = "Welcome";
//------------------------------------------------------------------------------------------------------------------------------------------------------
   

var uid = firebase.auth().currentUser.uid;
var userDataRef = firebase.database().ref("Users/"+uid +"/1/urlValue");
userDataRef.once("value" , function(snapshot){
  var data = snapshot.val();
 document.getElementById("Image").href = data;
 document.getElementById("Image").innerHTML = data;
  
})


//----------------------------------------------------------------------------------------------------------------------------------------------------------
    }
    else
    {
    	firebase.auth().signOut().then(function() {
  alert("Please verify email address first!");
	}).catch(function(error) {
});
    document.getElementById("div_user").style.display = "none";
    document.getElementById("div_login").style.display = "block";
    }
  } else {
    document.getElementById("div_user").style.display = "none";
    document.getElementById("div_login").style.display = "block";
  }
});

function login()
{
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var chkbox = document.getElementById("keeplogin");

if(chkbox.checked == true)
{
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  // ...

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(currUser.emailVerified == true)
    {
    document.getElementById("username").innerHTML = "Welcome " + currUser.displayName;
    document.getElementById("div_login").style.display = "none";
    document.getElementById("div_user").style.display = "block";
    listen();
    }
    else
    {
    	firebase.auth().signOut().then(function() {
  alert("Please verify email address first!");
	}).catch(function(error) {
  //alert("Error Logging out!");
});
    }
  } else {
  }
});

});
});
}else
{
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function(){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  // ...

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("div_login").style.display = "none";
  } else {
  }
});

});
});
}
}

// function listen() {
// var uid = firebase.auth().currentUser.uid.toString;
// alert(uid);
// var userDataRef = firebase.database().ref("Users" + uid.value).orderByKey();
// userDataRef.once("value").then(function(snapshot) {
// snapshot.forEach(function(childSnapshot) {
//   var key = childSnapshot.key;
//   var childData = childSnapshot.val();              

//   var name_val = childSnapshot.val().urlValue.toString;
//   document.getElementById("Real").innerHTML = name_val;

// });
// });
// }


// var userId = firebase.auth().currentUser.uid;
// var dbRef = firebase.database().ref('/Users/' + userId);
// dbRef.on('value', function(snapshot) {
//   var linkObj = snapshot.val();
//   //document.getElementById("test").innerHTML = linkObj["-LSPhZnrS3qrXegvNNNO"]["opened"];
//   for(x in linkObj)
// 	{
// 		if(linkObj[x]["opened"] == false)
// 		{
// 			//document.getElementById("test").innerHTML += linkObj[x]["link"] + "<br>";
// 			window.open(linkObj[x]["link"], "_blank");
// 			firebase.database().ref('/Users/' + userId + '/' + x + "/opened").set(true);
// 		}
// 	}
// });