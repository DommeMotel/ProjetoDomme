const btnAbrirPopup = document.querySelector("#btn-excluir");
const popupCancelar = document.querySelector("#dialog-cancelar");
const btDesativarQuarto = document.querySelector("#cancelarQuarto");
const btAtivarQuarto = document.querySelector("#ativarQuarto");
const inputAtivarCancelar = document.querySelector("#ativaedesativa");
const closeDialog = document.querySelector("#exit")

btnAbrirPopup.onclick = () =>{
    popupCancelar.showModal();
}

closeDialog.onclick = ()=>{
    popupCancelar.close();
};


btDesativarQuarto.addEventListener('click', (e)=>{
    e.preventDefault();
    CancelaCliente();
    
});

btAtivarQuarto.addEventListener('click', (e)=>{
    e.preventDefault();
    AtivarCliente();
})

function CancelaCliente(){
    const id = inputAtivarCancelar.value;
    const statusCancelado = {
        codigo_status: 10
    }
    axios.put(`http://localhost:8000/suites/cancelar/${id}`, statusCancelado)
    .then(response =>  {
        alert("Suíte Desativada");
        window.location.href = "quartos.html"
    })
    .catch(error => console.log(error));
};

function AtivarCliente(){
    const id = inputAtivarCancelar.value;
    const statusAtivo = {
        codigo_status: 1
    }
    axios.put(`http://localhost:8000/suites/cancelar/${id}`, statusAtivo)
    .then(response =>  {
        alert("Suíte Ativado");
        window.location.href = "quartos.html"
    })
    .catch(error => console.log(error));
}

