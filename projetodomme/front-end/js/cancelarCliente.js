const btnAbrirPopup = document.querySelector("#btn-excluir-cliente");
const popupCancelar = document.querySelector("#dialog-cancelar");
const btCancelarCliente = document.querySelector("#cancelarCliente");
const btAtivarCliente = document.querySelector("#AtivarCliente");
const inputAtivarCancelar = document.querySelector("#ativaedesativa");
const closeDialog = document.querySelector("#exit")

btnAbrirPopup.onclick = () =>{
    popupCancelar.showModal();
}

closeDialog.onclick = ()=>{
    popupCancelar.close();
};

btCancelarCliente.addEventListener('click', (e)=>{
    e.preventDefault();
    CancelaCliente();
    
});

btAtivarCliente.addEventListener('click', (e)=>{
    e.preventDefault();
    AtivarCliente();
})

function CancelaCliente(){
    const id = inputAtivarCancelar.value;
    const statusCancelado = {
        codigo_status: 10
    }
    axios.put(`http://localhost:8000/clientes/cancelar/${id}`, statusCancelado)
    .then(response =>  {
        alert("Cliente Cancelado");
        window.location.href = "clientes.html"
    })
    .catch(error => console.log(error));
};

function AtivarCliente(){
    const id = inputAtivarCancelar.value;
    const statusAtivo = {
        codigo_status: 8
    }
    axios.put(`http://localhost:8000/clientes/cancelar/${id}`, statusAtivo)
    .then(response =>  {
        alert("Cliente Ativado");
        window.location.href = "clientes.html"
    })
    .catch(error => console.log(error));
}

