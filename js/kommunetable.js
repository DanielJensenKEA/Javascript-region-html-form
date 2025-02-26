import {fetchAnyUrl, fetchRegioner, postObjectAsJson, restDelete, sortTable} from "./modulejson.js";

console.log("Jeg er i kommunetable");

let pressedHentKommunerFlag = false;
const urlKommune = "http://localhost:8080/getkommuner";
const urlKommuneLocal = "http://localhost:8080/getlocalkommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner");
const tblKommuner = document.getElementById("tblKommuner");
const urlKommuneEndpoint = "http://localhost:8080/kommune/"
const sortButton = document.getElementById("sortKomButton")


let kommuner = [];
let regMap = new Map();

pbCreateKommuneTable.addEventListener('click', actionGetKommuner)

function actionGetKommuner() {
    if (!pressedHentKommunerFlag) {
        fetchKommuner();
        pressedHentKommunerFlag = true;
    } else {
        alert("! You have already loaded all kommuner !")
    }
}
async function fetchKommuner() {
    //kommuner = await fetchAnyUrl(urlKommune);
    const url = urlKommuneLocal //Hvis vi henter kommuner fra den åbne api vil den overskrive vores entities og overskrive lokale ændringer såsom hrefphoto som vi ville sætte i MySQL.
    console.log("fetchKommuner() url: "+url);
    regMap = await fetchRegioner();
    kommuner = await fetchAnyUrl(url)
    sortTable(kommuner)
    if (kommuner) {
        kommuner.forEach(createTable);
    } else {
        alert("Fejl ved kald til backend url="+url+". Vil du vide mere kig i Console(F12)")
    }
}
async function deleteKommuneFromDB(kommune) {
    try {
        const url = urlKommuneEndpoint+kommune.kode;
        console.log("Delete request for url: "+url)
        const resp = await restDelete(url)
        console.log("Response deleteKommuneFromDB: "+resp)
        const body = await resp.text();
        alert(body)
    }catch(error) {
        alert(error.message);
        console.log(error)
    }
}
async function updateKommuneInDB(kommune) {
    const url = `http://localhost:8080/kommune/${kommune.kode}`
    const response = await postObjectAsJson(url, kommune, "PUT");
    if (response.ok) {
        console.log("Kommune updated")
    } else {
        console.error("Failed to update kommune", response);
    }
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

    //IMAGE
    cell = row.insertCell(cellCount++);
    let img = document.createElement("img");
    console.log("hrefPhoto: "+kommune.hrefPhoto);
    img.setAttribute("src", kommune.hrefPhoto);
    img.setAttribute("alt", "hej");
    img.setAttribute("width", 150);
    img.setAttribute("height", 150);
    cell.appendChild(img);

    //REGION
    cell = row.insertCell(cellCount++);
    const dropdown = document.createElement("select");
    dropdown.id = "ddRegion"+kommune.kode;
    regMap.forEach(reg => {
        const element = document.createElement("option");
        element.textContent = reg.navn;
        element.value = reg.kode;
        element.region = reg;
        dropdown.append(element);
    })
    cell.appendChild(dropdown);

    /*
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.kode;
    cell = row.insertCell(cellCount++);
    cell.innerHTML = kommune.region.navn;
     */

    row.id = kommune.navn;

    //DELETE BUTTON
    cell = row.insertCell(cellCount++);
    const pbDelete = document.createElement('input');
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet Kommune");
    cell.appendChild(pbDelete);
    pbDelete.className = "btn1"

    pbDelete.onclick = function () {
        document.getElementById(kommune.navn).remove();
        deleteKommuneFromDB(kommune);
    }

    //UPDATE BUTTON
    cell = row.insertCell(cellCount++);
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute("value", "Update Kommune");
    pbUpdate.className = "btn1";
    cell.appendChild(pbUpdate);
    pbUpdate.onclick = function() {
        console.log(dropdown)
        console.log(dropdown.selectedIndex)
        console.log(dropdown.value)
        kommune.region.kode = dropdown.value;
        console.log(kommune)
        updateKommuneInDB(kommune);
    }
}





