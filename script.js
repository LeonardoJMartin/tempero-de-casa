var numeroCliente = 0;
var nomeCliente = "";
var enderecoCliente = "";
var precoProduto = 0;
var nomeProduto = "";
var descricaoProduto = "";
var totalPedido = 0;
var contadorProduto = 0;
$(document).ready(function () {
    $('.card').click(function () {
        resetaContadorProduto();
        let preco = $(this).find('.preco').text(); // pega o texto do preço do card clicado
        nomeProduto = $(this).find('h4').text();
        descricaoProduto = $(this).find('p').text();
        preencheNomeDescricao();
        convertePrecoProduto(preco); // converte esse preco para float e armazena na variavel global precoProduto
        $('.preco-item').text(precoProduto);  // preenche o preco da unidade do produto 
        calculaTotalPedido(); // calcula e preenche o total do pedido
        $('#card-produto').show();
    });
    $('.icone-fechar').click(function () {
        $('#card-produto').hide();
    });
    $('.mais').click(function () {
        verificaContadorProduto();
        contadorProduto++;
        $('.contador-produto').text(contadorProduto);
        calculaTotalPedido();
    });
    $('.menos').click(function () {
        verificaContadorProduto();
        if(contadorProduto > 1){
            contadorProduto--;
            $('.contador-produto').text(contadorProduto);
            calculaTotalPedido();
        }
    });

    function convertePrecoProduto(valor) {
        precoProduto = parseFloat(valor.replace(',', '.')); // transforma a virgula em ponto, e depois converte a string em float;
    };
    
    function calculaTotalPedido(){
        totalPedido = contadorProduto * precoProduto;
        $('.total-pedido').text(totalPedido);
    };
    
    function verificaContadorProduto(){
        contadorProduto = parseInt($('.contador-produto').text());
    };

    function resetaContadorProduto(){
        $('.contador-produto').text(1);
        contadorProduto = 1;
    }
    
    function preencheNomeDescricao(){
        $('.nome-item').text(nomeProduto);
        $('.descricao-item').text(descricaoProduto);
    }

});
