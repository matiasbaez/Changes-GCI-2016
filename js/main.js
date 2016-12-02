var done = false;
var buttonsPressed = {};

function mainJs() {
	var totalCount = 0;
	var random = Math.floor(Math.random() * 1000) + 1;
	var randomElem = document.getElementById('random');

	randomElem.innerText = random + ' Dollars';

	var allButtons = document.getElementById('dollars').querySelectorAll('input');

	for (var i = 0; i < allButtons.length; i++) {
		var button = allButtons[i];

		button.addEventListener('click', function() {
			var value = this.value;

			if (value.indexOf(' Dollars') >= 0) {
				totalCount += Number(value.replace(' Dollars', ''));
			} else if (value.indexOf(' Dollar') >= 0) {
				totalCount += Number(value.replace(' Dollar', ''));
			}

			if (buttonsPressed[value] > 0) {
				buttonsPressed[value] = buttonsPressed[value] + 1;
			} else {
				buttonsPressed[value] = 1;
			}

			//Check total count
			if (totalCount == random) {
				turnOff();
				console.log('Same!');
			} else if (totalCount > random) {
				turnOff();
				console.log('More!');
			}

			document.getElementById('message').innerText = totalCount;
		});
	}
}

function turnOff() {
	var allButtons = document.getElementById('dollars').querySelectorAll('input');

	alert('Done');

	for (var i = 0; i < allButtons.length; i++) {
		allButtons[i].setAttribute('disabled', true);

		allButtons[i].removeEventListener('click', function(evt) {
			console.log(evt);
		});
	}
}