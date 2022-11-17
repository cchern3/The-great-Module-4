// creating an array for the questions/answers
var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      answerchoices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },

    {
      question: "The condition in an if / else statement is enclosed within ____.",
      answerchoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },

    {
      question: "Arrays in Javascript can be used to store ____.",
      answerchoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },

    {
      question: "String values must be enclosed within ____ when being assigned to variables.",
      answerchoices: ["commas", "curly brackets", "quotes", "parenthesis"],
      answer: "quotes"
    },

    {
      question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
      answerchoices: ["Javascript", "terminal / bash", "for loops", "console log"],
      answer: "console log"
    }

  ];
  
  //list variables to start corresponding functions of the score and time
  var score = 0;
  var questl = 0;
  var Time = document.querySelector("#Time");
  var starttimer = document.querySelector("#startbtn");
  var qcontainer = document.querySelector("#qcontainer");
  var everything = document.querySelector("#everything");
  
  //Timer parameters
  var timelimit = 90;
  var timeint = 0;
  var penalty = 15;
  var varunlist = document.createElement("ul");
  
  //timer display
  starttimer.addEventListener("click", function () {
    if (timeint === 0) {
      timeint = setInterval(function () {
        timelimit--;
        Time.textContent = "Time Left: " + timelimit;
  
        if (timelimit <= 0) {
          clearInterval(timeint);
          end();
          Time.textContent = "Time's up!";
        }
      }, 1000);
    } make(questl);
  });
  
  //function to begin the quiz
  function make(questl) {
    qcontainer.innerHTML = "";
    varunlist.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questl].question;
      var userChoices = questions[questl].answerchoices;
      qcontainer.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      qcontainer.appendChild(varunlist);
      varunlist.appendChild(listItem);
      listItem.addEventListener("click", com);
    });
  }
  //create a function that will compare user answer to the correct answer
  function com(event) {
    var element = event.target;
    if (element.matches("li")) {
      var elementd = document.createElement("div");
      elementd.setAttribute("id", "cont2");
      if (element.textContent == questions[questl].answer) {
        score++;
        elementd.textContent = "Correct!";
      } else {
        timelimit = timelimit - penalty;
        elementd.textContent = "Wrong!";
      }
    }
  
    questl++;
  
    if (questl >= questions.length) {
      end();
      elementd.textContent = "End of quiz!" + " " + "You got  " + score + " out of " + questions.length + " correct!";
    } else {
      make(questl);
    }
    qcontainer.appendChild(elementd);
  }
  
  //Finishing up the quiz
  function end() {
    qcontainer.innerHTML = "";
    Time.innerHTML = "";
  
    var Hone = document.createElement("h1");
    Hone.setAttribute("id", "createH1");
    Hone.textContent = "All Done!";
  
    qcontainer.appendChild(Hone);
  
    // score of the time remaining after the timer ends
    if (timelimit >= 0) {
      var remaining = timelimit;
      var createP = document.createElement("p");
      clearInterval(timeint);
      createP.textContent = "Your final score is: " + remaining;
  
      qcontainer.appendChild(createP);
    }
  
    var labelone = document.createElement("label");
    labelone.setAttribute("id", "createLabel");
    labelone.textContent = "Enter your initials: ";
  
    qcontainer.appendChild(labelone);
  
    var text1 = document.createElement("input");
    text1.setAttribute("type", "text");
    text1.setAttribute("id", "init");
    text1.textContent = "";
  
    qcontainer.appendChild(text1);
  
    var submitb = document.createElement("button");
    submitb.setAttribute("class", "submitbtn");
    submitb.setAttribute("type", "submit");
    submitb.textContent = "Submit";
  
    qcontainer.appendChild(submitb);
  
    // creating a local storage for the scores
    submitb.addEventListener("click", function () {
      var init = text1.value;
  
      if (!init) {
        window.alert("No value entered!");
      } else {
        var finalScore = {
          init: init,
          score: remaining,
        };

        var everyscore = localStorage.getItem("everyscore");
        
        if (!everyscore) {
          everyscore = [];
        } else {
          everyscore = JSON.parse(everyscore);
        }
        everyscore.push(finalScore);
        //sorting the scores to make them in order of ranking
        everyscore.sort((a,b) => {return b.score-a.score});


        localStorage.setItem("everyscore", JSON.stringify(everyscore));

        window.location.replace("highScores.html");
      }
    });
  }
  