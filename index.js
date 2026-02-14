const puppeteer = require('puppeteer-core');

async function launchGoogle() {
  console.log('Starting Puppeteer...');
  
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  
  console.log('Navigating to Google...');
  await page.goto('https://www.google.com', {
    waitUntil: 'networkidle2'
  });
  
  const title = await page.title();
  console.log(`Page loaded: ${title}`);
  console.log(`Current URL: ${page.url()}`);
  
  // Keep the browser running forever
  console.log('Browser is running in headless mode. Press Ctrl+C to exit.');
  
  // Prevent the script from exiting
  await new Promise(() => {});
}

// Run the function and handle errors
launchGoogle().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
