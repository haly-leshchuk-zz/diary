//Login, New user registration

openLoginPage();

//display only login block
function openLoginPage() {
document.getElementById("sidebar").style.display = "none";
document.getElementById("all-months").style.display = "none";
document.getElementById("register").style.display = "none";
document.getElementById("nav").style.display = "none";
document.getElementById("login-page").style.display = "block";
}

var users = [];
var userId =null;

class User {
	constructor(login, password, id, yourName) {
	this._login = login;
	this._password = password;
	this._id = id;
	this._yourName = yourName;
  }
}

function createNewUser() {
	var id = Number(Date.now());
	var login = document.getElementById("loginValue").value;
	var password = document.getElementById("password").value;
	var yourName = document.getElementById("yourName").value;
   
  var newUser = new User(login, password, id, yourName);
  users.push(newUser);
  
if ((login !== '') && (password !== '') && (yourName !== '')) {
  document.getElementById('register').style.backgroundColor = 'white';

	var jsondata = {
		"Login": login,
		"Password": password, 
		"UserId": id,
		"User-name": yourName
	};

    var settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": "https://diary-7ba7.restdb.io/rest/diaryusers",
  	"method": "POST",
  	"headers": {
    "content-type": "application/json",
    "x-apikey": "5a8931a716d5526228b42536",
    "cache-control": "no-cache"  },
  	"processData": false,
  	"data": JSON.stringify(jsondata)
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

document.getElementById("loginValue").value = '';
document.getElementById("password").value = '';
document.getElementById("yourName").value = '';

document.getElementById("register").style.display = "none";
document.getElementById("login-page").style.display = "block";

modal.style.display = "block";

} else {
  if ((login === '') || (password === '') || (yourName === '')) {
    document.getElementById('register').style.backgroundColor = 'red';
  }
}
};


function registration() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("register").style.display = "block";
};

var receivedUserId = '';

function login() {
  document.getElementById("login-saved").style.backgroundColor = 'white';
  document.getElementById("password-saved").style.backgroundColor = 'white';
  document.getElementById("loginAnswer").innerHTML = '';
	var loginValue = document.getElementById('login-saved').value;
	var password = document.getElementById('password-saved').value;

  if ((loginValue !== '') && (password !== '')) {

	async function asyncLogin() {
	var url = 'https://diary-7ba7.restdb.io/rest/diaryusers?q={"Login": "' + loginValue + '", "Password": "' + password + '"}';
  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
 		    "content-type": "application/json",
    	  "x-apikey": "5a8931a716d5526228b42536",
    	  "cache-control": "no-cache"
},
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      receivedUserId = jsonResponse[0].UserId;
      document.getElementById("loginAnswer").innerHTML = receivedUserId;
     
if (receivedUserId !== '') {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("all-months").style.display = "block";
  document.getElementById("nav").style.display = "block";
} 
      }
    throw new Error('Request failure!');
    document.getElementById("loginAnswer").innerHTML = 'Network error';
  }
  catch(error) {console.log(error)};
}
asyncLogin();
 setTimeout(function() {
     if (receivedUserId === '') {
    document.getElementById("loginAnswer").innerHTML = 'Incorrect login or password';
}
}, 1500);

document.getElementById("login-saved").value = '';
document.getElementById("password-saved").value = '';
}
else if (loginValue === '') {
  document.getElementById("login-saved").style.backgroundColor = 'red';
} else if (password === '') {
document.getElementById("password-saved").style.backgroundColor = 'red';
}
};

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("modal-close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openDays() {
  const numberOfDays = event.target.id;
  document.getElementById("demo2").innerHTML = numberOfDays;
}
