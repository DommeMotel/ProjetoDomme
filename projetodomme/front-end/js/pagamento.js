const formPagamento = document.querySelector("form");
const btnPagamento = document.querySelector(".btn-pag");

formPagamento.suite.addEventListener("blur", async (e)=>{
    e.preventDefault();

    showInfos(await getDados(formPagamento))
})

formPagamento.saida.addEventListener("blur", (e) =>{
    e.preventDefault();
    
});

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
        formPagamento.categoria.value = info.tpQuarto;
        formPagamento.entrada.value = info.DataEntrada;
        const end = new Date();

        let entrada = new Date(info.DataEntrada)
        console.log(entrada)
        
    })
}

// formPagamento.saida.value = ` ${dataSaida.getDate()}/${dataSaida.getMonth()}/${dataSaida.getFullYear()} ${dataSaida.getHours()}:${dataSaida.getMinutes()}:${dataSaida.getSeconds()}`