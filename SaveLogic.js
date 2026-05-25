const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

const scoreEl = document.getElementById("ScoreValue");
const HPEl = document.getElementById("HPValue");
const levelEl = document.getElementById("levelValue");
const moodEl = document.getElementById("moodIcon");

// Save/load logic
function getState() {
    const moodImg = moodEl?.querySelector('img');
    const scoreText = scoreEl?.textContent || '';
    const scoreMatch = scoreText.match(/(-?\d+)/);
    return {
        score: scoreMatch ? parseInt(scoreMatch[0], 10) : 0,
        HP: HPEl?.textContent || '',
        level: levelEl?.textContent || '',
        moodSrc: moodImg ? moodImg.src : null,
        savedAt: Date.now()
    };
}

function applyState(state) {
    if (!state) return;
    if (typeof state.score === 'number' && scoreEl) {
        scoreEl.textContent = `★ Score: ${state.score}`;
    }
    if (state.HP && HPEl) HPEl.textContent = state.HP;
    if (state.level && levelEl) levelEl.textContent = state.level;
    if (state.moodSrc && moodEl) {
        const moodImg = moodEl.querySelector('img');
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