console.log("jeg er i formkommunejson");
const urlPostKommune = "http://localhost:8080/kommune";

async function postDataAsJson(url, obj) {
    const objectAsJsonString = JSON.stringify(obj);
    console.log("postDataAsJson: "+objectAsJsonString);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : objectAsJsonString,
    }
    const response = await fetch(urlPostKommune, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error(errorMessage);
    } else {
        const js1 = response.json();
    }
    return response;
}

async function postKommune(kommune) {
    const nogetjson = await postDataAsJson(urlPostKommune, kommune)
    console.log(nogetjson)
    console.log("noget json")
    console.log(nogetjson.json())
    await postKommune(kommune);
}
