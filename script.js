// import questions from './questions.js'

var questions = [
	{
		question: "What is 10/2?",
		answers: {
			a: "3",
			b: "5",
			c: "115",
		},
		correctAnswer: "b",
	},
	{
		question: "What is 30/3?",
		answers: {
			a: "3",
			b: "5",
			c: "10",
		},
		correctAnswer: "c",
	},
	{
		question: "What is Javascript?",
		answers: {
			a: "Programming Language",
			b: "Scripting language",
		},
		correctAnswer: "a",
	},
];

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");

const output = [];

questions.forEach((currentQuestion, questionNumber) => {
	const answers = [];
	for (letter in currentQuestion.answers) {
		answers.push(
			`<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter}) ${currentQuestion.answers[letter]}
            </label>`
		);
	}
	output.push(
		`<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
    </div>`
	);
});

quizContainer.innerHTML = output.join("");

function showResults() {
	const answerContainers = quizContainer.querySelectorAll(".answers");
	let numCorrect = 0;
	questions.forEach((currentQuestion, questionNumber) => {
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const correctAnswer = `input[value="${currentQuestion.correctAnswer}"]`;
		const userAnswer = (answerContainer.querySelector(selector) || {})
			.value;
		if (userAnswer === currentQuestion.correctAnswer) {
			// answerContainer.querySelector(selector).closest("label").classList.remove('checked');
			numCorrect++;
		} else {
			if (answerContainer.querySelector(selector) != undefined) {
				// answerContainer.querySelector(selector).closest("label").classList.remove('checked');
				answerContainer
					.querySelector(selector)
					.closest("label")
					.classList.add("red");
			}
		}
		console.log(answerContainer.querySelector(selector).closest("label"));
		answerContainer
			.querySelector(correctAnswer)
			.closest("label")
			.classList.add("green");
		console.log("selected:", answerContainer.querySelector(selector).value);
		console.log(
			"correct:",
			answerContainer.querySelector(correctAnswer).value
		);
	});

	resultsContainer.innerHTML = `Total Score: ${numCorrect}/${questions.length}`;
}

function showSlide(n) {
	slides[currentSlide].classList.remove("active-slide");
	slides[n].classList.add("active-slide");
	currentSlide = n;
	numberOfQuestions.innerHTML = n+1 + " / " + questions.length;
	if (currentSlide === 0) {
		previousButton.style.display = "none";
	} else {
		previousButton.style.display = "inline-block";
	}
	if (currentSlide === slides.length - 1) {
		nextButton.style.display = "none";
		submitButton.style.display = "inline-block";
	} else {
		nextButton.style.display = "inline-block";
		submitButton.style.display = "none";
	}
}

function showNextSlide() {
	showSlide(currentSlide + 1);
}

function showPreviousSlide() {
	showSlide(currentSlide - 1);
}

// function selectOption(){
//     const selected=document.querySelector(`input[name=question${currentSlide}]:checked`);
//     selected.closest("label").classList.add('checked');
// }

const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const numberOfQuestions = document.getElementById("no_of_ques");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
