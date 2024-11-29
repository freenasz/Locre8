// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Service Price Calculator
const serviceCards = document.querySelectorAll('.service-card');
const serviceSelect = document.getElementById('service-select');
const estimatedPrice = document.getElementById('estimated-price');
const jobRequestForm = document.getElementById('job-request-form');

// Service prices
const servicePrices = {
    'logo-design': 500,
    'product-design': 800,
    'business-branding': 1500,
    'web-development': 2000,
    'ui-ux-design': 1200,
    'video-editing': 1000
};

// Update price when service is selected
serviceSelect.addEventListener('change', (e) => {
    const selectedService = e.target.value;
    const price = servicePrices[selectedService];
    estimatedPrice.textContent = price ? `$${price}` : '$0';
});

// Handle service card selection
serviceCards.forEach(card => {
    card.querySelector('.select-service').addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
        serviceSelect.value = serviceName;
        serviceSelect.dispatchEvent(new Event('change'));
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// File Upload Handling
const fileUpload = document.getElementById('file-upload');
const fileList = document.getElementById('file-list');
let uploadedFiles = new Set();

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'application/x-rar-compressed'
    ];

    if (file.size > maxSize) {
        return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
        return 'File type not supported';
    }

    return null;
};

const addFileToList = (file) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileName = document.createElement('span');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    const fileSize = document.createElement('span');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-file';
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    removeButton.onclick = () => {
        fileItem.remove();
        uploadedFiles.delete(file);
    };
    
    fileItem.appendChild(fileName);
    fileItem.appendChild(fileSize);
    fileItem.appendChild(removeButton);
    fileList.appendChild(fileItem);
};

fileUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    const errorMessages = [];
    
    files.forEach(file => {
        const error = validateFile(file);
        if (error) {
            errorMessages.push(`${file.name}: ${error}`);
        } else if (!uploadedFiles.has(file)) {
            uploadedFiles.add(file);
            addFileToList(file);
        }
    });
    
    if (errorMessages.length > 0) {
        const existingError = document.querySelector('.file-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'file-error';
        errorDiv.textContent = errorMessages.join('\n');
        fileList.appendChild(errorDiv);
    }
});

// Form submission
jobRequestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: serviceSelect.value,
        message: document.getElementById('message').value,
        estimatedPrice: estimatedPrice.textContent,
        files: Array.from(uploadedFiles).map(file => file.name)
    };

    // Create email content
    const emailContent = `
        New Project Request from ${formData.name}
        
        Contact Information:
        - Name: ${formData.name}
        - Email: ${formData.email}
        - WhatsApp: ${formData.phone}
        
        Project Details:
        - Service: ${formData.service}
        - Estimated Budget: ${formData.estimatedPrice}
        
        Attached Files:
        ${formData.files.length > 0 ? formData.files.join('\n') : 'No files attached'}
        
        Message:
        ${formData.message}
    `;

    // Send email using mailto link
    const mailtoLink = `mailto:info@locre8.com?subject=New Project Request - ${formData.service}&body=${encodeURIComponent(emailContent)}`;
    window.location.href = mailtoLink;

    // Open WhatsApp in a new tab with pre-filled message
    const whatsappMessage = `Hi! I'm interested in your ${formData.service} service. My name is ${formData.name} and I'd like to discuss a project with an estimated budget of ${formData.estimatedPrice}.`;
    const whatsappLink = `https://wa.me/${formData.phone.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappLink, '_blank');
    
    // Show success message
    alert('Thank you for your request! We will contact you soon via email and WhatsApp.');
    jobRequestForm.reset();
    estimatedPrice.textContent = '$0';
    fileList.innerHTML = '';
    uploadedFiles.clear();
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d+\s-]/g, '');
    if (!value.startsWith('+')) {
        value = '+' + value;
    }
    e.target.value = value;
});

// Form validation
const validateForm = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Name validation
    if (name.value.length < 2) {
        name.setCustomValidity('Name must be at least 2 characters long');
        isValid = false;
    } else {
        name.setCustomValidity('');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.setCustomValidity('Please enter a valid email address');
        isValid = false;
    } else {
        email.setCustomValidity('');
    }
    
    // Phone validation
    const phoneRegex = /^\+[0-9\s-]{10,}$/;
    if (!phoneRegex.test(phone.value)) {
        phone.setCustomValidity('Please enter a valid phone number with country code');
        isValid = false;
    } else {
        phone.setCustomValidity('');
    }
    
    // Message validation
    if (message.value.length < 10) {
        message.setCustomValidity('Message must be at least 10 characters long');
        isValid = false;
    } else {
        message.setCustomValidity('');
    }
    
    return isValid;
};

// Add validation to form inputs
const formInputs = jobRequestForm.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateForm();
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});
