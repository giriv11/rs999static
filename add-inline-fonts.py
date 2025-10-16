#!/usr/bin/env python3
"""
Add inline font styles to all HTML pages
Ensures Inter font loads with font-display:swap on all pages
"""

import glob
import re

# The inline font styles to add
FONT_STYLES = """  <!-- Critical inline styles for immediate text rendering -->
  <style>
    /* System font stack for instant text rendering with Inter as primary */
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    /* Load Inter font with font-display: swap */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 800;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYAZ9hiA.woff2) format('woff2');
    }
  </style>
"""

def add_inline_fonts(filepath):
    """Add inline font styles to an HTML file if not already present"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has inline fonts
    if 'Critical inline styles for immediate text rendering' in content:
        return False
    
    # Find the Font Awesome link and add styles after it
    pattern = r'(<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/[^>]+>)'
    
    if re.search(pattern, content):
        content = re.sub(pattern, r'\1\n' + FONT_STYLES, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    print("🎨 Adding inline font styles to all pages...")
    print()
    
    files_updated = []
    
    # Process page/*.html files
    for filepath in glob.glob('page/*.html'):
        if add_inline_fonts(filepath):
            print(f"  ✓ {filepath}")
            files_updated.append(filepath)
    
    # Process blog/*.html files
    for filepath in glob.glob('blog/*.html'):
        if add_inline_fonts(filepath):
            print(f"  ✓ {filepath}")
            files_updated.append(filepath)
    
    print()
    if files_updated:
        print(f"✅ Updated {len(files_updated)} files with inline font styles!")
    else:
        print("✅ All files already have inline font styles!")

if __name__ == '__main__':
    main()
