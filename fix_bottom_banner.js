const fs = require('fs');
const files = ['index.html', 'about.html', 'contact.html', 'products.html', 'services.html', 'blog.html'];
files.forEach(f => {
    try {
        let content = fs.readFileSync(f, 'utf8');
        let rx = /<div class="construction-banner">(🚧 This website is currently under construction.*?)<footer class="site-footer">/s;
        if (rx.test(content)) {
            content = content.replace(rx, '<div class="bottom-construction-banner">$1<footer class="site-footer">');
            fs.writeFileSync(f, content, 'utf8');
            console.log('Fixed ' + f);
        } else {
            console.log('Not found in ' + f);
        }
    } catch (e) {
        console.error(e);
    }
});
