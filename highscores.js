var highScore = document.querySelector("#highScore");
var clearbtn = document.querySelector("#clearbtn");
var backbtn = document.querySelector("#backbtn");
var everyscore = localStorage.getItem("everyscore");
everyscore = JSON.parse(everyscore);


clearbtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});


if (everyscore !== null) {
  for (var i = 0; i < everyscore.length; i++) {
    var lione = document.createElement("li");
    lione.textContent = everyscore[i].initials + " " + everyscore[i].score + ' seconds';
    highScore.appendChild(lione);
  }
}

backbtn.addEventListener("click", function () {
  window.location.replace("index.html");
});

highScore.sort((a,b) => {return b.score-a.score});