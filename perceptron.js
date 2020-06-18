const teta = 0.2
const alpha = 1

const pesoPadrao = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

const copiarPesoPadrao = () => [...pesoPadrao]

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
]

// 10 16

// console.log(pesos.length)

const zero = [
  0, 1, 0,
  1, 0, 1,
  1, 0, 1,
  1, 0, 1,
  0, 1, 0,
  // fixo
  1
]

const um = [
  0, 1, 0,
  1, 1, 0,
  0, 1, 0,
  0, 1, 0,
  1, 1, 1,
  // fixo
  1
]

const dois = [
  0, 1, 0,
  1, 0, 1,
  0, 0, 1,
  0, 1, 0,
  1, 1, 1,
  //fixo
  1
]

const tres = [
  1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  //fixo
  1
]

const quatro = [
  1, 0, 1,
  1, 0, 1,
  1, 1, 1,
  0, 0, 1,
  0, 0, 1,
  //fixo
  1
]

const cinco = [
  1, 1, 1,
  1, 0, 0,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  //fixo
  1
]

const seis = [
  1, 1, 1,
  1, 0, 0,
  1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  //fixo
  1
]

const sete = [
  1, 1, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  //fixo
  1
]

const oito = [
  1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  //fixo
  1
]

const nove = [
  1, 1, 1,
  1, 0, 1,
  1, 1, 1,
  0, 0, 1,
  1, 1, 1,
  //fixo
  1
]

const targets = [
  [1, 1, 1],
  [1, 1, -1],
  [1, -1, 1],
  [1, -1, -1],
  [-1, 1, 1],
  [-1, 1, -1],
  [-1, -1, -1],
  [1, 1, 0],
  [1, -1, 0],
  [1, 0, 1],
]

const numeros = [
  zero,
  um,
  dois,
  tres,
  quatro,
  cinco,
  seis,
  sete,
  oito,
  nove
]

const getIndexPeso = (indexNumero, epocas) => {
  if (indexNumero === 0 && epocas === 1) {
    return indexNumero
  }

  if (indexNumero === 0 && epocas > 1) {
    return numeros.length - 1
  }

  return indexNumero - 1
}

const yent = (numero, indexNumero, epocas) => {
  const target = targets[indexNumero]

  const indexPeso = getIndexPeso(indexNumero, epocas)


  // console.log(`Numero ${indexNumero} IndexPeso ${indexPeso}`)

  return target.map((valorTarget, indexTarget) => {
    let result = 0

    numero.forEach((numeroValue, indexValorPeso) => {

      const peso = pesos[indexPeso][indexTarget][indexValorPeso]
      result += peso * numeroValue
    })

    return result
  })
}

const funcYent = (yents) => {
  return yents.map(valor => {
    if(valor > teta) return 1
    if(valor >= (teta * -1) || valor <= teta) return 0
    if(valor < (teta * -1)) return -1
  })
}

// const resultFuncYent = funcYent(yent(zero))
// X[10][16] T[10][3]
const variacaoPeso = () => {
  return alpha
}

// yents.lenght === numero de neuronios que nós temos
// então precisamos atualizar os pesos de cada neuronio
const atualizarPesosDoNumero = ({ numero, indexNumero, yents, epocas }) => {
  // [true, false, true]
  const atualizados = yents.map((valorFYent, indexYent) => {
    let atualizou = false

    const valorTarget = targets[indexNumero][indexYent]

    numero.forEach((valorNumero, indexValorNumero) => {
      //  1 * (1 - 0) * valorNumero -> 1 * numero
      const variacao = alpha * (valorTarget - valorFYent) * valorNumero

      const indexPesoAntigo = getIndexPeso(indexNumero, epocas)

      const pesoAntigo = pesos[indexPesoAntigo][indexYent][indexValorNumero]

      const novoPeso = pesoAntigo + variacao

      pesos[indexNumero][indexYent][indexValorNumero] = pesoAntigo + variacao

      if (pesoAntigo !== novoPeso) atualizou = true
    })

    return atualizou
  })

  // true se algum neuronio atualizou
  return atualizados.some(neuronioAtualizou => !!neuronioAtualizou)
}

const verificarSaidasComTarget = (primeiroArray, segundoArray) => {
    console.log(primeiroArray, segundoArray)
    return primeiroArray.every((elemento, index) => elemento === segundoArray[index])
}

const run = () => {
  let atualizou = true
  let epocas = 1

  let linha = 0

  do {
    linha = 0
    console.log(`Epoca atual: `, epocas)
    // index é a linha de entrada da tabela principal
    numeros.forEach((numero, index) => {
      atualizou = false
      // [0, 0, 0,] um para cada neuronio
      const yents = yent(numero, index, epocas)

      const funcYents = funcYent(yents)

      const saidasSaoIguais = verificarSaidasComTarget(funcYents, targets[index])

      if (!saidasSaoIguais) {
        atualizou = true
        atualizarPesosDoNumero({
          numero,
          epocas,
          indexNumero: index,
          yents: funcYents
        })
      }
    })

    // remover isso aqui, deixei para garantir
    // que nao vai ser infinito
    if (epocas === 100) atualizou = false
    epocas += 1
  } while(atualizou === true)
}

run()
