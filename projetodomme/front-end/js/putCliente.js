const btnAlt = document.querySelector("#btn-alterar-cliente");
const popup = document.querySelector("dialog");
const alterarCliente = document.querySelector("#btnAlt-dialog-cliente");
const exitDialog = document.querySelector("#cancelar-dialog-cliente");
const inputId = document.querySelector("#found-id");
const formularioPopup = document.querySelector('#popup-form');

btnAlt.addEventListener('click', (e)=>{
    e.preventDefault();
    popup.showModal();
})

exitDialog.addEventListener('click', (e)=>{
    e.preventDefault();
    popup.close()
});

inputId.addEventListener('blur', (e)=>{
    e.preventDefault();

    retornaCliente(formularioPopup)
})


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
}


alterarCliente.addEventListener('click', (e)=>{
    e.preventDefault();

})

function dados(form){
    const nome = form.newName;
    const cpf = form.newCPF.value;
    const cep = form.newCEP.value;
    const telefone = form.newPhone.value;
    const cidade = form.enderecoCid.value;
    const rua = form.enderecoRua.value;
    
    const cliente = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        cep: cep,
        cidade: cidade,
        rua: rua
    };

    return cliente
};





