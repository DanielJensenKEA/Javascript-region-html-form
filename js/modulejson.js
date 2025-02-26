
const urlRegioner = "http://localhost:8080/getregionerlocal"
async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions);
    return response;
}

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json()
        .catch(error => console.error("Handled error xx: ", error)));
}

function sortTable(kommuner) {
    //arr.sort((kom1, kom2) => (kom1 > kom2) ? 1 : -1);
    return kommuner.sort((kom1, kom2) => {
        if (kom1.region.kode > kom2.region.kode) {
            return 1
        } else if (kom2.region.kode > kom1.region.kode) {
            return -1
        } else if (kom1.navn > kom2.navn) {
            return 1
        } else {
            return -1
        }
    })
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions);
    console.log("Response from restDelete: " + response)
    return response;
}
// REGIONER
const regioner = await fetchAnyUrl(urlRegioner);
const regionMap = new Map();
async function fetchRegioner() {
    regioner.forEach(region => regionMap.set(region.navn, region))
    return regionMap
}

export {postObjectAsJson, fetchAnyUrl, restDelete, sortTable, fetchRegioner}