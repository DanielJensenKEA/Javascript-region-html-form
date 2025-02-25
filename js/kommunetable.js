import {fetchAnyUrl} from "./modulejson.js";

console.log("Jeg er i kommunetable");

let pressedHentKommunerFlag = false;
const urlKommune = "http://localhost:8080/getkommuner";
const pbCreateKommuneTable = document.getElementById("pbGetKommuner");
const tblKommuner = document.getElementById("tblKommuner");

let kommuner = [];

//document.addEventListener('DOMContentLoaded', getAllRegionerAndKommuner)
pbCreateKommuneTable.addEventListener('click', actionGetKommuner)


/*
function getAllRegionerAndKommuner() {
    const regionerUrl = "http://localhost:8080/getregioner";
    const kommunerUrl = "http://localhost:8080/getkommuner";

    Promise.all([
        fetch(regionerUrl, {method: "GET"}),
        fetch(kommunerUrl, {method : "GET"})
    ])
        .then(responses => Promise.all(responses.map(res => res.text())))
        .then(data => {
            console.log("Regions response:",data[0])
            console.log("Kommuner response:",data[1])
        })
        .catch(error => console.error("Error fetching: "+error))
}

 */
function actionGetKommuner() {
    if (!pressedHentKommunerFlag) {
        fetchKommuner();
        pressedHentKommunerFlag = true;
    } else {
        alert("! You have already loaded all kommuner !")
    }
}
async function fetchKommuner() {
    kommuner = await fetchAnyUrl(urlKommune);
    if (kommuner) {
        kommuner.forEach(createTable);
    } else {
        alert("Fejl ved kald til backend url="+urlKommune+". Vil du vide mere kig i Console(F12)")
    }
}
function deleteKommuneFromDB(kommune) {
    const url = `http://localhost:8080/${kommune.kode}`

    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
        if (!response.ok) {
            throw new Error (`Error: ${response.status} - ${response.statusText}`);
        }
        return response.text();
    })
        .then(data => console.log("Success: ", data))
        .catch(error => console.error("Error deleting kommune:", error));
}
function createTable(kommune) {
    let cellCount = 0;
    let rowCount = tblKommuner.rows.length;
    let row = tblKommuner.insertRow(rowCount);
    console.log(kommune)

    let cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.kode;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.navn;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.href;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.kode;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.navn;
    row.id = kommune.navn;

    cell = row.insertCell(cellCount++);
    const pbDelete = document.createElement('input');
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet Kommune");
    cell.appendChild(pbDelete);
    pbDelete.className="btn1"
    pbDelete.onclick = function() {
        document.getElementById(kommune.navn).remove();
        deleteKommuneFromDB(kommune);
        console.log("Deleted: "+kommune.navn)
    }
    console.log(row);
}





