const btnAlt = document.querySelector("#btn-alterar-cliente");
const popup = document.querySelector("#dialog-put");
const alterarCliente = document.querySelector("#btnAlt-dialog-cliente");
const exitDialog = document.querySelector("#cancelar-dialog-cliente");
const inputId = document.querySelector("#found-id");
const formularioPopup = document.querySelector('#popup-form');

btnAlt.onclick = () =>{
    popup.showModal();
};

exitDialog.onclick = ()=>{
    popup.close();
};

inputId.addEventListener('blur', (e)=>{
    e.preventDefault();

    retornaCliente(formularioPopup)
})

alterarCliente.addEventListener('click', (e)=>{
    e.preventDefault();

    uptadeCliente();

    console.log(dados(formularioPopup));

});

async function retornaCliente(form){
    const id = inputId.value;

    const res = await fetch(`http://localhost:8000/clientes/id/${id}`);

    if(res.status === 200){
        const clientes = await res.json();
        
        clientes.forEach(cliente =>{
            exibeDados(form, cliente);
        });

    } else {
        console.log("erro")
   };
};

function exibeDados(form, cliente){
    form.newName.value = cliente.nmCliente;
    form.newCPF.value = cliente.CPF;
    form.newCEP.value = cliente.cep;
    form.newPhone.value = cliente.nrTelefone;
    form.enderecoNumero.value = cliente.nrEndereco;
    form.enderecoRua.value = cliente.nmRua;
    form.enderecoCid.value = cliente.nmCidade;
}


function dados(form){
    const nome = form.newName.value;
    const cpf = form.newCPF.value;
    const cep = form.newCEP.value;
    const telefone = form.newPhone.value;
    const cidade = form.enderecoCid.value;
    const rua = form.enderecoRua.value;
    const numero = form.enderecoNumero.value
    
    const cliente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        cep: cep,
        cidade: cidade,
        rua: rua,
        numero: numero
    };

    return cliente;
};

function uptadeCliente(){
    const id = inputId.value;
    axios.put(`http://localhost:8000/clientes/${id}`, dados(formularioPopup))
    .then(response =>  {
        alert("Alterado com sucesso");
        window.location.href = "clientes.html"
    })
    .catch(error => console.log(error));
}



