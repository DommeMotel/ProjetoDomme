const btn = document.querySelector('#btn-pesq');
const input = document.querySelector('#pesq');
const tabela = document.querySelector('#quartos')
const form = document.querySelector('#form-pesq');


getQuartos();


btn.addEventListener('click', (event) => {
    event.preventDefault();


    if(input.value === ""){

        // método é chamado se o campo de pesquisa estiver vazio e exibe todos os quartos
        getQuartos();
    } else {

        // método chamado quando se busca por um quarto
        getQuarto();
    }
    
    form.reset();
})


// método que retorna um unico quarto de acordo com seu id
async function getQuarto(){

    let idSuite = input.value;
    const res = await fetch(`http://localhost:8000/suites/${idSuite}`);
    const suite = await res.json();
    
    if(res.status === 200){

        html(suite);
    } else {

        alert("Ops! não encontramos essa suíte");
    }
};

// método que retorna todos os quartos para serem exibidos ao clicar no botão pesquisar
async function getQuartos(){
    
    const res = await fetch(`http://localhost:8000/suites`);
    const suites = await res.json();
    html(suites);
};


function html(listaSuites){
    tabela.textContent = "";

    listaSuites.forEach(suite => {

        const div = document.createElement('div');
        div.classList.add('quarto')
        let html = `

            <label for="codigo">Código: </label>
            <input name="codigo" value="${suite.codigo_quarto}" readonly>

            <label for="nome">Nome do Quarto: </label>
            <input name="nome" value="${suite.tituloQuarto}" readonly>
        
            <label for="numero">Número: </label>
            <input name="numero" value="${suite.nrQuarto}" readonly>
        
            <label for="categoria">Categoria: </label>
            <input name="categoria" value="${suite.tpQuarto}" readonly>
        
            <label for="valor">Valor: </label>
            <input name="valor" value="${suite.vlHoraQ}" readonly>
        
            <label for="status">Status: </label>
            <input name="status"  value="${suite.nmStatus}" readonly>
        `
        
        div.innerHTML += html;
        tabela.appendChild(div);
    });
}

// function exibeCor(suite){
//     if(suite.codigo_status.value === 1){

//     }
// }



