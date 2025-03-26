document.addEventListener('DOMContentLoaded', function() {
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    const overlay = document.getElementById('overlay-menu');
    const btnFechar = document.querySelector('.btn-fechar');
    const menuLinks = document.querySelectorAll('.menu-mobile nav ul li a');
    
    // Função para abrir o menu
    function abrirMenu() {
        menu.classList.add('abrir-menu');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede o scroll
        btnMenu.setAttribute('aria-expanded', 'true');
    }
    
    // Função para fechar o menu
    function fecharMenu() {
        menu.classList.remove('abrir-menu');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura o scroll
        btnMenu.setAttribute('aria-expanded', 'false');
        btnMenu.focus(); // Retorna o foco para o botão de menu
    }
    
    // Event listeners
    btnMenu.addEventListener('click', abrirMenu);
    btnFechar.addEventListener('click', fecharMenu);
    overlay.addEventListener('click', fecharMenu);
    
    // Fechar menu ao clicar em qualquer link
    menuLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });
    
    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('abrir-menu')) {
            fecharMenu();
        }
    });
    
    // Acessibilidade - controle via teclado
    btnMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            abrirMenu();
        }
    });
});