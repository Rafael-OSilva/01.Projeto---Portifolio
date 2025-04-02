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

// Versão simplificada das partículas
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#0028FF" },
                line_linked: { enable: true, distance: 150, color: "#0028FF", opacity: 0.3, width: 1 },
                move: { enable: true, speed: 1.5 }
            }
        });
    }
});