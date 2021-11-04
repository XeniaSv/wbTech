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