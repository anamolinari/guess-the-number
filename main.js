// Declaração de variáveis
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let contagemPalpite = 1;
let palpiteTeclado = '';
let limiteAtingido = false;
console.log(numeroAleatorio);

const palpites = document.querySelector('.palpites');
const baixoOuAlto = document.querySelector('.baixoOuAlto');
const campoPalpite = document.querySelector('.form__guess');
const enviarPalpite = document.querySelector('.button_enter');
const teclas = document.querySelectorAll('.button_teclado');
const tecladoVirtual = document.querySelector('.teclado_virtual');

// Funções 
function efeitoCliqueBotao(botao) {
    botao.classList.add('pressionado');
    campoPalpite.value += botao.textContent;
    setTimeout(() => botao.classList.remove('pressionado'), 100);
}

function verificarPalpite() {
    const palpiteUsuario = Number(campoPalpite.value);
    
    if (campoPalpite.value === '') {
        return;
    }
    
    campoPalpite.value = '';

    if (contagemPalpite > 1) {
        palpites.insertAdjacentHTML('beforeend', '<span class="hifen"> - </span>');
    } else {
        palpites.textContent = '';
    }

    if (palpiteUsuario < 1 || palpiteUsuario > 100) {
        campoPalpite.setAttribute('placeholder', 'enter a number between 1-100');
        campoPalpite.classList.add('invalid-input');
        baixoOuAlto.style.opacity = '0.24';
        return;
    } else {
        campoPalpite.removeAttribute('placeholder');
        campoPalpite.classList.remove('invalid-input');
        baixoOuAlto.style.opacity = '100';
    }

    if (palpiteUsuario === numeroAleatorio) {
        campoPalpite.disabled = true;
        baixoOuAlto.textContent = ''; 
        baixoOuAlto.style.display = 'none';
        const btnEnter = document.querySelector('.button_enter');
        btnEnter.classList.add('disabled', 'enabled');
        btnEnter.innerHTML = "Try again";  

        campoPalpite.placeholder = palpiteUsuario;
        campoPalpite.classList.add('winner');

        btnEnter.addEventListener('click', () => location.reload());

        const palpites = document.querySelector('.palpites');
        palpites.classList.add('disabled');
        palpites.textContent = "Nailed it!";
        return;

    } 


    if(palpiteUsuario < numeroAleatorio) {
        baixoOuAlto.textContent = 'Too low';
    } else if(palpiteUsuario > numeroAleatorio) {
        baixoOuAlto.textContent = 'Too high';
    }
    
    palpites.insertAdjacentHTML('beforeend', '<span>' + palpiteUsuario + '</span>');

    if (contagemPalpite >= 5) {
        campoPalpite.disabled = true;
        limiteAtingido = true;

        const botoes = document.querySelectorAll('.button_teclado:not(.excluir-opacidade)');
        botoes.forEach(b => b.style.opacity = '0.24');
        baixoOuAlto.style.opacity = '0.24';
    
        const btnEnter = document.querySelector('.button_enter');
        btnEnter.classList.add('disabled', 'enabled');
        btnEnter.innerHTML = "Try again";
    
        const inputGuess = document.querySelector('#form__guess');
        inputGuess.setAttribute('placeholder', 'You ran out of guesses');
        inputGuess.classList.add('limite-atingido');
    
        btnEnter.addEventListener('click', function() {
            location.reload();
          });
        return;
    } 

    contagemPalpite++;
    campoPalpite.value = '';
    campoPalpite.focus();
}

function manterFoco() {
    campoPalpite.focus();
}

// Event listeners 
teclas.forEach(botao => botao.addEventListener('click', () => {
    if (!limiteAtingido) {
        efeitoCliqueBotao(botao);
    }
}));
  
document.addEventListener('keydown', event => {
    const teclaPressionada = event.key;
    const botaoCorrespondente = document.querySelector(`.button_teclado[value="${teclaPressionada}"]`);
    if (teclaPressionada === 'e') {
        event.preventDefault();
        return;
    }
    botaoCorrespondente ? (
      botaoCorrespondente.classList.add('pressionado'),
      palpiteTeclado += teclaPressionada,
      manterFoco(),
      setTimeout(() => botaoCorrespondente.classList.remove('pressionado'), 100)
    ) : null;
});
  
document.addEventListener('keypress', e => {
    e.key === 'Enter' && document.querySelector('#button_enter').click();
});

enviarPalpite.addEventListener('click', verificarPalpite);

window.addEventListener('load', manterFoco);

