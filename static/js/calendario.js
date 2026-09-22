let data = new Date();

let ano = data.getFullYear();
let mes = data.getMonth()
let dataSelecionada = null;
let horarioSelecionado = null;

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
        mostrarhorarios(i);
    }

});

        const ver = document.createElement("button");
        ver.innerText = "Ver";
        ver.classList.add("ver");
        
        ver.addEventListener("click", function() {
    mostrarhorarios(i);
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


function mostrarhorarios(dia) {
    const secao = document.getElementById("horarios");
    
    secao.style.display = "block";
    
    secao.innerHTML = `
    <h2>Horarios Disponíveis - Dia ${dia} de ${meses[mes]}</h2>
    <button class="bot_horario" data-horario="8:00:00" >8:00 - 10:00</button class="bot_horario">
    <button class="bot_horario" data-horario="12:00:00">12:00 - 14:00</button class="bot_horario">
    <button class="bot_horario" data-horario="14:00:00">14:00 - 17:00</button class="bot_horario">
    `;

    secao.scrollIntoView({ behavior: 'smooth' });

    document.querySelectorAll(".bot_horario").forEach(function(botao) {
        botao.addEventListener("click", function() {
            


            horarioSelecionado = botao.dataset.horario;
            dataSelecionada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

            secao.innerHTML = ` <h2>Agendamento selecionado</h2> <p>Data: ${dataSelecionada}</p> <p>Horário: ${horarioSelecionado}</p> `;
        });
    });
}

document.getElementById("agendar").addEventListener("click", function() {
     if (dataSelecionada === null || horarioSelecionado === null) {
        alert("Selecione uma data e um horário antes de finalizar o agendamento.");
        return;
    }

    const formulario = document.createElement("form");

    formulario.method = "POST";
    formulario.action = "/finalizacao";

    const inputData = document.createElement("input");
    inputData.type = "hidden";
    inputData.name = "data";
    inputData.value = dataSelecionada;

    const inputHorario = document.createElement("input");
    inputHorario.type = "hidden";
    inputHorario.name = "horario";
    inputHorario.value = horarioSelecionado;

    formulario.appendChild(inputData);
    formulario.appendChild(inputHorario);

    document.body.appendChild(formulario);

    formulario.submit();});