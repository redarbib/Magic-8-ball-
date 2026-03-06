Online Magic 8-Ball+

A simple (but fun) web app where you ask a question and get a random answer with different vibes (Funny / Serious / Savage), a confidence score, and optional local history.

The app simulates the classic Magic 8-Ball but adds extra logic like weighted answers, themed responses, time-based bias, and deterministic randomness so results feel more dynamic and realistic.
Features

Ask a question → get a random answer

Modes: Funny, Serious, Savage
Random confidence score (40–98%)
Optional local history (LocalStorage)
Save the last 10 questions
Search history
Favorite (star) answers
Export history to JSON
Answer streak tracking
Theme detection (love, money, school questions)

How It Works
When the user submits a question, the app processes it in several steps:

1. Input Cleaning
The question is first sanitized to remove extra whitespace, emojis, and repeated punctuation to keep the input consistent.

Example:

"Will I pass???? 😭"
> "Will I pass??"

2. Mode Selection
The app chooses which response pool to use based on the selected mode:

Funny > humorous answers
Serious > more thoughtful responses
Savage > sarcastic or harsh responses
If Random mode is selected, one of the three modes is picked automatically.

3. Theme Detection
The app scans the question for keywords to detect themes.

Examples:

Theme	Keywords
Love	love, crush, relationship
Money	money, job, salary, crypto
School	exam, class, homework
If a theme is detected, additional themed answers are added to the possible response pool. 

4. Time-Based Bias
The time of day can influence responses slightly.

Examples:

Morning > more positive answers
Afternoon > neutral answers
Evening > more cautious answers
Weekend > unpredictable responses
This adds variety so the same question may feel different at different times.

5. Weighted Random Selection
Each answer has a weight value.

Example:
{ text: "Absolutely...", tag: "yes", weight: 2 }
Higher weight = higher chance of being selected.
The app uses a weighted random algorithm to choose the final answer. 
app

6. Seeded Randomness
Instead of pure randomness, the app uses a seeded random generator based on:
question + date + selected mode
This means:
Asking the same question on the same day may give the same result.
Different days can produce different results.

7. Confidence Score
A confidence value is calculated between 40% and 98% based on:
Length of the question
Number of punctuation marks

Example:
"Will I pass my exam?"
> 76% confidence

Longer questions generally produce higher confidence scores.

8. History & Stats
If history saving is enabled:
The app stores entries in LocalStorage including:
Question
Answer
Confidence
Mode used
Timestamp
Favorite status

Users can:
Star answers
Search previous questions
Export history as JSON
Clear history
Easter Eggs
Certain phrases trigger special responses.

Examples:

"TARS"
> activates Interstellar-style answers

These responses override the normal answer selection logic.
Tech
HTML
CSS
Vanilla JavaScript
LocalStorage API

No backend required

All logic runs entirely client-side in the browser.
