// Configuração inicial
const totalNumbers = 75;
const numbers = Array.from({length: totalNumbers}, (_, i) => i + 1);
let availableNumbers = [...numbers];
let drawnNumbers = [];
let isDrawing = false;
let manualInterval;

// Elementos do DOM
const numberDisplay = document.getElementById('numberDisplay');
const drawBtn = document.getElementById('drawBtn');
const clearBtn = document.getElementById('clearBtn');
const manualBtn = document.getElementById('manualBtn');
const drawnNumbersContainer = document.getElementById('drawnNumbers');

// Inicializa o display
updateDisplay('?');

// Event listeners
drawBtn.addEventListener('click', drawNumber);
clearBtn.addEventListener('click', clearDraw);
manualBtn.addEventListener('mousedown', startManualDraw);
manualBtn.addEventListener('mouseup', stopManualDraw);
manualBtn.addEventListener('mouseleave', stopManualDraw);

// Função para sortear um número
function drawNumber() {
    if (availableNumbers.length === 0) {
        alert('Todos os números já foram sorteados!');
        return;
    }
    
    if (isDrawing) return;
    isDrawing = true;
    
    // Animação de rolagem
    const totalRolls = 20;
    let rolls = 0;
    const rollInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const tempNumber = availableNumbers[randomIndex];
        updateDisplay(tempNumber);
        
        rolls++;
        if (rolls > totalRolls) {
            clearInterval(rollInterval);
            finalizeDraw();
        }
    }, 100);
}

// Finaliza o sorteio
function finalizeDraw() {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers.splice(randomIndex, 1)[0];
    drawnNumbers.push(drawnNumber);
    
    updateDisplay(drawnNumber);
    addDrawnNumber(drawnNumber);
    createConfetti();
    isDrawing = false;
    
    if (availableNumbers.length === 0) {
        drawBtn.disabled = true;
    }
}

// Atualiza o display
function updateDisplay(number) {
    // Remove todas as spans existentes
    while (numberDisplay.firstChild) {
        numberDisplay.removeChild(numberDisplay.firstChild);
    }
    
    const span = document.createElement('span');
    span.textContent = number;
    span.classList.add('active');
    numberDisplay.appendChild(span);
}

// Adiciona número sorteado à lista
function addDrawnNumber(number) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('drawn-number');
    numberElement.textContent = number;
    drawnNumbersContainer.prepend(numberElement);
}

// Limpa o sorteio
function clearDraw() {
    availableNumbers = [...numbers];
    drawnNumbers = [];
    drawnNumbersContainer.innerHTML = '';
    updateDisplay('?');
    drawBtn.disabled = false;
}

// Inicia sorteio manual
function startManualDraw() {
    if (availableNumbers.length === 0) return;
    
    manualInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const tempNumber = availableNumbers[randomIndex];
        updateDisplay(tempNumber);
    }, 100);
}

// Para sorteio manual
function stopManualDraw() {
    clearInterval(manualInterval);
    
    if (availableNumbers.length > 0) {
        finalizeDraw();
    }
}

// Cria efeito de confete
function createConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
        
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() * 200 - 100);
        const startY = -10;
        const endY = window.innerHeight;
        const rotation = Math.random() * 360;
        const size = Math.random() * 10 + 5;
        const color = `hsl(${Math.random() * 60 + 350}, 100%, 50%)`;
        const duration = Math.random() * 3 + 2;
        
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        
        setTimeout(() => {
            confetti.style.transition = `all ${duration}s ease-out`;
            confetti.style.transform = `translate(${endX - startX}px, ${endY}px) rotate(${rotation}deg)`;
            confetti.style.opacity = '0.7';
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, 10);
    }
}