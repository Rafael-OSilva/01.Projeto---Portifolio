document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-contato');
    const charCount = document.getElementById('char-count');
    const mensagem = document.getElementById('mensagem');
    const formFeedback = document.getElementById('form-feedback');
    const btnEnviar = form.querySelector('.btn-enviar');

    // Máscara para telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function(e) {
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
        mensagem.addEventListener('input', function() {
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
            feedback.textContent = 'Formato inválido';
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

    // Envio do formulário
    form.addEventListener('submit', async function(e) {
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
        
        try {
            const formData = new FormData(form);
            const response = await fetch('enviar.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                form.reset();
                formFeedback.textContent = result.message || 'Mensagem enviada com sucesso!';
                formFeedback.className = 'form-feedback success';
                charCount.textContent = '0';
            } else {
                formFeedback.textContent = result.message || 'Erro ao enviar mensagem. Tente novamente.';
                formFeedback.className = 'form-feedback error';
            }
        } catch (error) {
            console.error('Erro:', error);
            formFeedback.textContent = 'Falha na conexão. Tente novamente mais tarde.';
            formFeedback.className = 'form-feedback error';
        } finally {
            btnEnviar.classList.remove('loading');
            formFeedback.scrollIntoView({ behavior: 'smooth' });
        }
    });
});