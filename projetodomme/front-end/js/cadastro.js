const form = document.querySelector("#form-cadastro")
const btn = document.getElementById("btn-cadastrar");

const clientes = [];

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let cliente = criaCliente(form);

    clientes.push(cliente);

    console.log(clientes)

    form.reset();
});

const criaCliente = (form) =>{
    let cliente = {
        nome : form.nome.value,
        idade: form.idade.value,
        cpf: form.cpf.value,
        sexo: form.sexo.value,
        dataNasc: form.dtNasc.value,
        cidade: form.enderecoCid.value,
        rua: form.enderecoRua.value,
        numero: form.enderecoNr.value,
        cep: form.cep.value,
        telefone: form.telefone.value
    }

    return cliente;
}