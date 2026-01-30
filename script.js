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
            slide.style.color = '#000000';
        });

        // Set all text elements to black
        document.querySelectorAll('*').forEach(el => {
            if (el.style.color && el.style.color !== '#0284c7' && el.style.color !== '#38bdf8') {
                el.style.color = '#000000';
            }
        });

        // Force heading colors
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
            h.style.color = '#0284c7';
        });

        // Light card backgrounds
        document.querySelectorAll('[style*="background-color"]').forEach(card => {
            if (card.style.backgroundColor === '#1e293b' || card.style.backgroundColor === '#020617') {
                card.style.backgroundColor = '#f1f5f9';
            }
            if (card.style.color) {
                card.style.color = '#000000';
            }
        });

        // Code blocks
        document.querySelectorAll('pre').forEach(pre => {
            pre.style.backgroundColor = '#f1f5f9';
            pre.style.color = '#0284c7';
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

        // Restore all light text colors
        document.querySelectorAll('*').forEach(el => {
            const style = el.getAttribute('style');
            if (style && style.includes('color:')) {
                // Headings stay cyan
                if (el.tagName.match(/H[1-6]/)) {
                    el.style.color = '#38bdf8';
                }
                // Everything else gets light gray, unless it's accent color
                else if (el.style.color !== '#38bdf8' && el.style.color !== '#0284c7') {
                    el.style.color = '#cbd5e1';
                }
            }
        });

        // Restore dark card backgrounds
        document.querySelectorAll('[style*="background-color"]').forEach(card => {
            if (card.style.backgroundColor === '#f1f5f9') {
                card.style.backgroundColor = '#1e293b';
            }
            if (card.style.color) {
                card.style.color = '#f1f5f9';
            }
        });

        // Code blocks
        document.querySelectorAll('pre').forEach(pre => {
            pre.style.backgroundColor = '#1e293b';
            pre.style.color = '#38bdf8';
        });

        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference and slide position
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedSlide = parseInt(localStorage.getItem('currentSlide') || '0');
    const body = document.body;
    const button = document.querySelector('.theme-toggle');

    // Restore slide position
    currentSlideIndex = savedSlide;
    updateSlideView();

    if (savedTheme === 'light') {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        button.textContent = '🌙 Ночь';

        // Apply light theme to slides
        slides.forEach(slide => {
            slide.style.backgroundColor = '#ffffff';
            slide.style.color = '#000000';
        });

        // Set all text elements to black
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const style = el.getAttribute('style') || '';
            if (style.includes('color') && !style.includes('#0284c7') && !style.includes('#38bdf8')) {
                el.style.color = '#000000';
            }
        });

        const cards = document.querySelectorAll('[style*="background-color: #1e293b"]');
        cards.forEach(card => {
            card.style.backgroundColor = '#f1f5f9 !important';
            card.style.color = '#000000 !important';
        });

        const pres = document.querySelectorAll('pre');
        pres.forEach(pre => {
            pre.style.backgroundColor = '#f1f5f9';
            pre.style.color = '#0284c7';
        });
    } else {
        // Restore dark theme
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        button.textContent = '☀️ День';

        // Force light colors for dark theme
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const style = el.getAttribute('style') || '';
            if (style.includes('color:')) {
                // Replace dark colors with light ones
                if (style.includes('#f1f5f9') || style.includes('#cbd5e1') || style.includes('#94a3b8')) {
                    el.style.color = '#cbd5e1';
                }
            }
        });

        slides.forEach(slide => {
            slide.style.backgroundColor = slide.getAttribute('data-bg-dark') || '#0f172a';
            slide.style.color = '#cbd5e1';
        });

        const cards = document.querySelectorAll('[style*="background-color"]');
        cards.forEach(card => {
            if (card.style.backgroundColor !== '#f1f5f9') {
                card.style.backgroundColor = '#1e293b';
                card.style.color = '#cbd5e1';
            }
        });

        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(h => h.style.color = '#38bdf8');

        const pres = document.querySelectorAll('pre');
        pres.forEach(pre => {
            pre.style.backgroundColor = '#1e293b';
            pre.style.color = '#38bdf8';
        });
    }
});