document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const restartButton = document.getElementById("restartButton");
  const playAgainButton = document.getElementById("playAgainButton");
  const congratsMessage = document.getElementById("congratsMessage");
  const attemptsDisplay = document.getElementById("attempts");
  const finalAttemptsDisplay = document.getElementById("finalAttempts");
  const historyList = document.getElementById("historyList");

  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let attempts = 0;
  let canFlip = true;

  const images = ["🐶", "🐱", "🐭"];

  loadHistory();

  initializeGame();

  restartButton.addEventListener("click", initializeGame);
  playAgainButton.addEventListener("click", () => {
    congratsMessage.style.display = "none";
    initializeGame();
  });

  function initializeGame() {
    gameBoard.innerHTML = "";
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    canFlip = true;

    let gameImages = [...images, ...images];
    gameImages = shuffleArray(gameImages);

    gameImages.forEach((image, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.index = index;
      card.dataset.value = image;

      const img = document.createElement("img");
      img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text x='50%' y='50%' font-size='60' text-anchor='middle' dominant-baseline='middle'>${image}</text></svg>`;
      img.alt = `Imagem ${image}`;

      card.appendChild(img);
      card.addEventListener("click", flipCard);

      gameBoard.appendChild(card);
      cards.push(card);
    });
  }

  function flipCard() {
    if (
      !canFlip ||
      this === flippedCards[0] ||
      this.classList.contains("matched")
    )
      return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      canFlip = false;
      attempts++;
      attemptsDisplay.textContent = attempts;

      checkForMatch();
    }
  }

  function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;

      flippedCards = [];
      canFlip = true;

      if (matchedPairs === images.length) {
        setTimeout(() => {
          finalAttemptsDisplay.textContent = attempts;
          congratsMessage.style.display = "block";
          saveToHistory(attempts);
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
        canFlip = true;
      }, 1000);
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function saveToHistory(attempts) {
    let history = JSON.parse(localStorage.getItem("memoryGameHistory")) || [];
    const now = new Date();
    const dateString =
      now.toLocaleDateString() + " " + now.toLocaleTimeString();

    history.push({
      date: dateString,
      attempts: attempts,
    });

    if (history.length > 10) {
      history = history.slice(history.length - 10);
    }

    localStorage.setItem("memoryGameHistory", JSON.stringify(history));
    loadHistory();
  }

  function loadHistory() {
    const history = JSON.parse(localStorage.getItem("memoryGameHistory")) || [];
    historyList.innerHTML = "";

    if (history.length === 0) {
      historyList.innerHTML = "<li>Nenhum registro ainda</li>";
      return;
    }

    history.reverse().forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.date} - ${item.attempts} tentativas`;
      historyList.appendChild(li);
    });
  }
});
