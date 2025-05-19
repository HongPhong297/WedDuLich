// Preload images to improve performance
document.addEventListener('DOMContentLoaded', function() {
    // Define the images to preload
    const imagesToPreload = [
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVzLHRyYW5zcG9ydHx8fHx8fDE2MTYyMzQ4MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVhY2gsc3dpbW1pbmd8fHx8fHwxNjE2MjM0ODI0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1504851150844-3a9f282bb548?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtcGluZyx0ZW50fHx8fHx8MTYxNjIzNDgyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1529417305485-480f579e7578?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8YmJxLGRpbm5lcnx8fHx8fDE2MTYyMzQ4MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1475483768296-6163e08872a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtcGZpcmUsbmlnaHR8fHx8fHwxNjE2MjM0ODI0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8c3VucmlzZSxiZWFjaHx8fHx8fDE2MTYyMzQ4MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1509365465985-25d11c17e812?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8YnJlYWtmYXN0LG5vb2RsZXx8fHx8fDE2MTYyMzQ4MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100',
        'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtcGluZyxiZWFjaCxzdW5zZXR8fHx8fHwxNjE2MjM0ODI0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=400'
    ];
    
    // Create a loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '100%';
    loadingIndicator.style.height = '4px';
    loadingIndicator.style.backgroundColor = '#ddd';
    loadingIndicator.style.zIndex = '9999';
    
    const loadingProgress = document.createElement('div');
    loadingProgress.style.height = '100%';
    loadingProgress.style.width = '0';
    loadingProgress.style.backgroundColor = '#ff6b00';
    loadingProgress.style.transition = 'width 0.3s ease-in-out';
    
    loadingIndicator.appendChild(loadingProgress);
    document.body.appendChild(loadingIndicator);
    
    // Preload images
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;
    
    function updateProgress() {
        const progressPercent = (loadedCount / totalImages) * 100;
        loadingProgress.style.width = progressPercent + '%';
        
        if (loadedCount === totalImages) {
            setTimeout(() => {
                loadingIndicator.style.opacity = '0';
                setTimeout(() => {
                    loadingIndicator.remove();
                }, 1000);
            }, 500);
        }
    }
    
    // Load each image
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = function() {
            loadedCount++;
            updateProgress();
        };
        img.onerror = function() {
            loadedCount++;
            updateProgress();
        };
        img.src = src;
    });
    
    // Add image lazy loading to all images in the poster
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
    
    // Add a browser feature detection for optimal performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        allImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}); 