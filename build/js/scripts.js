function onClick_switchDay() {
    document.getElementById('main__img').src = 'img/mainPicture.png';
    document.getElementById('main__interier-image').style.display = "block";
}

async function onClick_switchNight() {
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
const url = 'https://private-anon-7f1784815b-lampshop.apiary-mock.com/lamps';

async function getLampsInformation() {
    let data = await fetch(url);

    if (data.status === 200) {
        return await data.json();
    }

    throw new Error("Wrong request");
}

async function onClick_Lamp(lampId) {
    let data = await JSON.parse(localStorage.getItem(lampId));
    localStorage.setItem('selectedLamp', lampId);

    let catalogInfo = document.getElementById('catalog__info');
    catalogInfo.innerHTML = '';

    let templateInfoLamp = document.getElementById('lamp_info');

    let indicators = templateInfoLamp.content.querySelectorAll('#indicator');
    indicators[0].textContent = data.material;
    indicators[1].innerHTML = `H ${data.height} &#215; W ${data.width}`;
    indicators[2].textContent = `${data.weight} Kg`;
    indicators[3].textContent = data.electrification;

    let clone = document.importNode(templateInfoLamp.content, true);
    catalogInfo.append(clone);

    fillImages(data.image);
    onClick_switchDay();
}

function fillImages(image) {
    fillCatalogImage(image);
    fillInterierImage(image);
}

function fillCatalogImage(image) {
    let catalogImageDiv = document.getElementById('catalog__image-div');
    catalogImageDiv.innerHTML = '';

    let templateCatalogImage = document.getElementById('image-lamp-in-catalog');
    templateCatalogImage.content.getElementById('catalog__image').src = image;
    let clone = document.importNode(templateCatalogImage.content, true);
    catalogImageDiv.append(clone);
}

function fillInterierImage(image) {
    let interierImageDiv = document.getElementById('main__interier-image');
    interierImageDiv.innerHTML = '';

    let templteInterierImage = document.getElementById('image-lamp-interier');
    templteInterierImage.content.getElementById('interier-img').src = image;
    let clone = document.importNode(templteInterierImage.content, true);
    interierImageDiv.append(clone);
}

function printScrollbar(data) {
    let scrollbar = document.getElementById('catalog__items');
    scrollbar.innerHTML = "";
    data.forEach(element => {
        let templateLampScrollbar = document.getElementById('image-lamp-in-scrollbar');

        templateLampScrollbar.content.querySelector('.catalog__item').id = element.id;
        templateLampScrollbar.content.getElementById('image-scrollbar').src = element.image;

        let clone = document.importNode(templateLampScrollbar.content, true);
        scrollbar.append(clone);
    });
}
window.onload = function () {
    let success = (data) => {
        fillLocalStorage(data);
        printScrollbar(data);
        onClick_Lamp(1);
    }

    let fail = (error) => {
        console.log(error);
    }
    getLampsInformation().then(success).catch(fail);
}


function fillLocalStorage(data) {
    localStorage.clear();
    data.forEach(element => {
        localStorage.setItem(element.id, JSON.stringify(element));
    });
}
