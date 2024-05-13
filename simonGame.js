let gameSeq=[];
let userSeq=[];
let btns=["red","yellow","green","purple"];

//if game is off or not started we make variable dtartred false
let started=false;
let level=0;
let h2=document.querySelector("h2")

document.addEventListener("keypress", function (){
    if(started == false){ // line means if game in not play  or started is false we press any key
        // print "game is started" if started is true means game once started no any key work to print 
        console.log("Game is started")
        started=true;
       
        levelUp();
        
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
}

function levelUp(){
    userSeq=[];// if the levelup function call the userseq is reset start again on the basis iof level
    level++;
    h2.innerText=`level ${level}`;
   
    let rendIdx=Math.floor(Math.random()*3)//generate random idx
    let randColr=btns[rendIdx]// generate random color variable the random idx number store in btns
    let randBtn=document.querySelector(`.${randColr}`) //here random botton generate
    // console.log(rendIdx);
    // console.log(randColr);
    // console.log(randBtn);
    gameSeq.push(randColr)
    console.log(gameSeq)
    gameFlash(randBtn);
}
function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        const currentHighScore = getHighScore();
        if (level > currentHighScore) {
            setHighScore(level);
        }

        h2.innerHTML = `Game over! Your score is <b>${level}</b><br>high score of game  is <b>${getHighScore()}</b><br>Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}
// function checkAns(idx){
//     // console.log("curr: level is : " ,level)
//     // let idx=level-1;
//     if(gameSeq[idx] === userSeq[idx]){
//        if(userSeq.length == gameSeq.length){
//        setTimeout(levelUp,1000)
//        }
//     }else{
//         h2.innerHTML=`Game over !  your score is <b>${level}</b> <br> Press any key to Start again`
//         document.querySelector("body").style.backgroundColor="red";
//         setTimeout(function(){
//             document.querySelector("body").style.backgroundColor="white"; 
//         },150)
//         reset();
//     }
// }

//step 3
function btnPress(){// here funvtion is button press this means which buttun and class btnFlash function 
//  console.log(this)
    let btn=this;
    userFlash(btn)

    userColor=btn.getAttribute("id")
    userSeq.push(userColor)
    // console.log(userColor)
    checkAns(userSeq.length-1);
}

// this is use for make clickable button 
let allBtns=document.querySelectorAll(".btn")//here loop is call for all btn class in html we use and 
//then add event listener use click and call function btnPress
for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function getHighScore() {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore === null) {
        return 0; // Return 0 if no high score is stored yet
    }
    return parseInt(storedHighScore);
}

function setHighScore(score) {
    localStorage.setItem('highScore', score.toString());
}
