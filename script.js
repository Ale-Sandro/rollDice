'use strict';

//Select elements 
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');




//Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');




const scores = [0,0];
let total = 0;
let activePlayer = 0;
let playing = true;


// Rolling dice functionality 

btnRoll.addEventListener('click',function(){
    // 1. Generating a random dice roll
    let diceRandom = 1 + Math.round(Math.random()*5);
    console.log(diceRandom);
    
    // 2. Display dice
    diceEl.src = `dice-${diceRandom}.png`;
    diceEl.classList.remove('hidden');

    
    //3. Check for rolled 1: if true , switch to next player
    if(diceRandom == 1){
        switchPlayer();
    }else{
        total += diceRandom;
        document.querySelector(`#current--${activePlayer}`).textContent = total;
    }
});


//4. Hold the score

btnHold.addEventListener("click",function(){
     //Finish the game
     scores[activePlayer] += total; 
     document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
     
     if(scores[activePlayer] >=20){
         playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        btnRoll.classList.add('hidden');
        btnHold.classList.add('hidden');
        diceEl.classList.add('hidden');


    }else{
        switchPlayer();
    }
    
});



function switchPlayer(){
    total = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = total;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}


//Play again

btnNew.addEventListener('click',function(){
    total = 0;
    
    scores[0] = 0;
    scores[1] = 0;

    document.querySelector(`#current--0`).textContent = total;
    document.querySelector(`#current--1`).textContent = total;


    document.querySelector(`#score--0`).textContent = scores[0];
    document.querySelector(`#score--1`).textContent = scores[1];


    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');






    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
    diceEl.classList.remove('hidden');
})