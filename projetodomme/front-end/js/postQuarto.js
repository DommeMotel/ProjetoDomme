const btnCadastrar = document.querySelector('#btn-cadastro');
const form = document.querySelector('#form-cadastro-quarto');

btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();

    const quarto = getDados(form);

    sendAPI(quarto);

    form.reset();
});

const getDados = (form) =>{
    let nome = form.nome.value;
    let numero = form.numeroQuarto.value;
    let categoria = form.select.value;
    let valorHora = form.valorHora.value;

    let quarto = {
        nome: nome,
        numero: numero,
        categoria: categoria,
        valorHora: parseFloat(valorHora),
        status: 1
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
            alert('Quarto cadastrado com sucesso');
            window.location.href = "quartos.html"
        } else { 
            alert('Ops! Houve um erro');
        };
    } catch(erro){
        console.log(erro);
    };
};