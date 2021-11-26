window.onload = function () {
    let success = (data) => {
        fillLocalStorage(data);
        printScrollbar(data);
        document.getElementById(1).click();
    }

    let fail = (error) => {
        console.log(error);
    }
    addEventsToSwitchButtons();
    getLampsInformation().then(success).catch(fail);
}


function fillLocalStorage(data) {
    localStorage.clear();
    data.forEach(element => {
        localStorage.setItem(element.id, JSON.stringify(element));
    });
}

function addEventsToSwitchButtons() {
    let dayButton = document.querySelector('.catalog__switch-day');
    let nightButton = document.querySelector('.catalog__switch-night');

    dayButton.addEventListener('click', onClick_switchDay);
    nightButton.addEventListener('click', onClick_switchNight);
}
