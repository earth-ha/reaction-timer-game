// script.js
let startTime;
let endTime;
let reactionTimes = [];
let rounds = 0;
const totalRounds = 5;
const colors = ["red", "green", "blue", "yellow", "purple"];  // 여러 가지 색상 배열

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const colorBox = document.getElementById('color-box');
const resultText = document.getElementById('result');

startButton.addEventListener('click', startGame);
colorBox.addEventListener('click', stopTimer);
restartButton.addEventListener('click', resetGame);

function startGame() {
    startButton.style.display = 'none';
    colorBox.style.display = 'block';
    resultText.textContent = `측정 #${rounds + 1} / 총 ${totalRounds}회`;  // 측정 횟수 표시

    setTimeout(changeColor, Math.random() * 2000 + 1000); // 1초에서 3초 사이 랜덤 시간 후 색상 변경
}

function changeColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // 랜덤 색상 선택
    colorBox.style.backgroundColor = randomColor;
    startTime = new Date().getTime(); // 시작 시간 기록
}

function stopTimer() {
    if (colors.includes(colorBox.style.backgroundColor)) {  // 색상이 변경된 상태에서만 반응 시간 측정
        endTime = new Date().getTime();
        const reactionTime = endTime - startTime;
        reactionTimes.push(reactionTime);
        rounds++;
        resultText.textContent = `측정 #${rounds} / 반응 시간: ${reactionTime}ms`;

        if (rounds < totalRounds) {
            setTimeout(nextRound, 1000); // 1초 대기 후 다음 라운드
        } else {
            displayAverage();
        }
    }
}

function nextRound() {
    colorBox.style.backgroundColor = 'gray'; // 초기 색상으로 회색 설정
    resultText.textContent = `측정 #${rounds + 1} / 총 ${totalRounds}회`;  // 다음 측정 횟수 표시
    setTimeout(changeColor, Math.random() * 2000 + 1000);
}

function displayAverage() {
    const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    resultText.textContent = `평균 반응 시간: ${averageTime.toFixed(2)}ms`;
    restartButton.style.display = 'block';
    colorBox.style.display = 'none';
}

function resetGame() {
    reactionTimes = [];
    rounds = 0;
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    colorBox.style.backgroundColor = 'gray'; // 초기 색상으로 회색 설정
    resultText.textContent = '';
}
