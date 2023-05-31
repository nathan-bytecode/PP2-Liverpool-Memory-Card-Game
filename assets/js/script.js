const cards = document.querySelectorAll('.memory-card');


function flipCard(){
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard))

function checkForMatch(){

}

function unflipCards(){

}

function disableCards(){

}

function resetBoard(){

}

function shuffle(){

}