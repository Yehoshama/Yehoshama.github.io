const fs = require('fs');
const path = require('path');

const dir = 'd:/Documents/Antigravity/YehoshamaFoundation/YehoshamaComWebsite';
const files = ['index.html', 'about.html', 'contact.html', 'products.html', 'services.html', 'blog.html'];

const oldTopBanner = '<div class="construction-banner">🚧 Site Under Construction 🚧</div>';
const newBanner = '<div class="construction-banner">\n        🚧 This website is currently under construction. Please read our <a href="license.html" style="color: white; text-decoration: underline;">Temporary License & Disclaimer</a>. 🚧\n    </div>';
const footerTag = '<footer class="site-footer">';

files.forEach(file => {
    const filePath = path.join(dir, file);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        let modified = false;

        // Replace the top banner if it's the old one
        if (content.includes(oldTopBanner)) {
            content = content.replace(oldTopBanner, newBanner);
            modified = true;
        } else if (content.includes('🚧 This website is currently under construction.')) {
            // Check if top banner is already updated.
            // If it is, but it's not the top banner? Wait.
        }

        // Add the bottom banner right before the footer
        // Let's just check if it already exists right before the footer.
        // We'll use split.
        const parts = content.split(footerTag);
        if (parts.length === 2) {
            const beforeFooter = parts[0];
            if (!beforeFooter.includes('Temporary License & Disclaimer</a>. 🚧')) {
                // Insert the banner
                content = parts[0] + newBanner + '\n\n    ' + footerTag + parts[1];
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`No changes needed for ${file}`);
        }

    } catch (e) {
        console.error(`Failed to update ${file}:`, e);
    }
});
