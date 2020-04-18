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
    var task = firebaseref
      .child("texts")
      .push(myIP + document.querySelector(".textField").value.trim());
    document.querySelector(".textField").value = "";
  }
}
function updateTexts() {
  var api = "https://converse-dd75d.firebaseio.com/texts.json";
  $.getJSON(api, response);
  function response(data) {
    var addressArray = [];
    for (var i in data) addressArray.push(data[i]);
    document.querySelector(".messageBody").innerHTML = "<br /> <br /><br />";
    for (var i = 0; i < addressArray.length; i++) {
      if (addressArray[i].includes(myIP)) {
        document.querySelector(".messageBody").innerHTML +=
          '<div class="textHolder"><div class="myText">' +
          addressArray[i].substring(myIP.length) +
          '</div><div class="triangleMT"></div></div>';
      } else {
        document.querySelector(".messageBody").innerHTML +=
          '<div class="textHolder"><div class="theirText">' +
          addressArray[i] +
          '</div><div class="triangleTT"></div></div>';
      }
    }
  }
}
