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

    $('.fechar-carrinho').click(function () {
        let idParaOcultar = $(this).closest('[id]').attr("id");

        if (idParaOcultar) {
            $("#" + idParaOcultar).hide();
        }
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

    $('.adicionar-carrinho').click(function () {
        guardaInfoProdutoAdd();
        $('.numero-produtos').text(somaQtdContadorTudo() == 1 ? somaQtdContadorTudo() + " item" : somaQtdContadorTudo() + " itens");
        $('#card-produto').hide();
        $('.total-pedido').text(somaTotalTudo());
        $('#fechar-pedido').show();
    });

    $('#fechar-pedido').click(function () {
        verificaProdutosAdd();
        $('.total-pedido').text(somaTotalTudo().toLocaleString('pt-br', { minimumFractionDigits: 2 }));
        $('#carrinho').show();
    });

    function convertePrecoProduto(card) {
        let valor = card.find('.preco').text();
        precoProdutoTemp = parseFloat(valor.replace(',', '.')); // transforma a virgula em ponto, e depois converte a string em float;
    };

    function calculatotalPedidoTemp() {
        totalPedidoTemp = contadorProdutoTemp * precoProdutoTemp;
        $('.total-produto').text(totalPedidoTemp);
    };

    function verificaContadorProduto() {
        contadorProdutoTemp = parseInt($('.contador-produto').text());
    };

    function resetaContadorProduto() {
        $('.contador-produto').text(1);
        contadorProdutoTemp = 1;
    };

    function preencheNomeDescricao(card) {
        nomeProdutoTemp = $(card).find('h4').text();
        $('.nome-item').text(nomeProdutoTemp);

        descricaoProdutoTemp = $(card).find('p').text();
        $('.descricao-item').text(descricaoProdutoTemp);
    };

    function guardaInfoProdutoAdd() {
        produtoAdicionadoCarrinho[produtoAdicionadoCarrinho.length] = {
            nomeProduto: nomeProdutoTemp,
            descricaoProduto: descricaoProdutoTemp,
            precoProduto: precoProdutoTemp,
            totalPedidoProduto: totalPedidoTemp,
            contadorProduto: contadorProdutoTemp
        };
    };

    function somaTotalTudo() {
        let soma = 0;
        for (let i = 0; i < produtoAdicionadoCarrinho.length; i++) {
            soma += produtoAdicionadoCarrinho[i].totalPedidoProduto;
        }
        soma = soma.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        return soma;
    };

    function somaQtdContadorTudo() {
        let soma = 0;
        for (let i = 0; i < produtoAdicionadoCarrinho.length; i++) {
            soma += produtoAdicionadoCarrinho[i].contadorProduto;
        }
        return soma;
    };

    function verificaProdutosAdd() {
        let htmlContent = ''; // Inicializa uma string vazia para acumular o conteúdo HTML
    
        for (let i = 0; i < produtoAdicionadoCarrinho.length; i++) {
            htmlContent += preencheProdutosAdd(produtoAdicionadoCarrinho[i]);
        }
    
        $('.lista-produtos-carrinho').html(htmlContent); // Define o conteúdo HTML uma vez após o loop
    };
    
    function preencheProdutosAdd(produto) {
        return '<div class="space-between"><span> ' +
            produto.contadorProduto + 'x  •  ' +
            produto.nomeProduto +
            '</span> ' +
            '<span> ' +
            (produto.contadorProduto * produto.precoProduto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) +
            '<img id="opcoes-carrinho" alt="tres-pontos">' +
            '</span></div> ';
    };

});

//.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) formata para brl com R$
//.toLocaleString('pt-br', { minimumFractionDigits: 2 }); formata para brl sem R$
