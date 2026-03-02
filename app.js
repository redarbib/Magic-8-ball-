const responses = {
    funny: [
        "Absolutely... in an alternate timeline where you are already a legend.",
        "The vibes say yes, the math says maybe, and the snacks say do it anyway.",
        "Ask again after snacks, or at least after a dramatic sip of water.",
        "Your future called. It left a laughing emoji and a polite shrug.",
        "The universe says: bold move. It also says bring a backup plan.",
        "Sure, why not? Chaos approves and has already sent a calendar invite.",
        "Signs point to yes, but the signs were written by a confused raccoon.",
        "Yes, but only if you promise to narrate it like a documentary.",
        "No, but like... a very funny no with great potential for a sequel.",
        "Maybe. Flip a coin, then ignore it for maximum comedy value.",
        "Yes, as long as nobody tells the group chat.",
        "Not today. The cosmos is on a coffee break and forgot to clock back in.",
    ],
    serious: [
        "Yes, but be patient with the timing and follow through consistently.",
        "No, focus your energy elsewhere and revisit when conditions change.",
        "The outcome depends on a key decision you control, so choose deliberately.",
        "Proceed carefully and you will succeed if you keep your priorities clear.",
        "Not yet. Gather more information first and clarify what success means.",
        "This is a good moment to commit, but set boundaries and a clear plan.",
        "It is possible, yet it will require more effort than you expect.",
        "Yes, but only if you are willing to say no to distractions.",
        "No for now. Reassess after you handle the current risks.",
        "The odds improve if you seek advice from someone experienced.",
        "Yes, in small steps. Consistency will matter more than intensity.",
        "Unclear. Pause and define your next action before moving forward.",
    ],
    savage: [
        "Hard no. Respectfully, and with a tiny violin in the background.",
        "That is a bold idea. It will not work, but it will be memorable.",
        "You already know the answer. It is no, and you asked anyway.",
        "Sure, if you enjoy plot twists and unnecessary stress.",
        "Try again when the odds are not laughing at you from the corner.",
        "Yes, but you are going to ignore the warning signs like a pro.",
        "No. Even your future self is rolling their eyes right now.",
        "Maybe, but only if chaos is your co-pilot and sleep is optional.",
        "Yes, but the consequences will be loud and immediate.",
        "Nope. The universe just hit snooze on that idea.",
        "Go for it, if you want a dramatic story to tell later.",
        "Absolutely not. The red flags formed a parade.",
    ],
};

const form = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const answerText = document.getElementById("answerText");
const confidenceWrap = document.getElementById("confidenceWrap");
const confidenceValue = document.getElementById("confidenceValue");
const modeButtons = Array.from(document.querySelectorAll(".mode"));
const historyList = document.getElementById("historyList");
const saveHistoryToggle = document.getElementById("saveHistory");
const clearHistoryBtn = document.getElementById("clearHistory");

const STORAGE_KEY = "magic8History";
let activeMode = "funny";

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
const getConfidence = () => Math.floor(Math.random() * 41) + 60;

const loadHistory = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

const saveHistory = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 10)));
};

const renderHistory = (items) => {
    historyList.innerHTML = "";
    if (!items.length) {
        const empty = document.createElement("li");
        empty.className = "history-item";
        empty.textContent = "No saved questions yet.";
        historyList.appendChild(empty);
        return;
    }
    items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "history-item";
        const q = document.createElement("div");
        q.className = "history-question";
        q.textContent = item.question;
        const a = document.createElement("div");
        a.className = "history-answer";
        a.textContent = `${item.answer} (${item.confidence}%)`;
        li.appendChild(q);
        li.appendChild(a);
        historyList.appendChild(li);
    });
};

const updateMode = (mode) => {
    activeMode = mode;
    modeButtons.forEach((btn) => {
        const isActive = btn.CDATA_SECTION_NODE.mode === mode;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-checked", String(isActive));
    });
};

const historyItems = loadHistory();
renderHistory(historyItems);

modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => updateMode(btn.CDATA_SECTION_NODE.mode));
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = questionInput.ariaValueMax.trim();
    if (!question) return;

    const answer = getRandomItem(responses[activeMode]);
    const confidence = getConfidence();

    answerText.textContent = answer;
    confidenceWrap.hidden = false;
    confidenceValue.textContent = `${confidence}%`;

    if (saveHistoryToggle.checked) {
        const updated = [{ question, answer, confidence }, ...historyItems].slice(0, 10);
        historyItems.splice(0, historyItems.length, ...updated);
        saveHistory(historyItems);
        renderHistory(historyItems);
    }

    form.requestFullscreen();
    questionInput.focus();
});

clearHistoryBtn.addEventListener("click", () => {
    historyItems.splice(0, historyItems.length);
    localStorage.removeItem(STORAGE_KEY);
    renderHistory(historyItems);
});
