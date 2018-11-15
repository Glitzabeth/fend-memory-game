/*
 * Create a list that holds all of your cards
 */
// array of cards
const theCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond",
    "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-anchor",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"
]

const cardContainer = document.querySelector(".deck");

let revealedCards = [];
let matchedCards = [];
let modalShow = document.getElementsByClassName("modal")[0];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card"s HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Start the Game
function init() {
  //  clearInterval(watch);
    window.onload = function() {
        modalShow.style.display = "none";
    }
    shuffle(theCards);
    // create the cards
    for (let i = 0; i < theCards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${theCards[i]}"></i>`;
        cardContainer.appendChild(card);
        //Add click event
        click(card);

    }
}

//click event
function click(card) {

    //click event on theCards
    card.addEventListener("click", function() {
        
        const currentCard = this;
        const formerCards = revealedCards[0];
        // previously opened card
        if (revealedCards.length === 1) {
            card.classList.add("open", "show", "disabled");
            revealedCards.push(this);
            contrast(currentCard, formerCards);
        } else {
            // no opencard
            currentCard.classList.add("open", "show", "disabled");
            revealedCards.push(this);
        }

    });
}

function contrast(currentCard, formerCards) {
    //comparing and contrasting cards
    if (currentCard.innerHTML === formerCards.innerHTML) {
        currentCard.classList.add("match");
        formerCards.classList.add("match");
        matchedCards.push(currentCard, formerCards);
        revealedCards = [];

        //check if the game is over
        setTimeout(endgame, 500);
    } else {

        setTimeout(function() {
            // matching cards
            currentCard.classList.remove("open", "show", "disabled");
            formerCards.classList.remove("open", "show", "disabled");

        }, 500);
        revealedCards = [];

    }

    addMove();
}

//Tick - tock, tick TOCK
let duration = document.querySelector(".time");
let count = 0;
let watch = setInterval(counter, 1000);

function counter() {
    duration.textContent = count++ + " Seconds";
}

//function endgame
function endgame() {
    if (matchedCards.length === theCards.length) {
        clearInterval(watch);
        modalContent();

    }
}


const movesContainer = document.querySelector(".moves");
//add move
let moves = 0;
movesContainer.innerHTML = 0;

let update_moves = function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    rater();
}

//rater

let starsContainer = document.getElementsByClassName("stars")[0];

function rater() {
    if (moves < 19) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

    } else if (moves < 28) {
        starsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

    } else if (moves > 28) {
        starsContainer.innerHTML = ` <i class="fa fa-star"></i></li>`;
    }

}
// Play again
const replayBtn = document.querySelector(".restart");
replayBtn.addEventListener("click", function() {
    cardContainer.innerHTML = "";
    init();
    
    revealedCards = [];
    matchedCards = [];
    moves = 0;
    count = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    
   
});
// initialize  game from Modal tray
init();

// modal
let modal = document.getElementById("justModal");
let modalBtn = document.getElementById("modalBtn");
let closeBtn = document.getElementsByClassName("closeBtn")[0];

//open modal event listener
modalBtn.addEventListener("click", openModal);

function openModal() {
    modal.style.display = "block";
};

closeBtn.addEventListener("click", endModal);

function endModal() {
    modal.style.display = "none";
}

window.addEventListener("click", clickOutside);

function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = "none";
        
    }
    
}

//modal content
let modalText = document.querySelector(".modal-content");
let modalFooter = document.querySelector(".bottom");

function modalContent() {
    // Message to player
    modalShow.style.display = "block";
    modalText.textContent = ` Well done!!! you finished the game in ${count} seconds with ${moves} moves you badged  `;
    let starsContainer_clone =starsContainer.cloneNode(true);
    modalText.appendChild(starsContainer_clone);
 //  modalText.appendChild(replayBtn);
    modalFooter;
   
    
   
    }

    modalFooter.addEventListener("click", function() {
        cardContainer.innerHTML = "";
        revealedCards = [];
        matchedCards = [];
        moves = 0;
       duration.textContent = 0;
       count = 0;
       watch = setInterval(counter, 1000);
        movesContainer.innerHTML = moves;
        starsContainer.innerHTML = ` <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
        modalShow.style.display = "none";
        init();
    })


