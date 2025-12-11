#!/usr/bin/env node

/**
 * PDF Generation Script
 * Converts HTML preview files to PDFs using Puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PDFs = [
  {
    input: path.join(__dirname, '../public/event-planner-2026-preview.html'),
    output: path.join(__dirname, '../public/pdfs/event-planner-2026.pdf'),
    name: 'Event-Planner 2026'
  },
  {
    input: path.join(__dirname, '../public/budget-rechtfertigung-2026-preview.html'),
    output: path.join(__dirname, '../public/pdfs/budget-rechtfertigung-2026.pdf'),
    name: 'Budget-Rechtfertigung 2026'
  }
];

async function generatePDF(config) {
  console.log(`\n📄 Generating: ${config.name}...`);

  if (!fs.existsSync(config.input)) {
    console.error(`❌ Input file not found: ${config.input}`);
    return false;
  }

  // Ensure output directory exists
  const outputDir = path.dirname(config.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Load HTML file
    const htmlContent = fs.readFileSync(config.input, 'utf8');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF with print-optimized settings
    await page.pdf({
      path: config.output,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      },
      preferCSSPageSize: true
    });

    const stats = fs.statSync(config.output);
    console.log(`✅ Generated: ${config.output} (${(stats.size / 1024).toFixed(1)} KB)`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${config.name}:`, error.message);
    return false;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting PDF generation...\n');
  console.log(`📁 Working directory: ${__dirname}`);

  const results = [];

  for (const config of PDFs) {
    const success = await generatePDF(config);
    results.push({ name: config.name, success });
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:\n');

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.name}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n${successCount}/${results.length} PDFs generated successfully`);
  console.log('='.repeat(50));

  process.exit(successCount === results.length ? 0 : 1);
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
