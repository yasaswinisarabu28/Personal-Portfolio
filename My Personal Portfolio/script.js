// ===== DOM Elements =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const scrollTopBtn = document.querySelector('.scroll-top');

// ===== Typing Animation =====
const typingText = document.getElementById('typing-text');
const textArray = ['Frontend Web Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!typingText) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
}

// ===== Mobile Navigation =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ===== Dark Mode Toggle =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// ===== Scroll to Top Button =====
function toggleScrollTop() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Smooth Scrolling for Navigation Links =====
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// ===== Active Navigation Link =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}


// ===== Notification System =====
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f093fb, #f5576c)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== Intersection Observer for Animations =====
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about, .skills, .projects, .certifications, .contact');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


// ===== Create Scroll to Top Button =====
function createScrollTopButton() {
    if (!scrollTopBtn) {
        const button = document.createElement('button');
        button.className = 'scroll-top';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.addEventListener('click', scrollToTop);
        document.body.appendChild(button);
    }
}

// ===== Unified Dynamic Modal & Gallery System =====
function setupDynamicGallery() {
    const galleryTriggers = document.querySelectorAll('.view-gallery');
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const slidesContainer = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = modal.querySelector('.carousel-prev');
    const nextBtn = modal.querySelector('.carousel-next');

    let currentSlide = 0;
    let totalSlides = 0;

    function showSlide(index) {
        if (totalSlides === 0) return;
        
        // Wrap index around
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        const slides = slidesContainer.querySelectorAll('.carousel-slide');
        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        // Update slides active class
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots active class
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function openModal(e) {
        e.preventDefault();
        const trigger = e.currentTarget;
        
        // Extract data
        const title = trigger.getAttribute('data-title') || 'Details';
        const folder = trigger.getAttribute('data-folder') || '';
        const filesString = trigger.getAttribute('data-files') || '';
        const files = filesString.split(',').map(f => f.trim()).filter(f => f.length > 0);

        if (files.length === 0) return;

        // Set title
        modalTitle.textContent = title;

        // Build slides and dots dynamically
        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        totalSlides = files.length;
        currentSlide = 0;

        files.forEach((file, index) => {
            const fileUrl = folder ? `${folder}/${file}` : file;
            const isPdf = file.toLowerCase().endsWith('.pdf');
            
            // Create slide element
            const slideDiv = document.createElement('div');
            slideDiv.className = `carousel-slide${index === 0 ? ' active' : ''}`;
            
            if (isPdf) {
                // Render PDF inside an iframe with toolbar hidden
                const iframe = document.createElement('iframe');
                iframe.src = `${fileUrl}#toolbar=0&navpanes=0`;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '8px';
                slideDiv.appendChild(iframe);
            } else {
                // Render image
                const img = document.createElement('img');
                img.src = fileUrl;
                img.alt = `${title} - Screenshot ${index + 1}`;
                slideDiv.appendChild(img);
            }
            slidesContainer.appendChild(slideDiv);

            // Create dot indicator
            const dotSpan = document.createElement('span');
            dotSpan.className = `carousel-dot${index === 0 ? ' active' : ''}`;
            dotSpan.setAttribute('data-index', index);
            dotSpan.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dotSpan);
        });

        // Show modal with transition
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden'; // Lock scroll
        showSlide(0);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
        setTimeout(() => {
            modal.style.display = 'none';
            // Clear content to free resources and stop background processes
            slidesContainer.innerHTML = '';
            dotsContainer.innerHTML = '';
        }, 400); // Match CSS transition duration
    }

    // Attach trigger listeners
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // Control event listeners
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        }
    });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initTheme();
    typeText();
    createScrollTopButton();
    setupIntersectionObserver();
    setupDynamicGallery();
    
    // Mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Scroll events
    window.addEventListener('scroll', () => {
        toggleScrollTop();
        setActiveNavLink();
    });
    
    // Contact form (safeguarded against reference errors)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && typeof handleContactForm === 'function') {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
});

// ===== Window Resize Handler =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ===== Prevent Form Resubmission on Page Refresh =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
