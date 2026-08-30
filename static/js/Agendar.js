const form = document.getElementById("formulario");
const telefone = document.getElementById("telefone");



telefone.addEventListener("input", function(){

    let valor = telefone.value.replace(/\D/g, "");

    if(valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2")
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    telefone.value = valor;
});

const nome = document.getElementById("nome");

nome.addEventListener("input", function(){

    let valor = nome.value.replace(/[^a-zA-Z\s]/g, "");

    nome.value = valor;
});

window.addEventListener("resize", () => {
    console.clear();
    console.log(window.innerWidth + " px");
});
