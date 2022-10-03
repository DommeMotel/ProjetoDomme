const btn = document.querySelector('#btn');
const input = document.querySelector('#pesq');
const form = document.querySelector('form')



btn.addEventListener('click', (event) => {
    event.preventDefault();

    if(input.value === ""){
        getQuartos();
    } else {
        getQuarto();
    }
    
    form.reset();
})

async function getQuarto(){
    let idSuite = input.value;

    const res = await fetch(`http://localhost:8000/suites/${idSuite}`);

    if(res.status === 200){
        const suite = await res.json();
        console.log(suite);
    } else {
        alert("Ops! não encontramos essa suíte");
    }
};

async function getQuartos(){
    const res = await fetch(`http://localhost:8000/suites`);
    const suite = await res.json();

    console.log(suite);
};

// async function getStatus(){
//     let status = input.value;

//     const res = await fetch(`http://localhost:8000/suites/status/${status}`);
//     const suite = await res.json();

//     console.log(suite);
// }