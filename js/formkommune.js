console.log("jeg er i formkommune");
document.addEventListener("DOMContentLoaded", createFormEventListener);
let formKommune;
//import { postDataAsJson } from './formkommunejson'


function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleFormSubmit);

}

async function handleFormSubmit(event){
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);
    try  {
        const formData = new FormData(form);
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
    console.log("Plainformdata: "+plainFormData);
    plainFormData.kommune = {};
    plainFormData.kommune.kode = plainFormData.kode;
    const resp = postDataAsJson(url, plainFormData, "POST");
}