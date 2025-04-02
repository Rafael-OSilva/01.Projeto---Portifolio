// Alternar tema claro/escuro
const toggleTheme = document.querySelector('.toggle-theme');
const iconTheme = document.querySelector('.toggle-theme i');

toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        iconTheme.classList.remove('bi-sun-fill');
        iconTheme.classList.add('bi-moon-fill');
        localStorage.setItem('theme', 'light');
    } else {
        iconTheme.classList.remove('bi-moon-fill');
        iconTheme.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'dark');
    }
});

// Verificar preferência salva
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    iconTheme.classList.remove('bi-sun-fill');
    iconTheme.classList.add('bi-moon-fill');
}

// Botão voltar ao topo
const btnTopo = document.querySelector('.btn-voltar-topo');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        btnTopo.classList.add('visible');
    } else {
        btnTopo.classList.remove('visible');
    }
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adaptação para o toggle de tema
function updateParticlesTheme(isLightMode) {
    const newColor = isLightMode ? "#285aa1" : "#0028FF";
    if (window.pJSDom && window.pJSDom.length > 0) {
        pJSDom[0].pJS.particles.color.value = newColor;
        pJSDom[0].pJS.particles.line_linked.color = newColor;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}