var numeroCliente = 0;
var nomeCliente = "";
var enderecoCliente = "";
var precoProduto = 0;
var totalPedido = 0;
var contadorProduto = 0;
$(document).ready(function () {
    $('#card-produto').hide();


    $('.card').click(function () {
        pegaPrecoProduto(this);
        contadorProduto();
        $('#card-produto').show();
    });
    $('.icone-fechar').click(function () {
        $('#card-produto').hide();
    });
    $('.mais').click(function () {
        contadorProduto++;
        $('.contador-produto').text(contadorProduto);
    });
    $('.menos').click(function () {
        contadorProduto--;
        $('.contador-produto').text(contadorProduto);
    });

    function pegaPrecoProduto(this) {
        precoProduto = $(this).find('.preco').text(); // pega o texto do preço do card clicado
        precoProduto = precoProduto.match(/\d+\,\d+/); // pega somente os números separados pela virgula
        precoProduto = parseFloat(precoProduto[0].replace(',', '.')); // transforma a virgula em ponto, e depois converte a string em float;
        $('.preco-item').text(precoProduto);  
    }
    
    function contadorProduto(){
        contadorProduto = parseInt($('.contador-produto').text());
        totalPedido = contadorProduto * precoProduto;
        $('.total-pedido').text(totalPedido);
    }
    

});
