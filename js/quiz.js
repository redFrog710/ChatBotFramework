///////////////// Helper Functions /////////////////////////////////////////////

function id(item) {
    return document.getElementById(item);
}

function classes(item) {
    return document.getElementsByClassName(item);
}

function submitquiz(quizid) {
    // go to setanswers if auth user is admin

    //check if user is signed in else, ask to sign in
    if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser.email);
        if (firebase.auth().currentUser.email == "sreejithksgupta2255@gmail.com") {
            setanswers(quizid);
        } else {
            // get answer list from firebase
            var answersRef = firebase.database().ref('quizzes/' + quizid + '/answers/');
            answersRef.once('value', function(snapshot) {
                var answers = snapshot.val();
                var questions = classes("qtns");
                var score = 0;
                for (var i = 0; i < questions.length; i++) {

                    var question = document.getElementById('question' + (i + 1));
                    if (question.value == answers[i]) {
                        score++;
                    }
                }
                id("scorecard").innerHTML = "You scored " + score + " out of " + questions.length;
                console.log(score + 'added to your score');
                updatescore(score);

            });


        }
    } else {
        id("scorecard").innerHTML = "Please sign in to submit the quiz";
    }
}

//set answers to firebase 
function setanswers(quizid) {
    var questions = classes("qtns");
    console.log(questions);
    for (var i = 0; i < questions.length; i++) {
        var question = document.getElementById('question' + (i + 1));
        var answersRef = firebase.database().ref('quizzes/' + quizid + '/answers/' + i);
        answersRef.set(question.value);
    }
    id("scorecard").innerHTML = "Answers Set";
}