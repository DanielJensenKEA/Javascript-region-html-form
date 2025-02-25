
/*
const arr = ["hej", "dyt", "anders"]
console.log(arr)
//const srt = arr.sort((a,b) => (a>b) ? 1 : -1);
const sortbutton = document.getElementById("sortButton")



sortbutton.addEventListener('click', sort)

 */
function sort(arr) {
    arr.sort((a,b) => (a>b) ? 1 : -1);
}