function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer, image) {
    this.text = text;
    this.choices = choices;
    this.answer = answer.toLowerCase();
    this.image = image;
}

Question.prototype.isCorrectAnswer = function (choice) {

    return this.answer === choice;
}


function populate() {
    if (quiz.getQuestionIndex() == null ) {
        var element = document.getElementById("question");
        element.innerHTML = "wachten ";
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        var imageSrc = quiz.getQuestionIndex().image;
        var img = document.getElementById("image");
        if (imageSrc) {
            img.hidden = false;
            img.src = imageSrc;
        } else {
            img.hidden = true;
        }
        // show options
        var choices = quiz.getQuestionIndex().choices;
        if(choices == null || choices.length == 0){
          
            document.getElementById("buttonsMultipleChoose").style.visibility = 'hidden';
            document.getElementById("answerTextDiv").style.visibility = 'visible';
            document.getElementById("answerTextBtn").onclick = function(){
                var answer = document.getElementById("answerText").value;
                if(quiz.getQuestionIndex().isCorrectAnswer(answer.toLowerCase())){
                    alert("good zo")
                    quiz.guess(guess);
                    populate();
                }else{
                    alert("hellaas pindakaas")
                }
            }

        } else {
            for (var i = 0; i < choices.length; i++) {
                var element = document.getElementById("choice" + i);
                element.innerHTML = choices[i];
                guess("btn" + i, choices[i]);
            }

            document.getElementById("buttonsMultipleChoose").style.visibility = 'visible';
            document.getElementById("answerTextDiv").style.visibility = 'hidden';
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [ ];

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               var jsonFile =  xmlhttp.responseText;
               var data = JSON.parse(jsonFile);
               console.log(data.vragen)
               this.questions = data.vragen;
               var quiz = new Quiz(this.questions);
                this.questionIndex = 0 ;
               populate();
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "vragen.json", true);
    xmlhttp.send();
}
loadXMLDoc();
// create quiz
var quiz = new Quiz(questions);

// display quiz