const btnLogar = document.querySelector('#btn-login');
const form = document.querySelector('#form-login');

btnLogar.addEventListener('click', (event) => {
    event.preventDefault();

    const login = getDados(form);

    sendAPI(login);

    form.reset();
});


const getDados = (form) =>{
    let nomeFuncionario = form.loginFuncionario;
    let senha = form.senhaFuncionario;

    let login = {
        loginFuncionario: nomeFuncionario.value,
        senha: senha.value,
    };

    //codigo do quarto não pode ser nulo no banco porem não tem campo de preencher no html, defini como padrão 1 (analisar se precisa ser feita alguma alteração)

    return login;
};


async function sendAPI(login){
    try{
        const res = await fetch('http://localhost:8000/login/logando', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
        });

        if(res.status === 200){
            alert('Login cadastrado');
            window.location.href = "home.html"
        } else { 
            alert('Usuário não existe');
        };
    } catch(erro){
        console.log(erro);
    };
};