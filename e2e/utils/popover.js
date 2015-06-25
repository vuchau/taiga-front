var common = require('./common')

var popover = module.exports;

var transition = 400;

popover.wait = async function() {
    await browser.wait(async function() {
        return await $$('.popover.active').count() === 1;
    }, 1000);

    return $('.popover.active');
};

popover.open = async function(el, item) {
    el.click();

    let pop = await popover.wait();

    pop.$$('a').get(item).click();

    await browser.sleep(transition);

    return pop;
};
