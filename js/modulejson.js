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

export {postObjectAsJson, fetchAnyUrl}