async function onClick_Lamp(event) {
    let lampId = event.currentTarget.id;

    setAndClearStyleLamps(lampId);
    let data = await JSON.parse(localStorage.getItem(lampId));
    localStorage.setItem('selectedLamp', lampId);
    
    let catalogInfo = document.getElementById('catalog__info');
    catalogInfo.innerHTML = '';

    let templateInfoLamp = document.getElementById('lamp_info');

    let indicators = templateInfoLamp.content.querySelectorAll('.indicator');
    indicators[0].textContent = data.material;
    indicators[1].innerHTML = `H ${data.height} &#215; W ${data.width}`;
    indicators[2].textContent = `${data.weight} Kg`;
    indicators[3].textContent = data.electrification;

    let clone = templateInfoLamp.content.cloneNode(true);
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
    let clone = templateCatalogImage.content.cloneNode(true);
    catalogImageDiv.append(clone);
}

function fillInterierImage(image) {
    let interierImageDiv = document.getElementById('main__interier-image');
    interierImageDiv.innerHTML = '';

    let templteInterierImage = document.getElementById('image-lamp-interier');
    templteInterierImage.content.getElementById('interier-img').src = image;
    let clone = templteInterierImage.content.cloneNode(true);
    interierImageDiv.append(clone);
}

function setAndClearStyleLamps(lampId) {
    let selectedLamp = document.getElementById(lampId);
    selectedLamp.classList.add('catalog__selected_item');
    let lamps = document.querySelectorAll('.catalog__item');
    lamps.forEach(lamp => {
        if (lamp.id != lampId)
            lamp.classList.remove('catalog__selected_item')
    })
}
