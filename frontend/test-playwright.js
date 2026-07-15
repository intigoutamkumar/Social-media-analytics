import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleErrors.push('CONSOLE ' + msg.type + ': ' + msg.text());
    }
  });
  
  page.on('pageerror', error => {
    consoleErrors.push('PAGE ERROR: ' + error.message);
  });

  try {
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded');
    
    // Click Get Started
    const getStartedBtn = page.locator('text=Get Started').first();
    await getStartedBtn.click();
    await page.waitForTimeout(2000);
    
    // Click Login - navigate back first
    await page.goto('http://localhost:5175/', { waitUntil: 'networkidle', timeout: 30000 });
    const loginBtn = page.locator('text=Login').first();
    await loginBtn.click();
    await page.waitForTimeout(2000);
    
    console.log('Console errors (' + consoleErrors.length + '):');
    consoleErrors.forEach(e => console.log(' - ' + e));
    
    // Take screenshot
    await page.screenshot({ path: 'C:/Users/san80/AppData/Local/Temp/kilo/screenshot.png', fullPage: true });
    console.log('Screenshot saved');
  } catch (error) {
    consoleErrors.push('SCRIPT ERROR: ' + error.message);
    console.log('Console errors (' + consoleErrors.length + '):');
    consoleErrors.forEach(e => console.log(' - ' + e));
  }
  
  await browser.close();
})();
