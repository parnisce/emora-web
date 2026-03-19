document.addEventListener('DOMContentLoaded', () => {
  console.log('Emora AI Initialized');
  
  // Create Cursor Elements
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const animateCursor = () => {
    const easing = 0.15;
    outlineX += (mouseX - outlineX) * easing;
    outlineY += (mouseY - outlineY) * easing;

    cursorOutline.style.transform = `translate(${outlineX - 16}px, ${outlineY - 16}px)`;
    
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Active Link Handling
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('#nav-menu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
      link.classList.add('active', 'font-bold', 'text-[#82B954]');
      link.classList.remove('opacity-80', 'font-semibold');
    }
  });

  // Cursor Hover Effects
  const interactiveElements = document.querySelectorAll('a, button, .btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
  });

  // Clean URLs logic (Remove .html from internal links)
  // document.querySelectorAll('a').forEach(link => {
  //   const href = link.getAttribute('href');
  //   if (href && href.endsWith('.html') && !href.startsWith('http')) {
  //     link.setAttribute('href', href.replace('.html', ''));
  //   }
  // });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  htmlElement.classList.add(savedTheme);

  themeToggle?.addEventListener('click', () => {
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

  // Header Scroll Effect
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Animate hamburger to X
      const bars = menuToggle.querySelectorAll('span');
      if (bars.length >= 3) {
        if (menuToggle.classList.contains('active')) {
          (bars[0] as HTMLElement).style.transform = 'translateY(8px) rotate(45deg)';
          (bars[1] as HTMLElement).style.opacity = '0';
          (bars[2] as HTMLElement).style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
          (bars[0] as HTMLElement).style.transform = 'none';
          (bars[1] as HTMLElement).style.opacity = '1';
          (bars[2] as HTMLElement).style.transform = 'none';
        }
      }
    });
  }

  // Scroll Reveal Implementation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // Parallax Effect for Hero
  const parallaxImg = document.querySelector('.parallax') as HTMLElement;
  window.addEventListener('scroll', () => {
    if (parallaxImg) {
      const speedStr = parallaxImg.getAttribute('data-speed');
      const speed = speedStr ? parseFloat(speedStr) : 0.05;
      const yPos = window.scrollY * speed;
      parallaxImg.style.transform = `translateY(${yPos}px)`;
    }
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple form submission handler
  const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      if (btn) {
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
          alert('Thank you for your message! We will get back to you soon.');
          btn.innerText = originalText;
          btn.disabled = false;
          contactForm.reset();
        }, 1500);
      }
    });
  }

  // FAQ Accordion Logic
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close other open cards
      faqCards.forEach(c => c.classList.remove('active'));
      
      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

  // FAQ Category Filtering
  const categoryButtons = document.querySelectorAll('.category-pill');
  const faqSections = document.querySelectorAll('.faq-category-section');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter sections
      faqSections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category');
        if (category === 'all' || sectionCategory === category) {
          (section as HTMLElement).style.display = 'block';
        } else {
          (section as HTMLElement).style.display = 'none';
        }
      });
    });
  });

  // Pricing Toggle Logic
  const toggleBtn = document.getElementById('price-toggle-btn');
  const priceValues = document.querySelectorAll('.price-value');
  const billingSubtitle = document.getElementById('billing-subtitle');
  const labelMonthly = document.getElementById('label-monthly');
  const labelYearly = document.getElementById('label-yearly');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('yearly');
      const isYearly = toggleBtn.classList.contains('yearly');

      // Update active labels
      if (labelMonthly && labelYearly) {
        labelMonthly.classList.toggle('text-slate-900', !isYearly);
        labelMonthly.classList.toggle('dark:text-white', !isYearly);
        labelMonthly.classList.toggle('text-gray-400', isYearly);
        
        labelYearly.classList.toggle('text-slate-900', isYearly);
        labelYearly.classList.toggle('dark:text-white', isYearly);
        labelYearly.classList.toggle('text-gray-400', !isYearly);
      }

      // Update price values
      priceValues.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        const yearly = price.getAttribute('data-yearly');
        price.textContent = isYearly ? `$${yearly}` : `$${monthly}`;
      });

      // Update subtitle
      if (billingSubtitle) {
        billingSubtitle.textContent = isYearly ? 'Billed annually. Save $40 / year.' : 'Billed monthly. Cancel anytime.';
      }
    });
  }
});
