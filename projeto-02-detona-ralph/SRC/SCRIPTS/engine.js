const state = {
    view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    live: document.querySelector("#live")
},
values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    live: 3,
},
actions: {
    timerId: setInterval( randomSquare, 1000),
    countDownTimerId: setInterval( countDown, 1000),
}
};

let bgMusic;
function soundtrack() {
    bgMusic = new Audio("/SRC/AUDIOS/soundtrack.m4a");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play();
}

function playSound(nameAudio){
    let audio = new Audio(`/SRC/AUDIOS/${nameAudio}.m4a`);
    audio.volume = 0.3;
    audio.play();
}




function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <=0){
        playSound("gameOver");
        gameOver();
}
    }



function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}


function gameOver() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    if (bgMusic) bgMusic.pause();
    
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("final-score").textContent =
        "Seu resultado foi: " + state.values.result;

    playSound("gameOver");
}


document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
});


function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null
                playSound("hit")
            }
            
            else if(square.id != state.values.hitPosition){
                state.values.live--;
                state.view.live.textContent = state.values.live;
                state.values.hitPosition = null;
                playSound("error");

                if(state.values.live === 0) {
                    playSound("gameOver");
                    gameOver();
                }
            }
        });
    });
};

function initialize(){
    soundtrack();
    addListenerHitBox();
};

initialize();