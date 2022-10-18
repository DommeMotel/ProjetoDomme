let inputCep = document.querySelector('#input-cep');

inputCep.addEventListener("blur", (e) =>{
    e.preventDefault()

    viacep();
});


async function viacep(){

    let cep = inputCep.value;

    if(cep.length == 8){
        
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await res.json()
        if(endereco.hasOwnProperty('erro')){

            alert("CEP não encontrado");

        } else {
            
            preencheHTML(endereco);
        }
    } else {
        alert("CEP inválido")
    }

};

function preencheHTML(endereco){

    const inputRua = document.querySelector('#input-rua');
    const inputCidade = document.querySelector('#input-cid');

    inputCidade.value = endereco.localidade;
    inputRua.value = endereco.logradouro;
}