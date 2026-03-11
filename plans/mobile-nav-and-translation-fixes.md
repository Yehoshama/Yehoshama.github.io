# Plan: Mobile Navigation & Hebrew Translation Fixes

## Overview

This plan addresses two specific issues identified in the Yehoshama website:

1. **Mobile Navigation**: Fix horizontal scrolling on mobile by ensuring the hamburger menu is properly collapsible and the mobile view is restricted to vertical scrolling only
2. **Hebrew Translation**: Complete the Hebrew translation by identifying and translating all remaining untranslated text elements

---

## Issue 1: Mobile Navigation Horizontal Scrolling

### Current State
- Hamburger menu is already implemented in HTML ([`index.html:48-50`](index.html:48-50))
- Mobile navigation slides in from the right at 768px breakpoint ([`css/style.css:1452-1468`](css/style.css:1452-1468))
- JavaScript toggle functionality exists ([`js/main.js:50-85`](js/main.js:50-85))
- **Problem**: Horizontal scrolling may occur on mobile devices due to missing overflow constraints

### Solution
Add CSS overflow constraints to prevent horizontal scrolling:

```css
/* In css/style.css - after line 66 (body styles) */
html, body {
  overflow-x: hidden;
  max-width: 100%;
}

/* Ensure mobile nav doesn't cause horizontal scroll */
@media (max-width: 768px) {
  body.mobile-nav-open {
    overflow: hidden;
  }
  
  .site-nav {
    overflow-y: auto;
  }
}
```

### Files to Modify
- [`css/style.css`](css/style.css) - Add overflow-x: hidden to html/body and mobile nav styles

---

## Issue 2: Complete Hebrew Translation

### Current State
- Only 25 translation keys exist in [`i18n/en.json`](i18n/en.json) and [`i18n/he.json`](i18n/he.json)
- Many text elements across all pages lack `data-i18n` attributes
- Translation infrastructure is already set up in [`js/main.js:207-215`](js/main.js:207-215)

### Solution Overview

#### Step 1: Add `data-i18n` attributes to all HTML pages

**[`index.html`](index.html)**:
- Footer foundation text (lines 227-229)
- Footer copyright text (line 231)

**[`about.html`](about.html)**:
- Page title "About Yehoshama" (line 67)
- Page subtitle (line 68-69)
- "Our Story" heading and content (lines 76-91)
- "Our Values" heading and value items (lines 99-122)
- "The Team" heading and content (lines 130-156)
- Foundation callout section (lines 164-167)
- Footer elements (lines 182-184)

**[`blog.html`](blog.html)**:
- Page title and subtitle (lines 67-68)
- "Topics" sidebar title (line 77)
- Topic category names: Announcements, Engineering, Tutorials (lines 83, 96, 109)
- "Latest Posts" heading (line 124)
- Blog post metadata and content (lines 130-155)
- Footer elements (lines 171-173)

**[`contact.html`](contact.html)**:
- Page subtitle (lines 68-69)
- Form labels: Name, Email, Subject, Budget Range, Message (lines 79, 83, 88, 92, 103)
- Budget options (lines 94-99)
- "Send Message" button (line 107-108)
- "Other Ways to Reach Us" heading (line 113)
- Section headings: Email, Response Time, Foundation (lines 117, 121, 126)
- Response time and foundation text (lines 122-129)
- Footer elements (lines 146-148)

**[`services.html`](services.html)**:
- Service card titles and descriptions (lines 80-130)
- "Request Quote" links
- "Our Process" heading (line 139)
- Timeline steps and content (lines 146-176)
- Footer elements (lines 193-195)

**[`products.html`](products.html)**:
- Page subtitle (lines 68-69)
- "Categories" sidebar title (line 78)
- Category names: Productivity, Analytics, Security (lines 84, 97, 110)
- "All Products" heading (line 125)
- Product card text (lines 131-149)
- Footer elements

**[`license.html`](license.html)**:
- Entire page content (lines 85-120)
- Button and link text
- Footer elements (lines 131-134)

#### Step 2: Update [`i18n/en.json`](i18n/en.json)

Add approximately 80+ new translation keys with English text for:
- Page titles and subtitles
- Section headings
- Form labels and placeholders
- Button text
- Service descriptions
- Timeline content
- Team member information
- Legal/disclaimer text

#### Step 3: Update [`i18n/he.json`](i18n/he.json)

Add the same 80+ translation keys with Hebrew translations for:
- All corresponding English text translated to Hebrew
- Proper RTL (right-to-left) formatting considerations

### Translation Key Naming Convention

Follow the existing pattern:
- `section.element` format (e.g., `about.title`, `about.story.intro`)
- Nested structure for related content (e.g., `about.values.integrity.title`)
- Consistent with existing keys: `nav.home`, `hero.headline`, etc.

---

## Implementation Order

### Phase 1: Mobile Navigation Fix
1. Modify [`css/style.css`](css/style.css) to add overflow constraints
2. Test on mobile viewport (768px and below)

### Phase 2: Translation Infrastructure
1. Add `data-i18n` attributes to all HTML files (one file at a time)
2. Update [`i18n/en.json`](i18n/en.json) with all new keys
3. Update [`i18n/he.json`](i18n/he.json) with Hebrew translations
4. Test language switching functionality

---

## Testing Checklist

### Mobile Navigation
- [ ] No horizontal scrolling on mobile devices (768px and below)
- [ ] Hamburger menu toggles open/close correctly
- [ ] Overlay closes menu when clicked
- [ ] Navigation links close menu when clicked
- [ ] Menu slides in/out smoothly
- [ ] Body scroll is locked when menu is open

### Hebrew Translation
- [ ] All text elements display correctly in Hebrew
- [ ] Language switcher works on all pages
- [ ] No English text remains in Hebrew mode
- [ ] RTL layout displays correctly
- [ ] Form placeholders are translated
- [ ] Button text is translated
- [ ] Service/product descriptions are translated
- [ ] Footer content is translated
- [ ] License/disclaimer is translated

---

## Files to Modify

### CSS (1 file)
- [`css/style.css`](css/style.css) - Add overflow constraints

### HTML (7 files)
- [`index.html`](index.html) - Add data-i18n attributes
- [`about.html`](about.html) - Add data-i18n attributes
- [`blog.html`](blog.html) - Add data-i18n attributes
- [`contact.html`](contact.html) - Add data-i18n attributes
- [`services.html`](services.html) - Add data-i18n attributes
- [`products.html`](products.html) - Add data-i18n attributes
- [`license.html`](license.html) - Add data-i18n attributes

### JSON (2 files)
- [`i18n/en.json`](i18n/en.json) - Add English translations
- [`i18n/he.json`](i18n/he.json) - Add Hebrew translations

---

## Notes

- The existing i18n JavaScript implementation in [`js/main.js`](js/main.js) already handles language switching and DOM updates
- No changes needed to JavaScript files
- Hebrew translations should follow proper RTL formatting
- All translations should maintain professional tone consistent with the brand
- Technical terms may remain in English where appropriate (e.g., API, HTML, CSS)