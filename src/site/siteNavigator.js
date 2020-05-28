const puppeteer = require('puppeteer');
const pageValues = readPageValues();

exports.run = async function () {

    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        // args: [
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        // ]
        headless: false, defaultViewport: null, args: ['--start-maximized']
    });

    const page = await init(browser);

    await page.type('#txtIdentificacao', pageValues.contractNumber);

    await page.type('#txtCpfCgc', pageValues.personId);

    await page.click('#login');

    await page.waitForNavigation();

    const tableContentTds = await page.evaluate(() => {

        const tds = Array.from(document.querySelectorAll('table tr td'));

        return tds.map(td => td.innerText);

    });

    const question = getQuestion(tableContentTds[4]);

    // await page.type(question.inputElement, question.answer);
    await typePageValues(page, question);

    await page.click('#login');

    await page.waitForNavigation();

    await page.evaluate(() => enviaParametros('prestacao.asp'));

    await page.waitFor(5000)

    const rowsNumber = await page.evaluate(() => {

        const rows = Array.from(document.querySelectorAll('table.dados_contrato > tbody > tr'));

        return rows.length;

    });

    console.log('rows', rowsNumber)

    await page.screenshot({
        path: 'teste.png',
        fullPage: true
    });

    console.log(4)

    await browser.close();

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

function getQuestion(questionText) {

    const questionFiltered = pageValues.questions.find(oneQuestion => {
        return oneQuestion.question === questionText;
    });

    return questionFiltered;

}

const init = async browser => {

    const page = await browser.newPage();

    await page.goto('http://www1.caixa.gov.br/servico/habitacao/index.asp');

    return page;

};

function readPageValues() {

    return {
        contractNumber: process.env.CONTRACT_NUMBER,
        personId: process.env.PERSON_ID,
        questions: JSON.parse(process.env.QUESTIONS)
    }

}

const typePageValues = async (page, question) => {

    const inputElement = question.inputElement;

    if (!inputElement.includes(';')) {

        await page.type(question.inputElement, question.answer);

        return;

    }

    const inputElements = inputElement.split(';');

    const answers = question.answer.split(';');

    console.log(inputElements)
    console.log(answers)

    inputElements.forEach(async function (element, index) {
        console.log(element, answers[index])
        await page.type(element, answers[index]);
    });

}