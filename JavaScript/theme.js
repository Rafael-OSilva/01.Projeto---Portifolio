// =============================================
// CONFIGURAÇÕES GERAIS
// =============================================
let particlesInitialized = false;
const themeButton = document.querySelector('.toggle-theme');
const backToTopButton = document.querySelector('.btn-voltar-topo');

// =============================================
// PARTÍCULAS - CONFIGURAÇÕES PRINCIPAIS
// =============================================
function getParticleConfig() {
  const theme = getBlueTheme();

  return {
    particles: {
      number: {
        value: 80,  // Quantidade (reduzida para melhor performance)
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: theme.particle
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        }
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
          sync: false
        }
      },
      size: {
        value: 6,       // Tamanho PRINCIPAL (aumentado)
        random: true,   // Tamanhos variados
        min: 3,         // Mínimo
        max: 10,        // Máximo
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 130,
        color: theme.line,
        opacity: theme.opacity,
        width: 1.5     // Linhas mais grossas
      },
      move: {
        enable: true,
        speed: 2.5,    // Mais rápido
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce", // Quica nas bordas
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: ["grab", "bubble"] // Efeito combinado
        },
        onclick: {
          enable: true,
          mode: "repulse" // Afasta as partículas
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 180,  // Alcance do mouse
          line_linked: {
            opacity: 0.8
          }
        },
        bubble: {
          distance: 200,
          size: 15,
          duration: 1.5
        },
        repulse: {
          distance: 120,
          duration: 0.8
        },
        push: {
          particles_nb: 6
        }
      }
    },
    retina_detect: true
  };
}

// =============================================
// INICIALIZAÇÃO DAS PARTÍCULAS
// =============================================
function initParticles() {
  if (typeof particlesJS !== 'undefined' && !particlesInitialized) {
    const config = getParticleConfig();
    particlesJS('particles-js', config);
    particlesInitialized = true;
  }
}

// =============================================
// CONTROLE DE TEMA (CLARO/ESCURO)
// =============================================
function getBlueTheme() {
  return document.body.classList.contains('light-mode')
    ? {
      particle: '#3a86ff',  // Azul claro
      line: '#1a73e8',
      opacity: 0.5
    }
    : {
      particle: '#0028FF',  // Azul escuro
      line: '#0044ff',
      opacity: 0.4
    };
}

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

function toggleTheme() {
  const isLightMode = document.body.classList.toggle('light-mode');
  const icon = themeButton.querySelector('i');

  if (isLightMode) {
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    localStorage.setItem('theme', 'dark');
  }

  updateParticlesTheme();
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.body.classList.add('light-mode');
    themeButton.querySelector('i').classList.replace('bi-sun-fill', 'bi-moon-fill');
  }

  themeButton.addEventListener('click', toggleTheme);
}

// =============================================
// BOTÃO "VOLTAR AO TOPO"
// =============================================
function setupBackToTopButton() {
  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.scrollY > 300);
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================================
// INICIALIZAÇÃO GERAL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  setupBackToTopButton();
  initParticles();
});

// Redimensionamento responsivo
window.addEventListener('resize', () => {
  if (window.pJSDom && window.pJSDom.length > 0) {
    particlesJS('particles-js', getParticleConfig());
  }
});