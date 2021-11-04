function onClick_switchDay() {
    document.getElementById('main__img').src = '/img/main-picture.png';
    document.getElementById('main__interier-image').style.display = "block";
}

async function onClick_switchNight() {
    let selectedLamp = localStorage.getItem('selectedLamp');
    let data = await JSON.parse(localStorage.getItem(selectedLamp));
    if (data.isDarkMode === true)
    {
        document.getElementById('main__img').src = '/img/main-picture-night.png';
        document.getElementById('main__interier-image').style.display = "none";
    }
    else
        alert("Sorry this lamp doesn't have night mode");
}