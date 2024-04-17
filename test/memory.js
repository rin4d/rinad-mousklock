document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cardValues = ['A', 'A', 'B',  'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
    let cardFlipped = false;
    let boardLocked = false; // Ajout d'un point-virgule ici
    let firstCard, secondCard;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffleArray(cardValues);
        for (let i = 0; i < cardValues.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-value', cardValues[i]);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function flipCard() {
        if (boardLocked) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.getAttribute('data-value');

        if (!cardFlipped) {
            cardFlipped = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value');

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        boardLocked = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped'); 
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard(){ 
        [cardFlipped, boardLocked] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    createBoard();
})