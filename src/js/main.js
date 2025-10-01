// Main JavaScript for Telugu News Site
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form handling
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button[type="submit"]');
            
            if (email) {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>సబ్మిట్ అవుతోంది...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-check2 me-2"></i>సబ్‌స్క్రైబ్ చేయబడింది!';
                    this.reset();
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('తెలుగు వార్తలు వెబ్‌సైట్ లోడ్ అయింది!');
});
