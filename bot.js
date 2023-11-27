import puppeteer from 'puppeteer';
import notifier from 'node-notifier';
import dotenv from 'dotenv';
dotenv.config();
const login = process.env.LOGIN;
const password = process.env.PASSWORD;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://discord.com/login');
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', login);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);
    await page.goto("https://discord.com/channels/1100513930423570584/1119049577799110716");
    await page.keyboard.press('Enter'); 
    await page.waitForTimeout(2000);
    await page.keyboard.type('/coins');
    await page.waitForTimeout(2000); 
    await page.keyboard.press('Enter'); 
    await page.keyboard.press('Enter'); 
    console.log('Login realizado com sucesso!');
    notifier.notify({
      title: 'Cron Bot',
      message: "Você coletou suas coins diárias!!!",
    });

  } catch (error) {
    console.error('Erro durante o login:', error);
  } finally {
    browser.close();

  }
})();
