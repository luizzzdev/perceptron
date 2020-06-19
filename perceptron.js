const teta = 0.2;
const alpha = 1;

const pesoPadrao = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const copiarPesoPadrao = () => [...pesoPadrao];

const pesos = [
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
  [copiarPesoPadrao(), copiarPesoPadrao(), copiarPesoPadrao()],
];

// 10 16

// console.log(pesos.length)

const zero = [
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  0,
  1,
  0,
  1,
  0,
  // fixo
  1,
];

const um = [
  0,
  1,
  0,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  // fixo
  1,
];

const dois = [
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  1,
  1,
  //fixo
  1,
];

const tres = [
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  //fixo
  1,
];

const quatro = [
  1,
  0,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  //fixo
  1,
];

const cinco = [
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  //fixo
  1,
];

const seis = [
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  //fixo
  1,
];

const sete = [
  1,
  1,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  //fixo
  1,
];

const oito = [
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  //fixo
  1,
];

const nove = [
  1,
  1,
  1,
  1,
  0,
  1,
  1,
  1,
  1,
  0,
  0,
  1,
  1,
  1,
  1,
  //fixo
  1,
];

// const targets = [
//   [1, 1, 1],
//   [1, 1, -1],
//   [1, -1, 1],
//   [1, -1, -1],
//   [-1, 1, 1],
//   [-1, 1, -1],
//   [-1, -1, -1],
//   [1, 1, 0],
//   [1, -1, 0],
//   [1, 0, 1],
// ]

const neuronios = [
  {
    targets: [1, 1, 1, 1, -1, -1, -1, 1, 1, 1],
    pesos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    targets: [1, 1, -1, -1, 1, 1, -1, 1, -1, 0],
    pesos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    targets: [1, -1, 1, -1, 1, -1, -1, 0, 0, 1],
    pesos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

const numeros = [zero, um, dois, tres, quatro, cinco, seis, sete, oito, nove];

const calcularSoma = (numeros, pesos) => {
  let soma = 0;

  numeros.forEach((numero, index) => {
    soma += numero * pesos[index];

    // console.log(`Numero ${numero}  Peso ${pesos[index]}`)
  });

  return soma;
};

const calcularResultadoYent = (valor) => {
  if (valor > teta) return 1;
  if (valor >= teta * -1 || valor <= teta) return 0;
  if (valor < teta * -1) return -1;
};

const run = () => {
  let atualizou = true;
  let epocas = 1;

  let linha = 0;

  do {
    console.log('Epoca atual: ', epocas);

    atualizou = false;

    neuronios.forEach((neuronio) => {
      numeros.forEach((numero, index) => {
        const soma = calcularSoma(numero, neuronio.pesos);

        // console.log(`Soma ${soma}`)

        const resultadoYent = calcularResultadoYent(soma);

        const target = neuronio.targets[index];

        // console.log(`Target ${target}`)

        // console.log(`Resultado yent ${resultadoYent} Target ${target}`)

        if (resultadoYent !== target) {
          atualizou = true;
          const atualizarPesos = (target, resultadoYent, numero) => {
            numero.forEach((valorNumero, indexNumero) => {
              const variacao = alpha * (target - resultadoYent) * valorNumero;

              const pesoAntigo = neuronio.pesos[indexNumero];
              const pesoNovo = pesoAntigo + variacao;

              if (epocas > 1000000) {
                console.log(
                  `Target ${target} Variacao ${variacao} Peso antigo ${pesoAntigo} Peso novo ${pesoNovo}`
                );
              }

              neuronio.pesos[indexNumero] = pesoNovo;
            });
          };

          atualizarPesos(target, resultadoYent, numero);
        }
      });
    });

    // if (epocas === 10) atualizou = false
    epocas += 1;
  } while (atualizou === true);
};

run();
