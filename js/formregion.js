console.log("jeg er i formregion")
document.addEventListener("DOMContentLoaded", createFormEventListener);
let formRegion;

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default behaviour
    event.preventDefault(); //Browser må ikke lave en post ved submit, da vi vil gøre det i vores javascript
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try {
        const formData = new FormData(form); //Henter alle input værdier gennem formdata.
        console.log("Formdata: "+formData);
        const responseData = await postFormDataAsJson(url, formData);
    }catch(error) {
        alert(error.message);
        console.log(error);
    }
}
async function postFormDataAsJson(url, formData) {
    console.log("Vi er i postformdata");
    console.log(url, formData);
    const plainFormData = Object.fromEntries(formData.entries());
    console.log("Plainformdata: "+plainFormData)
    plainFormData.region = {}
    plainFormData.region.kode = plainFormData.kode;
    //const resp = await postObjectsAsJson(url, plainFormData, "POST");
    const resp = postDataAsJson(url, plainFormData, "POST");
}