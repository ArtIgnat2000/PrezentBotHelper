let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Initialize and remember original dark-theme colors/backgrounds
(function initThemeData() {
    slides.forEach(slide => {
        if (!slide.getAttribute('data-bg-dark')) {
            const bg = slide.style.backgroundColor || getComputedStyle(slide).backgroundColor;
            slide.setAttribute('data-bg-dark', bg);
        }
        if (!slide.getAttribute('data-color-dark')) {
            const col = slide.style.color || getComputedStyle(slide).color;
            slide.setAttribute('data-color-dark', col);
        }
    });

    const cards = document.querySelectorAll('[data-card], [style*="background-color: #1e293b"]');
    cards.forEach(card => {
        if (!card.getAttribute('data-card-bg')) {
            const bg = card.style.backgroundColor || getComputedStyle(card).backgroundColor;
            card.setAttribute('data-card-bg', bg);
        }
    });

    // Save QR code container backgrounds
    document.querySelectorAll('[style*="border-radius: 12px"]').forEach(qr => {
        if (qr.style.padding && qr.tagName === 'DIV' && qr.querySelector('img[alt*="QR"]')) {
            if (!qr.getAttribute('data-bg-dark')) {
                const bg = qr.style.backgroundColor || getComputedStyle(qr).backgroundColor;
                qr.setAttribute('data-bg-dark', bg);
            }
        }
    });
})();

function updateSlideView() {
    slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });

    document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
    document.getElementById('prevBtn').disabled = currentSlideIndex === 0;
    document.getElementById('nextBtn').disabled = currentSlideIndex === totalSlides - 1;

    // Save current slide to localStorage
    localStorage.setItem('currentSlide', currentSlideIndex);
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlideView();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlideView();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
        event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
        event.preventDefault();
    }
});

function toggleTheme() {
    const body = document.body;
    const button = document.querySelector('.theme-toggle');

    if (body.classList.contains('theme-dark')) {
        // Switch to LIGHT theme
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        button.textContent = '🌙 Ночь';

        // Set all slides to light
        slides.forEach(slide => {
            slide.style.backgroundColor = '#ffffff';
            slide.style.color = '#1e293b';
        });

        // Update headings
        document.querySelectorAll('h1, h2, h3').forEach(h => {
            h.style.color = '#0284c7';
        });

        // Update paragraph text
        document.querySelectorAll('p').forEach(p => {
            if (!p.closest('pre')) {
                p.style.color = '#475569';
            }
        });

        // Update cards/blocks
        document.querySelectorAll('[style*="background-color: rgb(30, 41, 59)"], [style*="background-color: #1e293b"]').forEach(card => {
            card.style.backgroundColor = '#f1f5f9';
            card.style.color = '#1e293b';
            
            // Update nested headings
            card.querySelectorAll('h3').forEach(h => h.style.color = '#0284c7');
            // Update nested paragraphs
            card.querySelectorAll('p').forEach(p => p.style.color = '#475569');
        });

        // Update slide backgrounds (slides themselves)
        document.querySelectorAll('[style*="background-color: rgb(15, 23, 42)"], [style*="background-color: #0f172a"], [style*="background-color: #020617"]').forEach(slide => {
            if (slide.classList.contains('slide')) {
                slide.style.backgroundColor = '#ffffff';
            }
        });

        // Code blocks
        document.querySelectorAll('pre').forEach(pre => {
            pre.style.backgroundColor = '#f8fafc';
            pre.style.border = '1px solid #cbd5e1';
            // Keep syntax highlighting colors as is for light theme
        });

        // QR code containers
        document.querySelectorAll('[style*="border-radius: 12px"]').forEach(qr => {
            if (qr.style.padding && qr.tagName === 'DIV' && qr.querySelector('img[alt*="QR"]')) {
                qr.style.borderColor = '#0284c7';
                qr.style.backgroundColor = '#ffffff';
            }
        });

        localStorage.setItem('theme', 'light');
    } else {
        // Switch to DARK theme
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        button.textContent = '☀️ День';

        // Restore dark backgrounds
        slides.forEach(slide => {
            const bgColor = slide.getAttribute('data-bg-dark');
            slide.style.backgroundColor = bgColor || '#0f172a';
            slide.style.color = '#f1f5f9';
        });

        // Restore headings
        document.querySelectorAll('h1, h2, h3').forEach(h => {
            h.style.color = '#38bdf8';
        });

        // Restore paragraph text
        document.querySelectorAll('p').forEach(p => {
            if (!p.closest('pre')) {
                p.style.color = '#cbd5e1';
            }
        });

        // Restore dark card backgrounds
        document.querySelectorAll('[style*="background-color: rgb(241, 245, 249)"], [style*="background-color: #f1f5f9"]').forEach(card => {
            card.style.backgroundColor = '#1e293b';
            card.style.color = '#f1f5f9';
            
            // Restore nested headings
            card.querySelectorAll('h3').forEach(h => h.style.color = '#38bdf8');
            // Restore nested paragraphs
            card.querySelectorAll('p').forEach(p => p.style.color = '#cbd5e1');
        });

        // Restore code blocks
        document.querySelectorAll('pre').forEach(pre => {
            pre.style.backgroundColor = '#1e293b';
            pre.style.border = 'none';
            // Keep syntax highlighting colors as is for dark theme
        });

        // Restore QR code containers
        document.querySelectorAll('[style*="border-radius: 12px"]').forEach(qr => {
            if (qr.style.padding && qr.tagName === 'DIV' && qr.querySelector('img[alt*="QR"]')) {
                qr.style.borderColor = '#38bdf8';
                const bgDark = qr.getAttribute('data-bg-dark');
                qr.style.backgroundColor = bgDark || '#0f172a';
            }
        });

        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference and slide position
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedSlide = parseInt(localStorage.getItem('currentSlide') || '0');

    // Restore slide position
    currentSlideIndex = savedSlide;
    updateSlideView();

    // Apply saved theme
    if (savedTheme === 'light') {
        // Manually trigger light theme without toggling
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        document.querySelector('.theme-toggle').textContent = '🌙 Ночь';
        
        // Apply light theme styles
        slides.forEach(slide => {
            slide.style.backgroundColor = '#ffffff';
            slide.style.color = '#1e293b';
        });

        document.querySelectorAll('h1, h2, h3').forEach(h => h.style.color = '#0284c7');
        document.querySelectorAll('p').forEach(p => {
            if (!p.closest('pre')) p.style.color = '#475569';
        });

        document.querySelectorAll('[style*="background-color: rgb(30, 41, 59)"], [style*="background-color: #1e293b"]').forEach(card => {
            card.style.backgroundColor = '#f1f5f9';
            card.style.color = '#1e293b';
            card.querySelectorAll('h3').forEach(h => h.style.color = '#0284c7');
            card.querySelectorAll('p').forEach(p => p.style.color = '#475569');
        });

        document.querySelectorAll('pre').forEach(pre => {
            pre.style.backgroundColor = '#f8fafc';
            pre.style.border = '1px solid #cbd5e1';
        });

        // QR code containers
        document.querySelectorAll('[style*="border-radius: 12px"]').forEach(qr => {
            if (qr.style.padding && qr.tagName === 'DIV' && qr.querySelector('img[alt*="QR"]')) {
                qr.style.borderColor = '#0284c7';
                qr.style.backgroundColor = '#ffffff';
            }
        });
    }
});