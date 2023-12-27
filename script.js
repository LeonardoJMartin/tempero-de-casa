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
    //EVENTOS
    $('.card').click(function () {
        card = $(this);
        controlaCard();
    });

    $('.fechar-carrinho').click(function () {
        let idParaOcultar = $(this).closest('[id]').attr("id");
        if (idParaOcultar) {
            $("#" + idParaOcultar).hide();
        }
    });

    $('.mais').click(function () {
        controlaBotaoMais();
    });

    $('.menos').click(function () {
        controlaBotaoMenos();
    });

    $('#adicionar-carrinho').click(function () {
        controlaAdicionarCarrinho();
    });

    $('#fechar-pedido').click(function () {
        controlaFecharPedido();
    });

    //CONTROLA OBJETOS
    function controlaCard() {
        resetaContadorProduto();
        preencheNomeDescricao(card); // pega o titulo e a descricao do produto clicado e preenche o card
        convertePrecoProduto(card); //pega o preco e converte para float e armazena na variavel global precoProduto
        $('.preco-item').text(precoProdutoTemp);  // preenche o preco da unidade do produto 
        calculatotalPedidoTemp(); // calcula e preenche o total do pedido
        $('#card-produto').show();
    };

    function controlaAdicionarCarrinho() {
        guardaInfoProdutoAdd();
        $('.numero-produtos').text(somaQtdContadorTudo() == 1 ? somaQtdContadorTudo() + " Item" : somaQtdContadorTudo() + " Itens");
        $('#card-produto').hide();
        $('.total-pedido').text(somaTotalTudo());
        $('#fechar-pedido').show();
    };

    function controlaFecharPedido() {
        verificaProdutosAdd();
        $('.total-pedido').text(somaTotalTudo().toLocaleString('pt-br', { minimumFractionDigits: 2 }));
        $('#carrinho').show();
    };

    function controlaBotaoMais() {
        verificaContadorProduto();
        contadorProdutoTemp++;
        $('.contador-produto').text(contadorProdutoTemp);
        calculatotalPedidoTemp();
    };

    function controlaBotaoMenos() {
        verificaContadorProduto();
        if (contadorProdutoTemp > 1) {
            contadorProdutoTemp--;
            $('.contador-produto').text(contadorProdutoTemp);
            calculatotalPedidoTemp();
        }
    };

    //FUNÇÕES AUXILIARES
    function convertePrecoProduto(card) {
        let valor = card.find('.preco').text();
        precoProdutoTemp = parseFloat(valor.replace(',', '.')); // transforma a virgula em ponto, e depois converte a string em float;
    };

    function calculatotalPedidoTemp() {
        totalPedidoTemp = contadorProdutoTemp * precoProdutoTemp;
        $('.total-produto').text(totalPedidoTemp.toLocaleString('pt-br', { minimumFractionDigits: 2 }));
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

/*
siblings():
Descrição: Retorna todos os irmãos do elemento especificado.
Uso típico: Útil quando você precisa interagir com elementos que compartilham o mesmo pai.
Exemplo:
var siblings = $(element).siblings();

find():
Descrição: Retorna todos os descendentes que correspondem ao seletor especificado, dentro do conjunto de elementos.
Uso típico: Útil para buscar elementos específicos dentro de um elemento pai.
Exemplo:
var descendants = $(element).find('.classe-desejada');

closest():
Descrição: Retorna o ancestral mais próximo que corresponde ao seletor especificado.
Uso típico: Útil para navegar pela árvore do DOM e encontrar o ancestral mais próximo que atenda a determinados critérios.
Exemplo:
var closestAncestor = $(element).closest('.classe-desejada');

Em resumo, 
siblings() é usado para encontrar irmãos de um elemento, 
find() é usado para localizar descendentes dentro de um elemento, 
closest() é usado para encontrar o ancestral mais próximo que corresponde a um seletor específico. 

*/