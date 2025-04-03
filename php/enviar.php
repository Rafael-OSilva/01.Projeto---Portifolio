<?php
// Define o cabeçalho para retornar JSON
header('Content-Type: application/json');

// Configura a resposta padrão
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método não permitido';
    echo json_encode($response);
    exit;
}

// Sanitiza e valida os dados de entrada
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
$to = 'rafinha101419.silva@gmail.com'; // Seu e-mail
$subject = 'Contato do Portfólio: ' . ($assunto ?: 'Sem assunto');

// Cabeçalhos do e-mail
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0028FF; color: white; padding: 15px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #777; text-align: center; }
        .detalhe { margin-bottom: 10px; }
        .detalhe strong { display: inline-block; width: 80px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Novo contato do seu portfólio</h2>
        </div>
        <div class='content'>
            <div class='detalhe'><strong>Nome:</strong> $nome</div>
            <div class='detalhe'><strong>Email:</strong> $email</div>
            <div class='detalhe'><strong>Telefone:</strong> " . ($telefone ?: 'Não informado') . "</div>
            <div class='detalhe'><strong>Assunto:</strong> " . ($assunto ?: 'Não especificado') . "</div>
            <div class='detalhe'><strong>Mensagem:</strong></div>
            <p>" . nl2br($mensagem) . "</p>
        </div>
        <div class='footer'>
            Mensagem enviada em " . date('d/m/Y H:i:s') . " através do formulário de contato
        </div>
    </div>
</body>
</html>
";

// Versão texto simples para clientes de e-mail que não suportam HTML
$textContent = "Novo contato do portfólio:\n\n";
$textContent .= "Nome: $nome\n";
$textContent .= "Email: $email\n";
$textContent .= "Telefone: " . ($telefone ?: 'Não informado') . "\n";
$textContent .= "Assunto: " . ($assunto ?: 'Não especificado') . "\n";
$textContent .= "Mensagem:\n" . $mensagem . "\n\n";
$textContent .= "Enviado em: " . date('d/m/Y H:i:s');

// Envia o e-mail
$mailSent = mail($to, $subject, $emailContent, $headers);

// Verifica se o e-mail foi enviado
if ($mailSent) {
    $response['success'] = true;
    $response['message'] = 'Mensagem enviada com sucesso!';
    
    // Envia também a versão texto (opcional)
    mail($to, $subject, $textContent, $headers);
} else {
    $response['message'] = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.';
    error_log("Falha no envio de e-mail para: $to");
}

// Retorna a resposta em JSON
echo json_encode($response);
exit;