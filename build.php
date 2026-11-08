<?php
/**
 * Static Site Builder
 * Converts PHP files with includes into static HTML for GitHub Pages deployment
 * 
 * Usage: php build.php
 */

echo "🚀 Starting build process...\n\n";

// Get the header and footer content
$header = file_get_contents('header.php');
$footer = file_get_contents('footer.php');

// Remove PHP tags from header and footer (we want pure HTML output)
$header = str_replace(['<?php', '?>'], '', $header);
$footer = str_replace(['<?php', '?>'], '', $footer);

// Files to build (PHP source -> HTML output)
$filesToBuild = [
    'index.php' => 'index.html',
    'about.php' => 'about.html',
    'projects.php' => 'projects.html',
    'internship.php' => 'internship.html'
];

$successCount = 0;
$errorCount = 0;

foreach ($filesToBuild as $phpFile => $htmlFile) {
    if (!file_exists($phpFile)) {
        echo "⚠️  Warning: $phpFile not found, skipping...\n";
        $errorCount++;
        continue;
    }

    // Read the PHP file
    $content = file_get_contents($phpFile);

    // Replace PHP includes with actual content
    $content = str_replace("<?php include 'header.php'; ?>", $header, $content);
    $content = str_replace('<?php include \'header.php\'; ?>', $header, $content);
    $content = str_replace("<?php include 'footer.php'; ?>", $footer, $content);
    $content = str_replace('<?php include \'footer.php\'; ?>', $footer, $content);

    // Update internal links from .php to .html
    $content = str_replace('href="index.php"', 'href="index.html"', $content);
    $content = str_replace('href="about.php"', 'href="about.html"', $content);
    $content = str_replace('href="projects.php"', 'href="projects.html"', $content);
    $content = str_replace('href="internship.php"', 'href="internship.html"', $content);
    
    // Update form actions if any
    $content = str_replace('action="index.php"', 'action="index.html"', $content);
    $content = str_replace('action="about.php"', 'action="about.html"', $content);
    $content = str_replace('action="projects.php"', 'action="projects.html"', $content);
    $content = str_replace('action="internship.php"', 'action="internship.html"', $content);

    // Write the HTML file
    if (file_put_contents($htmlFile, $content)) {
        echo "✅ Built: $phpFile → $htmlFile\n";
        $successCount++;
    } else {
        echo "❌ Failed: $phpFile\n";
        $errorCount++;
    }
}

echo "\n";
echo "═══════════════════════════════════════\n";
echo "📊 Build Summary:\n";
echo "   ✅ Success: $successCount files\n";
echo "   ❌ Errors: $errorCount files\n";
echo "═══════════════════════════════════════\n";
echo "\n";

if ($successCount > 0) {
    echo "🎉 Build complete! Your HTML files are ready for GitHub Pages.\n";
    echo "\n";
    echo "📋 Next steps:\n";
    echo "   1. Test the HTML files in your browser\n";
    echo "   2. Commit the HTML files to git\n";
    echo "   3. Push to GitHub\n";
    echo "   4. Enable GitHub Pages in repository settings\n";
    echo "\n";
} else {
    echo "⚠️  Build failed. Please check the errors above.\n";
}

?>
