
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



// Dias do calendário 



function atualizarCalendario(){

    const dias = document.getElementById("dias");

    dias.innerHTML = "";

    let primeiroDia = new Date(ano, mes, 1).getDay();

    let quantidadeDias = new Date(ano, mes + 1, 0).getDate();


    for(let i = 0; i < primeiroDia; i++){

        const span = document.createElement("span");
        
        dias.appendChild(span);
    }
    for(let i = 1; i <= quantidadeDias; i++){
        
        const span = document.createElement("span");
        span.classList.add("dia")

        span.innerText = i;

        span.addEventListener("click", function() {

            if(window.innerWidth < 900){
                
                const secao = document.getElementById("horarios");
                
                secao.style.display = "block";
                
                secao.innerHTML = `
                <h2>Horarios Disponíveis - Dia ${i} de ${meses[mes]}</h2>
                <p>8:00 - 10:00</p>
                <p>12:00 - 14:00</p>
                <p>14:00 - 17:00</p>
                `;
                
                secao.scrollIntoView({ behavior: 'smooth' });
            }});

        const ver = document.createElement("button");
        ver.innerText = "Ver";
        ver.classList.add("ver");
        
        ver.addEventListener("click", function() {
            
            const secao = document.getElementById("horarios");
            
            secao.style.display = "block";

            secao.innerHTML = `
            <h2>Horarios Disponíveis - Dia ${i} de ${meses[mes]}</h2>
            <p>8:00 - 10:00</p>
            <p>12:00 - 14:00</p>
            <p>14:00 - 17:00</p>
            `;
            
            secao.scrollIntoView({ behavior: 'smooth' });
        });
        span.appendChild(ver);

        dias.appendChild(span);
    }

}
atualizarCalendario()


botanterior.addEventListener("click", function() {

    mes--;

    if (mes < 0) {
        mes = 11;
        ano--;
    }
    document.getElementById("month-year").innerText = meses[mes];
    atualizarCalendario()
});


botproximo.addEventListener("click", function() {

    mes++;

    if (mes > 11) {
        mes = 0;
        ano++;
    }
    document.getElementById("month-year").innerText = meses[mes];
    atualizarCalendario()
});


window.addEventListener("resize", () => {
    console.clear();
    console.log(window.innerWidth + " px");
});
