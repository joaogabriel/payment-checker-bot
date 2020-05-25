const puppeteer = require('puppeteer');

exports.run = async function () {

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });

    const page = await init(browser);

    await page.type('#txtIdentificacao', '155552202381');

    await page.type('#txtCpfCgc', '00859005160');

    await page.click('#login');

    console.log(1)
    await page.waitForNavigation();
    console.log(2)
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td)
    });

    console.log('data', data);
    // console.log(page)
    // const inputData = getInputData();
    //
    // await utils.debugScreenshot(page, "main.png");
    //
    // if (inputData.process) {
    //     await removeDuplicateJudmentsFiles(page);
    // } else {
    //     await getJudgmentsBetweenDates(page, inputData);
    // }
    //
    // await browser.close();

    // process.exit();

}

const init = async browser => {

    const page = await browser.newPage();

    await page.goto('http://www1.caixa.gov.br/servico/habitacao/index.asp');

    return page;

};
