const url = 'https://private-anon-7f1784815b-lampshop.apiary-mock.com/lamps';

async function getLampsInformation() {
    let data = await fetch(url);

    if (data.status === 200) {
        return await data.json();
    }

    throw new Error("Wrong request");
}
