const btn = document.querySelector('#btn');
const input = document.querySelector('#pesq');
const form = document.querySelector('form')



btn.addEventListener('click', (event) => {
    event.preventDefault();
    
    if(input.value === ""){
        // método que retorna todos os clientes
        getClientes();

    } else {
        //método que retorna cliente por cpf
        getCliente();
    };

    form.reset();
});


async function getCliente(){

    let cpfCliente = input.value;
    const res = await fetch(`http://localhost:8000/clientes/${cpfCliente}`);

    if(res.status != 200){

        alert("Ops! não encontramos o cliente");

    } else {

        const cliente = await res.json();
        console.log(cliente);
    };
};

async function getClientes(){
    const res = await fetch(`http://localhost:8000/clientes`);
    const clientes = await res.json();

    console.log(clientes);
};