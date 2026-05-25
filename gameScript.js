const Dolphin = document.getElementById("DolphinButton");
const HP = document.getElementById("HPValue");
const level = document.getElementById("levelValue");
const score = document.getElementById("ScoreValue");
const mood = document.getElementById("moodIcon");

const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

let scoreValue = 0;
const initialScoreMatch = score.textContent.match(/(-?\d+)/);
if (initialScoreMatch) {
    scoreValue = parseInt(initialScoreMatch[0], 10);
}

Dolphin.addEventListener("click", function() {
    scoreValue += 1;
    score.textContent = `★ Score: ${scoreValue}`;
    // Save immediately on click so progress isn't lost before autosave
    try { saveGame(); } catch (e) {}
});


// Save/load logic
function getState() {
    const moodImg = mood.querySelector('img');
    return {
        score: scoreValue,
        HP: HP.textContent,
        level: level.textContent,
        moodSrc: moodImg ? moodImg.src : null,
        savedAt: Date.now()
    };
}

function applyState(state) {
    if (!state) return;
    if (typeof state.score === 'number') {
        scoreValue = state.score;
        score.textContent = `★ Score: ${scoreValue}`;
    }
    if (state.HP) HP.textContent = state.HP;
    if (state.level) level.textContent = state.level;
    if (state.moodSrc) {
        const moodImg = mood.querySelector('img');
        if (moodImg) moodImg.src = state.moodSrc;
    }
}

function saveGame() {
    try {
        const state = getState();
        localStorage.setItem('tapper_save', JSON.stringify(state));
    } catch (e) {
        console.error('Save failed', e);
    }
}

function loadGame() {
    try {
        const raw = localStorage.getItem('tapper_save');
        if (!raw) return false;
        const state = JSON.parse(raw);
        applyState(state);
        return true;
    } catch (e) {
        console.error('Load failed', e);
        return false;
    }
}

function clearSave() {
    localStorage.removeItem('tapper_save');
}

const AUTO_SAVE_INTERVAL_MS = 5000;
setInterval(saveGame, AUTO_SAVE_INTERVAL_MS);

loadGame();
window.saveGame = saveGame;
window.loadGame = loadGame;
window.clearSave = clearSave;