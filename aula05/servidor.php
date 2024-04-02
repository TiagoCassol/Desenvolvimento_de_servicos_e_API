<?php

    header("Content-type: aplication/json");

    if(isset($_REQUEST["buscar"])){
        try{
            $conn = mysqli_connect("localhost","root","","loja");
            if($conn){
                $result = mysqli_query($conn, "Select * from produto");
                $linhas = array();
                while($row = mysqli_fetch_assoc($result)){
                    $linhas[] = $row;
                }
                mysqli_close($conn);
    
                echo '("produtos" : '.json_encode($linhas).')';
            }else{
                echo'{"resposta":"Erro ao conectar com o banco de dados"}';
            }
        }catch(\throwble $th){
            echo'{"resposta":"Erro ao concsultar o banco de dados"}';
        }

    }