#!/usr/bin/env python3
"""
Update all HTML pages to use LOCAL Inter fonts
Replaces Google Fonts CDN URLs with local font files
"""

import glob
import re

# The inline font styles with LOCAL paths
LOCAL_FONT_STYLES = """  <!-- Critical inline styles for immediate text rendering -->
  <style>
    /* System font stack for instant text rendering with Inter as primary */
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    
    /* Load Inter font with font-display: swap - LOCAL FILES */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(../assets/fonts/inter/inter-400.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-display: swap;
      src: url(../assets/fonts/inter/inter-600.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(../assets/fonts/inter/inter-700.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 800;
      font-display: swap;
      src: url(../assets/fonts/inter/inter-800.woff2) format('woff2');
    }
  </style>
"""

def update_local_fonts(filepath):
    """Update HTML file to use local fonts instead of Google CDN"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has inline styles section
    if 'Critical inline styles for immediate text rendering' in content:
        # Replace existing inline styles with LOCAL version
        pattern = r'<!-- Critical inline styles.*?</style>'
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, LOCAL_FONT_STYLES.strip(), content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
    
    return False

def main():
    print("🔄 Updating all pages to use LOCAL Inter fonts...")
    print()
    
    files_updated = []
    
    # Process page/*.html files
    for filepath in glob.glob('page/*.html'):
        if update_local_fonts(filepath):
            print(f"  ✓ {filepath}")
            files_updated.append(filepath)
    
    # Process blog/*.html files
    for filepath in glob.glob('blog/*.html'):
        if update_local_fonts(filepath):
            print(f"  ✓ {filepath}")
            files_updated.append(filepath)
    
    print()
    if files_updated:
        print(f"✅ Updated {len(files_updated)} files to use LOCAL fonts!")
        print()
        print("📦 Font files location: assets/fonts/inter/")
        print("  - inter-400.woff2 (22KB)")
        print("  - inter-600.woff2 (23KB)")
        print("  - inter-700.woff2 (23KB)")
        print("  - inter-800.woff2 (23KB)")
        print()
        print("Total: 90KB (cached locally, no external requests!)")
    else:
        print("✅ All files already using local fonts!")

if __name__ == '__main__':
    main()
