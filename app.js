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
  { match: /\btars\b/i, text: "TARS online. Humor 90. Answer: maybe.", tag: "maybe", activateTarsMode: true },
  { match: /your next line will be/i, text: "I can already hear your next line: yes.", tag: "yes" },
  { match: /\bmachine\b/i, text: "Gabriel speaks: machine, your answer is no.", tag: "no" },
];

const tarsResponses = [
  { text: "TARS: Probability suggests yes.", tag: "yes", weight: 1 },
  { text: "TARS: Negative. Risk exceeds threshold.", tag: "no", weight: 1 },
  { text: "TARS: Maybe. Data insufficient.", tag: "maybe", weight: 1 },
  { text: "TARS: Yes, but keep contingency plans ready.", tag: "yes", weight: 1 },
  { text: "TARS: No. Resource cost too high.", tag: "no", weight: 1 },
  { text: "TARS: Maybe, if you reduce complexity.", tag: "maybe", weight: 1 },
  { text: "TARS: Yes. Execute with caution.", tag: "yes", weight: 1 },
  { text: "TARS: No. Re-evaluate your objective.", tag: "no", weight: 1 },
  { text: "TARS: Maybe. Update parameters and retry.", tag: "maybe", weight: 1 },
  { text: "TARS: Yes, within acceptable tolerances.", tag: "yes", weight: 1 },
];

const form = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");
const answerQuestion = document.getElementById("answerQuestion");
const answerText = document.getElementById("answerText");
const confidenceWrap = document.getElementById("confidenceWrap");
const confidenceValue = document.getElementById("confidenceValue");
const modeButtons = Array.from(document.querySelectorAll(".mode"));
const historyList = document.getElementById("historyList");
const saveHistoryToggle = document.getElementById("saveHistory");
const enableMotionToggle = document.getElementById("enableMotion");
const historySearchInput = document.getElementById("historySearch");
const exportHistoryBtn = document.getElementById("exportHistory");
const clearHistoryBtn = document.getElementById("clearHistory");
const statTotal = document.getElementById("statTotal");
const statYesStreak = document.getElementById("statYesStreak");
const statNoStreak = document.getElementById("statNoStreak");
const statLastMode = document.getElementById("statLastMode");
const last3List = document.getElementById("last3List");

const STORAGE_KEY = "magic8History";
const STATS_KEY = "magic8Stats";
const FAVORITES_KEY = "magic8FavoritesOnly";
const LAST3_KEY = "magic8Last3";
const MOTION_KEY = "magic8Motion";

let activeMode = "funny";
let yesStreak = 0;
let noStreak = 0;
let lastAnswer = null;
let cooldownUntil = 0;
let tarsModeCount = 0;
let historySearchTerm = "";

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
  if (!stored) return { total: 0, modes: { funny: 0, serious: 0, savage: 0, tars: 0 } };
  try {
    return JSON.parse(stored);
  } catch {
    return { total: 0, modes: { funny: 0, serious: 0, savage: 0, tars: 0 } };
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

const loadMotionEnabled = () => {
  const stored = localStorage.getItem(MOTION_KEY);
  if (stored === null) return true;
  return stored === "true";
};

const saveMotionEnabled = (value) => {
  localStorage.setItem(MOTION_KEY, value ? "true" : "false");
};

const buildShareText = (entry) => {
  return `Online Magic 8-Ball+ says: "${entry.answer}" (${entry.confidence}%)`;
};

const renderHistory = (items, favoritesOnly) => {
  if (!historyList) return;
  historyList.innerHTML = "";
  const displayItems = favoritesOnly ? items.filter((item) => item.starred) : items;
  const term = historySearchTerm.trim().toLowerCase();
const filtered = term    ? displayItems.filter((item) => {
        const questionMatch = item.question.toLowerCase().includes(term);
        const answerMatch = item.answer.toLowerCase().includes(term);
        return questionMatch || answerMatch;
})
    : displayItems;
  if (!filtered.length) {
    const empty = document.createElement("li");
    empty.className = "history-item";
    if (term) {
      empty.textContent = "No matches yet.";
    } else {
      empty.textContent = favoritesOnly ? "No favorites yet." : "No saved questions yet.";
    }
    historyList.
    }
    }
  }
})
}
}
}
}
}
  }
  }
}
}
  }
  }
}
}
  }
  }
}
  }
  }
}
}
}
}
}
  }
}
]
]
}
  ]
  ]
  ]
}
  ]
  ]
  ]
}