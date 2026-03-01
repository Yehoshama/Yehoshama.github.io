const fs = require('fs');
const files = ['index.html', 'about.html', 'contact.html', 'products.html', 'services.html', 'blog.html'];

files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        // Remove the inline style from the link
        const rx = /<a\s*href="license\.html"\s*style="color:\s*white;\s*text-decoration:\s*underline;">(.*?)<\/a>/g;
        if (rx.test(content)) {
            content = content.replace(rx, '<a href="license.html">$1</a>');
            fs.writeFileSync(f, content, 'utf8');
            console.log('Fixed link style in ' + f);
        } else {
            console.log('No inline style found in ' + f);
        }
    } catch (e) {
        console.error(e);
    }
});
