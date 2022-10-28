const btnAlt = document.querySelector('#btn-alterar');
const inputId = document.querySelector('#found-id')
const exit = document.querySelector('#cancelar');
const put = document.querySelector('#btnAlt-dialog')
const popup = document.querySelector('dialog');
const formularioBusca = document.querySelector('#popup-form');


btnAlt.onclick = () =>{
    popup.showModal();
};

exit.onclick = ()=>{
    popup.close();
};

inputId.addEventListener("blur", (e)=>{

    e.preventDefault()

    buscaId(formularioBusca);
});

put.addEventListener('click', (e)=>{
    e.preventDefault();

    const quarto = dados(formularioBusca);
    putQuarto(quarto);

});


async function buscaId(form){
    const id = inputId.value;

    const res = await fetch(`http://localhost:8000/suites/${id}`)
    const quartos = await res.json()

    quartos.forEach(quarto => {
        exibeQuarto(form, quarto);
    });
};

function exibeQuarto(form, quarto){
    form.newName.value = quarto.tituloQuarto
    form.newNumber.value = quarto.nrQuarto
    form.newCategory.value = quarto.tpQuarto
    form.newPrice.value = quarto.vlHoraQ
};

function dados(form){
    const titulo = form.newName.value;
    const numero = form.newNumber.value;
    const tipo = form.newCategory.value;
    const valor = form.newPrice.value

    const quarto = {
        tituloQuarto: titulo,
        nrQuarto: numero,
        tpQuarto: tipo,
        vlHoraQ: parseFloat(valor)
    }


    return quarto;
}

async function putQuarto(quarto){
    const id = inputId.value;
    const res = await fetch(`http://localhost:8000/suites/${id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quarto)
        });

        if(res.status === 200){
            alert('Quarto cadastrado com sucesso');
            window.location.href = "quartos.html"
        } else { 
            alert('Ops! Houve um erro');
        };
};