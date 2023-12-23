var card = {};
var numeroCliente = 0;
var nomeCliente = "";
var enderecoCliente = "";
var precoProdutoTemp = 0;
var nomeProdutoTemp = "";
var descricaoProdutoTemp = "";
var totalPedidoTemp = 0;
var contadorProdutoTemp = 0;
var produtoAdicionadoCarrinho = [];
$(document).ready(function () {
    $('.card').click(function () {
        resetaContadorProduto();
        card = $(this);
        preencheNomeDescricao(card); // pega o titulo e a descricao do produto clicado e preenche o card
        convertePrecoProduto(card); //pega o preco e converte para float e armazena na variavel global precoProduto
        $('.preco-item').text(precoProdutoTemp);  // preenche o preco da unidade do produto 
        calculatotalPedidoTemp(); // calcula e preenche o total do pedido
        $('#card-produto').show();
    });

    $('.icone-fechar').click(function () {
        $('#card-produto').hide();
    });

    $('.mais').click(function () {
        verificaContadorProduto();
        contadorProdutoTemp++;
        $('.contador-produto').text(contadorProdutoTemp);
        calculatotalPedidoTemp();
    });

    $('.menos').click(function () {
        verificaContadorProduto();
        if (contadorProdutoTemp > 1) {
            contadorProdutoTemp--;
            $('.contador-produto').text(contadorProdutoTemp);
            calculatotalPedidoTemp();
        }
    });
    const arr = undefined;

    // Providing an empty array fallback
    const arrLength = (arr ?? []).length;

    console.log(arrLength); // 0
    $('.adicionar-carrinho').click(function () {
        produtoAdicionadoCarrinho[produtoAdicionadoCarrinho.length] = {
            nomeProduto: nomeProdutoTemp,
            descricaoProduto: descricaoProdutoTemp,
            precoProduto: precoProdutoTemp,
            totalPedido: totalPedidoTemp,
            contadorProduto: contadorProdutoTemp
        };

        $('#card-produto').hide();
    });

    function convertePrecoProduto(card) {
        let valor = card.find('.preco').text();
        precoProdutoTemp = parseFloat(valor.replace(',', '.')); // transforma a virgula em ponto, e depois converte a string em float;
    };

    function calculatotalPedidoTemp() {
        totalPedidoTemp = contadorProdutoTemp * precoProdutoTemp;
        $('.total-pedido').text(totalPedidoTemp);
    };

    function verificaContadorProduto() {
        contadorProdutoTemp = parseInt($('.contador-produto').text());
    };

    function resetaContadorProduto() {
        $('.contador-produto').text(1);
        contadorProdutoTemp = 1;
    }

    function preencheNomeDescricao(card) {
        nomeProdutoTemp = $(card).find('h4').text();
        $('.nome-item').text(nomeProdutoTemp);

        descricaoProdutoTemp = $(card).find('p').text();
        $('.descricao-item').text(descricaoProdutoTemp);
    }

});
