const puppeteer = require("puppeteer");
const fs = require("fs");

async function webScraping() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();

  await page.goto(
    "https://www.geeksforgeeks.org/node-js/explain-the-mechanism-of-event-loop-in-node-js/",
  );

  //   1 get element
  let element = await page.waitForSelector("h1");

  //   2. get html content
  let html = await page.content();
  // save file to local system
  fs.writeFileSync("./gfg_article.html", html, "utf-8");

//   3. take screenshot 
  let screenshot = await page.screenshot({ path: 'screenshot.png', fullPage: true });
  console.log("HTML file is successfully saved!");

//   4. convert to pdf
let pdf = await page.pdf({ path: 'article.pdf', format: 'A4' });

  let text = await page.evaluate((element) => element.textContent, element);
  console.log(text);
  browser.close();
}

webScraping();
