// Game state variables
let currentCategoryQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let currentCategory= '';
let timerId;
let timeRemaining = 15;
// UI element references
const mainMenu = document.getElementById('main-menu');
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



// --- Quiz Data ---
// You can add more questions and categories here.
// Make sure each object has a 'question', 'answers', and 'correct' property.
const quizData = {
    science: [
        {
            question: "What is the process of water turning into vapour called?",
            answers: ["Condensation", "Evaporation", "Boiling", "Melting"],
            correct: "Evaporation"
        },
        {
            question: "What is the chemical symbol for Gold?",
            answers: ["Go", "Au", "Ag", "Gd"],
            correct: "Au"
        },
        {
            question: "What is the speed of light in a vacuum?",
            answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
            correct: "300,000 km/s"
        },
        {
            question: "Where would you find humerus bone in human body?",
            answers: ["Knee", "Shoulder", "Hand", "Arm"],
            correct: "Arm"
        },
        {
            question: "What is the study of celestial objects and phenomena called?",
            answers: ["Geology", "Biology", "Astronomy", "Ecology"],
            correct: "Astronomy"
        },
        {
            question: "Which element has atomic number 5?",
            answers: ["Helium", "Nitrogen", "Boron", "Neon"],
            correct: "Boron"
        },
        {
            question: "Which planet is known as Red Planet?",
            answers: ["Mars", "Neptune", "Mercury", "Jupiter"],
            correct: "Mars"
        },
        {
            question: "Which is the largest organ in human body?",
            answers: ["Tongue", "Liver", "Skin", "Heart"],
            correct: "Skin"
        },
        {
            question: "What gas do humans need to breath to survive?",
            answers: ["Boron", "Nitrogen", "Ozone", "Oxygen"],
            correct: "Oxygen"
        },
        {
            question: "What is the smallest unit of life?",
            answers: ["Atom", "Molecule", "Cell", "Organelle"],
            correct: "Cell"
        }
    ],
    movies: [
        {
            question: "Who directed the movie 'Pulp Fiction'?",
            answers: ["Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Alfred Hitchcock"],
            correct: "Quentin Tarantino"
        },
        {
            question: "In which film did Leonardo DiCaprio finally win his Oscar for Best Actor?",
            answers: ["The Wolf of Wall Street", "Inception", "The Revenant", "Titanic"],
            correct: "The Revenant"
        },
        {
            question: "What is the name of the wizard played by Ian McKellen in 'The Lord of the Rings'?",
            answers: ["Gandalf", "Saruman", "Dumbledore", "Merlin"],
            correct: "Gandalf"
        },
        {
            question: "Which movie is famous for the line, 'I'm going to make him an offer he can't refuse'?",
            answers: ["Goodfellas", "The Godfather", "Scarface", "The Untouchables"],
            correct: "The Godfather"
        },
        {
            question: "The movie 'Forrest Gump' is set in which country?",
            answers: ["United Kingdom", "United States", "France", "Germany"],
            correct: "United States"
        },
        {
            
    ],
    math: [
        {
            question: "What is the value of pi ($$\\pi$$) to two decimal places?",
            answers: ["3.12", "3.14", "3.16", "3.18"],
            correct: "3.14"
        },
        {
            question: "What is the square root of 81?",
            answers: ["8", "9", "10", "7"],
            correct: "9"
        },
        {
            question: "What is 7 multiplied by 8?",
            answers: ["49", "56", "64", "72"],
            correct: "56"
        },
        {
            question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8...?",
            answers: ["11", "12", "13", "14"],
            correct: "13"
        },
        {
            question: "What is the sum of angles in a triangle?",
            answers: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
            correct: "180 degrees"
        }
    ],
    geography: [
        {
            question: "What is the capital of France?",
            answers: ["London", "Berlin", "Paris", "Rome"],
            correct: "Paris"
        },
        {
            question: "Which is the longest river in the world?",
            answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correct: "Nile River"
        },
        {
            question: "Which continent is the largest by land area?",
            answers: ["Africa", "North America", "Asia", "Europe"],
            correct: "Asia"
        },
        {
            question: "What is the highest mountain in the world?",
            answers: ["Mount Kilimanjaro", "Mount Everest", "Mount Denali", "K2"],
            correct: "Mount Everest"
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: ["China", "Thailand", "Japan", "South Korea"],
            correct: "Japan"
        }
    ],
    english: [
        {
            question: "Which of these is a synonym for 'happy'?",
            answers: ["Miserable", "Joyful", "Angry", "Sad"],
            correct: "Joyful"
        },
        {
            question: "What is the past tense of 'run'?",
            answers: ["running", "ran", "runs", "runned"],
            correct: "ran"
        },
        {
            question: "A group of lions is called a...",
            answers: ["flock", "pride", "pack", "school"],
            correct: "pride"
        },
        {
            question: "Which of these is an adverb?",
            answers: ["beautiful", "quickly", "car", "swim"],
            correct: "quickly"
        },
        {
            question: "What is the plural of 'child'?",
            answers: ["childs", "children", "childen", "childrens"],
            correct: "children"
        }
    ],
    logical_reasoning: [
        {
            question: "If all A are B and all B are C, then are all A C?",
            answers: ["Yes", "No", "Maybe", "Cannot be determined"],
            correct: "Yes"
        },
        {
            question: "Which number comes next in the series: 2, 4, 8, 16...?",
            answers: ["20", "24", "30", "32"],
            correct: "32"
        },
        {
            question: "Find the odd one out: Car, Bus, Train, Helicopter.",
            answers: ["Car", "Bus", "Train", "Helicopter"],
            correct: "Helicopter"
        },
        {
            question: "If a dog is to a kennel, then a bird is to a...?",
            answers: ["nest", "cage", "kennel", "den"],
            correct: "nest"
        },
        {
            question: "If you rearrange the letters 'CIFAICP', you would have the name of a(n)...",
            answers: ["animal", "country", "city", "ocean"],
            correct: "ocean"
        }
    ],
};

// --- Event Listeners ---
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        startGame(button.dataset.category);
    });
});

playAgainBtn.addEventListener('click', resetGame);
messageCloseBtn.addEventListener('click', () => {
    messageBox.classList.add('hidden');
});

// New Event Listeners for Leaderboard
leaderboardBtn.addEventListener('click', showLeaderboard);
viewLeaderboardBtn2.addEventListener('click', showLeaderboard);
saveScoreBtn.addEventListener('click', saveScore);
backToMenuBtn.addEventListener('click', showMainMenu);

// --- Game Functions ---
function showMessage(text) {
    messageText.textContent = text;
    messageBox.classList.remove('hidden');
}

function startGame(category) {
    // Get the questions for the selected category
    currentCategory = category;
    currentCategoryQuestions = quizData[category];
    if (!currentCategoryQuestions || currentCategoryQuestions.length === 0) {
        showMessage("No questions found for this category. Please select another.");
        return;
    }
    
    // Shuffle the questions to make the game different each time
    currentCategoryQuestions = shuffleArray(currentCategoryQuestions);
    
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    
    // Update UI
    mainMenu.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    updateScore();
    showQuestion();
}

function showQuestion() {
    // Hide the result screen if it's visible
    resultScreen.classList.add('hidden');
    
    // Get the current question
    const question = currentCategoryQuestions[currentQuestionIndex];
    
    // Update the question text and count
    questionText.textContent = question.question;
    questionCountDisplay.textContent = `Question ${currentQuestionIndex + 1}/${currentCategoryQuestions.length}`;
    
    // Clear previous answer buttons
    answerButtonsContainer.innerHTML = '';
    
    // Create and display answer buttons
    const shuffledAnswers = shuffleArray(question.answers);
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button', 'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-bold', 'py-3', 'px-6', 'rounded-xl', 'w-full');
        button.addEventListener('click', () => checkAnswer(button, question.correct));
        answerButtonsContainer.appendChild(button);
    });
    startTimer();
}
function startTimer() {
    // Clear any existing timer
    clearInterval(timerId);
    timeRemaining = 15;
    timerDisplay.textContent = `Time: ${timeRemaining}`;
    timerDisplay.classList.remove('timer-low');

    timerId = setInterval(() => {
        timeRemaining--;
        timerDisplay.textContent = `Time: ${timeRemaining}`;

        if (timeRemaining <= 5) {
            timerDisplay.classList.add('timer-low');
        }

        if (timeRemaining <= 0) {
            clearInterval(timerId);
            checkAnswer(null, currentCategoryQuestions[currentQuestionIndex].correct);
        }
    }, 1000);
}
function checkAnswer(selectedButton, correctAnswer) {
    clearInterval(timerId);

    if (selectedButton) {
        const isCorrect = selectedButton.textContent === correctAnswer;
        
        if (isCorrect) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('wrong');
            Array.from(answerButtonsContainer.children).forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.classList.add('correct');
                }
            });
        }
    } else {
        // This is the "time's up" scenario
        showMessage("Time's up!");
        Array.from(answerButtonsContainer.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    // Disable all buttons after an answer is selected
    Array.from(answerButtonsContainer.children).forEach(button => {
        button.disabled = true;
    });

    // Update score display
    updateScore();

    // Wait a moment before moving to the next question or showing results
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentCategoryQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000); // 1-second delay
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function showResults() {
    clearInterval(timerId);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = `You scored ${score} out of ${currentCategoryQuestions.length}!`;
    playerNameInput.value = '';
}

function resetGame() {
    resultScreen.classList.add('hidden');
    showMainMenu();
}
function showMainMenu() {
    leaderboardScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

// --- Leaderboard Functions ---

function getLeaderboard() {
    const scores = localStorage.getItem('quizLeaderboard');
    return scores ? JSON.parse(scores) : {};
}

function saveScore() {
    const playerName = playerNameInput.value.trim();
    if (playerName === '') {
        showMessage('Please enter your name to save your score.');
        return;
    }

    const leaderboard = getLeaderboard();
    if (!leaderboard[currentCategory]) {
        leaderboard[currentCategory] = [];
    }

    const newScore = {
        name: playerName,
        score: score,
        total: currentCategoryQuestions.length,
        date: new Date().toLocaleDateString(),
    };

    leaderboard[currentCategory].push(newScore);

    // Sort scores in descending order
    leaderboard[currentCategory].sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores per category
    leaderboard[currentCategory] = leaderboard[currentCategory].slice(0, 10);

    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));

    showMessage('Score saved successfully!');
    document.getElementById('save-score-section').classList.add('hidden');
}

function showLeaderboard() {
    mainMenu.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    leaderboardScreen.classList.remove('hidden');
    
    leaderboardList.innerHTML = '';
    const leaderboard = getLeaderboard();
    const categories = Object.keys(leaderboard);

    if (categories.length === 0) {
        leaderboardList.innerHTML = '<p class="text-center text-gray-400">No scores saved yet. Play a quiz to add your score!</p>';
        return;
    }

    categories.forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = `${category.toUpperCase()} Leaderboard`;
        categoryHeader.classList.add('text-xl', 'font-bold', 'text-yellow-300', 'mt-4');
        leaderboardList.appendChild(categoryHeader);

        const scoresForCategory = leaderboard[category];
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
    return array;
}
