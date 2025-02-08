const cardsContainer = document.getElementById('cards');

fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(activity => {
            console.log(activity);

            let title = activity['title'];
            let timeActual = activity['timeframes']['weekly']['current'];
            let timePrevious = activity['timeframes']['weekly']['previous'];

            console.log(title + timeActual + timePrevious);

            createCard(title, timeActual, timePrevious);
        });
    });

function createCard(title, timeActual, timePrevious, timeframe='weekly') {
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
          <span class="card__activity-actual-time">${timeActual}</span>
          <div class="card__activity-previous">
            <span class="card__activity-previous-name">${timeframeName} -</span>
            <span class="card__activity-previous-time">${timePrevious}</span>
          </div>
        </div>
    `;

    newCard.innerHTML = newCardContent;

    cardsContainer.appendChild(newCard);
}

function createCardCap(title) {
    let newCardCap = document.createElement('div')

    newCardCap.classList.add('card__cap');
    newCardCap.classList.add('card__' + formatTitle(title));

    cardsContainer.appendChild(newCardCap);
}

function determineTimeframeName(timeframe) {

    if(timeframe === 'daily')
        return 'Yesterday';
    if(timeframe === 'weekly')
        return 'Last Week';
    if(timeframe === 'monthly')
        return 'Last Month';

    else return 'Last Period';
}

function formatTitle(title) {
    let titleLower = title.toLowerCase();
    titleFormatted = titleLower.replace(/ /g, "-");
    return titleFormatted;
}