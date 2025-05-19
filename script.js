document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on page load
    animateElements();
    
    // Add parallax effect to header background
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (header) {
            header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });
    
    // Add hover effects to timeline items
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

function animateElements() {
    // Animate price tag with a slight bounce effect
    const priceTag = document.querySelector('.price-tag');
    if (priceTag) {
        setTimeout(() => {
            priceTag.style.animation = 'bounce 0.5s ease';
            priceTag.style.transform = 'scale(1.1)';
            setTimeout(() => {
                priceTag.style.transform = 'scale(1)';
                priceTag.style.transition = 'transform 0.3s ease';
            }, 500);
        }, 300);
    }
    
    // Fade in timeline items sequentially
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
    
    // Add a subtle highlight effect to service items
    const serviceItems = document.querySelectorAll('.services li');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

// Add CSS animation for bounce effect
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.highlight-box img {
    transition: transform 0.5s ease;
}

.highlight-box:hover img {
    transform: scale(1.05);
}
</style>
`);

// Add current time to display when the page loads
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}); 