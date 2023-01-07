var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "csrftoken=45Mo2fNGeq1acz7uwEv6GOCqrZaabR7V; sessionid=s6lret1kwwhdxn9has95q3xaoojltn9z");

var raw = JSON.stringify({
  "username": "vs",
  "password": "vs"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/polls/users/login/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));