var clothingType;

function addAttributes() {
	//get a list of all of the button elements in the page
	var listOfElements = document.getElementsByTagName('button');
	var attributes = [];

	console.log(listOfElements);

	for (var i = 0; i < listOfElements.length; i++) {
		if (listOfElements[i].classList.contains('selected')) {
			attributes.push(listOfElements[i].getAttribute('id'));
		}
	}
	return attributes;
}

function selectClothing(clothing) {
	clothingType = clothing;
}
