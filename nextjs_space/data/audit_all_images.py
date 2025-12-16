import json
import re
from collections import defaultdict

with open('products_data.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Group products by supplier
suppliers = defaultdict(list)
for p in products:
    supplier = p.get('supplier', 'Unknown')
    suppliers[supplier].append(p)

print("\n" + "="*80)
print("IMAGE AUDIT REPORT - ALL PRODUCTS")
print("="*80)

# Check for problematic images
issues = []
for supplier, prods in sorted(suppliers.items()):
    print(f"\n\n### {supplier} ({len(prods)} products) ###\n")
    
    for p in prods[:5]:  # Show first 5 from each supplier
        sku = p.get('sku', 'NO_SKU')
        title = p.get('title_en', 'NO_TITLE')[:50]
        images = p.get('images', [])
        
        if not images:
            issues.append({'sku': sku, 'supplier': supplier, 'issue': 'NO_IMAGES'})
            print(f"❌ {sku:30} | {title:50} | NO IMAGES")
        else:
            img = images[0]
            # Check if image is a local file or external URL
            if img.startswith('/'):
                print(f"✓  {sku:30} | {title:50} | Local: {img}")
            elif 'http' in img:
                # Extract domain
                domain_match = re.search(r'https?://([^/]+)', img)
                domain = domain_match.group(1) if domain_match else 'unknown'
                print(f"🌐 {sku:30} | {title:50} | External: {domain}")
            else:
                issues.append({'sku': sku, 'supplier': supplier, 'issue': 'INVALID_IMAGE_PATH'})
                print(f"❌ {sku:30} | {title:50} | Invalid: {img}")

print(f"\n\n{'='*80}")
print(f"ISSUES FOUND: {len(issues)}")
print("="*80)
for issue in issues[:20]:
    print(f"{issue['sku']:30} | {issue['supplier']:30} | {issue['issue']}")

# Summary by supplier
print(f"\n\n{'='*80}")
print("SUMMARY BY SUPPLIER")
print("="*80)
for supplier, prods in sorted(suppliers.items()):
    with_images = sum(1 for p in prods if p.get('images'))
    local_images = sum(1 for p in prods if p.get('images') and p['images'][0].startswith('/'))
    external_images = sum(1 for p in prods if p.get('images') and 'http' in p['images'][0])
    
    print(f"{supplier:30} | Total: {len(prods):3} | With Images: {with_images:3} | Local: {local_images:3} | External: {external_images:3}")

