const btnNovaReserva = document.querySelector("#btn-nova-reserva");
const btnCancelar = document.querySelector("#btn-cancelar")
const popup = document.querySelector("dialog");

btnNovaReserva.onclick = ()=>{
    popup.showModal();
}

btnCancelar.onclick = ()=>{
    popup.close();
}

