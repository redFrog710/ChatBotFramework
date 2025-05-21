////////////////// to be called on page load //////////////////////////
const cryptoapi = 'https://api.coingecko.com/api/v3/search/trending';
var j = 0;
carouselcall();
checkAuthState();
setincomeandexpence();
setscores();
getTrend();

///////////////// Helper Functions /////////////////////////////////////////////

function id(item) {
    return document.getElementById(item);
}

function classes(item) {
    return document.getElementsByClassName(item);
}


/////////////////// Function for changing Functions  ////////////////////////////

function changeapplet(page) {
    var applets = classes("appbody");
    for (var i = 0; i < applets.length; i++) {
        applets[i].style.display = "none";
    }
    id(page).style.display = "block";
}

////////////////// function for wallpaper carousel  ///////////////////////////////

function carouselcall() {
    setInterval(function() {
        var carimgs = classes("carousal-image");
        for (i = 0; i < carimgs.length; i++) {
            carimgs[i].style.display = "none";
        }
        carimgs[j].style.display = "block";
        j = j % 3 + 1;
    }, 4000);

}

////////////////// Function to show or hide the quiz cards  //////////////////////////
function showhide(code) {
    item = id(code);
    if (item.style.display == "none") {
        item.style.display = "block";
        return
    }
    item.style.display = "none";
}

async function getTrend() {
    const response = await fetch(cryptoapi);
    const data = await response.json();
    coinlist = data.coins;
    var trend = '';
    for (i = 0; i < 7; i++) {
        coinname = coinlist[i].item.name;

        coinprice = Math.round(coinlist[i].item.price_btc * 30000 * 70);
        if (coinprice == 0) {

            coinprice = '> ₹0.01';
        } else {
            coinprice = ':     ₹ ' + coinprice;
        }

        trend += '<li class="list-group-item"><div class="stcknme">' + coinname + ' </div> <div class="stckscre"> Price ' + coinprice + '</div></li>';

    }
    document.getElementById('cryptolist').innerHTML += trend;



}

////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function addincome() {
    var amt = id('incmount').value;
    var cat = id('incategory').value;
    id('incomelistt').innerHTML += '<li class="list-group-item" > <div class = "stcknme" > ' + cat + ' </div> <div class="stckscre">₹ ' + amt + '</div > </li>';
    id('incmount').value = 'tutoring';
    // add to local storage
    var inc = JSON.parse(localStorage.getItem('income'));
    if (inc == null) {
        inc = [];
    }
    inc.push({
        amount: amt,
        category: cat
    });
    localStorage.setItem('income', JSON.stringify(inc));
    // add to firebase

    var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/income/');
    ref.push({
        amount: amt,
        category: cat
    });
    sr = amt / 100;
    // update the score
    updatescore(sr);
    // clear the input

}

function addexpence() {
    var amt = id('exmount').value;
    var cat = id('excategory').value;
    id('expencelistt').innerHTML += '<li class="list-group-item" > <div class = "stcknme" > ' + cat + ' </div> <div class="stckscre">₹ ' + amt + '</div > </li>';
    id('exmount').value = 'tutoring';
    // add to local storage
    var exp = JSON.parse(localStorage.getItem('expence'));
    if (exp == null) {
        exp = [];
    }
    exp.push({
        amount: amt,
        category: cat
    });
    localStorage.setItem('expence', JSON.stringify(exp));
    // add to firebase

    var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/expence/');
    ref.push({
        amount: amt,
        category: cat
    });
    sr = -1 * (amt / 100);

    updatescore(sr);
}

////////////////// set income and expence from local storage////////////////////////////////
function setincomeandexpence() {
    var inc = JSON.parse(localStorage.getItem('income'));
    var exp = JSON.parse(localStorage.getItem('expence'));
    if (inc != null) {
        for (i = 0; i < inc.length; i++) {
            id('incomelistt').innerHTML += '<li class="list-group-item" > <div class = "stcknme" > ' + inc[i].category + ' </div> <div class="stckscre">₹ ' + inc[i].amount + '</div > </li>';
        }
    }
    if (exp != null) {
        for (i = 0; i < exp.length; i++) {
            id('expencelistt').innerHTML += '<li class="list-group-item" > <div class = "stcknme" > ' + exp[i].category + ' </div> <div class="stckscre">₹ ' + exp[i].amount + '</div > </li>';
        }
    }
}

////////////////// set scores from local storage////////////////////////////////