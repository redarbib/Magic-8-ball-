const responses = {
  funny: [
    { text: "Absolutely... in an alternate timeline where you are already a legend.", tag: "yes", weight: 2 },
    { text: "The vibes say yes, the math says maybe, and the snacks say do it anyway.", tag: "yes", weight: 2 },
    { text: "Ask again after snacks, or at least after a dramatic sip of water.", tag: "maybe", weight: 2 },
    { text: "Your future called. It left a laughing emoji and a polite shrug.", tag: "maybe", weight: 1 },
    { text: "The universe says: bold move. It also says bring a backup plan.", tag: "yes", weight: 1 },
    { text: "Sure, why not? Chaos approves and has already sent a calendar invite.", tag: "yes", weight: 2 },
    { text: "Signs point to yes, but the signs were written by a confused raccoon.", tag: "yes", weight: 1 },
    { text: "Yes, but only if you promise to narrate it like a documentary.", tag: "yes", weight: 1 },
    { text: "No, but like... a very funny no with great potential for a sequel.", tag: "no", weight: 1 },
    { text: "Maybe. Flip a coin, then ignore it for maximum comedy value.", tag: "maybe", weight: 1 },
    { text: "Yes, as long as nobody tells the group chat.", tag: "yes", weight: 1 },
    { text: "Not today. The cosmos is on a coffee break and forgot to clock back in.", tag: "no", weight: 1 },
  ],
  serious: [
    { text: "Yes, but be patient with the timing and follow through consistently.", tag: "yes", weight: 2 },
    { text: "No, focus your energy elsewhere and revisit when conditions change.", tag: "no", weight: 2 },
    { text: "The outcome depends on a key decision you control, so choose deliberately.", tag: "maybe", weight: 2 },
    { text: "Proceed carefully and you will succeed if you keep your priorities clear.", tag: "yes", weight: 1 },
    { text: "Not yet. Gather more information first and clarify what success means.", tag: "maybe", weight: 2 },
    { text: "This is a good moment to commit, but set boundaries and a clear plan.", tag: "yes", weight: 1 },
    { text: "It is possible, yet it will require more effort than you expect.", tag: "maybe", weight: 1 },
    { text: "Yes, but only if you are willing to say no to distractions.", tag: "yes", weight: 1 },
    { text: "No for now. Reassess after you handle the current risks.", tag: "no", weight: 1 },
    { text: "The odds improve if you seek advice from someone experienced.", tag: "maybe", weight: 1 },
    { text: "Yes, in small steps. Consistency will matter more than intensity.", tag: "yes", weight: 1 },
    { text: "Unclear. Pause and define your next action before moving forward.", tag: "maybe", weight: 1 },
  ],
  savage: [
    { text: "Hard no. Respectfully, and with a tiny violin in the background.", tag: "no", weight: 2 },
    { text: "That is a bold idea. It will not work, but it will be memorable.", tag: "no", weight: 2 },
    { text: "You already know the answer. It is no, and you asked anyway.", tag: "no", weight: 2 },
    { text: "Sure, if you enjoy plot twists and unnecessary stress.", tag: "maybe", weight: 1 },
    { text: "Try again when the odds are not laughing at you from the corner.", tag: "no", weight: 1 },
    { text: "Yes, but you are going to ignore the warning signs like a pro.", tag: "yes", weight: 1 },
    { text: "No. Even your future self is rolling their eyes right now.", tag: "no", weight: 1 },
    { text: "Maybe, but only if chaos is your co-pilot and sleep is optional.", tag: "maybe", weight: 1 },
    { text: "Yes, but the consequences will be loud and immediate.", tag: "yes", weight: 1 },
    { text: "Nope. The universe just hit snooze on that idea.", tag: "no", weight: 1 },
    { text: "Go for it, if you want a dramatic story to tell later.", tag: "maybe", weight: 1 },
    { text: "Absolutely not. The red flags formed a parade.", tag: "no", weight: 1 },
  ],
};

const themedResponses = {
  love: [
    { text: "Love says yes, but only if you show up with honesty.", tag: "yes", weight: 2 },
    { text: "Not yet. Let it breathe before you push.", tag: "maybe", weight: 2 },
    { text: "No, protect your heart this time.", tag: "no", weight: 1 },
  ],
  money: [
    { text: "Yes, but only if you budget like a machine.", tag: "yes", weight: 2 },
    { text: "Maybe. Run the numbers twice.", tag: "maybe", weight: 2 },
    { text: "No. The math does not love this.", tag: "no", weight: 1 },
  ],
  school: [
    { text: "Yes, but pace yourself and ask for help early.", tag: "yes", weight: 2 },
    { text: "Maybe. Make a plan and stick to it.", tag: "maybe", weight: 2 },
    { text: "No for now. You need more prep.", tag: "no", weight: 1 },
  ],
};

const timeBias = {
  morning: [{ text: "Fresh start energy says yes.", tag: "yes", weight: 1 }],
  afternoon: [{ text: "Mixed signals. Check your priorities.", tag: "maybe", weight: 1 }],
  evening: [{ text: "Slow down. Not tonight.", tag: "no", weight: 1 }],
  weekend: [{ text: "Weekend chaos says maybe.", tag: "maybe", weight: 1 }],
};

const easterEggs = [
  { match: /open the pod bay doors|hal 9000/i, text: "I am sorry, Dave. I am afraid I cannot do that.", tag: "no" },
  { match: /meaning of life|42/i, text: "42. But you already knew that.", tag: "yes" },
  { match: /rickroll|never gonna give you up/i, text: "Never gonna give you up. Yes.", tag: "yes" },
];

const form = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const answerQuestion = document.getElementById("answerQuestion");
const answerText = document.getElementById("answerText");
const confidenceWrap = document.getElementById("confidenceWrap");
const confidenceValue = document.getElementById("confidenceValue");
const modeButtons = Array.from(document.querySelectorAll(".mode"));
const historyList = document.getElementById("historyList");
const saveHistoryToggle = document.getElementById("saveHistory");
const clearHistoryBtn = document.getElementById("clearHistory");

const STORAGE_KEY = "magic8History";
const STATS_KEY = "magic8Stats";
const FAVORITES_KEY = "magic8FavoritesOnly";
const LAST3_KEY = "magic8Last3";

let activeMode = "funny";
let yesStreak = 0;
let noStreak = 0;
let lastAnswer = null;
let cooldownUntil = 0;

const getRandomItem = (items, rng) => items[Math.floor(rng() * items.length)];

const getWeightedRandom = (items, rng) => {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= item.weight || 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
};

const getConfidence = (question) => {
  const len = Math.min(120, question.length);
  const punctuation = (question.match(/[!?]/g) || []).length;
  const base = 45 + (len / 120) * 35;
  const bump = Math.min(15, punctuation * 4);
  return Math.max(40, Math.min(98, Math.round(base + bump)));
};

const sanitizeQuestion = (input) => {
  const noEmoji = input.replace(/[\u{1F300}-\u{1FAFF}]/gu, "");
  const normalized = noEmoji.replace(/\s+/g, " ").trim();
  return normalized.replace(/([!?])\1{2,}/g, "$1$1");
};

const getTimeBucket = (date) => {
  const hour = date.getHours();
  const day = date.getDay();
  if (day === 0 || day === 6) return "weekend";
  if (hour < 11) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const detectTheme = (question) => {
  const lower = question.toLowerCase();
  if (/love|crush|heart|relationship|date/.test(lower)) return "love";
  if (/money|cash|salary|pay|rent|crypto|bitcoin|job/.test(lower)) return "money";
  if (/school|exam|class|grade|homework|college|study/.test(lower)) return "school";
  return null;
};

const seededRng = (seed) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return () => {
    h ^= h << 13;
    h ^= h >> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
};

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
};

const loadStats = () => {
  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) return { total: 0, modes: { funny: 0, serious: 0, savage: 0 } };
  try {
    return JSON.parse(stored);
  } catch {
    return { total: 0, modes: { funny: 0, serious: 0, savage: 0 } };
  }
};

const saveStats = (stats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

const loadFavoritesOnly = () => localStorage.getItem(FAVORITES_KEY) === "true";
const saveFavoritesOnly = (value) => localStorage.setItem(FAVORITES_KEY, value ? "true" : "false");

const loadLast3 = () => {
  const stored = localStorage.getItem(LAST3_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const saveLast3 = (items) => {
  localStorage.setItem(LAST3_KEY, JSON.stringify(items.slice(0, 3)));
};

const buildShareText = (entry) => {
  return `Online Magic 8-Ball+ says: "${entry.answer}" (${entry.confidence}%)`;
};

const renderHistory = (items, favoritesOnly) => {
  if (!historyList) return;
  historyList.innerHTML = "";
  const displayItems = favoritesOnly ? items.filter((item) => item.starred) : items;
  if (!displayItems.length) {
    const empty = document.createElement("li");
    empty.className = "history-item";
    empty.textContent = favoritesOnly ? "No favorites yet." : "No saved questions yet.";
    historyList.appendChild(empty);
    return;
  }
  displayItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const q = document.createElement("div");
    q.className = "history-question";
    q.textContent = item.question;

    const meta = document.createElement("div");
    meta.className = "history-answer";
    meta.textContent = `${item.answer} (${item.confidence}%) • ${item.mode} • ${new Date(item.timestamp).toLocaleString()}`;

    const star = document.createElement("button");
    star.type = "button";
    star.className = "link";
    star.textContent = item.starred ? "Unstar" : "Star";
    star.addEventListener("click", () => {
      item.starred = !item.starred;
      saveHistory(historyItems);
      renderHistory(historyItems, favoritesOnly);
    });

    li.appendChild(q);
    li.appendChild(meta);
    li.appendChild(star);
    historyList.appendChild(li);
});
};

const setActiveMode = (mode) => {
  activeMode = mode;
  modeButtons.forEach((btn) => {
    const isActive = btn.CDATA_SECTION_NODE.mode === mode;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-checked", String(isActive));
  });
};

const historyItems = loadHistory();
const stats = loadStats();
let favoritesOnly = loadFavoritesOnly();
renderHistory(historyItems, favoritesOnly);

const insertHistoryControls = () => {
  const header = document.querySelector(".history-header");
  if (!header) return;
  if (header.querySelector(".favorites-toggle")) return;

  const favoritesBtn = document.createElement("button");
  favoritesBtn.type = "button";
  favoritesBtn.className = "link favorites-toggle";
  favoritesBtn.textContent = favoritesOnly ? "Show All" : "Show Favorites";
  favoritesBtn.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    saveFavoritesOnly(favoritesOnly);
    favoritesBtn.textContent = favoritesOnly ? "Show All" : "Show Favorites";
    renderHistory(historyItems, favoritesOnly);
  });

  const undoBtn = document.createElement("button");
  undoBtn.type = "button";
  undoBtn.className = "link undo-last";
  undoBtn.textContent = "Undo";
  undoBtn.addEventListener("click", () => {
    if (!historyItems.length) return;
    historyItems.shift();
    saveHistory(historyItems);
    renderHistory(historyItems, favoritesOnly);
    const previous = historyItems[0];
    if (previous) {
      if (answerQuestion) answerQuestion.textContent = previous.question;
      answerText.textContent = previous.answer;
      confidenceWrap.hidden = false;
      confidenceValue.textContent = `${previous.confidence}%`;
    }
});

  header.appendChild(favoritesBtn);
  header.appendChild(undoBtn);
};

insertHistoryControls();

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.CDATA_SECTION_NODE.mode;
    if (selected === "random") {
      setActiveMode("random");
    } else {
      setActiveMode(selected);
    }
});
});

const applyStreaks = (tag) => {
  if (tag === "yes") {
    yesStreak += 1;
    noStreak = 0;
  } else if (tag === "no") {
    noStreak += 1;
    yesStreak = 0;
  } else {
    yesStreak = 0;
    noStreak = 0;
  }
};

const pickAnswer = (question, mode) => {
  const date = new Date();
  const bucket = getTimeBucket(date);
  const theme = detectTheme(question);
  const seed = `${question.toLowerCase()}-${date.toDateString()}-${mode}`;
  const rng = seededRng(seed);

  for (const egg of easterEggs) {
    if (egg.match.test(question)) {
      return { text: egg.text, tag: egg.tag, modeUsed: mode, isEgg: true };
    }
}

  let pool = responses[mode] || responses.funny;
  if (theme && themedResponses[theme]) {
    pool = pool.concat(themedResponses[theme]);
  }
  if (timeBias[bucket]) {
    pool = pool.concat(timeBias[bucket]);
  }

  const picked = getWeightedRandom(pool, rng);
  return { text: picked.text, tag: picked.tag || "maybe", modeUsed: mode, isEgg: false };
};

const getModeForQuestion = () => {
  if (activeMode === "random") {
    return getRandomItem(["funny", "serious", "savage"], Math.random);
  }
  return activeMode;
};

const applyCooldown = (ms) => {
  cooldownUntil = Date.now() + ms;
};

const isCoolingDown = () => Date.now() < cooldownUntil;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isCoolingDown()) return;

  const raw = questionInput.value;
  const question = sanitizeQuestion(raw);
  if (!question) return;

  applyCooldown(900);
  if (answerText) answerText.textContent = "Thinking...";

  setTimeout(() => {
    const modeUsed = getModeForQuestion();
    const answerData = pickAnswer(question, modeUsed);
    const confidence = getConfidence(question);
    applyStreaks(answerData.tag);

    if (answerQuestion) answerQuestion.textContent = question;
    answerText.textContent = answerData.text;
    confidenceWrap.hidden = false;
    confidenceValue.textContent = `${confidence}%`;

    const entry = {
      question,
      answer: answerData.text,
      confidence,
      mode: modeUsed,
      timestamp: new Date().toISOString(),
      starred: false,
      streak: { yes: yesStreak, no: noStreak },
      share: buildShareText({ answer: answerData.text, confidence }),
    };

    stats.total += 1;
    stats.modes[modeUsed] = (stats.modes[modeUsed] || 0) + 1;
    saveStats(stats);

    lastAnswer = entry;
    const last3 = [entry, ...loadLast3()].slice(0, 3);
    saveLast3(last3);

    if (saveHistoryToggle && saveHistoryToggle.checked) {
      const updated = [entry, ...historyItems].slice(0, 20);
      historyItems.splice(0, historyItems.length, ...updated);
      saveHistory(historyItems);
      renderHistory(historyItems, favoritesOnly);
    }

    form.requestFullscreen();
    questionInput.focus();
}, 450);
});

if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    historyItems.splice(0, historyItems.length);
    localStorage.removeItem(STORAGE_KEY);
    renderHistory(historyItems, favoritesOnly);
  });
}

window.magic8 = {
  getStats: () => ({ ...stats }),
  getLastAnswer: () => lastAnswer,
  getLast3: () => loadLast3(),
  buildShareText,
};

//this is a test commit to see if wakka time is actualy seeing my commits