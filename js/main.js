

let time = document.getElementById("timer");

let t = 0;

function myfunction() {
    t++;
    console.log(t);
    time.innerHTML = `Tiempo total: ${t}`;
}

let count = setInterval(myfunction, 1000);

