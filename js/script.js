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
