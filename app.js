var myIP = prompt("Enter email").replace("@", "-").replace(".", "-"),
  theirIP = prompt("Enter your friend's email")
    .replace("@", "-")
    .replace(".", "-");
window.onload = function () {
  setInterval(updateTexts, 250);
};

var IP = [myIP, theirIP];
IP.sort();
var IPs = IP[0] + IP[1];

function sendTxt() {
  var firebaseref = firebase.database().ref();
  if (document.querySelector(".textField").value.trim()) {
    console.log(IPs);
    var task = firebaseref
      .child("texts")
      .child(IPs.replace("@", "-").replace(".", "-"))
      .push({
        user: myIP,
        message: document.querySelector(".textField").value.trim(),
      });
    document.querySelector(".textField").value = "";
  }
}
function updateTexts() {
  var api = "https://converse-dd75d.firebaseio.com/texts/" + IPs + ".json";
  $.getJSON(api, response);
  function response(data) {
    var messageArray = [],
      userArray = [];
    for (var i in data) {
      messageArray.push(data[i].message);
      userArray.push(data[i].user);
    }
    document.querySelector(".messageBody").innerHTML = "<br /> <br /><br />";
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i] == myIP) {
        document.querySelector(".messageBody").innerHTML +=
          '<div class="textHolder"><div class="myText">' +
          messageArray[i] +
          '</div><div class="triangleMT"></div></div>';
      } else {
        document.querySelector(".messageBody").innerHTML +=
          '<div class="textHolder"><div class="theirText">' +
          messageArray[i] +
          '</div><div class="triangleTT"></div></div>';
      }
    }
  }
}
function resetPosition() {
  var current = document.querySelector(".messageBody");
  if (current.scrollTop > current.scrollHeight - current.clientHeight - 5) {
    console.log("damn!");
    current.scrollTo(0, current.scrollHeight - current.clientHeight);
  }
}
