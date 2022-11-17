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
  
  var score = 0;
  var questionList = 0;
  var Time = document.querySelector("#Time");
  var starttimer = document.querySelector("#startbtn");
  var qcontainer = document.querySelector("#qcontainer");
  var everything = document.querySelector("#everything");
  
  //Creating the Timer
  var timelimit = 90;
  var holdInterval = 0;
  var penalty = 15;
  var ulCreate = document.createElement("ul");
  
  starttimer.addEventListener("click", function () {
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        timelimit--;
        Time.textContent = "Time Left: " + timelimit;
  
        if (timelimit <= 0) {
          clearInterval(holdInterval);
          allDone();
          Time.textContent = "Time's up!";
        }
      }, 1000);
    }
    render(questionList);
  });
  
  //create a function so that the list of questions runs on start
  function render(questionList) {
    qcontainer.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
      var userQuestion = questions[questionList].question;
      var userChoices = questions[questionList].answerchoices;
      qcontainer.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      qcontainer.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", compare);
    });
  }
  //create a function that will compare user answer to the correct answer
  function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      if (element.textContent == questions[questionList].answer) {
        score++;
        createDiv.textContent = "Correct!";
      } else {
        timelimit = timelimit - penalty;
        createDiv.textContent = "Wrong!";
      }
    }
  
    questionList++;
  
    if (questionList >= questions.length) {
      allDone();
      createDiv.textContent = "End of quiz!" + " " + "You got  " + score + " out of " + questions.length + " correct!";
    } else {
      render(questionList);
    }
    qcontainer.appendChild(createDiv);
  }
  
  //This is the end of the quiz
  function allDone() {
    qcontainer.innerHTML = "";
    Time.innerHTML = "";
  
    var Hone = document.createElement("h1");
    Hone.setAttribute("id", "createH1");
    Hone.textContent = "All Done!";
  
    qcontainer.appendChild(Hone);
  
    // Stops timer and uses the number as a score
    if (timelimit >= 0) {
      var timeRemaining = timelimit;
      var createP = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your final score is: " + timeRemaining;
  
      qcontainer.appendChild(createP);
    }
  
    var labelone = document.createElement("label");
    labelone.setAttribute("id", "createLabel");
    labelone.textContent = "Enter your initials: ";
  
    qcontainer.appendChild(labelone);
  
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
  
    qcontainer.appendChild(createInput);
  
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("class", "submitbtn");
    createSubmit.setAttribute("type", "submit");
    createSubmit.textContent = "Submit";
  
    qcontainer.appendChild(createSubmit);
  
    // creating a local storage for the scores
    createSubmit.addEventListener("click", function () {
      var init = createInput.value;
  
      if (!init) {
        window.alert("No value entered!");
      } else {
        var finalScore = {
          initials: init,
          score: timeRemaining,
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
  