// Vercel Speed Insights initialization
// This script loads and initializes Vercel Speed Insights for performance tracking

(function() {
    // Initialize the Speed Insights queue
    window.si = window.si || function () { 
        (window.siq = window.siq || []).push(arguments); 
    };

    // Create and inject the Speed Insights script
    const script = document.createElement('script');
    script.src = '/_vercel/speed-insights/script.js';
    script.defer = true;
    
    // Error handling
    script.onerror = function() {
        console.warn('Speed Insights: Failed to load script. This is normal in development.');
    };
    
    // Append script to document
    if (document.head) {
        document.head.appendChild(script);
    } else {
        // Fallback if head doesn't exist yet
        document.addEventListener('DOMContentLoaded', function() {
            document.head.appendChild(script);
        });
    }
})();
