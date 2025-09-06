// Game state variables
let currentCategoryQuestions = [];
let currentDifficulty= '';
let currentQuestionIndex = 0;
let score = 0;
let currentCategory= '';
let timerId;
let timeRemaining = 15;
let leaderboard= {};
// UI element references
const mainMenu = document.getElementById('main-menu');
const difficultyMenu = document.getElementById('difficulty-menu');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');
const questionText = document.getElementById('question-text');
const answerButtonsContainer = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score-display');
const questionCountDisplay = document.getElementById('question-count-display');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const timerDisplay = document.getElementById('timer-display');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const messageCloseBtn = document.getElementById('message-close-btn');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const viewLeaderboardBtn2 = document.getElementById('view-leaderboard-btn-2');
const saveScoreBtn = document.getElementById('save-score-btn');
const playerNameInput = document.getElementById('player-name');
const leaderboardList = document.getElementById('leaderboard-list');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const backToCategoriesBtn = document.getElementById('back-to-categories-btn');


// --- Quiz Data ---
// You can add more questions and categories here.
// Make sure each object has a 'question', 'answers', and 'correct' property.
const quizData = {
    science: {
        easy: [
            { question: "What is the process of water turning into vapour called?", answers: ["Condensation", "Evaporation", "Boiling", "Melting"], correct: "Evaporation" },
            { question: "What is the chemical symbol for Gold?", answers: ["Go", "Au", "Ag", "Gd"], correct: "Au" },
            { question: "Which planet is known as Red Planet?", answers: ["Mars", "Neptune", "Mercury", "Jupiter"], correct: "Mars" },
            { question: "What gas do humans need to breath to survive?", answers: ["Boron", "Nitrogen", "Ozone", "Oxygen"], correct: "Oxygen" },
            { question: "What is the smallest unit of life?", answers: ["Atom", "Molecule", "Cell", "Organelle"], correct: "Cell" }
        ],
        medium: [
            { question: "What is the speed of light in a vacuum?", answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"], correct: "300,000 km/s" },
            { question: "Where would you find humerus bone in human body?", answers: ["Knee", "Shoulder", "Hand", "Arm"], correct: "Arm" },
            { question: "What is the study of celestial objects and phenomena called?", answers: ["Geology", "Biology", "Astronomy", "Ecology"], correct: "Astronomy" },
            { question: "Which element has atomic number 5?", answers: ["Helium", "Nitrogen", "Boron", "Neon"], correct: "Boron" },
            { question: "Which is the largest organ in human body?", answers: ["Tongue", "Liver", "Skin", "Heart"], correct: "Skin" }
        ],
        hard: [
            { question: "What is the value of absolute zero in Celsius?", answers: ["-273.15 °C", "0 °C", "-100 °C", "273.15 °C"], correct: "-273.15 °C" },
            { question: "What is the name of the process by which plants make their own food?", answers: ["Respiration", "Transpiration", "Photosynthesis", "Pollination"], correct: "Photosynthesis" },
            { question: "What is the most abundant gas in Earth's atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"], correct: "Nitrogen" },
            { question: "Which Nobel Prize-winning physicist is known for the theory of relativity?", answers: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Marie Curie"], correct: "Albert Einstein" },
            { question: "What is the scientific name for the process of cell division in which a cell divides into two identical daughter cells?", answers: ["Meiosis", "Mitosis", "Cytokinesis", "Fusion"], correct: "Mitosis" }
        ]
    },
    movies: {
        easy: [
            { question: "Who directed the movie 'Pulp Fiction'?", answers: ["Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Alfred Hitchcock"], correct: "Quentin Tarantino" },
            { question: "In which film did Leonardo DiCaprio finally win his Oscar for Best Actor?", answers: ["The Wolf of Wall Street", "Inception", "The Revenant", "Titanic"], correct: "The Revenant" }
        ],
        medium: [
            { question: "What is the name of the wizard played by Ian McKellen in 'The Lord of the Rings'?", answers: ["Gandalf", "Saruman", "Dumbledore", "Merlin"], correct: "Gandalf" },
            { question: "Which movie is famous for the line, 'I'm going to make him an offer he can't refuse'?", answers: ["Goodfellas", "The Godfather", "Scarface", "The Untouchables"], correct: "The Godfather" }
        ],
        hard: [
            { question: "The movie 'Forrest Gump' is set in which country?", answers: ["United Kingdom", "United States", "France", "Germany"], correct: "United States" },
            { question: "What is the name of the spaceship in 'Alien'?", answers: ["The Nostromo", "The Sulaco", "The Serenity", "The Event Horizon"], correct: "The Nostromo" }
        ]
    },
    math: {
        easy: [
            { question: "What is the value of pi to two decimal places?", answers: ["3.12", "3.14", "3.16", "3.18"], correct: "3.14" },
            { question: "What is the square root of 81?", answers: ["8", "9", "10", "7"], correct: "9" }
        ],
        medium: [
            { question: "What is 7 multiplied by 8?", answers: ["49", "56", "64", "72"], correct: "56" },
            { question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...?", answers: ["11", "12", "13", "14"], correct: "13" }
        ],
        hard: [
            { question: "What is the sum of angles in a triangle?", answers: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"], correct: "180 degrees" },
            { question: "What is the value of 'x' if 3x + 5 = 20?", answers: ["5", "6", "4", "7"], correct: "5" }
        ]
    },
   geography: {
        easy: [
            { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Rome"], correct: "Paris" },
            { question: "Which is the longest river in the world?", answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: "Nile River" }
        ],
        medium: [
            { question: "Which continent is the largest by land area?", answers: ["Africa", "North America", "Asia", "Europe"], correct: "Asia" },
            { question: "What is the highest mountain in the world?", answers: ["Mount Kilimanjaro", "Mount Everest", "Mount Denali", "K2"], correct: "Mount Everest" }
        ],
        hard: [
            { question: "Which country is known as the Land of the Rising Sun?", answers: ["China", "Thailand", "Japan", "South Korea"], correct: "Japan" },
            { question: "The Great Barrier Reef is located off the coast of which country?", answers: ["Brazil", "Australia", "Mexico", "Egypt"], correct: "Australia" }
        ]
    },
    english: {
        easy: [
            { question: "Which of these is a synonym for 'happy'?", answers: ["Miserable", "Joyful", "Angry", "Sad"], correct: "Joyful" },
            { question: "What is the past tense of 'run'?", answers: ["running", "ran", "runs", "runned"], correct: "ran" }
        ],
        medium: [
            { question: "A group of lions is called a...", answers: ["flock", "pride", "pack", "school"], correct: "pride" },
            { question: "Which of these is an adverb?", answers: ["beautiful", "quickly", "car", "swim"], correct: "quickly" }
        ],
        hard: [
            { question: "What is the plural of 'child'?", answers: ["childs", "children", "childen", "childrens"], correct: "children" },
            { question: "In the sentence 'The quick brown fox jumps over the lazy dog,' which word is the verb?", answers: ["quick", "fox", "jumps", "lazy"], correct: "jumps" }
        ]
    },
    logical_reasoning: {
        easy: [
            { question: "If all A are B and all B are C, then are all A C?", answers: ["Yes", "No", "Maybe", "Cannot be determined"], correct: "Yes" },
            { question: "Which number comes next in the series: 2, 4, 8, 16...?", answers: ["20", "24", "30", "32"], correct: "32" }
        ],
        medium: [
            { question: "Find the odd one out: Car, Bus, Train, Helicopter.", answers: ["Car", "Bus", "Train", "Helicopter"], correct: "Helicopter" },
            { question: "If a dog is to a kennel, then a bird is to a...?", answers: ["nest", "cage", "kennel", "den"], correct: "nest" }
        ],
        hard: [
            { question: "If you rearrange the letters 'CIFAICP', you would have the name of a(n)...", answers: ["animal", "country", "city", "ocean"], correct: "ocean" },
            { question: "A B C D E F G. What letter is two letters to the right of the letter that is immediately to the left of the letter that is three letters to the right of the letter C?", answers: ["D", "E", "F", "G"], correct: "F" }
        ]
    }
};
// --- Event Listeners ---
// --- Game Functions ---
// Check and load leaderboard data from localStorage on start
document.addEventListener('DOMContentLoaded', () => {
    loadLeaderboard();
});

// Function to start the quiz for a selected category
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    currentCategoryQuestions = quizData[currentCategory][currentDifficulty];
    shuffleArray(currentCategoryQuestions);
    showScreen(quizScreen);
    showQuestion();
    startTimer();
}

// Function to display the current question and answer options
function showQuestion() {
    resetState();
    const currentQuestion = currentCategoryQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionCountDisplay.textContent = `${currentQuestionIndex + 1} of ${currentCategoryQuestions.length}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button', 'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-bold', 'py-3', 'px-6', 'rounded-xl', 'text-lg', 'text-center', 'w-full', 'md:w-auto', 'transition-all', 'duration-200');
        if (answer === currentQuestion.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsContainer.appendChild(button);
    });
}

// Function to reset the answer buttons and feedback
function resetState() {
    clearInterval(timerId); // Clear the timer when resetting
    timerDisplay.textContent = '';
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
    questionText.classList.remove('correct-flash', 'wrong-flash');
}

// Function to handle user's answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
        showFlash(questionText, 'correct');
    } else {
        showFlash(questionText, 'wrong');
    }
    Array.from(answerButtonsContainer.children).forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    scoreDisplay.textContent = `Score: ${score}`;
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentCategoryQuestions.length) {
            showQuestion();
            startTimer();
        } else {
            showResultScreen();
        }
    }, 1500);
}

// Function to show the final result screen
function showResultScreen() {
    showScreen(resultScreen);
    finalScoreDisplay.textContent = `You scored ${score} out of ${currentCategoryQuestions.length}!`;
}

// Function to show a specific screen and hide others
function showScreen(screenToShow) {
    mainMenu.classList.add('hidden');
    difficultyMenu.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    screenToShow.classList.remove('hidden');
}

// Function to handle category button clicks
function handleCategoryClick(e) {
    currentCategory = e.target.dataset.category;
    showScreen(difficultyMenu);
}

// Function to handle difficulty button clicks
function handleDifficultyClick(e) {
    currentDifficulty = e.target.dataset.difficulty;
    startQuiz(currentCategory);
}

// Function to go back to the main menu
function backToMainMenu() {
    showScreen(mainMenu);
}

// Function to show the leaderboard screen
function showLeaderboard() {
    showScreen(leaderboardScreen);
    renderLeaderboard();
}

// Function to handle saving the score
function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
        const categoryKey = `${currentCategory}-${currentDifficulty}`;
        const newScore = {
            name: playerName,
            score: score,
            total: currentCategoryQuestions.length,
            date: new Date().toLocaleDateString()
        };
        // Initialize the category array if it doesn't exist
        if (!leaderboard[categoryKey]) {
            leaderboard[categoryKey] = [];
        }
        // Add new score and sort
        leaderboard[categoryKey].push(newScore);
        leaderboard[categoryKey].sort((a, b) => b.score - a.score);
        // Keep only top 10 scores
        leaderboard[categoryKey] = leaderboard[categoryKey].slice(0, 10);
        saveLeaderboard();
        showMessage(`Score saved for ${playerName}!`);
    } else {
        showMessage('Please enter your name to save your score.');
    }
}

// Function to save the leaderboard data to localStorage
function saveLeaderboard() {
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
}

// FIX: Added this function to load the leaderboard data
function loadLeaderboard() {
    const savedLeaderboard = localStorage.getItem('quizLeaderboard');
    if (savedLeaderboard) {
        leaderboard = JSON.parse(savedLeaderboard);
    }
}


// Function to render the leaderboard on the screen
function renderLeaderboard() {
    leaderboardList.innerHTML = '';
    // Show scores for all categories
    Object.keys(leaderboard).forEach(categoryKey => {
        const [category, difficulty] = categoryKey.split('-');
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = `${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()} Leaderboard`;
        categoryHeader.classList.add('text-xl', 'font-bold', 'text-yellow-300', 'mt-4');
        leaderboardList.appendChild(categoryHeader);

        const scoresForCategory = leaderboard[categoryKey];
        if (scoresForCategory.length > 0) {
            const ol = document.createElement('ol');
            ol.classList.add('list-decimal', 'list-inside', 'text-left', 'space-y-2');
            scoresForCategory.forEach(entry => {
                const li = document.createElement('li');
                li.classList.add('leaderboard-item');
                li.innerHTML = `
                    <span>${entry.name}</span>
                    <span class="font-bold">${entry.score}/${entry.total}</span>
                    <span class="text-sm text-gray-400">${entry.date}</span>
                `;
                ol.appendChild(li);
            });
            leaderboardList.appendChild(ol);
        } else {
            const p = document.createElement('p');
            p.textContent = 'No scores for this category yet.';
            p.classList.add('text-center', 'text-gray-400');
            leaderboardList.appendChild(p);
        }
    });
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to start the timer
function startTimer() {
    timeRemaining = 15;
    timerDisplay.textContent = `Time: ${timeRemaining}s`;
    clearInterval(timerId); // Clear any existing timer
    timerId = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 5) {
            timerDisplay.classList.add('text-red-500');
        } else {
            timerDisplay.classList.remove('text-red-500');
        }
        if (timeRemaining <= 0) {
            clearInterval(timerId);
            handleTimeout();
        }
    }, 1000);
}

// Function to handle timer running out
function handleTimeout() {
    Array.from(answerButtonsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add('correct');
        }
    });
    showMessage('Time\'s up!');
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentCategoryQuestions.length) {
            showQuestion();
            startTimer();
        } else {
            showResultScreen();
        }
    }, 1500);
}

// Function to show a temporary message box
function showMessage(msg) {
    messageText.textContent = msg;
    messageBox.classList.remove('hidden');
}

// Event listeners
document.addEventListener('click', (e) => {
    if (e.target.matches('.category-button')) {
        handleCategoryClick(e);
    } else if (e.target.matches('.difficulty-button')) {
        handleDifficultyClick(e);
    }
});

playAgainBtn.addEventListener('click', () => {
    backToMainMenu();
});

viewLeaderboardBtn2.addEventListener('click', showLeaderboard);
backToMenuBtn.addEventListener('click', backToMainMenu);
backToCategoriesBtn.addEventListener('click', backToMainMenu);

messageCloseBtn.addEventListener('click', () => {
    messageBox.classList.add('hidden');
});

saveScoreBtn.addEventListener('click', saveScore);
leaderboardBtn.addEventListener('click', showLeaderboard);

function showFlash(element, type) {
    element.classList.add(type === 'correct' ? 'correct-flash' : 'wrong-flash');
    setTimeout(() => {
        element.classList.remove(type === 'correct' ? 'correct-flash' : 'wrong-flash');
    }, 500);
}
