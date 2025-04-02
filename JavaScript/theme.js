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

// Adicione esta função no início do arquivo (antes da função initializeTheme)
function getBlueTheme() {
    return document.body.classList.contains('light-mode') 
      ? { particle: '#3a86ff', line: '#1a73e8', opacity: 0.4 } // Tema claro
      : { particle: '#0028FF', line: '#0044ff', opacity: 0.3 }; // Tema escuro
  }
  
  // Atualize a função initParticles() com estas configurações:
  function initParticles() {
    if (typeof particlesJS !== 'undefined' && !particlesInitialized) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 70, density: { enable: true, value_area: 800 } },
          color: { value: getBlueTheme().particle },
          shape: { type: 'circle' },
          opacity: { value: 0.7, random: false, anim: { enable: false } },
          size: { value: 2, random: false, anim: { enable: false } },
          line_linked: {
            enable: true,
            distance: 120,
            color: getBlueTheme().line,
            opacity: getBlueTheme().opacity,
            width: 2
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
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        }
      });
      particlesInitialized = true;
    }
  }
  
  // Atualize a função updateParticlesTheme():
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