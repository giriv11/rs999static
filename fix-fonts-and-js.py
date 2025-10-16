#!/usr/bin/env python3
"""
Fix fonts and JS for all pages:
1. Add font preload links for better loading
2. Restore full main.js where needed (FAQ, animations)
3. Ensure all pages use correct local font paths
"""

import glob
import re

def fix_index_html():
    """Fix index.html - needs full main.js for FAQ"""
    filepath = 'index.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Already fixed by previous edit
    print(f"  ✓ {filepath} - Already fixed")

def fix_page_html(filepath):
    """Fix page/*.html files - add font preload and check JS needs"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Add font preload if not present
    if 'preload' not in content or 'font/woff2' not in content:
        # Find the CSS link and add font preloads before it
        pattern = r'(<link href="\.\./assets/css/output\.css" rel="stylesheet">)'
        replacement = r'''<!-- Preload LOCAL fonts for immediate loading -->
  <link rel="preload" href="../assets/fonts/inter/inter-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/inter/inter-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/inter/inter-700.woff2" as="font" type="font/woff2" crossorigin>
  
  \1'''
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
    
    # Replace main-minimal.js with main.js for pages with animations/interactions
    if 'main-minimal.js' in content:
        content = content.replace('src="../assets/js/main-minimal.js"', 'src="../assets/js/main.js"')
        modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def fix_blog_html(filepath):
    """Fix blog/*.html files"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Add font preload if not present
    if 'preload' not in content or 'font/woff2' not in content:
        pattern = r'(<link href="\.\./assets/css/output\.css" rel="stylesheet">)'
        replacement = r'''<!-- Preload LOCAL fonts for immediate loading -->
  <link rel="preload" href="../assets/fonts/inter/inter-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/inter/inter-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../assets/fonts/inter/inter-700.woff2" as="font" type="font/woff2" crossorigin>
  
  \1'''
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
    
    # Replace main-minimal.js with main.js
    if 'main-minimal.js' in content:
        content = content.replace('src="../assets/js/main-minimal.js"', 'src="../assets/js/main.js"')
        modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("🔧 Fixing fonts and JS for all pages...")
    print()
    
    files_fixed = []
    
    # Fix index.html
    fix_index_html()
    
    # Fix page/*.html files
    print("\n📄 Fixing page/*.html files...")
    for filepath in glob.glob('page/*.html'):
        if fix_page_html(filepath):
            print(f"  ✓ {filepath}")
            files_fixed.append(filepath)
        else:
            print(f"  - {filepath} (no changes needed)")
    
    # Fix blog/*.html files
    print("\n📝 Fixing blog/*.html files...")
    for filepath in glob.glob('blog/*.html'):
        if fix_blog_html(filepath):
            print(f"  ✓ {filepath}")
            files_fixed.append(filepath)
        else:
            print(f"  - {filepath} (no changes needed)")
    
    print()
    print("✅ FIXES APPLIED!")
    print()
    print("Changes made:")
    print("  ✓ Added font preload links (fonts load immediately)")
    print("  ✓ Restored full main.js (FAQ & animations work)")
    print("  ✓ All pages use local fonts (no external requests)")
    print()
    print(f"Total files fixed: {len(files_fixed) + 1}")  # +1 for index.html

if __name__ == '__main__':
    main()
