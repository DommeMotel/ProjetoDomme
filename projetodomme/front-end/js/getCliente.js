const btn = document.querySelector('#btn');
const input = document.querySelector('#pesq');
const form = document.querySelector('form');
const tabela = document.querySelector('#clientes')

getClientes();

btn.addEventListener('click', (event) => {
    event.preventDefault();

    if (input.value === "") {
        // método que retorna todos os clientes
        getClientes();

    } else {
        //método que retorna cliente por cpf
        getCliente();
    };

    form.reset();
});

async function getCliente(){
    const id = input.value;
    const url = 'http://localhost:8000/clientes'

    const res = await fetch(`${url}/${id}`);

    if(res.status === 200){
        const clientes = await res.json();
        html(clientes);
    } else {
        alert("Não encontramos esse cliente")
    };
};

async function getClientes(){
    const url = 'http://localhost:8000/clientes';
    const res = await fetch(url);
    
    const suites = await res.json();

    html(suites)
}

function html(listaClientes){
    tabela.textContent = "";

    listaClientes.forEach(cliente => {
        
        const div = document.createElement('div')
        div.classList.add('cliente');

        const clienteFormat = cliente.nmCliente.split(' ').splice(0, 2).join(' ');

        const html = `
        

            <label for="nome">Nome</label>
            <input name="nome" value="${clienteFormat}" readonly>

            <label for="cpf">CPF</label>
            <input name="nome" value="${cliente.CPF}" readonly>

            <label for="dtNasc">Dt Nasc</label>
            <input name="dtNasc" value="${cliente.dtNascimento}" readonly>

            <label for="sexo">Sexo</label>
            <input name="sexo" value="${cliente.sexo}" readonly>

            <label for="CEP">CEP</label>
            <input name="CEP" value="${cliente.cep}" readonly>

            <label for="tel">Tel</label>
            <input name="tel" value="${cliente.nrTelefone}" readonly>

            <label for="tel">Status</label>
            <input name="tel" value="${cliente.nmStatus}" readonly>
        `

        div.innerHTML += html;

        tabela.appendChild(div);
    });
}


// async function getCliente(cpfCliente) {

//     const res = await fetch(`http://localhost:8000/clientes/${cpfCliente}`);

//     if (res.status != 200) {

//         alert("Ops! não encontramos o cliente");

//     } else {

//         const cliente = await res.json();
//         console.log(cliente);
//     };
// };

// async function getClientes() {
//     const res = await fetch(`http://localhost:8000/clientes`);
//     const clientes = await res.json();
//     exibicaoClientes(clientes);

//     const btnInfos = document.querySelector('.btn-infos');
//     const divInfos = document.querySelector('.info-gerais');
//     btnInfos.addEventListener('click', (e) => {
//         e.preventDefault();
//         console.log('OI');
//         if(divInfos.style.display === 'block'){
//             divInfos.style.display = 'none';
//         } else{
//             divInfos.style.display = 'block';
//         }
//     });

//     console.log(clientes);
// };


// function exibicaoClientes(listaClientes) {
//     listaClientes.forEach(cliente => {
//         criaElemento(cliente);
//     });
// };

// function criaElemento(item) {
//     const infoCliente = document.createElement('li');
//     infoCliente.classList.add("item");

//     //idCliente
//     const idcliente = document.createElement('strong');
//     idcliente.innerHTML = item.codigo_cliente;
//     idcliente.dataset.codigo_cliente = item.CPF
//     infoCliente.appendChild(idcliente);

//     //nomeCliente
//     const nome = document.createElement('p');
//     nome.innerHTML += item.nmCliente.split(' ').slice(0, 2).join(' ');
//     infoCliente.appendChild(nome);

//     //CPF
//     const numeroCPF = document.createElement('p');
//     numeroCPF.innerHTML += item.CPF;
//     infoCliente.appendChild(numeroCPF);

//     //DtNascimento
//     const dtNascimentoCliente = document.createElement('p');
//     dtNascimentoCliente.innerHTML += item.dtNascimento;
//     infoCliente.appendChild(dtNascimentoCliente);

//     const nrTelefoneC = document.createElement('p');
//     nrTelefoneC.innerHTML += item.nrTelefone;
//     infoCliente.appendChild(nrTelefoneC);

//     infoCliente.appendChild(botaoInformação(item.CPF))

//     const blocoInfo = document.createElement('div');
//     blocoInfo.classList.add('info-gerais');
//     blocoInfo.innerHTML += item.nmCliente;


//     lista.appendChild(infoCliente);
//     lista.appendChild(blocoInfo);
// };


// function botaoInformação(id) {
//     const elementoBotao = document.createElement("button");
//     elementoBotao.classList.add('btn-infos');
//     elementoBotao.innerHTML = '<strong> i </strong>';

//     elementoBotao.addEventListener('click', function () {
//         getCliente(id);
//     })
//     return elementoBotao;
// }


