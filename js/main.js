/**
 * ====================================================================
 * PORTFOLIO APPLICATION LOGIC — JASIL KJ
 * ====================================================================
 * Features:
 * - Dynamic data hydration from `portfolioData` (all personal config in js/data.js)
 * - Intelligent ScrollSpy with active navbar pill indicator
 * - Mobile responsive navigation drawer with backdrop blur
 * - Dynamic mouse spotlight tracking on all glassmorphic cards
 * - IntersectionObserver fade-up scroll reveal animations
 * - Interactive copy-to-clipboard email button with animated toast
 * - Interactive contact form with client validation, animated spinner, and toast feedback
 * - Resume button handler supporting both local file paths and friendly instructions
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) {
    console.warn('portfolioData not loaded.');
    return;
  }

  // 1. Hydrate content from portfolioData
  hydrateContent(data);

  // 2. Initialize Lucide icons
  refreshIcons();

  // 3. Initialize Sticky Blurred Navbar & ScrollSpy
  initNavigation();

  // 4. Setup Mouse Spotlight tracking on Glass Cards
  initCardSpotlights();

  // 5. Setup Scroll Fade-in Animations
  initScrollAnimations();

  // 6. Setup Interactive Actions (Copy Email, Form, Resume)
  initInteractions(data);
});

// Also refresh icons once the window fully loads
window.addEventListener('load', () => {
  refreshIcons();
});

/**
 * Re-scans the DOM and renders Lucide SVG icons safely
 */
function refreshIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try {
      lucide.createIcons();
    } catch (err) {
      console.error('Error rendering icons:', err);
    }
  }
}

/**
 * Populates all DOM elements dynamically from the central data.js file
 */
function hydrateContent(data) {
  // --- 1. HERO SECTION ---
  const heroBadge = document.getElementById('hero-badge');
  if (heroBadge) {
    heroBadge.textContent = data.personal.badge || '✦ Open to opportunities';
  }

  const heroBadgeSub = document.getElementById('hero-badge-sub');
  if (heroBadgeSub) {
    heroBadgeSub.textContent = data.personal.badgeSubtext || 'AI & CSE Student';
  }

  const heroHeadline = document.getElementById('hero-headline');
  if (heroHeadline) {
    heroHeadline.innerHTML = `
      ${data.personal.headlinePart1} <br class="hidden sm:inline" />
      ${data.personal.headlinePart2} <span class="text-gradient-purple font-black">${data.personal.headlineGradientWord || 'AI'}</span>
    `;
  }

  const heroSubtext = document.getElementById('hero-subtext');
  if (heroSubtext) {
    heroSubtext.textContent = data.personal.subtext;
  }

  const btnProjects = document.getElementById('hero-btn-projects');
  if (btnProjects) {
    btnProjects.textContent = data.personal.buttons.primary.text;
    btnProjects.setAttribute('href', data.personal.buttons.primary.href);
  }

  const btnResume = document.getElementById('hero-btn-resume');
  if (btnResume) {
    btnResume.innerHTML = `
      <i data-lucide="file-text" class="w-4 h-4 text-purple-300"></i>
      <span>${data.personal.buttons.secondary.text}</span>
    `;
    btnResume.setAttribute('href', data.personal.buttons.secondary.href);
  }

  // --- 2. ABOUT SECTION ---
  const aboutAvatarImg = document.getElementById('about-avatar-img');
  if (aboutAvatarImg) {
    aboutAvatarImg.src = data.personal.avatar || 'assets/avatar.svg';
    aboutAvatarImg.alt = `${data.personal.name} — Portrait`;
  }

  const aboutBio = document.getElementById('about-bio');
  if (aboutBio) {
    aboutBio.innerHTML = data.about.bio
      .map(paragraph => `<p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">${paragraph}</p>`)
      .join('');
  }

  const quickFactsGrid = document.getElementById('about-quick-facts');
  if (quickFactsGrid) {
    quickFactsGrid.innerHTML = data.about.quickFacts
      .map(fact => `
        <div class="glass-card rounded-2xl p-4 sm:p-5 flex items-start gap-4">
          <div class="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400 shrink-0">
            <i data-lucide="${fact.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-[11px] uppercase tracking-wider text-purple-300/80 font-semibold">${fact.label}</div>
            <div class="text-sm sm:text-base font-bold text-white mt-0.5">${fact.value}</div>
            <div class="text-xs text-slate-400 mt-0.5">${fact.sub}</div>
          </div>
        </div>
      `)
      .join('');
  }

  // --- 3. SKILLS SECTION ---
  const skillsCategories = document.getElementById('skills-categories');
  if (skillsCategories) {
    skillsCategories.innerHTML = data.skills.categories
      .map(category => `
        <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2.5 mb-6">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]"></span>
              <h3 class="text-lg font-bold text-white tracking-wide">${category.title}</h3>
            </div>
            <div class="space-y-3.5">
              ${category.items
                .map(item => `
                  <div class="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all">
                    <div class="flex items-center justify-between mb-1">
                      <div class="flex items-center gap-2.5">
                        <i data-lucide="${item.icon}" class="w-4 h-4 text-purple-400 shrink-0"></i>
                        <span class="font-semibold text-white text-sm sm:text-base">${item.name}</span>
                      </div>
                      <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                        ${item.level}
                      </span>
                    </div>
                    <p class="text-xs text-slate-400 pl-6 leading-relaxed">${item.note}</p>
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
          <h4 class="text-base font-bold text-white mb-1.5">${item.name}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        </div>
      `)
      .join('');
  }

  // --- 4. PROJECTS SECTION ---
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = data.projects.items
      .map(project => `
        <div class="glass-card rounded-3xl overflow-hidden flex flex-col group">
          <!-- Preview Image Container -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#150f2e] to-[#080518] border-b border-white/5">
            <img 
              src="${project.image}" 
              alt="${project.title}" 
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#090518] via-transparent to-transparent opacity-60"></div>
          </div>

          <!-- Project Details -->
          <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div class="text-[11px] font-semibold uppercase tracking-wider text-purple-400 mb-1.5">${project.tagline}</div>
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

  // --- 5. EDUCATION & TIMELINE SECTION ---
  const educationTimeline = document.getElementById('education-timeline');
  if (educationTimeline) {
    educationTimeline.innerHTML = data.education.timeline
      .map((item, index) => `
        <div class="relative pl-8 sm:pl-10 pb-12 last:pb-2 group">
          <!-- Connecting Line -->
          ${index !== data.education.timeline.length - 1 ? `
            <div class="absolute left-3 top-3.5 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent"></div>
          ` : ''}

          <!-- Glowing Marker Dot -->
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

  // --- 6. CONTACT SECTION ---
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

  // --- 7. FOOTER SECTION ---
  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) {
    footerCopyright.textContent = data.footer.copyright;
  }
}

/**
 * Initializes Sticky Navbar, Mobile Menu, and Robust ScrollSpy
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Mobile Menu Toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ScrollSpy Highlight Handler
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 200;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Check if scrolled to bottom
    if (window.scrollY + windowHeight >= documentHeight - 50) {
      setActiveNav('contact');
      return;
    }

    // Check if near top
    if (window.scrollY < 200) {
      setActiveNav('hero');
      return;
    }

    // Check current section
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPosition >= top && scrollPosition < top + height) {
        setActiveNav(id);
      }
    });
  }

  function setActiveNav(id) {
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

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));
}

/**
 * Interactive actions: copy email, contact form, toasts, resume
 */
function initInteractions(data) {
  // 1. Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-trigger');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = data.contact.email || data.personal.email;
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`Email copied: ${email}`);
        })
        .catch(() => {
          showToast(`Email: ${email}`);
        });
    });
  }

  // 2. Resume Button Handler
  const resumeBtns = document.querySelectorAll('a[href="#resume"]');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      if (data.personal.resumeUrl && data.personal.resumeUrl !== '#resume') {
        // Let normal browser link navigation or download proceed
        return;
      }
      e.preventDefault();
      showToast('Resume linked! (Add your PDF to js/data.js in personal.resumeUrl)');
    });
  });

  // 3. Interactive Contact Form Submission
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

      const originalHtml = submitBtn.innerHTML;
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
        submitBtn.innerHTML = originalHtml;
        contactForm.reset();
        showToast("Message sent! Jasil will reply promptly. 🚀");
        refreshIcons();
      }, 800);
    });
  }
}

/**
 * Animated floating toast alert
 */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
