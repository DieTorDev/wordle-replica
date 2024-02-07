import { inputElement, keyboardElement, gameoverCardElement } from './dom.js';

import {
	useKeyboard,
	drawTable,
	compareWords,
	counterRow,
	numberTries,
	wordLength
} from './functions.js';

drawTable();
inputElement.addEventListener('keyup', event => {
	if (
		event.target.value !== '' &&
		event.key === 'Enter' &&
		event.target.value.length === wordLength &&
		counterRow <= numberTries
	) {
		compareWords(event.target.value);
		event.target.value = '';
	}
});
keyboardElement.addEventListener('click', useKeyboard);
gameoverCardElement.children[1].addEventListener('click', () => {
	location.reload();
});
