const { chromium } = require('playwright');

async function main() {
    const seeds = [78,79,80,81,82,83,84,85,86,87];
    let total = 0;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    for (let seed of seeds) {
        const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
        await page.goto(url);
        // Wait for tables to render
        await page.waitForSelector('table');
        // Get all table cell numbers
        const numbers = await page.$$eval('table td', tds =>
            tds.map(td => parseFloat(td.innerText)).filter(x => !isNaN(x))
        );
        total += numbers.reduce((a, b) => a + b, 0);
    }
    console.log("SUM OF ALL TABLES IS", total);
    await browser.close();
}

main();
