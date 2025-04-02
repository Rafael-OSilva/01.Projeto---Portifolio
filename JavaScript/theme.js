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

// theme.js - Código completo atualizado

// Configuração inicial do tema
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleTheme = document.querySelector('.toggle-theme');
    const iconTheme = document.querySelector('.toggle-theme i');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        iconTheme.classList.remove('bi-sun-fill');
        iconTheme.classList.add('bi-moon-fill');
        updateParticlesTheme(true); // Atualiza partículas para tema claro
    } else {
        document.body.classList.remove('light-mode');
        iconTheme.classList.remove('bi-moon-fill');
        iconTheme.classList.add('bi-sun-fill');
        updateParticlesTheme(false); // Atualiza partículas para tema escuro
    }
    
    // Alternador de tema
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            iconTheme.classList.remove('bi-sun-fill');
            iconTheme.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
            updateParticlesTheme(true);
        } else {
            iconTheme.classList.remove('bi-moon-fill');
            iconTheme.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
            updateParticlesTheme(false);
        }
    });
}

// Gerenciamento das partículas
let particlesInitialized = false;

function initParticles() {
    if (typeof particlesJS !== 'undefined' && !particlesInitialized) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: getParticleColor() },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: getParticleColor(),
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.8 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
        
        particlesInitialized = true;
    }
}

// Função para obter a cor das partículas baseada no tema atual
function getParticleColor() {
    return document.body.classList.contains('light-mode') ? '#285aa1' : '#0028FF';
}

// Atualiza as partículas quando o tema muda
function updateParticlesTheme(isLightMode) {
    if (window.pJSDom && window.pJSDom.length > 0) {
        const newColor = isLightMode ? '#285aa1' : '#0028FF';
        pJSDom[0].pJS.particles.color.value = newColor;
        pJSDom[0].pJS.particles.line_linked.color = newColor;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Botão voltar ao topo
function setupBackToTopButton() {
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
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initParticles();
    setupBackToTopButton();
});

// Redimensionamento responsivo
window.addEventListener('resize', function() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        pJSDom[0].pJS.fn.vendors.destroypJS();
        particlesInitialized = false;
        initParticles();
    }
});