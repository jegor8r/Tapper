const Dolphin = document.getElementById("DolphinButton");
const HP = document.getElementById("HPValue");
const level = document.getElementById("levelValue");
const score = document.getElementById("ScoreValue");
const mood = document.getElementById("moodIcon");

let scoreValue = 0;
const initialScoreMatch = score.textContent.match(/(-?\d+)/);
if (initialScoreMatch) {
    scoreValue = parseInt(initialScoreMatch[0], 10);
}

Dolphin.addEventListener("click", function() {
    scoreValue += 1;
    score.textContent = `★ Score: ${scoreValue}`;
});

function saveScore() {
    localStorage.setItem("score", scoreValue);
    localStorage.setItem("HP", HP.textContent);
    localStorage.setItem("level", level.textContent);
    localStorage.setItem("mood", mood.src); 
    setInterval(saveScore, 1000);
}