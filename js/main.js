/**
 * PORTFÓLIO PROFISSIONAL - ANA CLARA SILVESTRE
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
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectEntries = document.querySelectorAll('.project-entry');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectEntries.forEach(entry => {
        const category = entry.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          entry.style.display = 'block';
          entry.style.opacity = '0';
          setTimeout(() => {
            entry.style.opacity = '1';
          }, 40);
        } else {
          entry.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODAL DINÂMICO DE DETALHAMENTO DE PROJETOS
   ========================================================================== */
const projectDetails = {
  mahle: {
    title: 'Previsão Analítica de Produção Veicular na América Latina',
    partner: 'Parceria Inteli & MAHLE (2026 – Atual)',
    description: 'Solução analítica concebida em cooperação com a multinacional de autopeças MAHLE. O projeto visa subsidiar decisões estratégicas e mitigar incertezas na cadeia de suprimentos por meio de modelagem preditiva de séries temporais com rigor metodológico.',
    details: [
      '<strong>Engenharia de Atributos & Tratamento de Dados:</strong> Limpeza, imputação e normalização de séries históricas de produção combinadas a indicadores macroeconômicos (taxas de juros, inflação, índices de confiança industrial e câmbio). Criação de variáveis defasadas (*lag features*) e médias móveis.',
      '<strong>Modelagem com LightGBM:</strong> Implementação e tunagem de hiperparâmetros de algoritmo baseado em árvores de decisão impulsionadas por gradiente, com tratamento explícito de não-linearidades e padrões sazonais.',
      '<strong>Estratégia de Validação Temporal:</strong> Adoção estrita de validação com divisão temporal (*time-series split / rolling window*), eliminando qualquer risco de vazamento de dados futuros (*data leakage*).',
      '<strong>Avaliação de Métricas:</strong> Mensuração comparativa por meio de métricas quantitativas de erro (RMSE, MAE e MAPE) frente aos benchmarks de planejamento histórico da empresa.'
    ],
    stack: ['Python', 'LightGBM', 'Scikit-Learn', 'Pandas', 'NumPy', 'Séries Temporais', 'Business Analytics']
  },
  agroflow: {
    title: 'AgroFlow: Sistema Web para Gestão de Rebanho Offline-First',
    partner: 'Parceria Inteli & BrPec Agropecuária (2026)',
    description: 'Solução digital full-stack desenvolvida para atender às demandas de rastreabilidade e gestão do manejo bovino em propriedades agropecuárias com infraestrutura de rede instável ou ausente.',
    details: [
      '<strong>Arquitetura Offline-First:</strong> Estrutura de armazenamento local no navegador aliada a rotina de sincronização bidirecional resiliente, garantindo persistência imediata no curral e resolução determinística de conflitos na conexão.',
      '<strong>Backend & Banco Relacional:</strong> API REST estruturada em Node.js com framework Express, integrada a banco de dados PostgreSQL gerenciado via Supabase, garantindo integridade referencial.',
      '<strong>Autenticação por QR Code:</strong> Mecanismo de identificação ágil e seguro para operadores de campo, eliminando atritos de autenticação durante o manejo do rebanho.',
      '<strong>Garantia de Qualidade de Software:</strong> Suíte de testes unitários e de integração desenvolvida com Jest, validando endpoints críticos e regras de negócio agropecuárias.'
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Jest', 'TypeScript', 'Offline-First']
  },
  megahub: {
    title: 'MegaHub: Protótipo Interativo Gamificado',
    partner: 'Parceria Inteli & Metrô de São Paulo (2026)',
    description: 'Ambiente digital gamificado concebido para visitantes técnicos e delegações do Centro de Operações do Metrô de São Paulo, sintetizando rotinas de tráfego metroviário em uma experiência de alta fidelidade visual e cognitiva.',
    details: [
      '<strong>Engenharia de Mecânicas:</strong> Desenvolvimento integral em JavaScript com motor de jogos Phaser 3 sobre canvas HTML5, implementando sistemas de física 2D, sinalização e intervalos entre trens.',
      '<strong>Design Centrado no Usuário (UX):</strong> Pesquisa de ergonomia visual, hierarquia de informações e prototipação iterativa para assegurar acessibilidade a públicos diversos.',
      '<strong>Metodologias Ágeis:</strong> Condução do projeto em sprints quinzenais sob framework Scrum/Kanban, com ciclos de testes de usabilidade e refinamentos contínuos.'
    ],
    stack: ['JavaScript', 'Phaser 3', 'HTML5 Canvas', 'UX Design', 'Metodologias Ágeis (Scrum)']
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
        <h4 class="modal-section-title">Detalhamento Técnico e Metodológico:</h4>
        <ul>${detailsList}</ul>
        <h4 class="modal-section-title">Tecnologias Empregadas:</h4>
        <div class="tech-stack-row">${stackBadges}</div>
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
   5. COPIAR E-MAIL PROFISSIONAL
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailAction');
  const emailField = document.getElementById('emailField');
  const feedback = document.getElementById('copyFeedback');

  if (!copyBtn || !emailField || !feedback) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailField.textContent.trim()).then(() => {
      feedback.textContent = 'Copiado';
      copyBtn.style.borderColor = 'var(--accent-primary)';
      copyBtn.style.color = 'var(--accent-primary)';

      setTimeout(() => {
        feedback.textContent = 'Copiar';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
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
      const sectionTop = current.offsetTop - 100;
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
