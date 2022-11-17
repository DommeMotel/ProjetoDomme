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

btConfirmarReserva.addEventListener("click", (e)=>{
    e.preventDefault();

    const dados_reserva = getDadosForm(formDialog);

    // cria_reserva(dados_reserva);
    if(cria_reserva(dados_reserva)){
        update();
    };

})



//Coletando dados para a criação da nova reserva
getClientes();
getQuartos();

async function getClientes(){
    const res = await fetch("http://localhost:8000/Clientes/nomesClientes");
    const nomesCliente = await res.json();

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

        selectQuarto.innerHTML += `<option value = "${quarto.codigo_quarto}"> ${quarto.tituloQuarto} - ${quarto.tpQuarto} - ${quarto.nrQuarto} </option>`;
    });
}

//Pegando os dados dos inputs

function getDadosForm(form){
    const inputCliente = form.cliente;
    const inputQuarto = form.quarto;
    const inputDtEntrada = form.dataEntrada;
    const inputPeriodo = form.periodo;
    const inputQtdPessoas = form.qtdPessoas;
    const inputValorHora = form.valorHora;


    const reserva = {
        dataEntrada: inputDtEntrada.value,
        periodo: inputPeriodo.value,
        qtdPessoas: inputQtdPessoas.value,
        valorH: inputValorHora.value,
        id_cliente: inputCliente.value,
        quarto: inputQuarto.value,
        codigo_pagamento: 5,
        codigo_status: 5
    };

    return reserva;
    
};

async function getValorHoraQuarto(){

    let idQuarto = formDialog.quarto.value;
    const res = await fetch(`http://localhost:8000/suites/${idQuarto}`);
    const quarto = await res.json();
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

async function cria_reserva(dados){
    try{
        const res = await fetch(`http://localhost:8000/reservas`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
        });

    if(res.status === 201){
        alert("Reserva feita!");
        window.location.href = "reservas.html"
        return true;
    } else {
        alert('Ops! Houve um erro');
    }
    } catch(erro){
        console.log(erro);
    }    
}

function update(){
    const id = selectQuarto.value;
    const suite = {
        codigo_status: 4
    }
    axios.put(`http://localhost:8000/suites/nome/${id}`, suite)
    .then(response =>  {
        window.location.href = "reservas.html"
    })
    .catch(error => console.log(error));
}
