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

// Função para converter os valores utilizando a API, com .then()
function convertValues() {
    let valor = parseFloat(inputValor.value);
    const origem = moedaOrigem.value.toUpperCase(); // Deixa em maiúsculas
    const destino = moedaDestino.value.toUpperCase();

    if (isNaN(valor) || valor <= 0) {
        valoresConvertidos[0].textContent = "Valor inválido";
        valoresConvertidos[1].textContent = "Valor inválido";
        return;
    }

    // Monta a URL apenas com as moedas necessárias
    const url = `https://economia.awesomeapi.com.br/last/${origem}-${destino}`;

    // Faz a requisição com fetch e processa com .then()
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Dados da API:", data); // Debugging
            const parMoeda = `${origem}${destino}`; // Ex: "USDBRL"

            if (!data[parMoeda]) throw new Error("Par de moedas não encontrado");

            const taxa = parseFloat(data[parMoeda].bid);
            const valorFinal = valor * taxa;
            const valorFinalFormatado = formatarNumero(valorFinal);

            valoresConvertidos[0].textContent = `${moedas[origem.toLowerCase()].sigla} ${formatarNumero(valor)}`;
            valoresConvertidos[1].textContent = `${moedas[destino.toLowerCase()].sigla} ${valorFinalFormatado}`;
        })
        .catch(error => {
            console.error("Erro na conversão:", error);
            valoresConvertidos[1].textContent = "Erro na conversão";
        });
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

// Adiciona evento de tecla ao pressionar o Enter para converter o valor
inputValor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        convertValues();
    }
});
