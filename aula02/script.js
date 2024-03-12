function validaForm(){
    conteudo=document.getElementById("txtNumero").value;
    if(isNaN(conteudo) || conteudo < 1 || conteudo > 10){
       document.getElementById("info").innerHTML = "valor não permetido";
        return false;
    }else{
        return true;
    }
}


function calcular(){
    num1=document.getElementById("txtNumero1").value;
    num2=document.getElementById("txtNumero2").value;

   
    if(isNaN(num1) || isNaN(num2) || num1=="" || num2==""){
       document.getElementById("calcular").innerHTML = "valor não permetido";
        return false;
    }else{     
        // calculo= Number(num1) +Number(num2);
        calculo= parseFloat(num1)+parseFloat(num2);
        document.getElementById("calcular").innerHTML = calculo;
        return true;
    }
}