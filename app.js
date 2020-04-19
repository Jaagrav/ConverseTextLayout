var myIP = "jaagrav",
  textUpdater;
window.onload = function () {
  getIP();
  function getIP() {
    $.getJSON("https://jsonip.com?callback=?", function (data) {
      myIP = data.ip;
    });
    textUpdater = setInterval(updateTexts, 10);
  }
};
function sendTxt() {
  var firebaseref = firebase.database().ref();
  if (document.querySelector(".textField").value.trim()) {
    var task = firebaseref.child("texts").push({
      user: myIP,
      message: document.querySelector(".textField").value.trim(),
    });
    document.querySelector(".textField").value = "";
  }
}
function updateTexts() {
  var api = "https://converse-dd75d.firebaseio.com/texts.json";
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
