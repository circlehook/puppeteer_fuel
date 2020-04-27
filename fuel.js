const puppeteer = require('../node_modules/puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({
					        headless: false,
					        args: ['--start-fullscreen']
    });
    let data = []; // Создаём пустой массив
    const page1 = await browser.newPage();

    await page1.goto('https://www.okko.ua/fuels');
    await page1.setViewport({width: 1920, height: 1080});
    await page1.waitFor(1000);

    const okko = await page1.evaluate(() => {
    	const OKKO_DISCOUNT     = 4;
        const OKKO_DISCOUNT_GAS = 1;
        let okko_a92_origin     = document.querySelector('#FuelBaner > div.face > div > div > ul > li:nth-child(5) > span.price').innerText;
        let okko_a92            = okko_a92_origin.trim().replace(/\s/g, '.') -  OKKO_DISCOUNT;

        let okko_a95_origin     = document.querySelector('#FuelBaner > div.face > div > div > ul > li:nth-child(4) > span.price').innerText;
        let okko_a95            = okko_a95_origin.trim().replace(/\s/g, '.') -  OKKO_DISCOUNT;

        let okko_dt_origin     = document.querySelector('#FuelBaner > div.face > div > div > ul > li:nth-child(2) > span.price').innerText;
        let okko_dt            = okko_dt_origin.trim().replace(/\s/g, '.') -  OKKO_DISCOUNT;

        let okko_gas_origin     = document.querySelector('#FuelBaner > div.face > div > div > ul > li.item.thin > span.price').innerText;
        let okko_gas            = okko_gas_origin.trim().replace(/\s/g, '.') -  OKKO_DISCOUNT_GAS;

        return {
            okko_a92,
            okko_a95,
            okko_dt,
            okko_gas
        }
	   
	});

    const page2 = await browser.newPage();

    await page2.goto('https://avias.ua/');
    await page2.setViewport({width: 1920, height: 1080});
    await page2.waitFor(1000);

    const avias = await page2.evaluate(() => {
    	const AVIAS_DISCOUNT	= 0.5;
        let avias_a92  = document.querySelector('#slide-7-layer-18 > div > div.row > div.col-md-2.fuel-price.col-lg-4.col-sm-4.col-xs-4.wpb_column.column_container > p.a92e').innerText - AVIAS_DISCOUNT;
        let avias_a95  = document.querySelector('#slide-7-layer-18 > div > div.row > div.col-md-2.fuel-price.col-lg-4.col-sm-4.col-xs-4.wpb_column.column_container > p.a95').innerText - AVIAS_DISCOUNT;
        let avias_dt   = document.querySelector('#slide-7-layer-18 > div > div.row > div.col-md-2.fuel-price.col-lg-4.col-sm-4.col-xs-4.wpb_column.column_container > p.dt').innerText - AVIAS_DISCOUNT;
        let avias_gas  = document.querySelector('#slide-7-layer-18 > div > div.row > div.col-md-2.fuel-price.col-lg-4.col-sm-4.col-xs-4.wpb_column.column_container > p.gas').innerText;
        
        return {
            avias_a92,
            avias_a95,
            avias_dt,
            avias_gas
        }

    });

    const page3             = await browser.newPage();
    await page3.setViewport({width: 1920, height: 1080});
    
    await page3.goto('https://wog.ua/ua/map/');
    await page3.waitFor(1000);
    await page3.click('#popup_coupons > div > div.popup_content > div.submit > a > div');
    await page3.waitFor(1000);
    await page3.click('#main-goolge-map > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div:nth-child(21)');
    await page3.waitFor(1000);
    await page3.click('#main-goolge-map > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div:nth-child(13)');
    await page3.waitFor(1000);
    await page3.click('#main-goolge-map > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div:nth-child(21)');
    await page3.waitFor(1000);
    await page3.click('#main-goolge-map > div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(3) > div:nth-child(25)');
    await page3.waitFor(1000);

    const wog = await page3.evaluate(() => {
        const WOG_DISCOUNT      = 3.7;
        const WOG_DISCOUNT_GAS  = 0.9;
        let wog_a92             = document.querySelector('#cost > ul > li:nth-child(3) > span.price').innerText;
        let wog_a95             = document.querySelector('#cost > ul > li:nth-child(4) > span.price').innerText;
        let wog_dt              = document.querySelector('#cost > ul > li:nth-child(1) > span.price').innerText;
        let wog_gas             = document.querySelector('#cost > ul > li:nth-child(6) > span.price').innerText;
        
        wog_a92 = wog_a92.replace(",",".") - WOG_DISCOUNT; 
        wog_a95 = wog_a95.replace(",",".") - WOG_DISCOUNT;
        wog_dt  = wog_dt.replace(",",".")  - WOG_DISCOUNT;
        wog_gas = wog_gas.replace(",",".") - WOG_DISCOUNT_GAS;

        return {
            wog_a92,
            wog_a95,
            wog_dt,
            wog_gas
        }
	});

    browser.close();
    data.push({okko, avias, wog}); // Помещаем данные в массив
    return data; // Возвращаем массив с данными
    
};

scrape().then((value) => {
    console.log(value);
});

