<?php

    header("Content-type: aplication/json");

    if( isset( $_REQUEST["buscar"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "lojaa");
            if( $conn ){
                $result = mysqli_query($conn, "SELECT * FROM produto");
                $linhas = array();
                while( $row = mysqli_fetch_assoc($result) ){
                    $linhas[] = $row;
                }
                mysqli_close($conn);

                echo '{ "produtos" : '.json_encode( $linhas ).' }';

            }else{
                echo '{ "resposta" : "Erro ao conectar com o Banco de dados" }';
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados" }';
        }
        
    }


    if( isset( $_REQUEST["excluir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "lojaa");
            if( $conn ){
                $id = $_GET["id"];
                mysqli_query($conn,"DELETE FROM produto WHERE id = $id");
                mysqli_close($conn);
                echo '{ "resposta" : "Produto Excluído com sucesso" }';
            }else{
                echo '{ "resposta" : "Erro ao conectar com o Banco de dados" }';
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados" }';
        }
        
    }

    if( isset( $_REQUEST["inserir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "lojaa");
            if( $conn ){
                $nome = $_POST["nome"];
                $preco = $_POST["preco"];
                $quantidade = $_POST["quantidade"];
                $codCategoria = $_POST["codCategoria"];
                
                $sql = "INSERT INTO produto (nome, preco, quantidade, codCategoria) VALUES ('$nome', $preco, $quantidade, $codCategoria)";
                
                if(mysqli_query($conn, $sql)){
                    mysqli_close($conn);
                    echo '{ "resposta" : "Produto Inserido com sucesso" }';
                }else{
                    echo '{ "resposta" : "Erro ao inserir produto" }';
                }
                
            }else{
                echo '{ "resposta" : "Erro ao conectar com o Banco de dados" }';
            }
        }catch(\Throwable $th){
            echo '{ "resposta" : "Erro ao consultar o Banco de dados" }';
        }
    }