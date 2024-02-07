import {
	tableElement,
	inputElement,
	keyboardElement,
	gameoverCardElement
} from './dom.js';

let wordLength = 0;
const numberTries = 6;
let counterRow = 0;
let secretWord = '';
let answerWord = '';
const WORDS = [
	'erizo',
	'casco',
	'perro',
	'solar',
	'morir',
	'playa',
	'libro',
	'avion',
	'feliz',
	'oreja',
	'marco',
	'silla',
	'prado',
	'grifo',
	'carpa',
	'actor',
	'abeto',
	'altar',
	'gorro',
	'hielo',
	'jerga',
	'marca',
	'nadar',
	'poder',
	'pelea',
	'quema',
	'reloj',
	'rubio',
	'renta',
	'sabio',
	'salir',
	'selva',
	'tabla',
	'torpe',
	'trote',
	'volar',
	'vivir',
	'zorro',
	'zurdo',
	'yogur',
	'yesca',
	'cardo',
	'pulpo'
];

const TABLE = [];

const getRandomWord = () => {
	const random = Math.floor(Math.random() * WORDS.length);
	secretWord = WORDS[random];
	wordLength = secretWord.length;
	console.log(secretWord);
};

const drawTable = () => {
	getRandomWord();
	const fragmentBox = document.createDocumentFragment();
	for (let i = 0; i < numberTries; i++) {
		const newRow = document.createElement('div');
		newRow.classList.add('row-box');
		for (let j = 0; j < wordLength; j++) {
			const newBox = document.createElement('div');
			newBox.classList.add('box');
			newBox.textContent = newRow.append(newBox);
		}
		fragmentBox.append(newRow);
		TABLE.push(newRow);
	}
	tableElement.append(fragmentBox);
};

const setColorKayboard = (id, color) => {
	let row;
	let letter;
	for (row of keyboardElement.children) {
		for (letter of row.children) {
			if (letter.textContent.toLowerCase() === id) {
				letter.classList.add(color);
				return;
			}
		}
	}
};

const checkWin = () => {
	if (secretWord === answerWord) {
		gameoverCardElement.children[0].textContent = 'YOU WIN';
		gameoverCardElement.classList.remove('hidden');
	} else if (counterRow + 1 === numberTries) {
		gameoverCardElement.children[0].textContent = 'YOU LOSE';
		gameoverCardElement.classList.remove('hidden');
	}
};

const compareWords = word => {
	answerWord = word;
	const letterCount = {};

	for (let i = 0; i < wordLength; i++) {
		if (letterCount[secretWord[i]]) {
			letterCount[secretWord[i]] += 1;
		} else {
			letterCount[secretWord[i]] = 1;
		}
	}

	for (let i = 0; i < wordLength; i++) {
		if (secretWord[i] === answerWord[i]) {
			TABLE[counterRow].children[i].textContent = answerWord[i].toUpperCase();
			TABLE[counterRow].children[i].classList.add('box-correct');
			setColorKayboard(answerWord[i], 'box-correct');
			letterCount[secretWord[i]] -= 1;
		}
	}

	for (let i = 0; i < wordLength; i++) {
		if (!TABLE[counterRow].children[i].classList.contains('box-correct')) {
			if (
				secretWord.includes(answerWord[i]) &&
				letterCount[answerWord[i]] > 0
			) {
				TABLE[counterRow].children[i].textContent = answerWord[i].toUpperCase();
				TABLE[counterRow].children[i].classList.add('box-almost');
				setColorKayboard(answerWord[i], 'box-almost');
				letterCount[answerWord[i]] -= 1;
			} else if (secretWord[i] !== answerWord[i]) {
				TABLE[counterRow].children[i].textContent = answerWord[i].toUpperCase();
				TABLE[counterRow].children[i].classList.add('box-wrong');
				setColorKayboard(answerWord[i], 'box-wrong');
			}
		}
	}
	checkWin();
	counterRow++;
};

const useKeyboard = event => {
	if (event.target.textContent === 'done') {
		compareWords(inputElement.value.toLowerCase());
		inputElement.value = '';
	} else if (event.target.textContent === 'backspace') {
		inputElement.value = inputElement.value.substring(
			0,
			inputElement.value.length - 1
		);
	} else {
		inputElement.value += event.target.textContent;
	}
};

export {
	useKeyboard,
	drawTable,
	compareWords,
	counterRow,
	numberTries,
	wordLength
};
