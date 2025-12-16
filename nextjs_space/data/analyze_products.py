import json

with open('products_data.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Filter SPEKTRA and APS products
spektra_products = [p for p in products if p.get('supplier') == 'SPEKTRA Dresden']
aps_products = [p for p in products if p.get('supplier') == 'APS Dynamics']

print(f"\n=== SPEKTRA Dresden Products: {len(spektra_products)} ===")
for p in spektra_products[:10]:
    sku = p.get('sku', 'NO_SKU')
    title = p.get('title_en', 'NO_TITLE')[:60]
    has_images = len(p.get('images', [])) > 0
    desc_len = len(p.get('description_en', ''))
    print(f"{sku:30} | {title:60} | Images: {has_images} | Desc: {desc_len} chars")

print(f"\n=== APS Dynamics Products: {len(aps_products)} ===")
for p in aps_products:
    sku = p.get('sku', 'NO_SKU')
    title = p.get('title_en', 'NO_TITLE')[:60]
    has_images = len(p.get('images', [])) > 0
    desc_len = len(p.get('description_en', ''))
    print(f"{sku:30} | {title:60} | Images: {has_images} | Desc: {desc_len} chars")

# Check for products with missing content
print(f"\n=== Products Needing Attention ===")
needs_update = []
for p in spektra_products + aps_products:
    sku = p.get('sku', '')
    issues = []
    if not p.get('images') or len(p.get('images', [])) == 0:
        issues.append('NO_IMAGES')
    if len(p.get('description_en', '')) < 100:
        issues.append('SHORT_DESC')
    if not p.get('features') or len(p.get('features', [])) == 0:
        issues.append('NO_FEATURES')
    if not p.get('applications') or len(p.get('applications', [])) == 0:
        issues.append('NO_APPS')
    
    if issues:
        needs_update.append({'sku': sku, 'title': p.get('title_en', '')[:50], 'issues': issues})

print(f"\nTotal products needing updates: {len(needs_update)}")
for item in needs_update[:20]:
    print(f"{item['sku']:30} | {item['title']:50} | {', '.join(item['issues'])}")

