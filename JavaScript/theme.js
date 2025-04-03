// theme.js - Versão Atualizada para Partículas na Seção Inicial

// =============================================
// VARIÁVEIS GLOBAIS E CONFIGURAÇÕES
// =============================================

let particlesInitialized = false;
const themeButton = document.querySelector('.toggle-theme');
const backToTopButton = document.querySelector('.btn-voltar-topo');

// =============================================
// CONFIGURAÇÕES DE TEMA E PARTÍCULAS
// =============================================

/**
 * Define as cores azuis para cada tema
 * @returns {Object} Cores para partículas e linhas
 */
function getBlueTheme() {
    return document.body.classList.contains('light-mode') 
        ? { 
            particle: '#3a86ff',  // Azul vibrante (tema claro)
            line: '#1a73e8',      // Azul mais escuro (linhas)
            opacity: 0.4          // Mais visível no claro
          }
        : { 
            particle: '#0028FF',  // Azul escuro original
            line: '#0044ff',      // Azul levemente mais claro
            opacity: 0.3          // Mais suave no escuro
          };
}

/**
 * Inicializa o sistema de partículas apenas na seção inicial
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined' && !particlesInitialized) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 50, // Reduzido para melhor performance
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: getBlueTheme().particle 
                },
                shape: { 
                    type: 'circle' 
                },
                opacity: { 
                    value: 0.7, 
                    random: false, 
                    anim: { 
                        enable: false 
                    } 
                },
                size: { 
                    value: 2,
                    random: false,
                    anim: { 
                        enable: false 
                    } 
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: getBlueTheme().line,
                    opacity: getBlueTheme().opacity,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'grab' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
        particlesInitialized = true;
    }
}

/**
 * Atualiza as partículas quando o tema muda
 */
function updateParticlesTheme() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        const theme = getBlueTheme();
        const pJS = window.pJSDom[0].pJS;
        
        pJS.particles.color.value = theme.particle;
        pJS.particles.line_linked.color = theme.line;
        pJS.particles.line_linked.opacity = theme.opacity;
        pJS.fn.particlesRefresh();
    }
}

/**
 * Destrói as partículas para limpeza
 */
function destroyParticles() {
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        particlesInitialized = false;
    }
}

// =============================================
// CONTROLE DO TEMA
// =============================================

/**
 * Inicializa o tema da aplicação
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    // Aplicar tema salvo ou preferência do sistema ou padrão dark
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
    
    // Configurar alternador de tema
    themeButton.addEventListener('click', toggleTheme);
}

/**
 * Ativa o modo claro
 */
function enableLightMode() {
    document.body.classList.add('light-mode');
    themeButton.querySelector('i').classList.replace('bi-sun-fill', 'bi-moon-fill');
    localStorage.setItem('theme', 'light');
    updateParticlesTheme();
}

/**
 * Ativa o modo escuro
 */
function enableDarkMode() {
    document.body.classList.remove('light-mode');
    themeButton.querySelector('i').classList.replace('bi-moon-fill', 'bi-sun-fill');
    localStorage.setItem('theme', 'dark');
    updateParticlesTheme();
}

/**
 * Alterna entre temas claro e escuro
 */
function toggleTheme() {
    document.body.classList.contains('light-mode') ? enableDarkMode() : enableLightMode();
}

// =============================================
// BOTÃO VOLTAR AO TOPO
// =============================================

function setupBackToTopButton() {
    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 300;
        backToTopButton.classList.toggle('visible', isVisible);
        backToTopButton.setAttribute('aria-hidden', !isVisible);
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================
// OBSERVADOR DE INTERSEÇÃO (OPCIONAL)
// =============================================

/**
 * Observa a seção inicial para otimizar performance
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initParticles();
            } else if (!window.scrollY === 0) {
                destroyParticles();
            }
        });
    }, { threshold: 0.1 });

    const inicioSection = document.getElementById('inicio');
    if (inicioSection) observer.observe(inicioSection);
}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupBackToTopButton();
    setupIntersectionObserver(); // Opcional - para melhor performance
    
    // Inicializa partículas imediatamente se a seção estiver visível
    if (window.location.hash === '#inicio' || window.scrollY === 0) {
        initParticles();
    }
});

// Redimensionamento responsivo
window.addEventListener('resize', () => {
    if (window.pJSDom && window.pJSDom.length > 0) {
        destroyParticles();
        initParticles();
    }
});

// Limpeza ao sair da página (opcional)
window.addEventListener('beforeunload', () => {
    destroyParticles();
});