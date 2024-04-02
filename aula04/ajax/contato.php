<?php
// Simula um nome e e-mail do servidor (substitua esses valores pelos seus)
$nome = "Seu Nome";
$email = "seu.email@example.com";

// Monta o array de resposta
$response = array(
    'success' => true,
    'nome' => $nome,
    'email' => $email
);

// Retorna os dados em formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
