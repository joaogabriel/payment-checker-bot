const puppeteer = require('puppeteer');
const fileUtil = require('../util/fileUtil');
const environmentUtil = require('../util/environmentUtil');
const environment = environmentUtil.get();

exports.run = async function () {

    const launchOptions = getOptions();

    const browser = await puppeteer.launch(launchOptions);

    const page = await init(browser);

    await page.type('#txtIdentificacao', environment.contractNumber);

    await page.type('#txtCpfCgc', environment.personId);

    await page.click('#login');

    await page.waitForNavigation();

    const tableContentTds = await page.evaluate(() => {

        const tds = Array.from(document.querySelectorAll('table tr td'));

        return tds.map(td => td.innerText);

    });

    const question = getQuestion(tableContentTds[4]);

    await typePageValues(page, question);

    await page.click('#login');

    await page.waitForNavigation();

    await page.evaluate(() => enviaParametros('prestacao.asp'));

    await page.waitFor(5000);

    const rowsNumber = await page.evaluate(() => {

        const rows = Array.from(document.querySelectorAll('table.dados_contrato > tbody > tr'));

        return rows.length;

    });

    const fileName = fileUtil.generateName();

    await page.screenshot({
        path: fileName,
        fullPage: true
    });

    await browser.close();

    return {
        fileName: fileName,
        rows: rowsNumber
    }

}

function getQuestion(questionText) {

    const questionFiltered = environment.questions.find(oneQuestion => {
        return oneQuestion.question === questionText;
    });

    return questionFiltered;

}

const init = async browser => {

    const page = await browser.newPage();

    await page.goto('http://www1.caixa.gov.br/servico/habitacao/index.asp');

    await page.setDefaultNavigationTimeout(0);

    return page;

};

const typePageValues = async (page, question) => {

    const inputElement = question.inputElement;

    if (!inputElement.includes(';')) {

        await page.type(question.inputElement, question.answer);

        return;

    }

    const inputElements = inputElement.split(';');

    const answers = question.answer.split(';');

    await page.type(inputElements[0], answers[0]);

    await page.type(inputElements[1], answers[1]);

}

function getOptions() {

    let options = {
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
        ]
    };

    if (environmentUtil.isDev()) {

        options = {
            ignoreHTTPSErrors: true,
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        }

    }

    return options;

}