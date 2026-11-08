# 🛠️ Build Instructions for GitHub Pages Deployment

## Overview

This portfolio uses **PHP for local development** and generates **static HTML for GitHub Pages deployment**.

---

## 📁 File Structure

```
portfolio/
├── 📝 PHP FILES (Development - EDIT THESE)
│   ├── index.php
│   ├── about.php
│   ├── projects.php
│   ├── internship.php
│   ├── header.php         ← Edit once, affects all pages
│   └── footer.php         ← Edit once, affects all pages
│
├── 🌐 HTML FILES (Deployment - AUTO-GENERATED)
│   ├── index.html         ← Generated from index.php
│   ├── about.html         ← Generated from about.php
│   ├── projects.html      ← Generated from projects.php
│   └── internship.html    ← Generated from internship.php
│
└── 🔧 BUILD TOOLS
    ├── build.php          ← Build script
    └── BUILD-INSTRUCTIONS.md (this file)
```

---

## 🔄 Development Workflow

### 1️⃣ Local Development (XAMPP)

**Edit the PHP files:**
```
✏️ Edit: index.php, about.php, header.php, footer.php, etc.
🧪 Test: http://localhost/personal_portfolio/index.php
```

### 2️⃣ Build for GitHub Pages

**When ready to deploy, run:**
```bash
php build.php
```

**What happens:**
- ✅ Reads all `.php` files
- ✅ Injects `header.php` and `footer.php` content
- ✅ Converts `.php` links to `.html` links
- ✅ Generates static `.html` files

### 3️⃣ Deploy to GitHub

**Commit and push:**
```bash
git add index.html about.html projects.html internship.html
git add styles.css script.js images/
git commit -m "Update portfolio"
git push origin main
```

---

## 📋 Quick Reference

### When you make ANY changes:

| What Changed | What to Do |
|--------------|------------|
| Content in index.php | Edit → Run `php build.php` → Push HTML |
| Footer email/links | Edit `footer.php` → Run `php build.php` → Push ALL HTML |
| Navigation menu | Edit `header.php` → Run `php build.php` → Push ALL HTML |
| Styles (CSS) | Edit `styles.css` → Push directly (no build needed) |
| Scripts (JS) | Edit `script.js` → Push directly (no build needed) |
| Images | Add to `images/` → Push directly (no build needed) |

---

## ⚠️ Important Rules

### ✅ DO:
- Edit `.php` files for content changes
- Run `php build.php` after editing PHP files
- Test on localhost before building
- Commit both `.php` and `.html` files to git
- Push `.html` files to GitHub for deployment

### ❌ DON'T:
- Edit `.html` files directly (they'll be overwritten)
- Push to GitHub without running build script
- Forget to update ALL pages when changing header/footer

---

## 🚀 GitHub Pages Setup

### First Time Setup:

1. **Create GitHub repository** (if not done)
2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Click "Pages" in sidebar
   - Source: Deploy from branch
   - Branch: `main` / `(root)`
   - Click Save

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

---

## 🔧 Troubleshooting

### Build script errors?
```bash
# Make sure you're in the correct directory
cd c:\xampp\htdocs\personal_portfolio

# Run build script
php build.php
```

### Links not working on GitHub Pages?
- Make sure all links use `.html` (not `.php`)
- Build script handles this automatically

### Header/Footer not updating?
- Edit `header.php` or `footer.php`
- Run `php build.php` to regenerate ALL HTML files
- Push all updated `.html` files

### CSS/JS changes not showing?
- Clear browser cache (Ctrl + Shift + R)
- CSS and JS don't need rebuild, just push directly

---

## 📞 Quick Commands

```bash
# Build static HTML files
php build.php

# Check what changed
git status

# Add all HTML files
git add *.html

# Commit changes
git commit -m "Update content"

# Push to GitHub
git push
```

---

## 💡 Pro Tips

1. **Always test locally first** before building
2. **Run build script** every time you edit PHP files
3. **Commit often** - small, frequent commits are better
4. **Keep PHP and HTML in sync** - don't skip the build step
5. **Use descriptive commit messages** for easier tracking

---

**🎉 You're all set! Happy coding!**
