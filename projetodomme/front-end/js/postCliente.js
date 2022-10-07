const btnCadastrar = document.querySelector('#btn-cadastro');
const form = document.querySelector('#form-cadastro-cliente');
const btnCancelar = document.querySelector('#btn-cancelar');



btnCadastrar.addEventListener('click', (event)=>{
    event.preventDefault();

    // esse botão tem a função de capturar os dados preenchidos pelo usuário nos campos e enviar para a API
    
    const cliente = getDadosForm(form);

    validaCliente(cliente.dtNasc, cliente);

    form.reset();
});

btnCancelar.addEventListener('click', (event) => {
    event.preventDefault();

    form.reset();
})


function getDadosForm(form){
    const inputNome = form.nome;
    const inputCpf = form.cpf;
    const inputSexo = form.sexo;
    const inputDtNasc = form.dtNasc;
    const inputCidade = form.enderecoCid;
    const inputRua = form.enderecoRua;
    const inputNr = form.enderecoNr;
    const inputCep = form.cep;
    const inputTelefone = form.telefone;

    const cliente = {
        nome: inputNome.value,
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


function validaCliente(data, cliente){
    let atualDate = new Date();

    let nascDate = new Date(data);


    let idade = atualDate.getFullYear() - nascDate.getFullYear();
    
    if(idade < 18){

        alert('Cliente menor que 18 anos');

    } else {

        sendAPI(cliente);
    }
}