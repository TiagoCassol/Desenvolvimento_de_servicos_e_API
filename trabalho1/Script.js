function adicionar() {
    const nome = document.getElementById("txtNome").value;
    const preco = document.getElementById("txtPreco").value;
    const qtd = document.getElementById("txtQuantidade").value;
    const categoria = document.getElementById("categoria").value;

    if (nome.length == 0) {
        alert("O campo nome é obrigatório!");
        return;
    }

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            alert(nome + " cadastrado com sucesso!");
            buscarProdutos();
        } else if (this.readyState == 4) {
            alert("Status: " + this.status + "\nResponse Text: " + this.responseText);
        }
    };

    ajax.open("POST", "http://localhost:8002/produtos", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("nome=" + nome + "&preco=" + preco + "&quantidade=" + qtd);
}

function buscarProdutos() {
    const tabela = document.getElementById("tblProdutos");
    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const obj = JSON.parse(this.responseText);
            tabela.innerHTML = ''; // Clear table before appending rows
            obj.forEach(prod => {
                const linha = tabela.insertRow(-1);
                linha.id = "p" + prod.id;

                const cellId = linha.insertCell(0);
                const cellNome = linha.insertCell(1);
                const cellPreco = linha.insertCell(2);
                const cellQtd = linha.insertCell(3);
                const cellExcluir = linha.insertCell(4);

                cellId.innerHTML = prod.id;
                cellNome.innerHTML = prod.nome;
                cellPreco.innerHTML = prod.preco;
                cellQtd.innerHTML = prod.quantidade;
                cellExcluir.innerHTML = "<button onclick='excluir(" + prod.id + ")'>Excluir</button>";
            });
        }
    };

    ajax.open("GET", "http://localhost:8002/produtos", true);
    ajax.send();
}

function excluir(idProd) {
    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 204) {
            buscarProdutos();
        } else if (this.readyState == 4) {
            alert("Status: " + this.status + "\nResponse Text: " + this.responseText);
        }
    };

    ajax.open("DELETE", "http://localhost:8002/produtos/" + idProd, true);
    ajax.send();
}