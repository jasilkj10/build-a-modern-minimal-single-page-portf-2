/**
 * ====================================================================
 * PORTFOLIO APPLICATION LOGIC
 * ====================================================================
 * - Dynamic data hydration from `portfolioData`
 * - ScrollSpy & Active navbar pill indicator
 * - Mobile responsive navigation menu
 * - Mouse spotlight glow tracking on glass cards
 * - Fade-up scroll animations (IntersectionObserver)
 * - Copy email to clipboard with animated toast
 * - Interactive contact form submission handler
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) {
    console.warn('portfolioData not loaded yet.');
    return;
  }

  // 1. Populate dynamic content
  hydrateContent(data);

  // 2. Initialize Lucide icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 3. Setup ScrollSpy & Navigation
  initNavigation();

  // 4. Setup Card Mouse Spotlight
  initCardSpotlights();

  // 5. Setup Scroll Fade-in Animations
  initScrollAnimations();

  // 6. Setup Interactive Contact Form & Copy
  initInteractions(data);
});

/**
 * Hydrates all personal portfolio content from portfolioData
 */
function hydrateContent(data) {
  // --- Hero Section ---
  const heroBadge = document.getElementById('hero-badge');
  if (heroBadge) heroBadge.textContent = data.personal.badge;

  const heroHeadline = document.getElementById('hero-headline');
  if (heroHeadline) {
    heroHeadline.innerHTML = `
      ${data.personal.headlinePart1} <br class="hidden sm:inline" />
      <span class="text-gradient-purple font-extrabold tracking-tight">${data.personal.headlinePart2}</span>
    `;
  }

  const heroSubtext = document.getElementById('hero-subtext');
  if (heroSubtext) heroSubtext.textContent = data.personal.subtext;

  const btnViewProjects = document.getElementById('hero-btn-projects');
  if (btnViewProjects) {
    btnViewProjects.textContent = data.personal.buttons.primary.text;
    btnViewProjects.setAttribute('href', data.personal.buttons.primary.href);
  }

  const btnResume = document.getElementById('hero-btn-resume');
  if (btnResume) {
    btnResume.innerHTML = `
      <i data-lucide="file-text" class="w-4 h-4 text-purple-300"></i>
      <span>${data.personal.buttons.secondary.text}</span>
    `;
    btnResume.setAttribute('href', data.personal.buttons.secondary.href);
  }

  // --- About Section ---
  const aboutBioContainer = document.getElementById('about-bio');
  if (aboutBioContainer) {
    aboutBioContainer.innerHTML = data.about.bio
      .map(p => `<p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">${p}</p>`)
      .join('');
  }

  const aboutFactsGrid = document.getElementById('about-quick-facts');
  if (aboutFactsGrid) {
    aboutFactsGrid.innerHTML = data.about.quickFacts
      .map(fact => `
        <div class="glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-purple-500/40">
          <div class="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400 shrink-0">
            <i data-lucide="${fact.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-purple-300/80 font-medium">${fact.label}</div>
            <div class="text-sm sm:text-base font-semibold text-white mt-0.5">${fact.value}</div>
            <div class="text-xs text-slate-400 mt-0.5">${fact.sub}</div>
          </div>
        </div>
      `)
      .join('');
  }

  // --- Skills Section ---
  const skillsCategories = document.getElementById('skills-categories');
  if (skillsCategories) {
    skillsCategories.innerHTML = data.skills.categories
      .map(category => `
        <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-6">
              <span class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></span>
              <h3 class="text-lg font-bold text-white tracking-wide">${category.title}</h3>
            </div>
            <div class="space-y-4">
              ${category.items
                .map(item => `
                  <div class="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-colors">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-2.5">
                        <i data-lucide="${item.icon}" class="w-4 h-4 text-purple-400"></i>
                        <span class="font-medium text-white text-sm sm:text-base">${item.name}</span>
                      </div>
                      <span class="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                        ${item.level}
                      </span>
                    </div>
                    <p class="text-xs text-slate-400 pl-6">${item.note}</p>
                  </div>
                `)
                .join('')}
            </div>
          </div>
        </div>
      `)
      .join('');
  }

  const currentlyLearningContainer = document.getElementById('currently-learning-row');
  if (currentlyLearningContainer) {
    currentlyLearningContainer.innerHTML = data.skills.currentlyLearning
      .map(item => `
        <div class="glass-card rounded-2xl p-5 hover:border-violet-500/40">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-purple-400">${item.category}</span>
            <span class="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ${item.progress}
            </span>
          </div>
          <h4 class="text-base font-bold text-white mb-1">${item.name}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        </div>
      `)
      .join('');
  }

  // --- Projects Section ---
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = data.projects.items
      .map(project => `
        <div class="glass-card rounded-3xl overflow-hidden flex flex-col group">
          <!-- Project Preview Image Container -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#150f2e] to-[#080518] border-b border-white/5">
            <img 
              src="${project.image}" 
              alt="${project.title}" 
              class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#090518] via-transparent to-transparent opacity-60"></div>
          </div>

          <!-- Project Details -->
          <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1.5">${project.tagline}</div>
              <h3 class="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-3">
                ${project.title}
              </h3>
              <p class="text-slate-300 text-sm leading-relaxed mb-6">
                ${project.description}
              </p>
            </div>

            <div>
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                ${project.tags
                  .map(tag => `
                    <span class="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-purple-200">
                      ${tag}
                    </span>
                  `)
                  .join('')}
              </div>

              <!-- Action Links -->
              <div class="flex items-center gap-3 pt-4 border-t border-white/5">
                <a 
                  href="${project.github}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-secondary px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <i data-lucide="github" class="w-4 h-4"></i>
                  <span>Code</span>
                </a>
                <a 
                  href="${project.live}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-secondary px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-2 hover:border-purple-400 text-purple-300"
                >
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `)
      .join('');
  }

  // --- Education & Timeline Section ---
  const educationTimeline = document.getElementById('education-timeline');
  if (educationTimeline) {
    educationTimeline.innerHTML = data.education.timeline
      .map((item, index) => `
        <div class="relative pl-8 sm:pl-10 pb-12 last:pb-2 group">
          <!-- Connecting vertical line -->
          ${index !== data.education.timeline.length - 1 ? `
            <div class="absolute left-3 top-3.5 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent"></div>
          ` : ''}

          <!-- Glowing timeline dot -->
          <div class="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-purple-950/80 shadow-[0_0_12px_#a855f7]"></div>

          <div class="glass-card rounded-2xl p-6 sm:p-7 hover:border-purple-500/40">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span class="text-xs font-semibold text-purple-400 bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full">
                ${item.period}
              </span>
              <span class="text-xs text-slate-400">${item.status}</span>
            </div>
            
            <h3 class="text-lg sm:text-xl font-bold text-white mt-1">${item.degree}</h3>
            <div class="text-sm font-medium text-purple-300 mt-1">${item.institution}</div>
            <div class="text-xs text-slate-400 mt-0.5">${item.affiliation}</div>

            <ul class="mt-4 space-y-2 text-sm text-slate-300 list-disc list-inside">
              ${item.highlights.map(h => `<li class="leading-relaxed"><span class="text-slate-300">${h}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      `)
      .join('');
  }

  // --- Contact Section & Socials ---
  const contactEmailBtn = document.getElementById('contact-email-btn');
  if (contactEmailBtn) {
    contactEmailBtn.textContent = data.contact.email;
  }

  const socialLinksContainer = document.getElementById('contact-social-links');
  if (socialLinksContainer) {
    socialLinksContainer.innerHTML = data.contact.socials
      .map(social => `
        <a 
          href="${social.url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="${social.name}"
          class="p-3.5 rounded-2xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/40 transition-all hover:scale-110"
        >
          <i data-lucide="${social.icon}" class="w-5 h-5"></i>
        </a>
      `)
      .join('');
  }

  // Footer copyright
  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) {
    footerCopyright.textContent = data.footer.copyright;
  }
}

/**
 * Initializes ScrollSpy and active navigation state
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking any link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ScrollSpy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-white', 'bg-white/10');
            link.classList.remove('text-slate-400');
          } else {
            link.classList.remove('text-white', 'bg-white/10');
            link.classList.add('text-slate-400');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Interactive mouse spotlight on glass cards
 */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Smooth fade-in scroll animation
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up-element');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));
}

/**
 * Interactive actions: copy email, contact form, toasts
 */
function initInteractions(data) {
  // Copy Email to clipboard
  const copyBtn = document.getElementById('copy-email-trigger');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(data.personal.email).then(() => {
        showToast(`Email copied: ${data.personal.email}`);
      }).catch(() => {
        showToast(`Email: ${data.personal.email}`);
      });
    });
  }

  // Download Resume button feedback
  const resumeBtns = document.querySelectorAll('a[href="#resume"]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Resume link clicked! (Add your resume PDF in js/data.js)');
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Animated button loading feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Sending Message...
        </span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast("Message sent! Jasil will get back to you soon. 🚀");
      }, 900);
    });
  }
}

/**
 * Shows an animated floating toast message
 */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
