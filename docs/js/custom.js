// Custom JavaScript for shebik's MkDocs site

document.addEventListener('DOMContentLoaded', function() {
    // Add current year to footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add copy-to-clipboard functionality for code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fa fa-copy"></i>';
        button.title = 'Copy to clipboard';
        
        const pre = block.parentElement;
        if (pre) {
            pre.style.position = 'relative';
            button.style.position = 'absolute';
            button.style.top = '8px';
            button.style.right = '8px';
            button.style.opacity = '0.7';
            button.style.transition = 'opacity 0.3s';
            
            button.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.opacity = '0.7';
            });
            
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(block.textContent).then(() => {
                    button.innerHTML = '<i class="fa fa-check"></i>';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fa fa-copy"></i>';
                    }, 2000);
                });
            });
            
            pre.appendChild(button);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .project-card, .contact-card').forEach((el) => {
        observer.observe(el);
    });
});
