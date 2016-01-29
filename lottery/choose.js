var eleRunBtn = document.getElementById("btnChooseGame");
var elePerson = document.getElementById("person-box");
var timer;
var ran;
var chooseList = [];
var winnerList = [];


function containsWinner(winner) {
    for (var i = 0; i < winnerList.length; i++) {
        if (winnerList[i] === winner) {
            return true;
        }
    }
    return false;
}

function addWinner(winner) {
    if (!containsWinner(winner)) {
        winnerList.push(winner);
        flushWinner();
    }
}

function remove(arr, item) {
    for(var i = arr.length; i--;) {
        if(arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

function deleteWinner(winner) {
    remove (winnerList, winner);
    flushWinner();
}

function flushWinner() {
    var result = '<ul class="win">';
    for (var i = 0; i < winnerList.length; i++) {
        var name = winnerList[i].split(":")[0];
        var img = 'asset/' + winnerList[i].split(":")[1];
        result += '<li ><div class="inline"><img width="64" src="' + img + '"></div>\
            <div class="inline win-name">' + name + '</div>\
            <div class="inline win-del"><button title="delete" class="icon icon-delete" onclick="deleteWinner(\'' + winnerList[i] +'\')' + '"></button></div>\
            </li>';
    }
    result += '</ul>';

    $('#list').html(result);
    window.scrollTo(0,document.body.scrollHeight)
}

// 事件绑定，选人逻辑
eleRunBtn.addEventListener("click", function () {
    var realIndex,
        realPerson,
        resultStr;

    // 如果已经开始，则暂停
    if (timer) {
        clearInterval(timer);
        timer = null;
        eleRunBtn.innerText = "start";
        realIndex = getRandomIndex();
        if (realIndex === false) {
            alert("no one else!");
            return false;
        }
        realPerson = employees[realIndex];
        renderPerson(realPerson, elePerson);
        chooseList.push(realPerson);
        resultStr = renderLuckyArray(chooseList);
        document.getElementsByClassName("selected-result")[0].innerHTML = resultStr;
        return false;
    }

    // 暂停状态下，即开始
    eleRunBtn.innerText = "stop";
    timer = setInterval(function () {
        ran = random(employees.length - 1);
        renderPerson(employees[ran], elePerson);
    }, 100);

}, false);

document.getElementById("btnRestart").addEventListener("click", function () {
    for (var i = 0; i < window.employees.length; i++) {
        var employe = window.employees[i];
        if (!containsWinner(employe.name + ':' + employe.img)) {
            employe.done = false;
        }
    }
    $("#selected-result").html("");
    chooseList = [];
});
