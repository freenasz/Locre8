// Image Credits
const imageCredits = {
    // Hero Image
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    
    // Project Images
    'project1.jpg': 'https://images.unsplash.com/photo-1636633762833-5d1538de4082', // Brand Identity
    'project2.jpg': 'https://images.unsplash.com/photo-1547658719-da2b51169166', // E-commerce
    'project3.jpg': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', // Mobile App
    'project4.jpg': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa', // Product Design
    
    // Testimonial Images
    'client1.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', // Sarah
    'client2.jpg': 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf', // Michael
    'client3.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956', // Emma
};

// Append image credits to the footer
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer');
    if (footer) {
        const creditsSection = document.createElement('div');
        creditsSection.className = 'image-credits';
        creditsSection.innerHTML = `
            <small>
                Images courtesy of <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
            </small>
        `;
        footer.appendChild(creditsSection);
    }
});
