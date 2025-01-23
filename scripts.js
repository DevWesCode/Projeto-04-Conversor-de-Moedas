

// Constantes criadas para selecionar os selects no HTML/DOM 
const moedaOrigem = document.getElementById('moedaOrigem');
const moedaDestino = document.getElementById('moedaDestino');
const imagemOrigem = document.getElementById('imagemOrigem');
const imagemDestino = document.getElementById('imagemDestino');
const moedaOrigemNome = document.getElementById('moedaOrigemNome');
const moedaDestinoNome = document.getElementById('moedaDestinoNome');
const convertButton = document.getElementById("convert-button");
const valoresConvertidos = document.querySelectorAll('.valorConvert');
const inputValor = document.getElementById('valor');

// Constante criada para mapear as imagens do assets e nomear as moedas/siglas
const moedas = {
    usd: { imagem: './assets/usd.png', nome: 'Dólar', sigla: 'USD' },
    eur: { imagem: './assets/eur.png', nome: 'Euro', sigla: 'EUR' },
    gbp: { imagem: './assets/gbp.png', nome: 'Libra', sigla: 'GBP' },
    brl: { imagem: './assets/brl.png', nome: 'Real', sigla: 'BRL' },
    btc: { imagem: './assets/btc.png', nome: 'Bitcoin', sigla: 'BTC' }
};

// Constante criada para dar valores "fictícios" para as moedas
const taxasDeCambio = {
    usd: { usd: 1, eur: 1.04, gbp: 1.23, btc: 0.000096, brl: 6.03 },
    eur: { usd: 1.04, eur: 1, gbp: 0.85, btc: 0.000099, brl: 6.27 },
    gbp: { usd: 1.23, eur: 1.18, gbp: 1, btc: 0.000012, brl: 7.42 },
    brl: { usd: 0.16, eur: 0.15, gbp: 0.13, btc: 0.0000016, brl: 1 },
    btc: { usd: 104382, eur: 100600, gbp: 85000, btc: 1, brl: 621690 }
};

// Função para formatar números com separador de milhar e vírgula para decimal
function formatarNumero(num) {
    return num.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Atualiza as imagens e os nomes das moedas selecionadas
function atualizarImagens() {
    const origem = moedaOrigem.value;
    const destino = moedaDestino.value;

    imagemOrigem.src = moedas[origem].imagem;
    moedaOrigemNome.textContent = moedas[origem].nome;
    imagemDestino.src = moedas[destino].imagem;
    moedaDestinoNome.textContent = moedas[destino].nome;
}

// Função criada para convertee o valor digitado para a moeda de destino
function convertValues() {
    let valor = inputValor.value;
    valor = parseFloat(valor);

    const origem = moedaOrigem.value;
    const destino = moedaDestino.value;

    console.log("Valor inserido: ", valor);
    console.log("Moeda de origem selecionada: ", moedas[origem].nome);
    console.log("Moeda de destino selecionada: ", moedas[destino].nome);
    
    // Criando log de erro
    if (isNaN(valor) || valor <= 0) {
        console.log("Valor inválido");
        valoresConvertidos[0].textContent = "Valor inválido";
        valoresConvertidos[1].textContent = "Valor inválido";
        return;
    }

    const taxa = taxasDeCambio[origem][destino]; // Obtém a taxa de câmbio
    console.log("Taxa de câmbio de", moedas[origem].sigla, "para", moedas[destino].sigla, ":", taxa);

    const valorFinal = valor * taxa; // Faz a conversão
    const valorFinalFormatado = formatarNumero(valorFinal); // Aplica a formatação ao valor convertido

    console.log(`Valor convertido: ${valor} ${moedas[origem].sigla} = ${valorFinalFormatado} ${moedas[destino].sigla}`);

    valoresConvertidos[0].textContent = `${moedas[origem].sigla} ${formatarNumero(valor)}`; // Mostra o valor digitado
    valoresConvertidos[1].textContent = `${moedas[destino].sigla} ${valorFinalFormatado}`; // Mostra o valor convertido
}

// Formatar o valor ao digitar
inputValor.addEventListener('input', function () {
    let valor = inputValor.value;
});

// Adiciona eventos de mudança para atualizar as imagens
moedaOrigem.addEventListener('change', atualizarImagens);
moedaDestino.addEventListener('change', atualizarImagens);

// Garante que as imagens apareçam corretamente no carregamento
atualizarImagens();

// Adiciona o evento de clique como botão do mouse para converter
convertButton.addEventListener("click", convertValues);

// Adiciona evento de tecla ao precionar o Enter para converter o valor
inputValor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        convertValues();
    }
});
