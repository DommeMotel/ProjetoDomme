const formDialog = document.querySelector("#popup-form");
const btnNovaReserva = document.querySelector("#btn-nova-reserva");
const btConfirmarReserva = document.querySelector("#btn-confirmar");
const btnCancelar = document.querySelector("#btn-cancelar")
const popup = document.querySelector("dialog");
const selectNome = document.querySelector("#selectNome");
const selectQuarto = document.querySelector("#selectQuarto");

btnNovaReserva.onclick = ()=>{
    popup.showModal();
}

btnCancelar.onclick = ()=>{
    popup.close();
}


selectQuarto.addEventListener('blur', (e)=>{
    getValorHoraQuarto()
})

//Coletando dados para a criação da nova reserva
getClientes();
getQuartos();

async function getClientes(){
    const res = await fetch("http://localhost:8000/Clientes/nomesClientes");
    const nomesCliente = await res.json();

    console.log(nomesCliente)

    criarSelectCliente(nomesCliente)
}

function criarSelectCliente(nomeClientes){
    nomeClientes.forEach(cliente => {

        selectNome.innerHTML += `<option value = "${cliente.codigo_cliente}">${cliente.nmCliente}</option>`;
    });
}

async function getQuartos(){
    
    const res = await fetch(`http://localhost:8000/suites//nomesQuarto`);
    const nomesQuartos = await res.json();

    criarSelectQuarto(nomesQuartos);
    
};

function criarSelectQuarto(nomesQuartos){
    nomesQuartos.forEach(quarto => {

        selectQuarto.innerHTML += `<option value = "${quarto.codigo_quarto}">${quarto.tituloQuarto}</option>`;
    });
}

//Pegando os dados dos inputs

function getDadosForm(form){
    const inputNome = form.cliente;
    const inputQuarto = form.quarto;
    const inputDtEntrada = form.dataEntrada;
    const inputPeriodo = form.periodo;
    const inputQtdPessoas = form.qtdPessoas;
    const inputValorHora = form.valorHora;


    const reserva = {
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

    return reserva;
    
};

async function getValorHoraQuarto(){

    let idQuarto = formDialog.quarto.value;
    console.log(idQuarto);
    const res = await fetch(`http://localhost:8000/suites/${idQuarto}`);
    const quarto = await res.json();
    console.log(quarto.vlHoraQ);
    if(res.status === 200){

        quarto.forEach(quarto => {
            let vlHora = quarto.vlHoraQ;
            formDialog.valorHora.value = vlHora;
        })

    } else {

        alert("Ops! não encontramos essa suíte");
    }
};

function retornaValor(form, quarto){
    form.valorHora.value = quarto.vlHoraQ;
}




