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

