// Seletores
const modeSelector = document.getElementById('modeSelector');
const soloModeBtn = document.getElementById('soloModeBtn');
const duoModeBtn = document.getElementById('duoModeBtn');
const guessTitle = document.getElementById('guessTitle');
const secretContainer = document.getElementById('secretContainer');
const guessArea = document.getElementById('guessArea');
const message = document.getElementById('message');
const attemptsInfo = document.getElementById('attemptsInfo');
const resetBtn = document.getElementById('resetBtn');
const setSecretBtn = document.getElementById('setSecretBtn');
const secretInput = document.getElementById('secretInput');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');

let secretNumber = null;
let attemptsLeft = 5;

soloModeBtn.addEventListener('click', () => {
  modeSelector.classList.add('hidden');
  secretNumber = Math.floor(Math.random() * 100);
  guessTitle.textContent = 'JOGADOR ÚNICO';
  guessArea.classList.remove('hidden');
  attemptsInfo.textContent = `Tentativas restantes: ${attemptsLeft}`;
  message.textContent = '';
});

duoModeBtn.addEventListener('click', () => {
  modeSelector.classList.add('hidden');
  secretContainer.classList.remove('hidden');
});

setSecretBtn.addEventListener('click', () => {
  const value = Number(secretInput.value);
  if (isNaN(value) || value < 0 || secretInput.value.trim() === '') {
    alert('Digite um número válido (positivo)');
    return;
  }
  secretNumber = value;
  secretInput.value = '';
  secretContainer.classList.add('hidden');
  guessArea.classList.remove('hidden');
  attemptsInfo.textContent = `Tentativas restantes: ${attemptsLeft}`;
  message.textContent = '';
});

guessBtn.addEventListener('click', () => {
  if (secretNumber === null) return;
  const guess = Number(guessInput.value);
  if (isNaN(guess) || guess < 0 || guessInput.value.trim() === '') {
    alert('Digite um número válido (positivo)');
    return;
  }
  attemptsLeft--;
  if (guess === secretNumber) {
    message.textContent = 'Parabéns! Você acertou!';
    message.className = 'success';
    endGame();
  } else {
    if (attemptsLeft === 0) {
      message.textContent = `Suas tentativas acabaram! O número era ${secretNumber}.`;
      message.className = 'fail';
      endGame();
    } else {
      message.textContent = guess > secretNumber ? 'O chute foi maior que o número.' : 'O chute foi menor que o número.';
      message.className = '';
      attemptsInfo.textContent = `Tentativas restantes: ${attemptsLeft}`;
    }
  }
  guessInput.value = '';
});

resetBtn.addEventListener('click', () => location.reload());

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  attemptsInfo.style.display = 'none';
  resetBtn.style.display = 'inline-block';
}
