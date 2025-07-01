// Product Data
const products = [
    {
        id: 1,
        name: "Deep Hydration Facial Cream",
        category: "Moisturizer",
        description: "Restore your skin's moisture barrier with this best-selling hydrating cream. Ideal for dry or sensitive skin.",
        image: "img/hydration-cream.jpg",
        amazonAffiliateLink: "https://amzn.to/3ZVXmQJ",
        rating: "4.8",
        reviewsCount: "12,345",
        featured: true,
        icon: "💧"
    },
    {
        id: 2,
        name: "Vitamin C Brightening Serum",
        category: "Treatment",
        description: "Boost glow and reduce dark spots with this powerful Vitamin C serum. A must-have for radiant skin.",
        image: "img/vitamin-c-serum.jpg",
        amazonAffiliateLink: "https://amzn.to/3IpTKjO",
        rating: "4.7",
        reviewsCount: "8,932",
        featured: true,
        icon: "✨"
    },
    {
        id: 3,
        name: "Gentle Foaming Face Cleanser",
        category: "Cleansing",
        description: "Clean your face without stripping it of moisture. This foam cleanser is perfect for daily use.",
        image: "img/foam-cleanser.jpg",
        amazonAffiliateLink: "https://amzn.to/4kjfbAE",
        rating: "4.6",
        reviewsCount: "15,678",
        featured: false,
        icon: "🧴"
    },
    {
        id: 4,
        name: "Soothing Green Tea Toner",
        category: "Toner",
        description: "Calm irritated skin with this antioxidant-rich toner infused with green tea and witch hazel.",
        image: "img/green-tea-toner.jpg",
        amazonAffiliateLink: "https://amzn.to/4lzGHee",
        rating: "4.7",
        reviewsCount: "9,456",
        featured: false,
        icon: "🌿"
    },
    {
        id: 5,
        name: "Night Repair Sleep Mask",
        category: "Treatment",
        description: "Wake up with plump, rejuvenated skin thanks to this overnight mask with active botanicals.",
        image: "img/sleep-mask.jpg",
        amazonAffiliateLink: "https://amzn.to/44cCGGN",
        rating: "4.8",
        reviewsCount: "7,890",
        featured: true,
        icon: "💤"
    },
    {
        id: 6,
        name: "Blackhead Remover Strips",
        category: "Treatment",
        description: "Say goodbye to blackheads instantly with these high-strength pore cleansing nose strips.",
        image: "img/blackhead-strips.jpg",
        amazonAffiliateLink: "https://amzn.to/4keIoMT",
        rating: "4.5",
        reviewsCount: "20,145",
        featured: false,
        icon: "🧽"
    },
    {
        id: 7,
        name: "Blue Light Protection Cream",
        category: "Protection",
        description: "Protect your skin from screen fatigue and blue light damage with this specialized day cream.",
        image: "img/blue-light-cream.jpg",
        amazonAffiliateLink: "https://amzn.to/44kZeFr",
        rating: "4.6",
        reviewsCount: "5,678",
        featured: false,
        icon: "👓"
    },
    {
        id: 8,
        name: "Retinol Anti-Aging Formula",
        category: "Treatment",
        description: "Smooth wrinkles and fine lines with this dermatologist-approved retinol night serum.",
        image: "img/retinol-serum.jpg",
        amazonAffiliateLink: "https://amzn.to/4lec1zs",
        rating: "4.9",
        reviewsCount: "11,234",
        featured: true,
        icon: "🔬"
    },
    {
        id: 9,
        name: "Rose Water Face Mist",
        category: "Hydration",
        description: "Refresh and hydrate on the go with this rose-infused face mist — perfect for all skin types.",
        image: "img/rose-mist.jpg",
        amazonAffiliateLink: "https://amzn.to/44GsMgy",
        rating: "4.7",
        reviewsCount: "6,789",
        featured: false,
        icon: "🌸"
    },
    {
        id: 10,
        name: "Cooling Eye Gel",
        category: "Treatment",
        description: "Reduce puffiness and dark circles with this soothing under-eye gel. A morning ritual essential.",
        image: "img/eye-gel.jpg",
        amazonAffiliateLink: "https://amzn.to/44GUpWR",
        rating: "4.8",
        reviewsCount: "8,901",
        featured: false,
        icon: "��"
    }
];

// Performance optimization: Use requestIdleCallback for non-critical tasks
function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
    } else {
        setTimeout(callback, 1);
    }
}

// Dark Mode Functionality with system preference detection
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for system preference first, then saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'enabled' || (savedMode === null && prefersDark)) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.setAttribute('aria-pressed', 'true');
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            darkModeToggle.setAttribute('aria-pressed', isDark.toString());
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            body.classList.toggle('dark-mode', e.matches);
        }
    });
}

// Enhanced Mobile Menu Functionality with accessibility
function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!burgerMenu || !navLinks) return;

    burgerMenu.addEventListener('click', () => {
        const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
        
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        burgerMenu.setAttribute('aria-expanded', (!isExpanded).toString());
        
        // Focus management
        if (!isExpanded) {
            navLinks.querySelector('a')?.focus();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
            burgerMenu.focus();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// Product Carousel Functionality
function initProductCarousel() {
    const carousel = document.querySelector('.product-carousel');
    if (!carousel) return;

    const featuredProducts = products.filter(product => product.featured);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        carousel.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    card.innerHTML = `
        <div class="product-icon">${product.icon}</div>
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <span class="category">${product.category}</span>
            <p class="product-description">${product.description}</p>
            <div class="rating">
                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                <span class="count">(${product.reviewsCount} reviews)</span>
            </div>
            <div class="product-cta">
                <a href="${product.amazonAffiliateLink}" class="btn amazon" target="_blank" rel="nofollow noopener">
                    <i class="fab fa-amazon"></i>
                    View on Amazon
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Filter Products
function filterProducts(category) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => observer.observe(element));
}

// Form Validation
function validateContactForm(form) {
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }
    
    if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = message;
    } else {
        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = message;
        input.parentNode.insertBefore(div, input.nextSibling);
    }
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        runWhenIdle(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Critical functionality first
    initDarkMode();
    initMobileMenu();
    
    // Non-critical functionality with idle callback
    runWhenIdle(() => {
        initProductCarousel();
        initAnimations();
        logPerformanceMetrics();
    });
    
    // Initialize filter buttons if they exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            filterProducts(button.dataset.category);
        });
    });
    
    // Initialize contact form validation if it exists
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateContactForm(contactForm)) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.setAttribute('role', 'alert');
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 5000);
            }
        });
    }
}); 