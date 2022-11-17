const btnPesq = document.querySelector("#btn-pesq");
const inputPesq = document.querySelector("#pesq");
const tabela = document.querySelector("#reservas");
const form = document.querySelector("#form-pesq")

const reservas = getReservas();
showReserva(reservas);

btnPesq.addEventListener('click', (e)=>{

    e.preventDefault();

    if(inputPesq.value === ""){

        const reservas = getReservas();
        showReserva(reservas);
    } else {

    const reserva = getReserva();
    showReserva(reserva);
    }
    
    form.reset();
});

async function getReserva(){
    try{
        const codigo = inputPesq.value;
        const URL = 'http://localhost:8000/reservas'
    
        const res = await fetch(`${URL}/${codigo}`);
    
        if(res.status === 200){
    
            const reservas = await res.json();
            return reservas
        } else {
            alert("Quarto não encontrado")
        }        
    } catch(erro){
        console.log(erro)
    }
};

async function getReservas(){
    try{
        const URL = 'http://localhost:8000/reservas'
        const res = await fetch(URL);
        const reservas = await res.json();
        console.log(reservas);
        if(res.status === 200){
            
            return reservas;
        } else {
            alert("não encontrado")
        }
    } catch(erro){
        console.log(erro)
    };
};

async function showReserva(reservas){
    tabela.textContent = "";

    const listaReservas = await reservas

    listaReservas.forEach(reserva => {

        const div = document.createElement('div');
        div.classList.add('reserva');

        const html = `

            <label for="codigoRes">Código reserva: </label>
            <input name="codigoRes" value="${reserva.codigo_reserva}" readonly>
        
            <label for="dtEnt">Data entrada: </label>
            <input name="dtEnt" value="${reserva.DataEntrada}" readonly>
        
            <label for="dtSaid">Data saída: </label>
            <input name="dtSaid" value="${reserva.DataSaida}" readonly>
        
            <label for="periodo">Periodo: </label>
            <input name="periodo" value="${reserva.periodo}" readonly>
        
            <label for="quantPess">Quantidade pessoas: </label>
            <input name="quantPess" value="${reserva.quantidadePessoas}" readonly>
        
            <label for="valorH">Valor hora: </label>
            <input name="valorH"  value="R$ ${reserva.vlHora}" readonly>
            
            <label for="valorC">Valor consumo: </label>
            <input name="valorC"  value="R$ ${reserva.vlConsumo}" readonly>

            <label for="valorD">Valor dano: </label>
            <input name="valorD"  value="R$ ${reserva.vlDano}" readonly>
            
            <label for="valorHAd">Valor hora adicional: </label>
            <input name="valorHAd"  value="R$ ${reserva.vlHoraAdicional}" readonly>

            <label for="valorT">Valor total: </label>
            <input name="valorT"  value="R$ ${reserva.vlTotal}" readonly>

            <label for="idCliente">CPF cliente: </label>
            <input name="idCliente"  value="${reserva.cpf}" readonly>

            <label for="idSuite">Suite: </label>
            <input name="idSuite"  value="${reserva.tpQuarto}" readonly>

            <label for="idPag">Tipo pagamento: </label>
            <input name="idPag"  value="${reserva.tpPagamento}" readonly>

            <label for="status">Status: </label>
            <input name="status"  value="${reserva.nmStatus}" readonly>
        `

        div.innerHTML += html;

        tabela.appendChild(div);
    })
}