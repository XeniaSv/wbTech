function onClick_switchDay(event) {
    document.getElementById('main__img').src = 'img/mainPicture.png';
    document.getElementById('main__interier-image').style.display = "block";
}

async function onClick_switchNight(event) {
    let selectedLamp = localStorage.getItem('selectedLamp');
    let data = await JSON.parse(localStorage.getItem(selectedLamp));
    if (data.isDarkMode === true)
    {
        document.getElementById('main__img').src = 'img/mainPictureNight.png';
        document.getElementById('main__interier-image').style.display = "none";
    }
    
    else
        alert("Sorry this lamp doesn't have night mode");
}