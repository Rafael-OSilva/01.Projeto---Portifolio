document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-contato');
    const charCount = document.getElementById('char-count');
    const mensagem = document.getElementById('mensagem');
    const formFeedback = document.getElementById('form-feedback');
    const btnEnviar = form.querySelector('.btn-enviar');

    // Máscara para telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            // Formata como (XX) XXXXX-XXXX
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            }

            e.target.value = value;
        });
    }

    // Contador de caracteres
    if (mensagem && charCount) {
        mensagem.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            if (count > 450) {
                charCount.style.color = 'var(--cor-erro)';
            } else if (count > 400) {
                charCount.style.color = 'var(--cor-alerta)';
            } else {
                charCount.style.color = 'var(--cor-texto-claro)';
            }
        });
    }

    // Validação em tempo real
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const feedback = field.closest('.input-group').querySelector('.input-feedback');

        if (field.validity.valid) {
            feedback.textContent = '';
            field.classList.remove('invalid');
        } else {
            showError(field, feedback);
        }
    }

    function showError(field, feedback) {
        field.classList.add('invalid');

        if (field.validity.valueMissing) {
            feedback.textContent = 'Este campo é obrigatório';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                feedback.textContent = 'Digite um email válido (ex: nome@email.com)';
            } else {
                feedback.textContent = 'Formato inválido';
            }
        } else if (field.validity.tooShort) {
            feedback.textContent = `Mínimo de ${field.minLength} caracteres`;
        }
    }

    function clearError(e) {
        const field = e.target;
        const feedback = field.closest('.input-group').querySelector('.input-feedback');

        if (field.validity.valid) {
            feedback.textContent = '';
            field.classList.remove('invalid');
        }
    }

    // Envio do formulário - VERSÃO CORRIGIDA
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Valida todos os campos
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            const event = new Event('blur');
            input.dispatchEvent(event);

            if (!input.validity.valid) {
                isValid = false;
            }
        });

        if (!isValid) {
            formFeedback.textContent = 'Por favor, preencha todos os campos corretamente';
            formFeedback.className = 'form-feedback error';
            formFeedback.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Configura estado de loading
        btnEnviar.classList.add('loading');
        formFeedback.textContent = ''; // Limpa feedback anterior

        try {
            // Coleta os dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefoneValor = document.getElementById('telefone').value;
            const assunto = document.getElementById('assunto').value;
            const mensagemValor = document.getElementById('mensagem').value;

            // Prepara os dados no formato que o FormSubmit espera
            const dados = {
                name: nome,
                email: email,
                telefone: telefoneValor,
                assunto: assunto,
                message: mensagemValor,
                _subject: `Contato do Portfólio - ${assunto || 'Sem assunto'}`,
                _captcha: 'false',
                _template: 'table'
            };

            // Envia para o FormSubmit
            const response = await fetch('https://formsubmit.co/ajax/rafinha101419.silva@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const result = await response.json();

            if (result.success) {
                // Sucesso - limpa o formulário
                form.reset();
                if (telefone) telefone.value = '';
                if (charCount) charCount.textContent = '0';
                
                formFeedback.textContent = '✅ Mensagem enviada com sucesso! Em breve entrarei em contato.';
                formFeedback.className = 'form-feedback success';
            } else {
                // Erro do FormSubmit
                formFeedback.textContent = result.message || 'Erro ao enviar. Tente novamente.';
                formFeedback.className = 'form-feedback error';
            }
        } catch (error) {
            console.error('Erro detalhado:', error);
            formFeedback.textContent = '❌ Falha na conexão. Verifique sua internet e tente novamente.';
            formFeedback.className = 'form-feedback error';
        } finally {
            btnEnviar.classList.remove('loading');
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});