const grid = document.querySelector('.grid');
const movimentos = document.querySelector('.movimentos');

const personagens = [
  'card-blossom',
  'card-bubbles',
  'card-buttercup',
  'card-him',
  'card-mayor',
  'card-mojo-jojo'
];

const createElement = (tag, className) => {
  const elemento = document.createElement(tag);
  elemento.className = className;

  return elemento;
}

let c1 = '';
let c2 = '';
let m = 0;
let c = 0;

const atualizarM = () => {
  movimentos.innerHTML = m;
}

const checarFinal = () => {
  const cartasDesativadas = document.querySelectorAll('carta-desativada');

  if (cartasDesativadas.length === 12) {
    alert(`Hallo Welt!`);
  }
}

const checarCartas = () => {
  const p1 = c1.getAttribute('data-carta');
  const p2 = c2.getAttribute('data-carta');

  if (p1 === p2) {
    c1.firstChild.classList.add('carta-desativada');
    c2.firstChild.classList.add('carta-desativada');

    c1 = '';
    c2 = '';

    checarFinal();

  } else {
    setTimeout(() => {
      c1.classList.remove('virar-carta');
      c2.classList.remove('virar-carta');

      c1 = '';
      c2 = '';
    }, 500);
  }
}

const virarCarta = ({ target }) => {
  if (target.parentNode.className.includes('virar-carta')) {
    return;
  }

  if (c1 === '') {
    target.parentNode.classList.add('virar-carta');
    c1 = target.parentNode;

    m++;

    atualizarM();

  } else if (c2 === '') {
    target.parentNode.classList.add('virar-carta');
    c2 = target.parentNode;

    m++;

    atualizarM();

    checarCartas();
  }

}

const criarCarta = (personagem) => {
  const carta = createElement('div', 'carta');
  const frente = createElement('div', 'lado frente');
  const verso = createElement('div', 'lado verso');

  frente.style.backgroundImage = `url('img/cards/${personagem}.png')`;

  carta.appendChild(frente);
  carta.appendChild(verso);

  carta.addEventListener('click', virarCarta);
  carta.setAttribute('data-carta', personagem);

  return carta;
}

const carregarJogo = () => {
  const duplicarCartas = [...personagens, ...personagens];

  const shuffledArray = duplicarCartas.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((personagem) => {
    const carta = criarCarta(personagem);
    grid.appendChild(carta);
  });
}

window.onload = () => {
  carregarJogo();
  atualizarM();
}