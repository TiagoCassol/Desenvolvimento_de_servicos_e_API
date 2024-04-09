function lerDados(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            dados = JSON.parse( this.responseText );
            //console.log( dados );

            texto = "<b>Nome: </b>" + dados.nome +"<br>";
            texto += "<b>Idade: </b>" + dados.idade +"<br>";
            texto += "<b>Anos de Formação: </b>" + dados.anoFormacoes +"<br>";
            texto += "<b>Titulações: </b><br>";
            dados.graus.forEach( titulo => {
                texto += titulo + "<br>";
            } );
            texto += "<b>Filhos: </b><br>";
            dados.filhos.forEach( filho => {
                texto += filho.nome + " - " + filho.idade + " anos <br>";
            } );
            document.getElementById("divDados").innerHTML = texto;
        }
    };
    xhttp.open("GET" , "meuJson.json" , true);
    xhttp.send()

}

function lerProdutos(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            dados = JSON.parse( this.responseText );
            if( dados.resposta ){
                alert( dados.resposta );
            }else{

                tabela = "<table border='1'> ";
                tabela += "     <tr> ";
                tabela += "         <th>Código</th> ";
                tabela += "         <th>Nome</th> ";
                tabela += "         <th>Preço</th> ";
                tabela += "         <th>Quantidade</th> ";
                tabela += "         <th>CodCategoria</th> ";
                tabela += "         <th>Excluir</th> ";
                tabela += "         <th>Atualizar</th> ";
                tabela += "     </tr> ";
                dados.produtos.forEach( prod => {
                    tabela += "<tr>";
                    tabela += "     <td>"+prod.id+"</td>";
                    tabela += "     <td>"+prod.nome+"</td>";
                    tabela += "     <td>"+prod.preco+"</td>";
                    tabela += "     <td>"+prod.quantidade+"</td>";
                    tabela += "     <td>"+prod.codCategoria+"</td>";
                    tabela += "     <td><button onclick='excluir("+
                                        prod.id+ ")' >Excluir</button></td>";
                    tabela += "     <td><button onclick='atualizar("+
                    prod.id+ ")' >Atualizar</button></td>";
                    tabela += "</tr>";
                } );
                tabela += "</table>";
                document.getElementById("divProdutos").innerHTML = tabela;
            }
        }
    };
    xhttp.open("GET" , "servidor.php?buscar" , true);
    xhttp.send()
}

document.getElementById("formInserir").addEventListener("submit", function(event){
    event.preventDefault();
    inserir();
});

function excluir( id ){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            dados = JSON.parse( this.responseText );
            if( dados.resposta ){
                alert( dados.resposta );
                lerProdutos();
            }
        }
    };
    xhttp.open("GET" , "servidor.php?excluir&id="+id , true);
    xhttp.send();
}

function inserir(){
    var nome = document.getElementById("nome").value;
    var preco = document.getElementById("preco").value;
    var quantidade = document.getElementById("quantidade").value;
    var codCategoria = document.getElementById("codCategoria").value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            dados = JSON.parse( this.responseText );
            if( dados.resposta ){
                alert( dados.resposta );
                lerProdutos();
                document.getElementById("nome").value = "";
                document.getElementById("preco").value = "";
                document.getElementById("quantidade").value = "";
                document.getElementById("codCategoria").value = "";
            }
        }
    };
    xhttp.open("POST" , "servidor.php?inserir" , true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nome="+nome+"&preco="+preco+"&quantidade="+quantidade+"&codCategoria="+codCategoria);
}