#!/bin/bash

# Add inline fonts to all HTML pages
# This ensures fonts load properly with font-display:swap

set -e

echo "🎨 Adding inline font styles to all pages..."

# Create the font style block
FONT_STYLES='  <!-- Critical inline styles for immediate text rendering -->\n  <style>\n    /* System font stack for instant text rendering with Inter as primary */\n    body {\n      font-family: '"'"'Inter'"'"', -apple-system, BlinkMacSystemFont, '"'"'Segoe UI'"'"', Roboto, '"'"'Helvetica Neue'"'"', Arial, sans-serif;\n      font-weight: 400;\n    }\n    h1, h2, h3, h4, h5, h6 {\n      font-family: '"'"'Inter'"'"', -apple-system, BlinkMacSystemFont, '"'"'Segoe UI'"'"', Roboto, '"'"'Helvetica Neue'"'"', Arial, sans-serif;\n    }\n    \n    /* Load Inter font with font-display: swap */\n    @font-face {\n      font-family: '"'"'Inter'"'"';\n      font-style: normal;\n      font-weight: 400;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('"'"'woff2'"'"');\n    }\n    @font-face {\n      font-family: '"'"'Inter'"'"';\n      font-style: normal;\n      font-weight: 600;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2) format('"'"'woff2'"'"');\n    }\n    @font-face {\n      font-family: '"'"'Inter'"'"';\n      font-style: normal;\n      font-weight: 700;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2) format('"'"'woff2'"'"');\n    }\n    @font-face {\n      font-family: '"'"'Inter'"'"';\n      font-style: normal;\n      font-weight: 800;\n      font-display: swap;\n      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYAZ9hiA.woff2) format('"'"'woff2'"'"');\n    }\n  </style>\n'

# Add inline fonts to page/*.html files
for file in page/*.html; do
  if [ -f "$file" ]; then
    echo "  → $file"
    # Add after Font Awesome line and before </head>
    sed -i "/<link rel=\"stylesheet\" href=\"https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome/a\\$FONT_STYLES" "$file"
  fi
done

# Add inline fonts to blog/*.html files
for file in blog/*.html; do
  if [ -f "$file" ]; then
    echo "  → $file"
    sed -i "/<link rel=\"stylesheet\" href=\"https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome/a\\$FONT_STYLES" "$file"
  fi
done

echo ""
echo "✅ Inline font styles added to all pages!"
