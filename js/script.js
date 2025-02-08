const cardsContainer = document.getElementById('cards');

const choiceButtons = document.querySelectorAll('.choice');

choiceButtons.forEach(chosenButton => {
    chosenButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (chosenButton.classList.contains('choice--active')) {
            return 0;
        }

        changeActiveStateTo(chosenButton);

        if (chosenButton.classList.contains('choice__daily')) {
            refreshCards('daily');
        }
        else if (chosenButton.classList.contains('choice__weekly')) {
            refreshCards('weekly');
        }
        else if (chosenButton.classList.contains('choice__monthly')) { 
            refreshCards('monthly');
        }
    });
});

createAllCards();

// functions
function createCard(title, timeActual, timePrevious, timeframe = 'weekly') {
    createCardCap(title);

    let newCard = document.createElement('div');
    newCard.classList.add('card');

    let timeframeName = determineTimeframeName(timeframe);

    let newCardContent = `
        <div class="card__header">
          <span class="card__activity-name">${title}</span>
          <img src="./images/icon-ellipsis.svg" alt="Ellipsis" class="card__ellipsis-icon">
        </div>
        <div class="card__body">
          <span class="card__activity-actual-time">${timeActual}hrs</span>
          <div class="card__activity-previous">
            <span class="card__activity-previous-name">${timeframeName}</span> -
            <span class="card__activity-previous-time">${timePrevious}</span>hrs
          </div>
        </div>
    `;

    newCard.innerHTML = newCardContent;

    cardsContainer.appendChild(newCard);
}

function removeAllCards() {
    cardsContainer.innerHTML = '';
}

function createAllCards(timeframe = 'weekly') {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(activity => {
            console.log(activity);

            let title = activity['title'];
            let timeActual = activity['timeframes'][timeframe]['current'];
            let timePrevious = activity['timeframes'][timeframe]['previous'];

            console.log(title + timeActual + timePrevious);

            createCard(title, timeActual, timePrevious, timeframe);
        });
    });
}

function refreshCards(timeframe = 'weekly') {
    removeAllCards();
    createAllCards(timeframe);
}

function createCardCap(title) {
    let newCardCap = document.createElement('div')

    newCardCap.classList.add('card__cap');
    newCardCap.classList.add('card__' + formatTitle(title));

    cardsContainer.appendChild(newCardCap);
}

function determineTimeframeName(timeframe) {

    if (timeframe === 'daily')
        return 'Yesterday';
    if (timeframe === 'weekly')
        return 'Last Week';
    if (timeframe === 'monthly')
        return 'Last Month';

    else return 'Last Period';
}

function formatTitle(title) {
    let titleLower = title.toLowerCase();
    titleFormatted = titleLower.replace(/ /g, "-");
    return titleFormatted;
}

function changeActiveStateTo(choice) {
    choiceButtons.forEach(chosen => {
        if (chosen.classList.contains('choice--active')) {
            chosen.classList.remove('choice--active');
        }
    });


    choice.classList.add('choice--active');
}