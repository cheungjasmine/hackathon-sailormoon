document.addEventListener("DOMContentLoaded", () => {
  // Initialize game variables
  const gameBoard = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-button");
  const cardValues = ["❤️", "🪐", "🐈‍⬛", "🌙", "🌌", "🌟", "⭐", "✨"];
  let cards, firstCard, secondCard, lockBoard, matches;

  // Function to initialize the game
  function initGame() {
    // Reset variables
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matches = 0;

    // Shuffle cards and double them for pairs
    const shuffledCards = [...cardValues, ...cardValues].sort(
      () => Math.random() - 0.5
    );

    // Create card elements
    gameBoard.innerHTML = "";
    shuffledCards.forEach((value) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });

    cards = document.querySelectorAll(".card");
  }

  // Function to handle card flip
  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("flipped"))
      return;

    this.classList.add("flipped");
    this.textContent = this.dataset.value;

    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      lockBoard = true;
      checkMatch();
    }
  }

  // Function to check if two flipped cards match
  function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matches += 2;

      if (matches === cards.length) {
        setTimeout(
          () => alert("🎉 Congratulations! You've matched all cards! 🎉"),
          500
        );
      }

      resetFlip();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.textContent = "";
        secondCard.textContent = "";
        resetFlip();
      }, 1000);
    }
  }

  // Function to reset the flip state
  function resetFlip() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  // Event listener for the restart button
  restartButton.addEventListener("click", initGame);

  // Start the game
  initGame();
});
