//-------------------------------------------------------
//VARIABLES
//-------------------------------------------------------
const work = document.querySelector('.work');
const pWork = document.querySelector('.work p');
const repos = document.querySelector('.repos');
const pRepos = document.querySelector('.repos p');
const btnStart = document.querySelector('.start');
const btnPause = document.querySelector('.pause');
const imgPlayPause = document.querySelector('.pause img');
const btnReset = document.querySelector('.reset');
const cycles = document.querySelector('.cycles');
let tempsinitialTravail = 10;
let tempsinitialRepos = 5;
let cptCycles = 0;

// booléen pour la gestion du toggle pause
let pause = false;

// pour éviter le bug au click sur start qui passe en dessous de 0
let checkInterval = false;

// affichage temps initiaux travail et repos
// pour afficher les minutes et secondes => je trunc les minutes obtenues par tempsInitial/60 - si < 10 => je rajoute un 0 pour l'affichage au décompte des secondes que j'obtines avec tempsInitial % 60 et si supérieur ou = à 10, j'affiche les secondes avec tempsInitial % 60
// let minutesWork = Math.trunc(tempsinitialTravail / 60);
// let secondesWork = tempsinitialTravail % 60 < 10 ? '0' + tempsinitialTravail % 60 : tempsinitialTravail % 60;
//-------------------------------------------------------
// FONCTIONS
//-------------------------------------------------------
// fonction qui gère le calcul et l'affichage du temps
function time (p,time){
    p.innerText = `${Math.trunc(time / 60)} : ${time % 60 < 10
        ? `0${time % 60}`
        : time % 60
        }`;
}

//-------------------------------------------------------
// MAIN
//-------------------------------------------------------
// 1 - affichage initial des compteurs
// travail
time(pWork, tempsinitialTravail);
// repos
time(pRepos, tempsinitialRepos);
// cycles
cycles.innerText = cptCycles;

// 2 - démrrage du timer au clic sur start
btnStart.addEventListener('click', () => {
  
    pause = false
    imgPlayPause.setAttribute('src', './ressources/pause.png');

    if (checkInterval === false) {
        checkInterval = true;
        cycles.classList.remove('active-cpt');
        tempsinitialTravail--;
        time(pWork, tempsinitialTravail);
        work.classList.add('active-time');
        let timer = setInterval(() => {
            
            if (pause === false && tempsinitialTravail > 0) {
                cycles.classList.remove('active-cpt');
                repos.classList.remove('active-time');
                // work.classList.add('active-time');
                tempsinitialTravail--;
                time(pWork, tempsinitialTravail);
                
            } else if (
                pause === false &&
                tempsinitialRepos === 0 &&
                tempsinitialTravail === 0
            ) {
                repos.classList.remove('active-time');
                work.classList.add('active-time');
                tempsinitialTravail = 10;
                time(pWork, tempsinitialTravail);
                tempsinitialRepos = 5;
                time(pRepos, tempsinitialRepos);
                cycles.classList.add('active-cpt');
                cptCycles++;
                cycles.innerText = cptCycles;
            } else if (pause === false && tempsinitialTravail === 0) {
                cycles.classList.remove('active-cpt');
                work.classList.remove('active-time');
                repos.classList.add('active-time');
                tempsinitialRepos--;
                time(pRepos, tempsinitialRepos);
            }
        }, 1000)
    } else {
        return;
    }

});

// 3 - pause du timer au clic sur pause

btnPause.addEventListener('click', () => {
    // on passe pause de false à true - on peut donc rajouter pause à nos condtions => c'est l'équivelent d'un toggle à chaque click
    pause = !pause;
    if(pause === false){
        imgPlayPause.setAttribute('src', './ressources/pause.png');
    }else if (pause === true){
        imgPlayPause.setAttribute('src', './ressources/play.png');
    }
});

// 4 - remise à niveau du timer au clic sur reset

btnReset.addEventListener('click', () => {
    work.classList.remove('active-time');
    repos.classList.remove('active-time');
    tempsinitialTravail = 10;
    tempsinitialRepos = 5;
    cptCycles = 0;
    // travail
    time(pWork, tempsinitialTravail);
    // repos
    time(pRepos, tempsinitialRepos);
    // cycles
    cycles.innerText = cptCycles;
})

