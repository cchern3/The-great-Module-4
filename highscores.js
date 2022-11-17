//setting highscore variables
var topscore = document.querySelector("#highScore");
var clearbtn = document.querySelector("#clearbtn");
var backbtn = document.querySelector("#backbtn");
var everyscore = localStorage.getItem("everyscore");
everyscore = JSON.parse(everyscore);

//creating a clear button to get rid of all scores
clearbtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//this shows that every there is nothing undefined then the score will be shown on the highscore display
if (everyscore !== null) {
  for (var i = 0; i < everyscore.length; i++) {
    var lione = document.createElement("li");
    lione.textContent = everyscore[i].initials + " " + everyscore[i].score + ' seconds';
    topscore.appendChild(lione);
  }
}

backbtn.addEventListener("click", function () {
  window.location.replace("index.html");
});

//ranking the scores 
topscore.sort((a,b) => {return b.score-a.score});