# Jeorge Andrei Portfolio

Modern web developer portfolio with midnight & lime startup theme.

## 🚀 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Development:** PHP (for includes and easy maintenance)
- **Deployment:** Static HTML (GitHub Pages compatible)
- **Build System:** Custom PHP build script

## 📁 Project Structure

```
portfolio/
├── 📝 Development Files (Edit these)
│   ├── *.php           - Page templates
│   ├── header.php      - Shared header (edit once, affects all)
│   ├── footer.php      - Shared footer (edit once, affects all)
│   └── build.php       - Build script
│
├── 🌐 Deployment Files (Auto-generated)
│   └── *.html          - Static HTML for GitHub Pages
│
└── 📦 Assets
    ├── styles.css      - Midnight & lime theme
    ├── script.js       - Interactions & animations
    ├── fonts/          - Self-hosted fonts
    └── images/         - Project images & assets
```

## 🛠️ Development

### Local Setup

1. **Requirements:** XAMPP (or any PHP-enabled local server)

2. **Run locally:**
   ```bash
   # Access via localhost
   http://localhost/personal_portfolio/index.php
   ```

3. **Make changes:**
   - Edit `.php` files for content
   - Edit `header.php` or `footer.php` for shared elements
   - Edit `styles.css` for styling
   - Edit `script.js` for interactions

### Build for Deployment

When ready to deploy to GitHub Pages:

```bash
# Generate static HTML files
php build.php
```

This will:
- ✅ Convert PHP files to HTML
- ✅ Inject header/footer content
- ✅ Update all internal links to `.html`
- ✅ Create deployment-ready files

## 🚀 Deployment to GitHub Pages

1. **Build the site:**
   ```bash
   php build.php
   ```

2. **Commit and push:**
   ```bash
   git add *.html styles.css script.js images/
   git commit -m "Update portfolio"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main` / `(root)`
   - Save

4. **Your site will be live at:**
   ```
   https://yourusername.github.io/portfolio/
   ```

## 📝 Content Updates

### Quick Update Workflow:

| Change Type | Steps |
|------------|-------|
| Page content | Edit `.php` file → Run `php build.php` → Push `.html` |
| Header/Nav | Edit `header.php` → Run `php build.php` → Push ALL `.html` |
| Footer/Contact | Edit `footer.php` → Run `php build.php` → Push ALL `.html` |
| Styles | Edit `styles.css` → Push directly (no build needed) |
| Scripts | Edit `script.js` → Push directly (no build needed) |
| Images | Add to `images/` → Push directly (no build needed) |

### Things to Replace:

- **Contact email:** Search for `jeorgeandrei1@gmail.com` in `footer.php`
- **Social links:** Update GitHub, LinkedIn, Facebook links in `footer.php`
- **Resume:** Replace `ELEVENCIONADO_JEORGE_ANDREI_RESUME.pdf`
- **Profile image:** Replace `images/profile.png`
- **YouTube channels:** Update links in featured work section
- **Clock timezone:** `script.js`, search `Asia/Manila`

## 🎨 Theme

**Modern Startup Color Palette (60/30/10 rule):**
- 60% Midnight Black (`#0F1419`)
- 30% Pure White (`#FFFFFF`)
- 10% Lime Green (`#9EE73C`)

Colors are defined in `:root` variables in `styles.css` - easy to customize!

## 📚 Documentation

- **BUILD-INSTRUCTIONS.md** - Detailed build and deployment guide
- **Comments in code** - Inline documentation

## 🔧 Fonts

Self-hosted fonts (no external requests):
- **Bricolage Grotesque** - Display font
- **Instrument Sans** - Body font

Both licensed under SIL OFL.

## 📄 License

Personal portfolio - All rights reserved.

---

**Built with ❤️ by Jeorge Andrei**

