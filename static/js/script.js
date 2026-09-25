
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



function atualizarCalendario() {

    const dias = document.getElementById("dias");

    dias.innerHTML = "";

    let primeiroDia = new Date(ano, mes, 1).getDay();

    let quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    const inicio = `${ano}-${String(mes + 1).padStart(2, '0')}-01`;
    const fim = `${ano}-${String(mes + 1).padStart(2, '0')}-${quantidadeDias}`;

    fetch(`/datas-disponiveis?inicio=${inicio}&fim=${fim}`)
        .then(resposta => resposta.json())
        .then(dados => {

            for (let i = 0; i < primeiroDia; i++) {

                const span = document.createElement("span");

                dias.appendChild(span);
            }

            for (let i = 1; i <= quantidadeDias; i++) {

                const span = document.createElement("span");

                span.classList.add("dia");

                span.innerText = i;

                const dataAtual =
                    `${ano}-${String(mes + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

                if (dados.datas_indisponiveis.includes(dataAtual)) {

                    span.classList.add("indisponivel");

                } else {

                    span.classList.add("disponivel");

                    span.addEventListener("click", function() {
                        mostrarhorarios(i);
                    });

                }
                dias.appendChild(span);
            }
        });
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

    const dataSelecionada =
        `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

    fetch(`/horarios-disponiveis?data=${dataSelecionada}`)
        .then(resposta => resposta.json())
        .then(dados => {

            secao.style.display = "block";

            let horarios = "";

            if (dados.horarios.includes("08:00:00")) {
                horarios += "<p>8:00 - 10:00</p>";
            }

            if (dados.horarios.includes("12:00:00")) {
                horarios += "<p>12:00 - 14:00</p>";
            }

            if (dados.horarios.includes("14:00:00")) {
                horarios += "<p>14:00 - 17:00</p>";
            }

            if (horarios === "") {
                horarios = "<p>Nenhum horário disponível.</p>";
            }

            secao.innerHTML = `
                <h2>Horários Disponíveis - Dia ${dia} de ${meses[mes]}</h2>
                ${horarios}
            `;

            secao.scrollIntoView({ behavior: 'smooth' });


        });
}
