// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const rootElement = document.documentElement;
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        rootElement.classList.add('light-mode');
        updateDarkModeIcon(true);
    } else if (savedTheme === 'dark') {
        rootElement.classList.remove('light-mode');
        updateDarkModeIcon(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        rootElement.classList.add('light-mode');
        updateDarkModeIcon(true);
    }
    
    // Toggle dark/light mode
    darkModeToggle.addEventListener('click', function() {
        rootElement.classList.toggle('light-mode');
        const isLightMode = rootElement.classList.contains('light-mode');
        
        // Save preference to localStorage
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        // Update icon
        updateDarkModeIcon(isLightMode);
    });
    
    function updateDarkModeIcon(isLightMode) {
        const moonIcon = darkModeToggle.querySelector('.fa-moon');
        const sunIcon = darkModeToggle.querySelector('.fa-sun');
        
        if (isLightMode) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        } else {
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
        }
    }
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const options = {
        strings: ['Web Developer','Mobile Developer', 'UI/UX Designer',  'Quality Assurance','Freelancer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    };
    
    const typed = new Typed('.typed-text', options);
    
    // Add animation class to elements
    const animatedElements = document.querySelectorAll('.hero-text h1, .hero-text h2, .hero-description, .hero-buttons, .social-icons, .hero-image');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fadeIn');
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-3';
            successMessage.textContent = 'Your message has been sent successfully!';
            
            this.appendChild(successMessage);
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Skill Progress Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = value + '%';
            }, 200);
        });
    }
    
    // Intersection Observer for Skill Section
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
});