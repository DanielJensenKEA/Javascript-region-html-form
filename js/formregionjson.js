console.log("Jeg er i formregionjson");
const urlPostRegion = "http://localhost:8080/region";

async function postDataAsJson(url, obj) {
    const objectAsJsonString = JSON.stringify(obj);
    console.log("postDataAsJson: "+objectAsJsonString)
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    }
    const response = await fetch(urlPostRegion, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
    }else {
        //Vi har fået response ud fra backend. Vi skal tænke os godt om hvor vi henter json ud
        const js1 = response.json(); //promise
        console.log(js1);
    }
    return response;
}
async function postRegion(region) {
    const nogetjson = await postDataAsJson(urlPostRegion, region);
    console.log(nogetjson);
    console.log("noget json");
    console.log(nogetjson.json())
    const reg1 = createRegion();
    console.log(reg1);
    await postRegion(reg1);
}

function createRegion(){
    const kommune ={};
    kommune.kode = "8899";
    kommune.navn = "KEAxxx";
    kommune.href = "http:kea";
    return kommune;
}

