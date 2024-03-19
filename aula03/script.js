function lerObjeto(){
    carro = {modelo: "Doblo", ano: "2006"};
    pessoa = {
        nome : "Maria",
        idade : 25 ,
        altura : 1.80 ,
        temFilhos : true,
        endereco : null,
        filhos : [
            {nome : "carlos", idade : 10},
            {nome:"Julia", idade : 8}
        ],
        formacao : [2006,2013,2017],
        veiculo: carro,
        imprimir : function(){
            texto = this.nome + " - idade: "+this.idade + " - Carro: " +this.veiculo.modelo;
            return texto;
        }
    };

    pObjeto = document.getElementById("pObjeto");
    pObjeto.innerHTML = pessoa.imprimir();
}

//contruir um objeto retangulo que possui os atributos largura e altura. este objeto devera ter um metodo que calcula a area dp retangulo.
//crie no html, dois campos para que o usuario preencha com os valores de altura e largura, crie um botão que mostre o resultado por usuario

function calcularArea(){
    num1=document.getElementById("txtNumero1").value;
    num2=document.getElementById("txtNumero2").value;

    retangulo = {
        altura: num1, 
        largura: num2,
        calcular : function(){
            area = parseFloat(this.altura) * parseFloat(this.largura);
            return area;
        }
    };

    pRetangulo = document.getElementById("pRetangulo");
    pRetangulo.innerHTML = retangulo.calcular();
    pRetangulo.style.background = "#ccc";
    pRetangulo.style.width = retangulo.largura + "px";
    pRetangulo.style.height = retangulo.altura + "px";
}

$(document).ready(function(){
    $("#minhaDiv").css("width", "200px");
    $("#minhaDiv").css("height", "200px");
    $("#minhaDiv").css("background-color", "#f0f" );
    $("#minhaDiv").css("color", "white" );
    $("#minhaDiv").html("<i> 01 </i>");
    //$("#minhaDiv").text("<i> 01 </i>");
  
        $("#minhaDiv").hide(3000, function(){
            alert("Div escondida");
        });
});

$("#btnAlterar").click(function(){
    // $("#minhaDiv").show(3000, function(){
    //     alert("Div aparecendo");
    // });
    $("#minhaDiv").toggle(3000);
});