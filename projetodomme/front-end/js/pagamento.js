const formPagamento = document.querySelector("form");
const btnPagamento = document.querySelector(".btn-pag");
const inputReserva = document.querySelector("#input-suite");

formPagamento.suite.addEventListener("blur", async (e)=>{
    e.preventDefault();

    showInfos(await getDados(formPagamento))
})

formPagamento.dano.addEventListener("blur", (e)=>{
    const valorH = formPagamento.valorH.value;
    const horas = formPagamento.horaTotal.value;
    const consumo = formPagamento.consumo.value;
    const dano = formPagamento.dano.value;

    const total = (parseInt(valorH) * parseInt(horas)) + parseInt(consumo) + parseInt(dano)

    formPagamento.total.value = `${total}`
})

async function getDados(form){
    const suite = form.suite.value;
    
    const res = await fetch(`http://localhost:8000/reservas/pagamento/${suite}`)
    
    if(res.status === 200){

        const infos = await res.json();

        return infos
    } else {
        alert("não encontrado")
    }
}

function showInfos(infos){
    
    infos.forEach(info =>{
        const saida = new Date();
        let entrada = new Date(info.DataEntrada);
        const diffInTime = new Date(saida - entrada);
        const diffDias = Math.abs(saida.getTime() - entrada.getTime());
        const tempoDia = 1000*60*60*24;
        const dias = diffDias/tempoDia

        formPagamento.periodo.value = info.periodo;
        formPagamento.valorH.value = info.vlHora;
        formPagamento.categoria.value = info.tpQuarto;
        formPagamento.entrada.value = `${entrada.getDate()}/${entrada.getMonth()+1}/${entrada.getFullYear()} ${entrada.getHours()}:${entrada.getMinutes()}:${entrada.getSeconds()}`;;
        formPagamento.saida.value = `${saida.getDate()}/${saida.getMonth()+1}/${saida.getFullYear()} ${saida.getHours()}:${saida.getMinutes()}:${saida.getSeconds()}`;
        formPagamento.qtdpessoas.value = info.quantidadePessoas;
        formPagamento.permanencia.value = `${dias.toFixed(0)}D ${diffInTime.getUTCHours()}H ${diffInTime.getUTCMinutes()}Min ${diffInTime.getUTCSeconds()}Sec`;

        const horasTotais = (dias*24)
        const horaAd = horasTotais - info.periodo;

        formPagamento.horaAd.value = horaAd.toFixed(0);
        formPagamento.horaTotal.value = horasTotais.toFixed(0);
        
    })
}

// formPagamento.saida.value = `${dataSaida.getDate()}/${dataSaida.getMonth()}/${dataSaida.getFullYear()} ${dataSaida.getHours()}:${dataSaida.getMinutes()}:${dataSaida.getSeconds()}`

//Finalizando pagamento

btnPagamento.addEventListener('click', (e)=>{
    e.preventDefault();

    console.log(coletarDados(formPagamento));
    fechamentoReserva();
})


function coletarDados(form){
    const DataSaida = form.saida.value;
    const vlConsumo = form.consumo.value;
    const vlDano = form.dano.value;
    const vlHoraAdicional = form.horaAd.value;
    const vlTotal = form.total.value;
    const codigo_pagamento = form.tppagamento.value;

    const fechamentoR = {
        DataSaida: DataSaida,
        vlConsumo: parseFloat(vlConsumo),   
        vlDano: parseFloat(vlDano),
        vlHoraAdicional: parseFloat(vlHoraAdicional),
        vlTotal: parseFloat(vlTotal),
        codigo_pagamento: parseInt(codigo_pagamento),
        codigo_status: 6
    }

    return fechamentoR;
}






function fechamentoReserva(){
    const id = inputReserva.value;
    axios.put(`http://localhost:8000/reservas/${id}`, coletarDados(formPagamento))
    .then(response =>  {
        alert("Reserva finalizada com sucesso");
        window.location.href = "reservas.html"
    })
    .catch(error => console.log(error));
}
