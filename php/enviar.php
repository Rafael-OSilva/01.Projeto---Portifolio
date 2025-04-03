<?php
header('Content-Type: application/json');

// Configurações básicas
$response = [
    'success' => false,
    'message' => 'Mensagem não enviada',
    'errors' => []
];

// Verifica se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método não permitido';
    echo json_encode($response);
    exit;
}

// Sanitiza os dados
$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING) ?? '';
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? '';
$telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING) ?? '';
$assunto = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_STRING) ?? '';
$mensagem = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_STRING) ?? '';

// Validações
if (empty($nome)) {
    $response['errors']['nome'] = 'Por favor, informe seu nome';
}

if (empty($email)) {
    $response['errors']['email'] = 'Por favor, informe seu e-mail';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['errors']['email'] = 'E-mail inválido';
}

if (empty($mensagem)) {
    $response['errors']['mensagem'] = 'Por favor, escreva sua mensagem';
}

// Se houver erros, retorna
if (!empty($response['errors'])) {
    $response['message'] = 'Por favor, corrija os erros';
    echo json_encode($response);
    exit;
}

// Configurações do e-mail
$to = 'rafinha101419.silva@gmail.com';
$subject = 'Contato do Portfólio: ' . ($assunto ?: 'Sem assunto');
$headers = "From: $nome <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Corpo do e-mail em HTML
$emailContent = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0028FF; color: white; padding: 15px 20px; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Novo contato do seu portfólio</h2>
        </div>
        <div class='content'>
            <p><strong>Nome:</strong> $nome</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Telefone:</strong> " . ($telefone ?: 'Não informado') . "</p>
            <p><strong>Assunto:</strong> " . ($assunto ?: 'Não especificado') . "</p>
            <p><strong>Mensagem:</strong></p>
            <p>" . nl2br($mensagem) . "</p>
        </div>
        <div class='footer'>
            Mensagem enviada em " . date('d/m/Y H:i:s') . "
        </div>
    </div>
</body>
</html>
";

// Envia o e-mail
$mailSent = mail($to, $subject, $emailContent, $headers);

if ($mailSent) {
    $response['success'] = true;
    $response['message'] = 'Mensagem enviada com sucesso!';
} else {
    $response['message'] = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.';
    error_log("Falha no envio de e-mail para: $to");
}

echo json_encode($response);
?>