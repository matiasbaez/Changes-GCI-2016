var done = false;
var buttonsPressed = {};

function mainJs() {
	var totalCount = 0;
	var random = Math.floor(Math.random() * 1000) + 1;
	var randomElem = document.getElementById('random');

	randomElem.innerText = random + ' Dollars';

	var allButtons = document.getElementById('dollars').querySelectorAll('input');

	amountUsedReachThatAmount(random, allButtons);

	for (var i = 0; i < allButtons.length; i++) {
		var button = allButtons[i];

		button.addEventListener('click', function() {
			var number = 0;
			var value = this.value;

			if (value.indexOf(' Dollars') >= 0) {
				number = Number(value.replace(' Dollars', ''));
			} else if (value.indexOf(' Dollar') >= 0) {
				number = Number(value.replace(' Dollar', ''));
			}

			totalCount += number;

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

			// Check if buttons need to be disabled
			var remaining = random - totalCount;

			for (var i = 0; i < allButtons.length; i++) {
				var button = allButtons[i];
				var buttonValue = 0;

				if (button.value.indexOf(' Dollars') >= 0) {
					buttonValue = Number(button.value.replace(' Dollars', ''));
				} else if (button.value.indexOf(' Dollar') >= 0) {
					buttonValue = Number(button.value.replace(' Dollar', ''));
				}

				if (remaining < Number(button.value.replace(' Dollars', ''))) {
					button.setAttribute('disabled', true);
				}
			}

			// Specify the amount used to reach that amount.
			amountUsedReachThatAmount(remaining, allButtons);

			document.getElementById('message').innerText = totalCount;
		});
	}
}

// Specify the amount used to reach that amount.
function amountUsedReachThatAmount(remaining, allButtons) {
	var tempValue = remaining;

	for (var i = allButtons.length - 1; i >= 0; i--) {
		if (tempValue > 0) {
			var buttonValue = 0;
			var button = allButtons[i];

			if (button.value.indexOf(' Dollars') >= 0) {
				buttonValue = Number(button.value.replace(' Dollars', ''));
			} else if (button.value.indexOf(' Dollar') >= 0) {
				buttonValue = Number(button.value.replace(' Dollar', ''));
			}

			var timesAmount = Math.floor(tempValue / buttonValue);

			tempValue = tempValue - (timesAmount * buttonValue);

			if (timesAmount > 0) {
				document.getElementById('message').innerText += 'You can have billetes of ' + timesAmount + ' of ' + button.value + '.\n';
			}
		}
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