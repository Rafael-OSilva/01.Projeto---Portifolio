// Menu Mobile
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const overlayMenu = document.getElementById('overlay-menu');

function toggleMenu() {
    menuMobile.classList.toggle('abrir-menu');
}

btnMenu.addEventListener('click', toggleMenu);
overlayMenu.addEventListener('click', toggleMenu);

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu-mobile nav ul li a');

menuLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});


// Animação dos itens do portfólio
document.addEventListener('DOMContentLoaded', function () {
    const portfolioItems = document.querySelectorAll('.project-link');

    portfolioItems.forEach((item, index) => {
        // Delay escalonado para cada item
        item.style.transitionDelay = `${index * 0.1}s`;

        // Efeito de parallax suave
        item.addEventListener('mousemove', (e) => {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            e.target.querySelector('.img-port').style.transform = `perspective(1000px) rotateX(${(y - 230) / 25}deg) rotateY(${(x - 180) / -25}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('.img-port').style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});