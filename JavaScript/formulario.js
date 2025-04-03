document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-contato');
    const telefoneInput = document.getElementById('telefone');
    const mensagemTextarea = document.getElementById('mensagem');
    const charCount = document.getElementById('char-count');
    const formFeedback = document.getElementById('form-feedback');
    const btnEnviar = form.querySelector('.btn-enviar');

    // Máscara para telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
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
    if (mensagemTextarea && charCount) {
        mensagemTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            const counter = this.nextElementSibling.querySelector('.char-counter');
            
            if (count > 450) {
                counter.classList.add('error');
                counter.classList.remove('warning');
            } else if (count > 400) {
                counter.classList.add('warning');
                counter.classList.remove('error');
            } else {
                counter.classList.remove('warning', 'error');
            }
        });
    }

    // Validação em tempo real
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const feedback = field.parentNode.querySelector('.input-feedback');
        if (!feedback) return;
        
        if (field.validity.valid) {
            feedback.textContent = '';
            field.classList.remove('invalid');
        } else {
            showFieldError(field, feedback);
        }
    }

    function showFieldError(field, feedback) {
        field.classList.add('invalid');
        
        if (field.validity.valueMissing) {
            feedback.textContent = 'Este campo é obrigatório';
        } else if (field.validity.typeMismatch) {
            feedback.textContent = 'Formato inválido';
        } else if (field.validity.tooShort) {
            feedback.textContent = `Mínimo de ${field.minLength} caracteres`;
        } else if (field.validity.tooLong) {
            feedback.textContent = `Máximo de ${field.maxLength} caracteres`;
        } else if (field.validity.patternMismatch) {
            feedback.textContent = 'Formato não corresponde ao esperado';
        }
    }

    // Envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Valida todos os campos
        let formIsValid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            validateField(input);
            if (!input.validity.valid) {
                formIsValid = false;
            }
        });
        
        if (!formIsValid) {
            showFeedback('error', 'Por favor, preencha todos os campos corretamente');
            return;
        }
        
        // Configura estado de carregamento
        btnEnviar.setAttribute('aria-busy', 'true');
        btnEnviar.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            // Simulação de envio (substitua pelo seu AJAX real)
            const response = await fetch('enviar.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showFeedback('success', result.message || 'Mensagem enviada com sucesso!');
                form.reset();
                charCount.textContent = '0';
            } else {
                showFeedback('error', result.message || 'Erro ao enviar mensagem. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            showFeedback('error', 'Falha na conexão. Tente novamente mais tarde.');
        } finally {
            btnEnviar.setAttribute('aria-busy', 'false');
            btnEnviar.disabled = false;
        }
    });

    function showFeedback(type, message) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        
        // Rola até o feedback
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove o feedback após 5 segundos
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.classList.remove('success');
                formFeedback.textContent = '';
            }, 5000);
        }
    }
});