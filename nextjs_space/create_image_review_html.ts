import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('🎨 Creating Image Review Tool...\n');

  // Get all products
  const products = await prisma.product.findMany({
    where: { active: true },
    select: {
      sku: true,
      title_en: true,
      supplier: true,
      images: true,
      source_url: true
    },
    orderBy: { supplier: 'asc' }
  });

  // Group by supplier
  const bySupplier = new Map<string, typeof products>();
  products.forEach(p => {
    const supplier = p.supplier || 'Unknown';
    if (!bySupplier.has(supplier)) {
      bySupplier.set(supplier, []);
    }
    bySupplier.get(supplier)!.push(p);
  });

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Image Review - Placid Asia</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .header {
      background: #003F62;
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 30px;
      text-align: center;
    }
    .header h1 { font-size: 32px; margin-bottom: 10px; }
    .header p { font-size: 18px; opacity: 0.9; }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      flex: 1;
      min-width: 200px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-card h3 { color: #666; font-size: 14px; margin-bottom: 10px; }
    .stat-card .number { color: #003F62; font-size: 32px; font-weight: bold; }
    .supplier-section {
      background: white;
      border-radius: 10px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .supplier-section h2 {
      color: #003F62;
      font-size: 24px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #D4A032;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .product-card {
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      background: #fafafa;
      transition: all 0.3s;
    }
    .product-card:hover {
      border-color: #D4A032;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .product-image-container {
      width: 100%;
      height: 200px;
      background: white;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    .product-image-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .no-image {
      color: #999;
      font-size: 14px;
    }
    .product-info {
      padding: 10px 0;
    }
    .product-sku {
      font-size: 12px;
      color: #666;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .product-title {
      font-size: 16px;
      color: #333;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .feedback-buttons {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .feedback-buttons button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .btn-correct {
      background: #22c55e;
      color: white;
    }
    .btn-correct:hover { background: #16a34a; }
    .btn-wrong {
      background: #ef4444;
      color: white;
    }
    .btn-wrong:hover { background: #dc2626; }
    .btn-correct.active {
      background: #16a34a;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.3);
    }
    .btn-wrong.active {
      background: #dc2626;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
    }
    .fixed-summary {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      min-width: 250px;
      z-index: 1000;
    }
    .fixed-summary h3 {
      color: #003F62;
      margin-bottom: 15px;
      font-size: 18px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .summary-row span:first-child {
      color: #666;
    }
    .summary-row span:last-child {
      font-weight: bold;
      color: #003F62;
    }
    .download-btn {
      width: 100%;
      padding: 12px;
      background: #D4A032;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 15px;
      transition: all 0.2s;
    }
    .download-btn:hover {
      background: #b8872a;
    }
    .instructions {
      background: #fff3cd;
      border: 2px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
    }
    .instructions h3 {
      color: #856404;
      margin-bottom: 10px;
    }
    .instructions p {
      color: #664d03;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎨 Product Image Review Tool</h1>
    <p>Review each product image and mark if it's correct or wrong</p>
  </div>

  <div class="instructions">
    <h3>📋 Instructions:</h3>
    <p>
      • Review each product image carefully<br>
      • Click <strong style="color: #22c55e;">✓ Correct</strong> if the image matches the product title and description<br>
      • Click <strong style="color: #ef4444;">✗ Wrong Image</strong> if the image doesn't match or is incorrect<br>
      • Your feedback is saved automatically in your browser<br>
      • Click "Download Report" when done to get a CSV file of all flagged products
    </p>
  </div>

  <div class="stats">
    <div class="stat-card">
      <h3>Total Products</h3>
      <div class="number">${products.length}</div>
    </div>
    <div class="stat-card">
      <h3>Reviewed</h3>
      <div class="number" id="reviewed-count">0</div>
    </div>
    <div class="stat-card">
      <h3>Marked Correct</h3>
      <div class="number" id="correct-count" style="color: #22c55e;">0</div>
    </div>
    <div class="stat-card">
      <h3>Wrong Images</h3>
      <div class="number" id="wrong-count" style="color: #ef4444;">0</div>
    </div>
  </div>

  ${Array.from(bySupplier.entries()).map(([supplier, prods]) => `
    <div class="supplier-section">
      <h2>${supplier} (${prods.length} products)</h2>
      <div class="product-grid">
        ${prods.map(p => {
          const images = p.images as string[];
          const imageUrl = images && images.length > 0 ? images[0] : null;
          return `
            <div class="product-card" data-sku="${p.sku}">
              <div class="product-image-container">
                ${imageUrl ? 
                  `<img src="https://placid.asia${imageUrl}" alt="${p.title_en}" onerror="this.parentElement.innerHTML='<div class=\\'no-image\\'>❌ Image failed to load</div>'">`
                  : '<div class="no-image">⚠️ No image</div>'}
              </div>
              <div class="product-info">
                <div class="product-sku">${p.sku}</div>
                <div class="product-title">${p.title_en}</div>
                <div class="feedback-buttons">
                  <button class="btn-correct" onclick="markProduct('${p.sku}', 'correct')">✓ Correct</button>
                  <button class="btn-wrong" onclick="markProduct('${p.sku}', 'wrong')">✗ Wrong Image</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('')}

  <div class="fixed-summary">
    <h3>📊 Progress</h3>
    <div class="summary-row">
      <span>Reviewed:</span>
      <span id="summary-reviewed">0 / ${products.length}</span>
    </div>
    <div class="summary-row">
      <span>Correct:</span>
      <span id="summary-correct" style="color: #22c55e;">0</span>
    </div>
    <div class="summary-row">
      <span>Wrong:</span>
      <span id="summary-wrong" style="color: #ef4444;">0</span>
    </div>
    <button class="download-btn" onclick="downloadReport()">📥 Download Report</button>
  </div>

  <script>
    // Load saved feedback from localStorage
    const feedback = JSON.parse(localStorage.getItem('image-feedback') || '{}');

    // Apply saved feedback
    Object.entries(feedback).forEach(([sku, status]) => {
      const card = document.querySelector(\`.product-card[data-sku="\${sku}"]\`);
      if (card) {
        const correctBtn = card.querySelector('.btn-correct');
        const wrongBtn = card.querySelector('.btn-wrong');
        if (status === 'correct') {
          correctBtn.classList.add('active');
        } else if (status === 'wrong') {
          wrongBtn.classList.add('active');
        }
      }
    });

    function markProduct(sku, status) {
      const card = document.querySelector(\`.product-card[data-sku="\${sku}"]\`);
      const correctBtn = card.querySelector('.btn-correct');
      const wrongBtn = card.querySelector('.btn-wrong');
      
      if (status === 'correct') {
        correctBtn.classList.add('active');
        wrongBtn.classList.remove('active');
        feedback[sku] = 'correct';
      } else {
        wrongBtn.classList.add('active');
        correctBtn.classList.remove('active');
        feedback[sku] = 'wrong';
      }
      
      localStorage.setItem('image-feedback', JSON.stringify(feedback));
      updateStats();
    }

    function updateStats() {
      const entries = Object.entries(feedback);
      const reviewed = entries.length;
      const correct = entries.filter(([, s]) => s === 'correct').length;
      const wrong = entries.filter(([, s]) => s === 'wrong').length;
      
      document.getElementById('reviewed-count').textContent = reviewed;
      document.getElementById('correct-count').textContent = correct;
      document.getElementById('wrong-count').textContent = wrong;
      
      document.getElementById('summary-reviewed').textContent = \`\${reviewed} / ${products.length}\`;
      document.getElementById('summary-correct').textContent = correct;
      document.getElementById('summary-wrong').textContent = wrong;
    }

    function downloadReport() {
      const wrong = Object.entries(feedback).filter(([, s]) => s === 'wrong');
      if (wrong.length === 0) {
        alert('No products marked as wrong yet!');
        return;
      }
      
      let csv = 'SKU,Product Title,Supplier,Current Image,Status\\n';
      wrong.forEach(([sku]) => {
        const card = document.querySelector(\`.product-card[data-sku="\${sku}"]\`);
        if (card) {
          const title = card.querySelector('.product-title').textContent.replace(/"/g, '""');
          const img = card.querySelector('img');
          const imgSrc = img ? img.src.split('/').pop() : 'No image';
          const supplier = card.closest('.supplier-section').querySelector('h2').textContent.split('(')[0].trim();
          csv += \`"\${sku}","\${title}","\${supplier}","\${imgSrc}","Wrong Image"\\n\`;
        }
      });
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wrong-images-report.csv';
      a.click();
      
      alert(\`Report downloaded with \${wrong.length} products marked as wrong!\`);
    }

    // Initialize stats
    updateStats();
  </script>
</body>
</html>`;

  const htmlPath = path.join(__dirname, '..', '..', 'Uploads', 'IMAGE-REVIEW-TOOL.html');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  
  console.log('✅ Image Review Tool created!');
  console.log(`📄 Location: ${htmlPath}`);
  console.log('\n📋 Instructions:');
  console.log('1. Download the HTML file from the Files button');
  console.log('2. Open it in your web browser');
  console.log('3. Review each product image');
  console.log('4. Mark images as "Correct" or "Wrong"');
  console.log('5. Download the report of wrong images');
  console.log('6. Send me the CSV file to fix the database\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
