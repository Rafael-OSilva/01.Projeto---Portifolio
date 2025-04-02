// theme.js - Versão Atualizada com Partículas Personalizadas

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
   * Inicializa o sistema de partículas
   */
  function initParticles() {
    if (typeof particlesJS !== 'undefined' && !particlesInitialized) {
      particlesJS('particles-js', {
        particles: {
          number: { 
            value: 70, 
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
            value: 2,           // Tamanho fixo de 2px
            random: false,      // Todas iguais
            anim: { 
              enable: false     // Sem animação de tamanho
            } 
          },
          line_linked: {
            enable: true,
            distance: 120,      // Distância entre partículas
            color: getBlueTheme().line,
            opacity: getBlueTheme().opacity,
            width: 2            // Largura igual ao tamanho
          },
          move: {
            enable: true,
            speed: 1.2,         // Velocidade moderada
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
              mode: 'grab'      // Atrai partículas ao mouse
            },
            onclick: { 
              enable: true, 
              mode: 'push'     // Empurra partículas ao clicar
            },
            resize: true
          }
        },
        retina_detect: true
      });
      particlesInitialized = true;
    }
  }
  
  /**
   * Atualiza as partículas quando o tema muda
   * @param {boolean} isLightMode - Indica se o tema é claro
   */
  function updateParticlesTheme(isLightMode) {
    if (window.pJSDom && window.pJSDom.length > 0) {
      const theme = getBlueTheme();
      const pJS = pJSDom[0].pJS;
      
      pJS.particles.color.value = theme.particle;
      pJS.particles.line_linked.color = theme.line;
      pJS.particles.line_linked.opacity = theme.opacity;
      pJS.fn.particlesRefresh();
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
    const toggleBtn = document.querySelector('.toggle-theme');
    const themeIcon = toggleBtn.querySelector('i');
  
    // Aplicar tema salvo ou padrão
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
      document.body.classList.remove('light-mode');
      themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
  
    // Configurar alternador de tema
    toggleBtn.addEventListener('click', toggleTheme);
  }
  
  /**
   * Alterna entre temas claro e escuro
   */
  function toggleTheme() {
    const themeIcon = document.querySelector('.toggle-theme i');
    const isLightMode = document.body.classList.toggle('light-mode');
  
    if (isLightMode) {
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
      localStorage.setItem('theme', 'dark');
    }
  
    updateParticlesTheme(isLightMode);
  }
  
  // =============================================
  // BOTÃO VOLTAR AO TOPO
  // =============================================
  
  function setupBackToTopButton() {
    const btnTopo = document.querySelector('.btn-voltar-topo');
    
    window.addEventListener('scroll', () => {
      btnTopo.classList.toggle('visible', window.scrollY > 300);
    });
    
    btnTopo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // =============================================
  // INICIALIZAÇÃO
  // =============================================
  
  let particlesInitialized = false;
  
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initParticles();
    setupBackToTopButton();
  });
  
  // Redimensionamento responsivo
  window.addEventListener('resize', () => {
    if (window.pJSDom && window.pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      particlesInitialized = false;
      initParticles();
    }
  });