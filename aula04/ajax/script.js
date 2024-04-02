$(document).ready(function() {
    $('#verContato').click(function() {
        // Realiza a requisição AJAX
        $.ajax({
            url: 'contato.php', // URL do arquivo PHP que irá processar a requisição
            type: 'GET',
            dataType: 'json', // Espera receber um JSON como resposta
            success: function(data) {
                // Verifica se os dados foram retornados corretamente
                if (data.success) {
                    // Exibe os dados do contato
                    $('#dadosContato').html('Nome: ' + data.nome + '<br>Email: ' + data.email);
                } else {
                    // Exibe uma mensagem de erro
                    $('#dadosContato').html('Erro ao buscar o contato.');
                }
            },
            error: function() {
                // Exibe uma mensagem de erro caso ocorra algum problema na requisição
                $('#dadosContato').html('Erro ao buscar o contato. Tente novamente.');
            }
        });
    });
});
