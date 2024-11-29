# Locre8 - Creative Design Agency Website

A modern, responsive website for Locre8 Design Agency featuring a black theme with green accents.

## Features

- Responsive design for all screen sizes
- Interactive project slider
- Service pricing cards
- Job request form
- Modern animations and transitions
- Mobile-friendly navigation

## File Structure

```
locre8-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styling and animations
├── js/
│   └── main.js        # Interactive features
└── images/            # Website images
    ├── hero-bg.jpg    # Hero section background
    ├── project1.jpg   # Project slider image 1
    ├── project2.jpg   # Project slider image 2
    └── project3.jpg   # Project slider image 3
```

## Setup Instructions

1. Replace the placeholder images in the `images` directory with your own:
   - `hero-bg.jpg`: Hero section background (recommended size: 1920x1080px)
   - `project1.jpg`, `project2.jpg`, `project3.jpg`: Project slider images (recommended size: 1200x800px)

2. Customize the content:
   - Update service prices in `js/main.js`
   - Modify contact information in the footer
   - Add your social media links

3. Testing:
   - Open `index.html` in a web browser to view the website
   - Test the responsive design using browser developer tools
   - Verify all forms and interactive features

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Swiper.js for project slider
- Google Fonts (Roboto, Montserrat)
- Font Awesome icons

## Customization

### Colors
The website uses a black theme with green accents. To change the colors, modify the following variables in `css/style.css`:

```css
:root {
    --primary-color: #000000;    /* Main background color */
    --secondary-color: #57B039;  /* Accent color */
    --text-color: #ffffff;       /* Text color */
}
```

### Services
To modify service prices, update the `servicePrices` object in `js/main.js`:

```javascript
const servicePrices = {
    'logo-design': 500,
    'product-design': 800,
    // ... add or modify services and prices
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The website uses modern CSS features like Grid and Flexbox
- All interactive features are implemented with vanilla JavaScript
- The contact form requires backend implementation for actual submission
- Images should be optimized for web use to ensure fast loading

## Future Enhancements

- Add image lazy loading
- Implement dark/light theme toggle
- Add more project portfolio items
- Integrate with a backend for form submission
- Add blog section
- Implement project filtering
