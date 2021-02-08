let display = document.querySelector('#display-number');
let startBtn = document.querySelector('#start');
let resetBtn = document.querySelector('#reset');
let sessionUp = document.querySelector('#session-up');
let sessionDown = document.querySelector('#session-down');
let breakUp = document.querySelector('#break-up');
let breakDown = document.querySelector('#break-down');
let sessionNumber = document.querySelector('#session-number');
let breakNumber = document.querySelector('#break-number');
let timeText = document.querySelector('#text-time');

let tiempoDescanso = true;
let pausa = true;
let restante = 0;
let countdown = 0;
let seconds = 0;
const alarm = document.createElement('audio');
alarm.setAttribute("src", "https://www.soundjay.com/clock/sounds/alarm-clock-01.mp3");


startBtn.addEventListener('click', startDisplay);
resetBtn.addEventListener('click', resetDisplay);



function startDisplay(e) {
    e.preventDefault();

    clearInterval(countdown);

    if (pausa) {
        startCountdown();
        startBtn.innerHTML = `<a href="#" class="pause"><i class="fas fa-pause"></i>&nbsp;Pause</a>`;
        timeText.innerHTML = `<p>Tiempo de Trabajo</p>`
        pausa = false;
    } else {
        startBtn.innerHTML = `<a href="#" class="inicio"><i class="fas fa-play"></i>&nbsp;Start</a>`;
        timeText.innerHTML = `<p>Pausa</p>`;
        pausa = true;
    }
}

function resetDisplay(e) {
    e.preventDefault();

    clearInterval(countdown);
    seconds = sessionNumber.textContent * 60;
    tiempoDescanso = true;
    pausa = true;
    restante = 0;
    countdown = 0;
    startBtn.innerHTML = `<a href="#" class="inicio"><i class="fas fa-play"></i>&nbsp;Start</a>`;
    timeText.innerHTML = `<p></p>`;

    tiempoRestante(seconds)
}


function timer() {
    seconds--;

    if (seconds < 0) {
        alarm.currentTime = 0;
        alarm.play();

        timeText.innerHTML = `<p>Tiempo de Descanso</p>`

        if (tiempoDescanso) {
            seconds = breakNumber.textContent * 60;
            tiempoDescanso = false;
        } else {
            seconds = sessionNumber.textContent * 60;
            tiempoDescanso = true;
        }

        countdown = setInterval(timer, 1000);
        return;
    }

    tiempoRestante(seconds);
}

function startCountdown() {
    if (restante != 0) {
        seconds = restante;
    } else {
        seconds = sessionNumber.textContent * 60;
    }

    countdown = setInterval(timer, 1000);
}


function tiempoRestante(seconds) {
    const minutos = Math.floor(seconds / 60);
    const segundosRestantes = seconds % 60;
    display.textContent = `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`
}


sessionUp.addEventListener('click', (e) => {
    e.preventDefault();
    let x = parseInt(sessionNumber.textContent);
    if (x < 60) {
        sessionNumber.textContent = x + 5;
    }
});

sessionDown.addEventListener('click', (e) => {
    e.preventDefault();
    let x = parseInt(sessionNumber.textContent);
    if (x > 5) {
        sessionNumber.textContent = x - 5;
    }
});


breakUp.addEventListener('click', (e) => {
    e.preventDefault();
    let y = parseInt(breakNumber.textContent);
    if (y < 60) {
        breakNumber.textContent = y + 5;
    }
});

breakDown.addEventListener('click', (e) => {
    e.preventDefault();
    let y = parseInt(breakNumber.textContent);
    if (y > 5) {
        breakNumber.textContent = y - 5;
    }
});