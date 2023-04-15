const questionOptionsContainer = document.querySelector('.quizz');
const questionTitle = document.querySelector('.text-quizz');
const circleContainer = document.querySelector('.circle');

let levelIndex = 0;
const userAnswers = [];
const questions = [];
const questionOptions = [];
let activeQuestion = null;


window.addEventListener('load', init);

async function getQuestionsFromAPI(questionCount) {
    const data = await fetch(`https://opentdb.com/api.php?amount=${questionCount}`);
    const { results } = await data.json();

    results.forEach((res) => {
        questions.push(res)
    });
}

function selectActiveQuestion(number) {
    activeQuestion = questions[number];
}

async function init() {
    await getQuestionsFromAPI(5);
    activeQuestion = questions[levelIndex];
    renderQuestion(activeQuestion.question, [activeQuestion.correct_answer, ...activeQuestion.incorrect_answers]);
    showResults(questions)
}

function renderQuestion(questionTitle, questionOptions) {
    clearPage();
    renderQuestionTitle(questionTitle);
    renderQuestionOptions(questionOptions);
}

function renderQuestionTitle(textContent) {
    questionTitle.textContent = textContent;
    
}

function renderQuestionOptions(array) {
    array.sort();
    
    const divOptions = array.map((option) => {
        return createQuestionOption(option)
    });

    divOptions.forEach((item) => {
        questionOptionsContainer.appendChild(item);
    })
}

function createQuestionOption(textContent) {
    const div = document.createElement('div');
    div.className = "quizz-item";
    div.textContent = textContent;
    div.addEventListener('click', clickOptionHandler)
    return div;
}

function clickOptionHandler(event) {

    if (levelIndex == questions.length) {
        return;
    }

    const answer = event.currentTarget.textContent;
    userAnswers.push(answer);

    const currentCircle = document.querySelector(`.circle-item:nth-child(${levelIndex + 1})`);

    if (answer == activeQuestion.correct_answer) {
        currentCircle.style.backgroundColor = "#a8ff78";
    }
    else {
        currentCircle.style.backgroundColor = "#f80759";
    }

    levelIndex++;
    clearPage();
    selectActiveQuestion(levelIndex);
    renderQuestion(activeQuestion.question, [activeQuestion.correct_answer, ...activeQuestion.incorrect_answers])
}

function clearPage() {
    questionOptionsContainer.textContent = "";
    questionTitle.textContent = "";
}

function showResults(array) {
    const circleDivs = array.map(() => {
        return createResultItem();
    });

    circleDivs.forEach((item) => {
        circleContainer.append(item);
    });
}

function createResultItem() {
    const div = document.createElement('div');
    div.className = 'circle-item';
    return div;
}
