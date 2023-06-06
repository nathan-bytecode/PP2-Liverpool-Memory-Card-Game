const cards = document.querySelectorAll('.memory-card');

//On first flipped card if match with second flipped card it will lock both cards
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
   
    this.classList.add('flip');

    if (!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
   
        // second click
        secondCard = this;

        checkForMatch();
        
    }
    
    //If cards match it will freeze those cards and it will prevent them from flipping back - managed with dataset html atribute
    function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    }

    //Matched card will be disabled for clicks once they are flipped
    function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    console.log("Its a match")

    resetBoard();
    }

    //If cards don't match it will flip the cards back in 0.5s and you will have a new attempt to make
    function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

       resetBoard();
    }, 1000);

    addMove();

    }

    //Moves
    const movesContainer = document.querySelector(".moves");
    let moves = 0;
    movesContainer.innerHTML = 0;
    function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    rating();
    }

    //Timer
    const timerContainer = document.querySelector(".timer");
    let liveTimer,
    totalSeconds = 0;

    timerContainer.innerHTML = totalSeconds + ' s';

    function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
    }

    startTimer()
 
    function stopTimer() {
    clearInterval(liveTimer);
    }

    //Game Restart
    function restart() {
    location.reload();
  }

    //If second card match with first card it will return from the function
    function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    }

    //Use to shuffle cards - 6 front and 6 back side = 12
    (function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard))

