function setscores() {
    var scores = JSON.parse(localStorage.getItem('scores'));
    if (scores == null) {
        scores = [];
        // set score and level 0 in scores
        scores.push({
            score: 0,
            level: 0
        });

        // make a new json string
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    id("score").innerHTML = 'Score= ' + scores[0].score;
    id("level").innerHTML = 'Level= ' + scores[0].level;

}

function updatescore(score) {

    var scores = JSON.parse(localStorage.getItem('scores'));
    oldscore = scores[0].score;

    scores[0].score += score;


    lvlup = parseInt(((scores[0].score) - (oldscore)) / 10);
    if (lvlup > 0) {
        scores[0].level += lvlup;
    }
    // set score and level in scores
    localStorage.setItem('scores', JSON.stringify(scores));
    setscores();
}


/////////////////////////////////// set stock  /////////////////////////////////////
/*

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': '4e4a2192e5msh5fd6d76d261d433p1d6fdfjsn43786235137e'
    }
};

fetch('https://yh-finance.p.rapidapi.com/auto-complete?q=tesla&region=US', options)
    .then(response => response.json())
    .then(response => showstockdata(response))
    .catch(err => console.error(err));


function showstockdata(data) {
    var quotes = data.quotes;
    var stockdata = '';
    for (var i = 1; i < quotes.length; i++) {
        stockdata += '<li class="list-group-item"><div class="stcknme">' + quotes[i].shortname + ' </div> <div class="stckscre">Score:' + quotes[i].score + '</div></li>';
    }
    id('stocklist').innerHTML = stockdata;
}

*/





































































//////////////////////////// set the scores of user //////////////////////////////

/*
function setscores(scoree) {


    var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/scores/');
    ref.once('value', function(snapshot) {
            var scores = snapshot.val();



            if (scores == null) {
                scores = [];
                scores.push({
                    score: 0,
                    level: 0,
                });
            }
            if (scoree == 0) {
                console.log("no score added -just checking if score exists");
                return;
            }

            oldscore = scores[0].score % 100;
            console.log(oldscore);
            scores[0].score += scoree;
            var newscore = scores[0].score % 100;
            console.log(newscore);
            if (newscore > oldscore) {
                scores.level += 1;
            }


            var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/scores/');
            ref.push({
                socre: sscore,
                level: llevel,
            });


        }
        localStorage.setItem('scores', JSON.stringify(scores));
    });
}

////////////////////////////// add the expence of user //////////////////////////////







///////////////////// fetch Stock Data /////////////////////////////////

*/