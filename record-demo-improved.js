// Improved Playwright script to record a demo of the RAG Visualizer
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 800, // Slow down actions for better video
  });

  const videoDir = path.join(__dirname, './');
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  let videoPath = null;
  
  try {
    console.log('🎬 Starting video recording...');
    
    // Navigate to the app
    console.log('📍 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Show initial state
    
    // Step 1: Load a sample document
    console.log('📄 Step 1: Loading sample document...');
    const sampleDocButton = page.locator('button:has-text("Machine Learning Basics")').first();
    await sampleDocButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await sampleDocButton.click();
    await page.waitForTimeout(1500);
    
    // Process the document
    console.log('⚙️ Processing document...');
    const processButton = page.locator('button:has-text("Process Document")');
    await processButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await processButton.click();
    await page.waitForTimeout(3000); // Wait for chunking to complete
    
    // Scroll to show chunks
    console.log('✂️ Showing chunks...');
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Step 2: Generate embeddings
    console.log('⚡ Step 2: Generating embeddings...');
    const embedButton = page.locator('button:has-text("Generate Embeddings")');
    await embedButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await embedButton.click();
    await page.waitForTimeout(3000); // Wait for embedding generation
    
    // Scroll to show embeddings
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Step 3: Store in Vector DB
    console.log('💾 Step 3: Storing in Vector DB...');
    const storeButton = page.locator('button:has-text("Store in Vector Database")');
    await storeButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await storeButton.click();
    await page.waitForTimeout(2000); // Wait for storage
    
    // Scroll to query section
    console.log('🔍 Step 4: Preparing query...');
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'smooth' }));
    await page.waitForTimeout(1500);
    
    // Step 4: Enter a query
    const queryInput = page.locator('input[placeholder*="query"]');
    await queryInput.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await queryInput.fill('What is machine learning?');
    await page.waitForTimeout(1000);
    
    // Submit query
    console.log('🚀 Step 5: Submitting query...');
    const searchButton = page.locator('button:has-text("Search & Generate")');
    await searchButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await searchButton.click();
    await page.waitForTimeout(3000); // Wait for retrieval
    
    // Scroll to show retrieval results
    console.log('📊 Showing retrieval results...');
    await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Wait for generation
    console.log('✨ Waiting for generation...');
    await page.waitForTimeout(2000);
    
    // Scroll to show final generation
    await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Scroll back to top to show complete pipeline
    console.log('📈 Showing complete pipeline...');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(2000);
    
    // Final pause to show completed state
    await page.waitForTimeout(2000);
    
    // Get video path from page
    videoPath = await page.video().path();
    console.log('✅ Demo recording complete!');
    
  } catch (error) {
    console.error('❌ Error during recording:', error);
  } finally {
    await context.close();
    await browser.close();
    
    // Wait a bit for video to be saved
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Rename the video file
    if (videoPath && fs.existsSync(videoPath)) {
      const newName = path.join(__dirname, 'rag-visualizer-demo.webm');
      fs.renameSync(videoPath, newName);
      console.log(`🎥 Video saved as: ${newName}`);
    } else {
      // Try to find video file by pattern
      const files = fs.readdirSync(videoDir);
      const videoFile = files.find(f => f.endsWith('.webm') && f.length > 10);
      if (videoFile) {
        const oldPath = path.join(videoDir, videoFile);
        const newName = path.join(videoDir, 'rag-visualizer-demo.webm');
        fs.renameSync(oldPath, newName);
        console.log(`🎥 Video saved as: ${newName}`);
      } else {
        console.log('⚠️ Video file not found. Check:', videoDir);
      }
    }
  }
})();

