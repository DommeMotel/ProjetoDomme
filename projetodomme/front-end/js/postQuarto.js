const btnCadastrar = document.querySelector('#btn-cadastro');
const form = document.querySelector('#form-cadastro-quarto');

btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();

    const quarto = getDados(form);

    sendAPI(quarto);

    form.reset();
});

const getDados = (form) =>{
    let nomeQuarto = form.nome;
    let nrQuarto = form.enderecoNr;
    let tipoQuarto = form.select;

    let quarto = {
        titulo: nomeQuarto.value,
        numero: nrQuarto.value,
        tipo: tipoQuarto.value,
        codigo: 1
    };

    //codigo do quarto não pode ser nulo no banco porem não tem campo de preencher no html, defini como padrão 1 (analisar se precisa ser feita alguma alteração)

    return quarto;
};

async function sendAPI(quarto){
    try{
        const res = await fetch('http://localhost:8000/suites', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quarto)
        });

        if(res.status === 200){
            alert('Quarto cadastrado');
            window.location.href = "quartos.html"
        } else { 
            alert('Ops! Houve um erro');
        };
    } catch(erro){
        console.log(erro);
    };
};