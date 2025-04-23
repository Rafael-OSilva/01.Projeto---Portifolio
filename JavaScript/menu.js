// Script do Menu Mobile e Animação do Portfólio

document.addEventListener('DOMContentLoaded', function () {
    // Elementos do menu mobile
    const btnMenu = document.getElementById('btn-menu');
    const menubar = document.getElementById('menu-mobile');
    const overlayMenu = document.getElementById('overlay-menu');
    const menuLinks = document.querySelectorAll('.menu-mobile nav ul li a');
    const btnFechar = document.querySelector('.btn-fechar');

    // Função para alternar o menu
    function toggleMenu() {
        menubar.classList.toggle('abrir-menu');
        overlayMenu.classList.toggle('active');
    }

    // Event listeners para abrir/fechar menu
    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            menubar.classList.add('abrir-menu');
            overlayMenu.classList.add('active');
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            menubar.classList.remove('abrir-menu');
            overlayMenu.classList.remove('active');
        });
    }

    if (overlayMenu) {
        overlayMenu.addEventListener('click', () => {
            menubar.classList.remove('abrir-menu');
            overlayMenu.classList.remove('active');
        });
    }

    // Fechar menu ao clicar nos links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menubar.classList.remove('abrir-menu');
            overlayMenu.classList.remove('active');
        });
    });

    // Animação dos itens do portfólio
    const portfolioItems = document.querySelectorAll('.project-link');

    portfolioItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;

        item.addEventListener('mousemove', (e) => {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            const imgPort = item.querySelector('.img-port');

            if (imgPort) {
                imgPort.style.transform = `perspective(1000px) rotateX(${(y - 230) / 25}deg) rotateY(${(x - 180) / -25}deg) scale(1.02)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const imgPort = item.querySelector('.img-port');
            if (imgPort) {
                imgPort.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }
        });
    });

    // Verificação adicional para garantir que o menu está sobreposto corretamente
    document.querySelectorAll('header').forEach(header => {
        header.style.zIndex = '1000';
    });
});