// ============= SMOOTH SCROLL NAVIGATION =============
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============= INTERSECTION OBSERVER FOR ANIMATIONS =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getComputedStyle(entry.target).animation;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.featured-card, .archive-card, .scholar-card').forEach(el => {
    observer.observe(el);
});

// ============= PARALLAX EFFECT ON ORNAMENTAL DIVIDERS =============
const ornamentalDividers = document.querySelectorAll('.ornamental-divider');

window.addEventListener('scroll', () => {
    ornamentalDividers.forEach(divider => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = divider.offsetTop;
        const distance = elementOffset - scrollPosition;
        
        if (distance > -window.innerHeight && distance < window.innerHeight) {
            divider.style.transform = `translateX(${distance * 0.05}px)`;
        }
    });
});

// ============= HOVER EFFECTS FOR FEATURED CARDS =============
const featuredCards = document.querySelectorAll('.featured-card');

featuredCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 16px 48px rgba(200, 155, 60, 0.35), inset 0 0 40px rgba(200, 155, 60, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 32px rgba(200, 155, 60, 0.15), inset 0 0 20px rgba(200, 155, 60, 0.05)';
    });
});

// ============= ENHANCED BUTTON RIPPLE EFFECT =============
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============= SCROLL-TO-TOP BUTTON =============
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--gold);
    color: var(--charcoal);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(200, 155, 60, 0.3);
    transition: all 0.3s ease;
    font-weight: bold;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', function() {
    this.style.background = '#d4a850';
    this.style.boxShadow = '0 8px 25px rgba(200, 155, 60, 0.5)';
});

scrollToTopBtn.addEventListener('mouseout', function() {
    this.style.background = 'var(--gold)';
    this.style.boxShadow = '0 4px 15px rgba(200, 155, 60, 0.3)';
});

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'c' || e.key === 'C') {
        const collectionsSection = document.querySelector('#collections');
        if (collectionsSection) {
            collectionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============= DYNAMIC TEXT REVEAL =============
function createTextReveal(element) {
    const text = element.innerText;
    element.innerText = '';
    
    let delay = 0;
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeIn 0.1s ease-out forwards`;
        span.style.animationDelay = `${delay * 0.03}s`;
        element.appendChild(span);
        delay++;
    }
}

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(revealStyle);

// Apply text reveal to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        createTextReveal(heroTitle);
    });
}

// ============= CUSTOM CURSOR EFFECT =============
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(200, 155, 60, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
    transition: all 0.1s ease;
    box-shadow: inset 0 0 10px rgba(200, 155, 60, 0.2);
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = (mouseX - 10) + 'px';
    cursor.style.top = (mouseY - 10) + 'px';
    cursor.style.display = 'block';
});

window.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// Enhance cursor on interactive elements
const interactiveElements = document.querySelectorAll('.btn, a, .featured-card, .archive-card, .scholar-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.left = (mouseX - 15) + 'px';
        cursor.style.top = (mouseY - 15) + 'px';
        cursor.style.boxShadow = '0 0 20px rgba(200, 155, 60, 0.4), inset 0 0 10px rgba(200, 155, 60, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.left = (mouseX - 10) + 'px';
        cursor.style.top = (mouseY - 10) + 'px';
        cursor.style.boxShadow = 'inset 0 0 10px rgba(200, 155, 60, 0.2)';
    });
});

// ============= PAGE LOAD ANIMATION =============
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'pageLoad 1s ease-out forwards';
});

const pageLoadStyle = document.createElement('style');
pageLoadStyle.textContent = `
    @keyframes pageLoad {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(pageLoadStyle);