const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push('CONSOLE ' + msg.type() + ': ' + msg.text());
    }
  });
  
  page.on('pageerror', error => {
    consoleErrors.push('PAGE ERROR: ' + error.message);
  });

  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(request.url() + ' - ' + request.failure().errorText);
  });

  try {
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded');
    
    // Click Get Started
    const getStartedBtn = page.locator('text=Get Started').first();
    await getStartedBtn.click();
    await page.waitForTimeout(3000);
    
    console.log('Failed requests (' + failedRequests.length + '):');
    failedRequests.forEach(e => console.log(' - ' + e));
    
    console.log('Console errors (' + consoleErrors.length + '):');
    consoleErrors.forEach(e => console.log(' - ' + e));
    
    await page.screenshot({ path: 'C:/Users/san80/AppData/Local/Temp/kilo/screenshot2.png', fullPage: true });
    console.log('Screenshot saved');
  } catch (error) {
    consoleErrors.push('SCRIPT ERROR: ' + error.message);
    console.log('Console errors (' + consoleErrors.length + '):');
    consoleErrors.forEach(e => console.log(' - ' + e));
  }
  
  await browser.close();
})();
