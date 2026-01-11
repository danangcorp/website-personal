// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Hello, I'm Danang Arya Saputra",
        "I'm a Developer",
        "I'm a Designer",
        "I Create Amazing Things"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000); // Pause before deleting
                return;
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Skills progress bar animation
    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add fade-in animation classes
                if (target.classList.contains('about-text')) {
                    target.classList.add('fade-in-left');
                    setTimeout(animateCounters, 500);
                }
                
                if (target.classList.contains('about-image')) {
                    target.classList.add('fade-in-right');
                }
                
                if (target.classList.contains('skills-grid')) {
                    target.classList.add('fade-in-up');
                    setTimeout(animateSkills, 500);
                }
                
                if (target.classList.contains('projects-grid')) {
                    target.classList.add('fade-in-up');
                }
                
                if (target.classList.contains('contact-content')) {
                    target.classList.add('fade-in-up');
                }
                
                // Animate project cards individually
                if (target.classList.contains('project-card')) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        target.style.transition = 'all 0.6s ease';
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                }
                
                // Animate skill categories
                if (target.classList.contains('skill-category')) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        target.style.transition = 'all 0.6s ease';
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    document.querySelectorAll('.about-text, .about-image, .skills-grid, .projects-grid, .contact-content, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(45deg, #f44336, #da190b)';
        } else {
            notification.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 500);
    });
    
    // Mouse cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
    
    // Hide cursor when not moving
    let mouseTimeout;
    document.addEventListener('mousemove', function() {
        cursor.style.opacity = '1';
        clearTimeout(mouseTimeout);
        
        mouseTimeout = setTimeout(() => {
            cursor.style.opacity = '0';
        }, 1000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Performance optimization - throttle scroll events
    let scrollTimeout;
    function throttleScroll(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll events
    window.addEventListener('scroll', throttleScroll(updateActiveNav, 100));
    
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Preload images for better performance
    function preloadImages() {
        const images = [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Start preloading images
    preloadImages();
    
    // Add some easter eggs
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
                // Add some fun effects
                document.body.style.animation = 'rainbow 2s linear infinite';
                
                // Create rainbow keyframe animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
                
                // Remove effect after 5 seconds
                setTimeout(() => {
                    document.body.style.animation = '';
                    style.remove();
                }, 5000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Add particle system for background
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            animation: float 6s linear infinite;
        `;
        
        // Random position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        let opacity = 0;
        let position = window.innerHeight;
        const speed = Math.random() * 2 + 1;
        
        const animateParticle = () => {
            position -= speed;
            opacity = position > window.innerHeight * 0.8 ? 
                     (window.innerHeight - position) / (window.innerHeight * 0.2) : 
                     position < window.innerHeight * 0.2 ? 
                     position / (window.innerHeight * 0.2) : 1;
            
            particle.style.top = position + 'px';
            particle.style.opacity = opacity * 0.3;
            
            if (position > -10) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add scroll to top button
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.transform = 'scale(1)';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.transform = 'scale(0)';
        }
    });
    
    // Scroll to top functionality
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = diameter + 'px';
        circle.style.left = event.clientX - button.offsetLeft - radius + 'px';
        circle.style.top = event.clientY - button.offsetTop - radius + 'px';
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        // Add ripple styles
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.6);
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }
    }
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, button').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        transform: translateY(-50%);
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Dark mode functionality
    let isDarkMode = false;
    darkModeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            showNotification('Dark mode activated! 🌙', 'info');
        } else {
            document.body.style.filter = 'none';
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            showNotification('Light mode activated! ☀️', 'info');
        }
    });
    
    // Add floating action menu
    const fab = document.createElement('div');
    fab.className = 'fab-container';
    fab.innerHTML = `
        <button class="fab-main">
            <i class="fas fa-plus"></i>
        </button>
        <div class="fab-options">
            <button class="fab-option" data-action="share">
                <i class="fas fa-share-alt"></i>
            </button>
            <button class="fab-option" data-action="print">
                <i class="fas fa-print"></i>
            </button>
            <button class="fab-option" data-action="email">
                <i class="fas fa-envelope"></i>
            </button>
        </div>
    `;
    
    fab.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 1000;
    `;
    
    document.body.appendChild(fab);
    
    // FAB functionality
    const fabMain = fab.querySelector('.fab-main');
    const fabOptions = fab.querySelector('.fab-options');
    let fabOpen = false;
    
    fabMain.addEventListener('click', function() {
        fabOpen = !fabOpen;
        
        if (fabOpen) {
            fabMain.style.transform = 'rotate(45deg)';
            fabOptions.style.display = 'block';
            fabOptions.style.opacity = '1';
        } else {
            fabMain.style.transform = 'rotate(0deg)';
            fabOptions.style.opacity = '0';
            setTimeout(() => {
                fabOptions.style.display = 'none';
            }, 300);
        }
    });
    
    // FAB options functionality
    fab.querySelectorAll('.fab-option').forEach(option => {
        option.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'share':
                    if (navigator.share) {
                        navigator.share({
                            title: 'Check out this amazing portfolio!',
                            url: window.location.href
                        });
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        showNotification('Link copied to clipboard!', 'success');
                    }
                    break;
                case 'print':
                    window.print();
                    break;
                case 'email':
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    break;
            }
            
            // Close FAB
            fabOpen = false;
            fabMain.style.transform = 'rotate(0deg)';
            fabOptions.style.opacity = '0';
            setTimeout(() => {
                fabOptions.style.display = 'none';
            }, 300);
        });
    });
    
    // Add page transition effects
    let isTransitioning = false;
    
    function createPageTransition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #667eea, #764ba2);
            z-index: 10000;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.transform = 'scaleX(1)';
        }, 10);
        
        setTimeout(() => {
            overlay.style.transformOrigin = 'right';
            overlay.style.transform = 'scaleX(0)';
        }, 600);
        
        setTimeout(() => {
            overlay.remove();
            isTransitioning = false;
        }, 1100);
    }
    
    // Add performance monitoring
    let performanceData = {
        loadTime: 0,
        scrollEvents: 0,
        clickEvents: 0
    };
    
    window.addEventListener('load', function() {
        performanceData.loadTime = performance.now();
        console.log(`Page loaded in ${performanceData.loadTime.toFixed(2)}ms`);
    });
    
    window.addEventListener('scroll', function() {
        performanceData.scrollEvents++;
    });
    
    document.addEventListener('click', function() {
        performanceData.clickEvents++;
    });
    
    // Log performance data every 30 seconds
    setInterval(() => {
        console.log('Performance Data:', performanceData);
    }, 30000);
    
    // Add accessibility improvements
    function improveAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add aria labels to interactive elements
        document.querySelectorAll('button, a, input, textarea').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                if (element.querySelector('i')) {
                    const iconClass = element.querySelector('i').className;
                    element.setAttribute('aria-label', `Button with ${iconClass} icon`);
                }
            }
        });
        
        // Add focus indicators
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            *:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
            }
            
            .skip-link:focus {
                outline: none;
            }
        `;
        document.head.appendChild(focusStyle);
    }
    
    // Initialize accessibility improvements
    improveAccessibility();
    
    // Add final initialization message
    console.log('Portfolio website fully loaded and initialized! 🚀');
    showNotification('Welcome to my portfolio! 👋', 'info');
    
});