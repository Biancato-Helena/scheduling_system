
let data = new Date();

let ano = data.getFullYear();
let mes = data.getMonth()

let quantidadeDias = new Date(ano, mes + 1, 0).getDate();



const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];


const botproximo = document.getElementById("next-month");
const botanterior = document.getElementById("prev-month");


document.getElementById("month-year").innerText = meses[mes];

botproximo.addEventListener("click", function() {

    mes++;

    if (mes > 11) {
        mes = 0;
        ano++;
    }
    document.getElementById("month-year").innerText = meses[mes];
});

botanterior.addEventListener("click", function() {

    mes--;

    if (mes < 0) {
        mes = 11;
        ano--;
    }
    document.getElementById("month-year").innerText = meses[mes];
});


// Dias do calendário 





for (let i = 1; i <= quantidadeDias; i++){
    const span = document.createElement("span");
    span.innerText = i;
    dias.appendChild(span);

}


function atualizarCalendario(){

    const dias = document.getElementById("dias");

    dias.innerHTML = "";

    let primeiroDia = new Date(ano, mes, 1).getDay();

    let quantidadeDias = new Date(ano, mes + 1, 0).getDate();

}







