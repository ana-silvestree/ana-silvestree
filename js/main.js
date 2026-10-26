/**
 * PORTFÓLIO ANA CLARA SILVESTRE
 * JavaScript Interativo & Funcionalidades
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initScrollSpy();
});

/* ==========================================================================
   1. CONTROLE DE TEMA (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Verifica preferência salva ou do sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.className = savedTheme;
  } else if (!systemPrefersDark) {
    htmlElement.className = 'light';
  } else {
    htmlElement.className = 'dark';
  }

  themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ==========================================================================
   2. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. FILTRO DE PROJETOS POR CATEGORIA
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove classe ativa de todos e adiciona no clicado
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODAL DINÂMICO DE DETALHES DE PROJETOS
   ========================================================================== */
const projectDetails = {
  mahle: {
    title: 'Previsão de Produção com Dados e Inteligência Artificial',
    partner: 'Parceria Inteli + MAHLE (2026 - Atual)',
    description: 'Projeto de alta complexidade desenvolvido em conjunto com a multinacional de autopeças MAHLE. O objetivo central é fornecer à gestão industrial e cadeia de suprimentos previsões acuradas de produção de veículos em toda a América Latina.',
    details: [
      '<strong>Engenharia de Atributos & Pré-processamento:</strong> Limpeza profunda de bases históricas, normalização de variáveis sazonais e criação de novos atributos combinando indicadores macroeconômicos (inflação, taxas de juros, taxa de câmbio) com dados do setor automotivo.',
      '<strong>Modelagem Preditiva com LightGBM:</strong> Implementação do algoritmo LightGBM, otimizado para lidar com não-linearidades e séries temporais com validação temporal estrita (rolling-window / time-series split) para eliminar riscos de vazamento de dados.',
      '<strong>Métricas & Validação Industrial:</strong> Avaliação contínua por métricas de erro (RMSE, MAE, MAPE) comparadas a benchmarks tradicionais de planejamento da empresa.',
      '<strong>Visão de Negócio:</strong> Integração direta de insights analíticos ao planejamento de produção, reduzindo gargalos logísticos e custos de estoque.'
    ],
    stack: ['Python', 'LightGBM', 'Scikit-Learn', 'Pandas', 'NumPy', 'Séries Temporais', 'Business Analytics']
  },
  agroflow: {
    title: 'AgroFlow: Sistema Web para Gestão de Rebanho Offline-First',
    partner: 'Parceria Inteli + BrPec Agropecuária (2026)',
    description: 'Solução digital completa desenvolvida sob medida para a BrPec Agropecuária. O principal desafio técnico era operar com estabilidade e confiança nas áreas remotas de pasto e currais, onde não há sinal de internet estável.',
    details: [
      '<strong>Arquitetura Offline-First:</strong> Armazenamento local no cliente com mecanismo de sincronização bidirecional que detecta o retorno da conexão e resolve conflitos de dados de maneira determinística.',
      '<strong>Backend Escalável & Seguro:</strong> API REST construída em Node.js com framework Express, conectada ao banco de dados relacional PostgreSQL hospedado no Supabase.',
      '<strong>Autenticação por QR Code:</strong> Agilidade de login e auditoria para peões e veterinários no manejo do rebanho sem necessidade de digitação complexa em dispositivos móveis.',
      '<strong>Engenharia de Qualidade:</strong> Suíte completa de testes automatizados unitários e de integração utilizando Jest, garantindo integridade transacional.'
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Jest', 'TypeScript/JavaScript', 'Offline Sync']
  },
  megahub: {
    title: 'MegaHub: Jogo Educativo Digital Interativo',
    partner: 'Parceria Inteli + Metrô de São Paulo (2026)',
    description: 'Experiência gamificada criada para os visitantes e delegações que passam pelo Centro de Operações do Metrô de São Paulo. A solução converte a complexidade dos sistemas de sinalização, intervalos de trens e manobras em um jogo educativo envolvente.',
    details: [
      '<strong>Desenvolvimento de Mecânicas:</strong> Criação em JavaScript nativo com o framework de física e renderização 2D Phaser 3 em HTML5 Canvas.',
      '<strong>Experiência do Usuário (UX):</strong> Pesquisas de perfil de público, mapeamento de jornadas de jogadores e refinamento ergonômico de controles para todas as faixas etárias.',
      '<strong>Metodologias Ágeis:</strong> Entregas incrementais com testes de usabilidade e feedback contínuo da equipe de comunicação e operações do Metrô.'
    ],
    stack: ['JavaScript', 'Phaser 3', 'HTML5 Canvas', 'UX Design', 'Scrum / Metodologias Ágeis']
  }
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalDynamicContent');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !closeBtn || !modalContent) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];

      if (!data) return;

      const stackBadges = data.stack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

      const detailsList = data.details
        .map(item => `<li>${item}</li>`)
        .join('');

      modalContent.innerHTML = `
        <h3>${data.title}</h3>
        <span class="modal-partner">${data.partner}</span>
        <p>${data.description}</p>
        <h4 class="modal-section-title">Destaques da Implementação:</h4>
        <ul>${detailsList}</ul>
        <h4 class="modal-section-title">Tecnologias Utilizadas:</h4>
        <div class="tech-tags">${stackBadges}</div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. COPIAR EMAIL COM 1 CLIQUE
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const feedback = document.getElementById('copyFeedback');

  if (!copyBtn || !emailText || !feedback) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
      feedback.textContent = 'Copiado! ✓';
      copyBtn.style.background = 'var(--success)';
      copyBtn.style.borderColor = 'var(--success)';
      copyBtn.style.color = '#ffffff';

      setTimeout(() => {
        feedback.textContent = 'Copiar';
        copyBtn.style.background = '';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(err => {
      console.error('Falha ao copiar:', err);
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY (INDICADOR DE SEÇÃO ATIVA NA NAVBAR)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}
