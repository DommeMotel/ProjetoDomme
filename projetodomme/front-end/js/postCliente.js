const btnCadastrar = document.querySelector('#btn-cadastro');
const form = document.querySelector('#form-cadastro-cliente');
const btnCancelar = document.querySelector('#btn-cancelar');



btnCadastrar.addEventListener('click', (event)=>{
    event.preventDefault();

    // esse botão tem a função de capturar os dados preenchidos pelo usuário nos campos e enviar para a API
    
    const cliente = getDadosForm(form);

    sendAPI(cliente);

    form.reset();
});

btnCancelar.addEventListener('click', (event) => {
    event.preventDefault();

    form.reset();
})


function getDadosForm(form){
    const inputNome = form.nome;
    const inputIdade = form.idade;
    const inputCpf = form.cpf;
    const inputSexo = form.sexo;
    const inputDtNasc = form.dtNasc;
    const inputCidade = form.enderecoCid;
    const inputRua = form.enderecoRua;
    const inputNr = form.enderecoNr;
    const inputCep = form.cep;
    const inputTelefone = form.telefone;


    if(inputIdade.value < 18){
        alert("Usuário menor de idade");
    } else {
        const cliente = {
            nome: inputNome.value,
            idade: inputIdade.value,
            cpf: inputCpf.value,
            sexo: inputSexo.value,
            dtNasc: inputDtNasc.value,
            cidade: inputCidade.value,
            rua: inputRua.value,
            numero: inputNr.value,
            cep: inputCep.value,
            telefone: inputTelefone.value
        };
    
        return cliente;
    };
};

async function sendAPI(cliente){
    try{
        const res = await fetch('http://localhost:8000/clientes', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
        });

        if(res.status === 200){
            alert('Cliente cadastrado');
            window.location.href = "clientes.html"
        } else { 
            alert('Ops! Houve um erro');
        };
    } catch(erro){
        console.log(erro);
    };
};





const validacoes = (cliente) => {
    if(typeof(cliente.nome) != typeof('a')){
        alert("Não cadastrado");
    }
    
    else if (typeof(cliente.idade) != typeof(1)){
        alert("Não cadastrado");
    }
 
    //tem que continuar com as validações
    
};