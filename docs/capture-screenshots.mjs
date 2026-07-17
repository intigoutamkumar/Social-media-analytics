import { chromium } from "../frontend/node_modules/playwright/index.mjs";

const baseUrl = "http://127.0.0.1:5173";
const outputDir = "C:/Users/san80/OneDrive/Desktop/Social-media-analytics/docs/screenshots";

const pages = [
  { path: "/", name: "01-home.png" },
  { path: "/register", name: "02-register.png" },
  { path: "/login", name: "03-login.png" },
  { path: "/dashboard", name: "04-dashboard.png", auth: true },
  { path: "/analytics", name: "05-analytics.png", auth: true },
  { path: "/reports", name: "06-reports.png", auth: true },
  { path: "/schedule", name: "07-schedule.png", auth: true },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

for (const target of pages) {
  await page.goto(`${baseUrl}${target.path}`, { waitUntil: "networkidle" });

  if (target.auth) {
    await page.evaluate(() => {
      localStorage.setItem("token", "portfolio-demo-token");
      localStorage.setItem("refresh", "portfolio-demo-refresh");
      localStorage.setItem("user", JSON.stringify({ username: "Sai", email: "sai@gmail.com" }));
      localStorage.setItem("username", "Sai");
      localStorage.setItem("email", "sai@gmail.com");
    });
    await page.goto(`${baseUrl}${target.path}`, { waitUntil: "networkidle" });
  }

  await page.screenshot({ path: `${outputDir}/${target.name}`, fullPage: false });
  console.log(`Saved ${target.name}`);
}

await browser.close();
